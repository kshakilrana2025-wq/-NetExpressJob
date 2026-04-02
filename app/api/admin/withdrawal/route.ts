import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/auth/middleware';
import { connectToDatabase } from '@/lib/db/mongodb';
import Withdrawal from '@/models/Withdrawal';
import User from '@/models/User';

export async function PUT(req: NextRequest) {
  const admin = await requireAdmin(req);
  if (admin instanceof NextResponse) return admin;
  await connectToDatabase();
  const { withdrawalId, action } = await req.json();
  const withdrawal = await Withdrawal.findById(withdrawalId);
  if (!withdrawal) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  if (action === 'approve') {
    withdrawal.status = 'approved';
    withdrawal.processedDate = new Date();
    await withdrawal.save();
    await User.findByIdAndUpdate(withdrawal.user, { $inc: { 'wallet.pending': -withdrawal.amount } });
  } else if (action === 'reject') {
    withdrawal.status = 'rejected';
    withdrawal.processedDate = new Date();
    await withdrawal.save();
    await User.findByIdAndUpdate(withdrawal.user, { $inc: { 'wallet.available': withdrawal.amount, 'wallet.pending': -withdrawal.amount } });
  }
  return NextResponse.json(withdrawal);
}
