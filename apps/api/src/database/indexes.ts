import { AnimalModel } from '../modules/animals/animal.model';
import { PetModel } from '../modules/pets/pet.model';
import { ReminderModel } from '../modules/reminders/reminder.model';
import { TutorProfileModel } from '../modules/tutor-profile/tutor-profile.model';
import { PageViewModel } from '../modules/analytics/page-view.model';

export async function ensureIndexes(): Promise<void> {
  await AnimalModel.createIndexes();
  await PetModel.createIndexes();
  await ReminderModel.createIndexes();
  await TutorProfileModel.createIndexes();
  await PageViewModel.createIndexes();
}
