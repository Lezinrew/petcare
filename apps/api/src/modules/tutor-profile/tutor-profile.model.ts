import { Schema, model, Document } from 'mongoose';
import { TutorProfile } from './tutor-profile.types';

const tutorProfileSchema = new Schema(
  {
    userId: { type: String, required: true, unique: true, index: true },
    name: String,
    city: String,
    state: String,
    housingType: {
      type: String,
      enum: ['apartment', 'house', 'house_with_yard', 'other'],
    },
    petExperience: {
      type: String,
      enum: ['none', 'some', 'experienced'],
    },
    notes: String,
  },
  { timestamps: true },
);

export type TutorProfileDocument = Document & TutorProfile;

export const TutorProfileModel = model<TutorProfileDocument>('TutorProfile', tutorProfileSchema);
