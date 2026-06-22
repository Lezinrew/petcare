import { Schema, model, Document } from 'mongoose';
import { PetProfile } from './pet.types';

const petSchema = new Schema(
  {
    userId: { type: String, required: true, index: true },
    name: { type: String, required: true },
    species: {
      type: String,
      required: true,
      enum: [
        'dog',
        'cat',
        'fish',
        'hamster',
        'bird',
        'rabbit',
        'turtle',
        'twister',
        'guinea_pig',
        'chinchilla',
        'gerbil',
        'ferret',
        'lizard',
        'other',
      ],
    },
    breedSlug: String,
    ageMonths: Number,
    weightKg: Number,
    sex: { type: String, enum: ['male', 'female', 'unknown'] },
    neutered: Boolean,
    notes: String,
    photoUrl: String,
  },
  { timestamps: true },
);

export type PetDocument = Document & PetProfile;

export const PetModel = model<PetDocument>('Pet', petSchema);
