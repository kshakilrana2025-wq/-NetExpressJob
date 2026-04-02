import mongoose, { Schema, Document } from 'mongoose';

export interface ITask extends Document {
  title: string;
  description: string;
  category: 'video_creation' | 'video_editing' | 'photo_editing' | 'website_design';
  reward: number;
  createdBy: mongoose.Types.ObjectId;
  status: 'active' | 'inactive';
  createdAt: Date;
}

const TaskSchema = new Schema<ITask>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, enum: ['video_creation', 'video_editing', 'photo_editing', 'website_design'], required: true },
  reward: { type: Number, required: true },
  createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  status: { type: String, default: 'active' },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.Task || mongoose.model<ITask>('Task', TaskSchema);
