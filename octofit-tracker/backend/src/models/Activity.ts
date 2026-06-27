import mongoose, { Schema, Document } from 'mongoose';

export interface IActivity extends Document {
  user: string;
  type: string;
  duration: number;
  distance: number;
  date: Date;
}

const activitySchema = new Schema<IActivity>({
  user: { type: String, required: true },
  type: { type: String, required: true },
  duration: { type: Number, required: true },
  distance: { type: Number, required: true },
  date: { type: Date, default: Date.now },
});

export const Activity = mongoose.model<IActivity>('Activity', activitySchema);
