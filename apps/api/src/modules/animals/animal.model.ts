import { Schema, model, Document } from 'mongoose';
import { AnimalBreed } from './animal.types';

const careSchema = new Schema(
  {
    feeding: {
      dailyAmount: String,
      mealsPerDay: String,
      forbiddenFoods: [String],
      specialNeeds: String,
    },
    hydration: {
      waterAmount: String,
      dehydrationSigns: [String],
    },
    exercise: {
      dailyWalkTime: String,
      energyLevel: String,
      recommendedActivities: [String],
    },
    health: {
      idealWeight: String,
      vaccines: [String],
      commonDiseases: [String],
    },
    hygiene: {
      bathFrequency: String,
      coatCare: String,
    },
    behavior: {
      temperament: String,
      trainability: String,
      sociability: String,
      otherAnimals: String,
    },
    environment: {
      recommendedSpace: String,
      canLiveInApartment: String,
      climateSensitivity: String,
      backyardNeed: String,
    },
    growth: {
      adultSize: String,
      adultAge: String,
    },
    curiosities: [String],
  },
  { _id: false },
);

const animalSchema = new Schema(
  {
    slug: { type: String, required: true, unique: true, index: true },
    species: {
      type: String,
      required: true,
      enum: ['dog', 'cat', 'fish', 'hamster', 'bird', 'rabbit'],
      index: true,
    },
    name: { type: String, required: true },
    origin: { type: String, required: true },
    originalFunction: { type: String, required: true },
    lifeExpectancy: { type: String, required: true },
    size: {
      type: String,
      required: true,
      enum: ['pequeno', 'médio', 'grande', 'gigante'],
    },
    energyLevel: {
      type: String,
      required: true,
      enum: ['baixo', 'moderado', 'alto', 'muito alto'],
    },
    apartmentFriendly: { type: Boolean, required: true },
    goodWithChildren: { type: Boolean, required: true },
    shortDescription: { type: String, required: true },
    imageUrl: { type: String },
    imageAlt: { type: String },
    imageCredit: { type: String },
    imageSource: { type: String },
    placeholderUrl: { type: String },
    care: { type: careSchema, required: true },
  },
  { timestamps: true },
);

export type AnimalDocument = Document & AnimalBreed;

export const AnimalModel = model<AnimalDocument>('Animal', animalSchema);
