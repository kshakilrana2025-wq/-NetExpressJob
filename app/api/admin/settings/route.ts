import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/auth/middleware';
import { connectToDatabase } from '@/lib/db/mongodb';
import Setting from '@/models/Setting';

export async function GET(req: NextRequest) {
  const admin = await requireAdmin(req);
  if (admin instanceof NextResponse) return admin;
  await connectToDatabase();
  let settings = await Setting.findOne();
  if (!settings) settings = await Setting.create({ updatedBy: admin._id });
  return NextResponse.json(settings);
}

export async function POST(req: NextRequest) {
  const admin = await requireAdmin(req);
  if (admin instanceof NextResponse) return admin;
  await connectToDatabase();
  const data = await req.json();
  let settings = await Setting.findOne();
  if (settings) {
    Object.assign(settings, data);
    settings.updatedBy = admin._id;
    settings.updatedAt = new Date();
    await settings.save();
  } else {
    settings = await Setting.create({ ...data, updatedBy: admin._id });
  }
  return NextResponse.json(settings);
}
