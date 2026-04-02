import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/auth/middleware';
import { connectToDatabase } from '@/lib/db/mongodb';
import User from '@/models/User';
import Withdrawal from '@/models/Withdrawal';
import PaymentTransaction from '@/models/PaymentTransaction';
import TaskSubmission from '@/models/TaskSubmission';

export async function GET(req: NextRequest) {
  const admin = await requireAdmin(req);
  if (admin instanceof NextResponse) return admin;
  await connectToDatabase();
  const users = await User.countDocuments();
  const pendingWithdrawals = await Withdrawal.countDocuments({ status: 'pending' });
  const pendingPayments = await PaymentTransaction.countDocuments({ status: 'pending' });
  const pendingTasks = await TaskSubmission.countDocuments({ status: 'pending' });
  return NextResponse.json({ users, pendingWithdrawals, pendingPayments, pendingTasks });
}
