import { z } from 'zod';
import { ApiError } from '../../utils/apiError';
import { env } from '../../config/env';
import { reminderRepository } from './reminder.repository';
import { CreateReminderInput, Reminder, UpdateReminderInput } from './reminder.types';

const createReminderSchema = z.object({
  petId: z.string().optional(),
  type: z.enum(['vaccine', 'deworming', 'bath', 'grooming', 'vet', 'medicine', 'walk', 'food', 'other']),
  title: z.string().min(1, 'Título é obrigatório'),
  dueDate: z.string().min(1, 'Data é obrigatória'),
  recurrence: z.enum(['none', 'daily', 'weekly', 'monthly', 'yearly']).default('none'),
});

const updateReminderSchema = createReminderSchema.partial().extend({
  status: z.enum(['pending', 'done']).optional(),
});

export class ReminderService {
  private get userId(): string {
    return env.demoUserId;
  }

  async list(): Promise<Reminder[]> {
    return reminderRepository.findByUserId(this.userId);
  }

  async getById(id: string): Promise<Reminder> {
    const reminder = await reminderRepository.findById(id, this.userId);
    if (!reminder) throw new ApiError(404, 'REMINDER_NOT_FOUND', 'Lembrete não encontrado');
    return reminder;
  }

  async create(input: CreateReminderInput): Promise<Reminder> {
    const data = createReminderSchema.parse(input);
    return reminderRepository.create({
      ...data,
      userId: this.userId,
      status: 'pending',
    });
  }

  async update(id: string, input: UpdateReminderInput): Promise<Reminder> {
    const data = updateReminderSchema.parse(input);
    const reminder = await reminderRepository.update(id, this.userId, data);
    if (!reminder) throw new ApiError(404, 'REMINDER_NOT_FOUND', 'Lembrete não encontrado');
    return reminder;
  }

  async markDone(id: string): Promise<Reminder> {
    const reminder = await reminderRepository.update(id, this.userId, { status: 'done' });
    if (!reminder) throw new ApiError(404, 'REMINDER_NOT_FOUND', 'Lembrete não encontrado');
    return reminder;
  }

  async delete(id: string): Promise<void> {
    const deleted = await reminderRepository.delete(id, this.userId);
    if (!deleted) throw new ApiError(404, 'REMINDER_NOT_FOUND', 'Lembrete não encontrado');
  }
}

export const reminderService = new ReminderService();
