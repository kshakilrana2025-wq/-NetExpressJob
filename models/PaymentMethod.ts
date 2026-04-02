import mongoose, { Schema, Document } from 'mongoose';

export interface IPaymentMethod extends Document {
  name: 'bKash' | 'Nagad' | 'Rocket';
  number: string;
  isActive: boolean;
  mode: 'live' | 'sandbox';
  apiKey?: string;
  secretKey?: string;
  merchantId?: string;
  webhookSecret?: string;
  updatedBy: mongoose.Types.ObjectId;
  updatedAt: Date;
}

const PaymentMethodSchema = new Schema<IPaymentMethod>({
  name: { type: String, enum: ['bKash', 'Nagad', 'Rocket'], required: true, unique: true },
  number: { type: String, required: true },
  isActive: { type: Boolean, default: true },
  mode: { type: String, enum: ['live', 'sandbox'], default: 'sandbox' },
  apiKey: String,
  secretKey: String,
  merchantId: String,
  webhookSecret: String,
  updatedBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  updatedAt: { type: Date, default: Date.now }
});

export default mongoose.models.PaymentMethod || mongoose.model<IPaymentMethod>('PaymentMethod', PaymentMethodSchema);
