import { NextRequest, NextResponse } from 'next/server';
import { getAuthUser } from '@/lib/auth/middleware';
import { connectToDatabase } from '@/lib/db/mongodb';
import TaskSubmission from '@/models/TaskSubmission';
import Task from '@/models/Task';

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  const user = await getAuthUser(req);
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  await connectToDatabase();
  const task = await Task.findById(params.id);
  if (!task || task.status !== 'active') return NextResponse.json({ error: 'Task not available' }, { status: 404 });
  const { submissionUrl } = await req.json();
  const existing = await TaskSubmission.findOne({ task: params.id, user: user._id });
  if (existing) return NextResponse.json({ error: 'Already submitted' }, { status: 400 });
  const submission = await TaskSubmission.create({ task: params.id, user: user._id, submissionUrl, status: 'pending' });
  return NextResponse.json(submission);
}
