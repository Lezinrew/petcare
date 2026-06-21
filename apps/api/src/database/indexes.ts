import { AnimalModel } from '../modules/animals/animal.model';
import { PetModel } from '../modules/pets/pet.model';
import { ReminderModel } from '../modules/reminders/reminder.model';

export async function ensureIndexes(): Promise<void> {
  await AnimalModel.createIndexes();
  await PetModel.createIndexes();
  await ReminderModel.createIndexes();
}
