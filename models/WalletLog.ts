import mongoose, { Schema, Document } from 'mongoose';

export interface IWalletLog extends Document {
  user: mongoose.Types.ObjectId;
  amount: number;
  type: 'referral_reg' | 'referral_act' | 'task' | 'withdraw';
  referenceId: string;
  createdAt: Date;
}

const WalletLogSchema = new Schema<IWalletLog>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  amount: { type: Number, required: true },
  type: { type: String, enum: ['referral_reg', 'referral_act', 'task', 'withdraw'], required: true },
  referenceId: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.WalletLog || mongoose.model<IWalletLog>('WalletLog', WalletLogSchema);
