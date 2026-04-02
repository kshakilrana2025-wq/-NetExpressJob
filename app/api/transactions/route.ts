import { NextRequest, NextResponse } from 'next/server';
import { getAuthUser } from '@/lib/auth/middleware';
import { prisma } from '@/lib/db/postgres';

export async function GET(req: NextRequest) {
  const user = await getAuthUser(req);
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const logs = await prisma.transactionLog.findMany({ where: { userId: user._id.toString() }, orderBy: { createdAt: 'desc' }, take: 50 });
  return NextResponse.json(logs);
}
