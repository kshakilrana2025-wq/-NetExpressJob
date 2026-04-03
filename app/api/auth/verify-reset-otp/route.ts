import { NextRequest, NextResponse } from 'next/server';

const otpStore = new Map();

export async function POST(req: NextRequest) {
  const { email, otp } = await req.json();
  const record = otpStore.get(`reset_${email}`);
  if (!record || record.otp !== otp || record.expires < Date.now()) {
    return NextResponse.json({ error: 'Invalid or expired OTP' }, { status: 400 });
  }
  return NextResponse.json({ success: true });
}
