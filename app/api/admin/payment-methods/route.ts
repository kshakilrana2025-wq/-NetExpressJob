import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db/mongodb';
import { requireAdmin } from '@/lib/auth/middleware';
import PaymentMethod from '@/models/PaymentMethod';

export async function GET(req: NextRequest) {
  const admin = await requireAdmin(req);
  if (admin instanceof NextResponse) return admin;
  await connectToDatabase();
  const methods = await PaymentMethod.find();
  return NextResponse.json(methods);
}

export async function POST(req: NextRequest) {
  const admin = await requireAdmin(req);
  if (admin instanceof NextResponse) return admin;
  await connectToDatabase();
  const data = await req.json();
  const { name, number, isActive, mode, apiKey, secretKey, merchantId } = data;
  const method = await PaymentMethod.findOneAndUpdate(
    { name },
    { number, isActive, mode, apiKey, secretKey, merchantId, updatedBy: admin._id, updatedAt: new Date() },
    { upsert: true, new: true }
  );
  return NextResponse.json(method);
}
