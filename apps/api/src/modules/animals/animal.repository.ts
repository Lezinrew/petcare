import { AnimalModel } from './animal.model';
import { AnimalBreed, BreedFilters, Species } from './animal.types';

function toAnimalBreed(doc: Record<string, unknown>): AnimalBreed {
  return {
    id: String(doc._id),
    slug: doc.slug as string,
    species: doc.species as AnimalBreed['species'],
    name: doc.name as string,
    origin: doc.origin as string,
    originalFunction: doc.originalFunction as string,
    lifeExpectancy: doc.lifeExpectancy as string,
    size: doc.size as AnimalBreed['size'],
    energyLevel: doc.energyLevel as AnimalBreed['energyLevel'],
    apartmentFriendly: doc.apartmentFriendly as boolean,
    goodWithChildren: doc.goodWithChildren as boolean,
    shortDescription: doc.shortDescription as string,
    imageUrl: doc.imageUrl as string | undefined,
    imageAlt: doc.imageAlt as string | undefined,
    imageCredit: doc.imageCredit as string | undefined,
    imageSource: doc.imageSource as string | undefined,
    placeholderUrl: doc.placeholderUrl as string | undefined,
    care: doc.care as AnimalBreed['care'],
    createdAt: (doc.createdAt as Date)?.toISOString(),
    updatedAt: (doc.updatedAt as Date)?.toISOString(),
  };
}

export class AnimalRepository {
  async findBySpecies(species: Species, filters: BreedFilters = {}): Promise<AnimalBreed[]> {
    const query: Record<string, unknown> = { species };

    if (filters.search) {
      query.name = { $regex: filters.search, $options: 'i' };
    }
    if (filters.size) {
      query.size = filters.size;
    }
    if (filters.energyLevel) {
      query.energyLevel = filters.energyLevel;
    }
    if (filters.apartmentFriendly !== undefined) {
      query.apartmentFriendly = filters.apartmentFriendly;
    }

    const docs = await AnimalModel.find(query).sort({ name: 1 }).lean();
    return docs.map((d) => toAnimalBreed(d as Record<string, unknown>));
  }

  async findDogs(filters: BreedFilters): Promise<AnimalBreed[]> {
    return this.findBySpecies('dog', filters);
  }

  async findBySlug(slug: string, species: Species): Promise<AnimalBreed | null> {
    const doc = await AnimalModel.findOne({ slug, species }).lean();
    if (!doc) return null;
    return toAnimalBreed(doc as Record<string, unknown>);
  }

  async deleteAll(): Promise<number> {
    const result = await AnimalModel.deleteMany({});
    return result.deletedCount ?? 0;
  }

  async insertMany(breeds: Omit<AnimalBreed, 'id'>[]): Promise<number> {
    const result = await AnimalModel.insertMany(breeds);
    return result.length;
  }

  async count(species?: Species): Promise<number> {
    return AnimalModel.countDocuments(species ? { species } : {});
  }
}

export const animalRepository = new AnimalRepository();
