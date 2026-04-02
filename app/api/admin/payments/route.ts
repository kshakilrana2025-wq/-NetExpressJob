import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/auth/middleware';
import { connectToDatabase } from '@/lib/db/mongodb';
import PaymentTransaction from '@/models/PaymentTransaction';
import User from '@/models/User';
import { activateUserAndGiveReferralBonus } from '@/lib/payment/verifier'; // need to export

export async function GET(req: NextRequest) {
  const admin = await requireAdmin(req);
  if (admin instanceof NextResponse) return admin;
  await connectToDatabase();
  const transactions = await PaymentTransaction.find({ status: 'pending' }).populate('user', 'email');
  return NextResponse.json(transactions);
}

export async function PUT(req: NextRequest) {
  const admin = await requireAdmin(req);
  if (admin instanceof NextResponse) return admin;
  await connectToDatabase();
  const { transactionId, action } = await req.json();
  const tx = await PaymentTransaction.findById(transactionId);
  if (!tx) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  if (action === 'approve') {
    tx.status = 'verified';
    tx.verifiedAt = new Date();
    await tx.save();
    await activateUserAndGiveReferralBonus(tx.user, tx._id);
  } else if (action === 'reject') {
    tx.status = 'rejected';
    tx.verifiedAt = new Date();
    await tx.save();
  }
  return NextResponse.json(tx);
}
