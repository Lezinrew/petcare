import { TutorProfileModel } from './tutor-profile.model';
import { TutorProfile, UpdateTutorProfileInput } from './tutor-profile.types';

function toTutorProfile(doc: Record<string, unknown>): TutorProfile {
  return {
    id: String(doc._id),
    userId: doc.userId as string,
    name: doc.name as string | undefined,
    city: doc.city as string | undefined,
    state: doc.state as string | undefined,
    housingType: doc.housingType as TutorProfile['housingType'],
    petExperience: doc.petExperience as TutorProfile['petExperience'],
    notes: doc.notes as string | undefined,
    createdAt: (doc.createdAt as Date)?.toISOString(),
    updatedAt: (doc.updatedAt as Date)?.toISOString(),
  };
}

export class TutorProfileRepository {
  async findByUserId(userId: string): Promise<TutorProfile | null> {
    const doc = await TutorProfileModel.findOne({ userId }).lean();
    if (!doc) return null;
    return toTutorProfile(doc as Record<string, unknown>);
  }

  async upsert(userId: string, data: UpdateTutorProfileInput): Promise<TutorProfile> {
    const doc = await TutorProfileModel.findOneAndUpdate(
      { userId },
      { $set: { ...data, userId } },
      { new: true, upsert: true, setDefaultsOnInsert: true },
    ).lean();

    return toTutorProfile(doc as Record<string, unknown>);
  }
}

export const tutorProfileRepository = new TutorProfileRepository();
