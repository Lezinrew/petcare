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
  userId: string;
  petId?: string;
  type: ReminderType;
  title: string;
  dueDate: string;
  recurrence: ReminderRecurrence;
  status: ReminderStatus;
  createdAt?: string;
  updatedAt?: string;
};

export type CreateReminderInput = Omit<Reminder, 'id' | 'userId' | 'status' | 'createdAt' | 'updatedAt'>;
export type UpdateReminderInput = Partial<CreateReminderInput & { status: ReminderStatus }>;
