import { PetModel } from './pet.model';
import { PetProfile } from './pet.types';

function toPetProfile(doc: Record<string, unknown>): PetProfile {
  return {
    id: String(doc._id),
    userId: doc.userId as string,
    name: doc.name as string,
    species: doc.species as PetProfile['species'],
    breedSlug: doc.breedSlug as string | undefined,
    ageMonths: doc.ageMonths as number | undefined,
    weightKg: doc.weightKg as number | undefined,
    sex: doc.sex as PetProfile['sex'],
    neutered: doc.neutered as boolean | undefined,
    notes: doc.notes as string | undefined,
    photoUrl: doc.photoUrl as string | undefined,
    createdAt: (doc.createdAt as Date)?.toISOString(),
    updatedAt: (doc.updatedAt as Date)?.toISOString(),
  };
}

export class PetRepository {
  async findByUserId(userId: string): Promise<PetProfile[]> {
    const docs = await PetModel.find({ userId }).sort({ createdAt: -1 }).lean();
    return docs.map((d) => toPetProfile(d as Record<string, unknown>));
  }

  async findById(id: string, userId: string): Promise<PetProfile | null> {
    const doc = await PetModel.findOne({ _id: id, userId }).lean();
    if (!doc) return null;
    return toPetProfile(doc as Record<string, unknown>);
  }

  async create(data: Omit<PetProfile, 'id'>): Promise<PetProfile> {
    const doc = await PetModel.create(data);
    return toPetProfile(doc.toObject() as unknown as Record<string, unknown>);
  }

  async update(id: string, userId: string, data: Partial<PetProfile>): Promise<PetProfile | null> {
    const doc = await PetModel.findOneAndUpdate(
      { _id: id, userId },
      { $set: data },
      { new: true },
    ).lean();
    if (!doc) return null;
    return toPetProfile(doc as Record<string, unknown>);
  }

  async delete(id: string, userId: string): Promise<boolean> {
    const result = await PetModel.deleteOne({ _id: id, userId });
    return (result.deletedCount ?? 0) > 0;
  }
}

export const petRepository = new PetRepository();
