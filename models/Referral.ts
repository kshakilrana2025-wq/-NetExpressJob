import mongoose, { Schema, Document } from 'mongoose';

export interface IReferral extends Document {
  referrer: mongoose.Types.ObjectId;
  referred: mongoose.Types.ObjectId;
  registrationBonusPaid: boolean;
  activationBonusPaid: boolean;
  registrationAmount: number;
  activationAmount: number;
  createdAt: Date;
}

const ReferralSchema = new Schema<IReferral>({
  referrer: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  referred: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  registrationBonusPaid: { type: Boolean, default: false },
  activationBonusPaid: { type: Boolean, default: false },
  registrationAmount: { type: Number, default: 1 },
  activationAmount: { type: Number, default: 150 },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.Referral || mongoose.model<IReferral>('Referral', ReferralSchema);
