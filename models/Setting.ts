import mongoose, { Schema, Document } from 'mongoose';

export interface ISetting extends Document {
  activationFee: number;
  paymentVerificationMode: 'api' | 'manual';
  referralRegistrationBonus: number;
  referralActivationBonus: number;
  updatedBy: mongoose.Types.ObjectId;
  updatedAt: Date;
}

const SettingSchema = new Schema<ISetting>({
  activationFee: { type: Number, default: 500 },
  paymentVerificationMode: { type: String, enum: ['api', 'manual'], default: 'manual' },
  referralRegistrationBonus: { type: Number, default: 1 },
  referralActivationBonus: { type: Number, default: 150 },
  updatedBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  updatedAt: { type: Date, default: Date.now }
});

export default mongoose.models.Setting || mongoose.model<ISetting>('Setting', SettingSchema);
