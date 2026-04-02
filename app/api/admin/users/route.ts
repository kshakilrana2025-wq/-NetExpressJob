import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/auth/middleware';
import { connectToDatabase } from '@/lib/db/mongodb';
import User from '@/models/User';

export async function GET(req: NextRequest) {
  const admin = await requireAdmin(req);
  if (admin instanceof NextResponse) return admin;
  await connectToDatabase();
  const users = await User.find().select('-password');
  return NextResponse.json(users);
}
