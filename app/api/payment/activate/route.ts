import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db/mongodb';
import { getAuthUser } from '@/lib/auth/middleware';
import PaymentTransaction from '@/models/PaymentTransaction';
import Setting from '@/models/Setting';
import PaymentMethod from '@/models/PaymentMethod';
import User from '@/models/User';
import Referral from '@/models/Referral';
import { verifyPayment } from '@/lib/payment/verifier';
import { prisma } from '@/lib/db/postgres';

async function activateUserAndGiveReferralBonus(userId: any, transactionId: any) {
  const user = await User.findById(userId);
  if (user.activationStatus === 'active') return;
  user.activationStatus = 'active';
  user.activationTransactionId = transactionId;
  await user.save();

  if (user.referredBy) {
    const referral = await Referral.findOne({ referred: userId });
    const settings = await Setting.findOne();
    const bonus = settings?.referralActivationBonus || 150;
    if (referral && !referral.activationBonusPaid) {
      await User.findByIdAndUpdate(user.referredBy, { $inc: { 'wallet.available': bonus, 'wallet.totalEarned': bonus } });
      referral.activationBonusPaid = true;
      await referral.save();
      await prisma.transactionLog.create({
        data: { userId: user.referredBy.toString(), type: 'referral', amount: bonus, status: 'completed', referenceId: userId.toString(), metadata: { type: 'activation' } }
      });
    }
  }
}

export async function POST(req: NextRequest) {
  const user = await getAuthUser(req);
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  await connectToDatabase();

  const { method, transactionId, amount } = await req.json();
  const settings = await Setting.findOne();
  const requiredAmount = settings?.activationFee || 500;
  if (amount !== requiredAmount) return NextResponse.json({ error: `Amount must be ${requiredAmount} BDT` }, { status: 400 });

  const paymentMethod = await PaymentMethod.findOne({ name: method });
  if (!paymentMethod || !paymentMethod.isActive) return NextResponse.json({ error: 'Payment method not active' }, { status: 400 });

  const verificationMode = settings?.paymentVerificationMode || 'manual';
  const transaction = await PaymentTransaction.create({ user: user._id, method, transactionId, amount, status: 'pending', verificationMode });

  if (verificationMode === 'api') {
    const verified = await verifyPayment(method, transactionId, amount, paymentMethod);
    if (verified) {
      transaction.status = 'verified';
      transaction.verifiedAt = new Date();
      await transaction.save();
      await activateUserAndGiveReferralBonus(user._id, transaction._id);
      return NextResponse.json({ success: true, message: 'Payment verified automatically. Account activated.' });
    }
  }
  await transaction.save();
  return NextResponse.json({ success: true, message: 'Payment submitted for manual verification.' });
}
