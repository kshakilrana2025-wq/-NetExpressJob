import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db/mongodb';
import User from '@/models/User';
import Referral from '@/models/Referral';
import Setting from '@/models/Setting';
import { sendOTPEmail } from '@/lib/email/sendEmail';
import { generateReferralCode, generateOTP } from '@/lib/utils/helpers';
import { prisma } from '@/lib/db/postgres';

const otpStore = new Map();

export async function POST(req: NextRequest) {
  await connectToDatabase();
  const { name, email, password, ref } = await req.json();

  const existing = await User.findOne({ email });
  if (existing) return NextResponse.json({ error: 'Email already exists' }, { status: 400 });

  let referredBy = null;
  if (ref) {
    const referrer = await User.findOne({ referralCode: ref });
    if (referrer) referredBy = referrer._id;
  }

  const referralCode = generateReferralCode();
  const user = await User.create({
    name, email, password, referralCode, referredBy,
    emailVerified: false,
    wallet: { available: 0, pending: 0, totalEarned: 0 },
    activationStatus: 'pending'
  });

  // Give registration bonus (1 BDT) if referred
  if (referredBy) {
    const settings = await Setting.findOne();
    const bonus = settings?.referralRegistrationBonus || 1;
    await User.findByIdAndUpdate(referredBy, { $inc: { 'wallet.available': bonus, 'wallet.totalEarned': bonus } });
    await Referral.create({ referrer: referredBy, referred: user._id, registrationBonusPaid: true, registrationAmount: bonus });
    await prisma.transactionLog.create({
      data: { userId: referredBy.toString(), type: 'referral', amount: bonus, status: 'completed', referenceId: user._id.toString(), metadata: { type: 'registration' } }
    });
  }

  // Send OTP
  const otp = generateOTP();
  otpStore.set(email, { otp, expires: Date.now() + 10 * 60 * 1000 });
  await sendOTPEmail(email, otp);

  return NextResponse.json({ message: 'OTP sent', userId: user._id });
}
