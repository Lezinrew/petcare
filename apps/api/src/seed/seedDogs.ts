import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { allAnimalBreeds } from '../data/allBreeds';
import { AnimalModel } from '../modules/animals/animal.model';
import { runTutorProfileSeed } from './seedTutorProfile';

dotenv.config();

export async function runAnimalSeed(): Promise<number> {
  const uri = process.env.MONGODB_URI ?? 'mongodb://localhost:27017/petcare';

  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(uri);
  }

  await AnimalModel.deleteMany({});
  const result = await AnimalModel.insertMany(allAnimalBreeds);

  console.log(`[seed] ${result.length} animais inseridos (${allAnimalBreeds.length} raças/espécies no total)`);
  await runTutorProfileSeed();
  return result.length;
}

/** @deprecated use runAnimalSeed */
export const runDogSeed = runAnimalSeed;

if (require.main === module) {
  runAnimalSeed()
    .then((count) => {
      console.log(`[seed] Concluído: ${count} animais`);
      return mongoose.disconnect();
    })
    .then(() => process.exit(0))
    .catch((err) => {
      console.error('[seed] Erro:', err);
      process.exit(1);
    });
}
