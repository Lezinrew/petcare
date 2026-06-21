import { Schema, model, Document } from 'mongoose';
import { Reminder } from './reminder.types';

const reminderSchema = new Schema(
  {
    userId: { type: String, required: true, index: true },
    petId: { type: String, index: true },
    type: {
      type: String,
      required: true,
      enum: ['vaccine', 'deworming', 'bath', 'grooming', 'vet', 'medicine', 'walk', 'food', 'other'],
    },
    title: { type: String, required: true },
    dueDate: { type: String, required: true },
    recurrence: {
      type: String,
      required: true,
      enum: ['none', 'daily', 'weekly', 'monthly', 'yearly'],
      default: 'none',
    },
    status: { type: String, required: true, enum: ['pending', 'done'], default: 'pending' },
  },
  { timestamps: true },
);

export type ReminderDocument = Document & Reminder;

export const ReminderModel = model<ReminderDocument>('Reminder', reminderSchema);
