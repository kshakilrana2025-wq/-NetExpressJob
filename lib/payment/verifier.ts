import { IPaymentMethod } from '@/models/PaymentMethod';

// Mock API verification – replace with real bKash/Nagad/Rocket API calls
export async function verifyPayment(
  method: string,
  transactionId: string,
  amount: number,
  paymentMethod: IPaymentMethod
): Promise<boolean> {
  // In sandbox, accept any transaction starting with "SANDBOX"
  if (paymentMethod.mode === 'sandbox' && transactionId.startsWith('SANDBOX')) {
    return true;
  }
  // In live, you would call actual API
  // For demo, we treat "SUCCESS" as verified
  if (transactionId.startsWith('SUCCESS')) return true;
  return false;
}
