export type ReminderType =
  | 'vaccine'
  | 'deworming'
  | 'bath'
  | 'grooming'
  | 'vet'
  | 'medicine'
  | 'walk'
  | 'food'
  | 'other';

export type ReminderRecurrence = 'none' | 'daily' | 'weekly' | 'monthly' | 'yearly';
export type ReminderStatus = 'pending' | 'done';

export type Reminder = {
  id?: string;
  petId?: string;
  type: ReminderType;
  title: string;
  dueDate: string;
  recurrence: ReminderRecurrence;
  status: ReminderStatus;
};

export type CreateReminderInput = Omit<Reminder, 'id' | 'status'>;
