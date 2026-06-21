import { apiDelete, apiGet, apiPatch, apiPost, apiPut } from './api';
import { CreateReminderInput, Reminder } from '../types/reminder';

export async function fetchReminders(): Promise<Reminder[]> {
  return apiGet<Reminder[]>('/reminders');
}

export async function createReminder(input: CreateReminderInput): Promise<Reminder> {
  return apiPost<Reminder>('/reminders', input);
}

export async function updateReminder(id: string, input: Partial<CreateReminderInput>): Promise<Reminder> {
  return apiPut<Reminder>(`/reminders/${id}`, input);
}

export async function markReminderDone(id: string): Promise<Reminder> {
  return apiPatch<Reminder>(`/reminders/${id}/done`);
}

export async function deleteReminder(id: string): Promise<void> {
  return apiDelete(`/reminders/${id}`);
}
