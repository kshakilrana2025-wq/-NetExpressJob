import mongoose, { Schema, Document } from 'mongoose';

export interface IPaymentTransaction extends Document {
  user: mongoose.Types.ObjectId;
  method: 'bKash' | 'Nagad' | 'Rocket';
  transactionId: string;
  amount: number;
  status: 'pending' | 'verified' | 'rejected';
  verificationMode: 'api' | 'manual';
  adminNote?: string;
  createdAt: Date;
  verifiedAt?: Date;
}

const PaymentTransactionSchema = new Schema<IPaymentTransaction>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  method: { type: String, enum: ['bKash', 'Nagad', 'Rocket'], required: true },
  transactionId: { type: String, required: true },
  amount: { type: Number, required: true },
  status: { type: String, enum: ['pending', 'verified', 'rejected'], default: 'pending' },
  verificationMode: { type: String, enum: ['api', 'manual'], required: true },
  adminNote: { type: String },
  createdAt: { type: Date, default: Date.now },
  verifiedAt: { type: Date }
});

export default mongoose.models.PaymentTransaction || mongoose.model<IPaymentTransaction>('PaymentTransaction', PaymentTransactionSchema);
