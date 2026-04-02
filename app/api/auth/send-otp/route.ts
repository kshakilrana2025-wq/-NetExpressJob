import { NextRequest, NextResponse } from 'next/server';
import { sendOTPEmail } from '@/lib/email/sendEmail';
import { generateOTP } from '@/lib/utils/helpers';

const otpStore = new Map();

export async function POST(req: NextRequest) {
  const { email } = await req.json();
  const otp = generateOTP();
  otpStore.set(email, { otp, expires: Date.now() + 10 * 60 * 1000 });
  await sendOTPEmail(email, otp);
  return NextResponse.json({ message: 'OTP resent' });
}
