import { NextRequest, NextResponse } from 'next/server';
import { verifyJWT } from './jwt';
import { connectToDatabase } from '@/lib/db/mongodb';
import User from '@/models/User';

export async function getAuthUser(req: NextRequest) {
  const token = req.cookies.get('token')?.value;
  if (!token) return null;
  const decoded = verifyJWT(token);
  if (!decoded) return null;
  await connectToDatabase();
  return await User.findById(decoded.userId).select('-password');
}

export async function requireAdmin(req: NextRequest) {
  const user = await getAuthUser(req);
  if (!user || user.role !== 'admin') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }
  return user;
}
