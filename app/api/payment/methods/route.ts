import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db/mongodb';
import PaymentMethod from '@/models/PaymentMethod';

export async function GET() {
  await connectToDatabase();
  const methods = await PaymentMethod.find({ isActive: true });
  return NextResponse.json(methods);
}
