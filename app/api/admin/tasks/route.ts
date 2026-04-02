import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/auth/middleware';
import { connectToDatabase } from '@/lib/db/mongodb';
import Task from '@/models/Task';
import TaskSubmission from '@/models/TaskSubmission';
import User from '@/models/User';
import { prisma } from '@/lib/db/postgres';

export async function GET(req: NextRequest) {
  const admin = await requireAdmin(req);
  if (admin instanceof NextResponse) return admin;
  await connectToDatabase();
  const submissions = await TaskSubmission.find({ status: 'pending' }).populate('task user');
  return NextResponse.json(submissions);
}

export async function POST(req: NextRequest) {
  const admin = await requireAdmin(req);
  if (admin instanceof NextResponse) return admin;
  await connectToDatabase();
  const { title, description, category, reward } = await req.json();
  const task = await Task.create({ title, description, category, reward, createdBy: admin._id });
  return NextResponse.json(task);
}

export async function PUT(req: NextRequest) {
  const admin = await requireAdmin(req);
  if (admin instanceof NextResponse) return admin;
  await connectToDatabase();
  const { submissionId, action } = await req.json();
  const submission = await TaskSubmission.findById(submissionId).populate('task');
  if (!submission) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  if (action === 'approve') {
    submission.status = 'approved';
    submission.reviewedAt = new Date();
    await submission.save();
    const task = submission.task as any;
    await User.findByIdAndUpdate(submission.user, { $inc: { 'wallet.available': task.reward, 'wallet.totalEarned': task.reward } });
    await prisma.transactionLog.create({ data: { userId: submission.user.toString(), type: 'task', amount: task.reward, status: 'completed', referenceId: submission._id.toString() } });
  } else if (action === 'reject') {
    submission.status = 'rejected';
    submission.reviewedAt = new Date();
    await submission.save();
  }
  return NextResponse.json(submission);
}
