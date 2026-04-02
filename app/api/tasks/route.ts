import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db/mongodb';
import Task from '@/models/Task';
import { getAuthUser } from '@/lib/auth/middleware';
import TaskSubmission from '@/models/TaskSubmission';

export async function GET(req: NextRequest) {
  await connectToDatabase();
  const { searchParams } = new URL(req.url);
  if (searchParams.get('submissions')) {
    const user = await getAuthUser(req);
    if (!user) return NextResponse.json([]);
    const submissions = await TaskSubmission.find({ user: user._id }).populate('task');
    return NextResponse.json(submissions);
  }
  const tasks = await Task.find({ status: 'active' });
  return NextResponse.json(tasks);
}
