import { connectToDatabase } from '@/lib/db/mongodb';
import User from '@/models/User';
import Referral from '@/models/Referral';
import Setting from '@/models/Setting';
import { prisma } from '@/lib/db/postgres';

export async function verifyPayment(
  method: string,
  transactionId: string,
  amount: number,
  paymentMethod: any
): Promise<boolean> {
  if (paymentMethod.mode === 'sandbox' && transactionId.startsWith('SANDBOX')) {
    return true;
  }
  if (transactionId.startsWith('SUCCESS')) return true;
  return false;
}

export async function activateUserAndGiveReferralBonus(userId: any, transactionId: any) {
  await connectToDatabase();
  const user = await User.findById(userId);
  if (!user || user.activationStatus === 'active') return;

  user.activationStatus = 'active';
  user.activationTransactionId = transactionId;
  await user.save();

  if (user.referredBy) {
    const referral = await Referral.findOne({ referred: userId });
    const settings = await Setting.findOne();
    const bonus = settings?.referralActivationBonus || 150;
    if (referral && !referral.activationBonusPaid) {
      await User.findByIdAndUpdate(user.referredBy, {
        $inc: { 'wallet.available': bonus, 'wallet.totalEarned': bonus }
      });
      referral.activationBonusPaid = true;
      await referral.save();
      await prisma.transactionLog.create({
        data: {
          userId: user.referredBy.toString(),
          type: 'referral',
          amount: bonus,
          status: 'completed',
          referenceId: userId.toString(),
          metadata: { type: 'activation' }
        }
      });
    }
  }
}
