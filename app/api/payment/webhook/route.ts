import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db/mongodb';
import PaymentTransaction from '@/models/PaymentTransaction';
import { activateUserAndGiveReferralBonus } from '@/lib/payment/verifier'; // move helper

export async function POST(req: NextRequest) {
  const body = await req.json();
  // Process webhook from bKash/Nagad/Rocket
  // For demo, just return ok
  return NextResponse.json({ received: true });
}
