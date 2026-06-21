import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { AnimalModel } from '../modules/animals/animal.model';
import { allDogBreeds } from '../data/dogBreeds';

dotenv.config();

export async function runDogSeed(): Promise<number> {
  const uri = process.env.MONGODB_URI ?? 'mongodb://localhost:27017/petcare';

  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(uri);
  }

  await AnimalModel.deleteMany({});
  const result = await AnimalModel.insertMany(allDogBreeds);

  console.log(`[seed] ${result.length} raças inseridas`);
  return result.length;
}

if (require.main === module) {
  runDogSeed()
    .then((count) => {
      console.log(`[seed] Concluído: ${count} raças`);
      return mongoose.disconnect();
    })
    .then(() => process.exit(0))
    .catch((err) => {
      console.error('[seed] Erro:', err);
      process.exit(1);
    });
}
