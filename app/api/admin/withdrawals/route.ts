import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/auth/middleware';
import { connectToDatabase } from '@/lib/db/mongodb';
import Withdrawal from '@/models/Withdrawal';

export async function GET(req: NextRequest) {
  const admin = await requireAdmin(req);
  if (admin instanceof NextResponse) return admin;
  await connectToDatabase();
  const withdrawals = await Withdrawal.find({ status: 'pending' }).populate('user', 'email');
  return NextResponse.json(withdrawals);
}
