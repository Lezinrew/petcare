import { ReminderModel } from './reminder.model';
import { Reminder } from './reminder.types';

function toReminder(doc: Record<string, unknown>): Reminder {
  return {
    id: String(doc._id),
    userId: doc.userId as string,
    petId: doc.petId as string | undefined,
    type: doc.type as Reminder['type'],
    title: doc.title as string,
    dueDate: doc.dueDate as string,
    recurrence: doc.recurrence as Reminder['recurrence'],
    status: doc.status as Reminder['status'],
    createdAt: (doc.createdAt as Date)?.toISOString(),
    updatedAt: (doc.updatedAt as Date)?.toISOString(),
  };
}

export class ReminderRepository {
  async findByUserId(userId: string): Promise<Reminder[]> {
    const docs = await ReminderModel.find({ userId }).sort({ dueDate: 1 }).lean();
    return docs.map((d) => toReminder(d as Record<string, unknown>));
  }

  async findById(id: string, userId: string): Promise<Reminder | null> {
    const doc = await ReminderModel.findOne({ _id: id, userId }).lean();
    if (!doc) return null;
    return toReminder(doc as Record<string, unknown>);
  }

  async create(data: Omit<Reminder, 'id'>): Promise<Reminder> {
    const doc = await ReminderModel.create(data);
    return toReminder(doc.toObject() as unknown as Record<string, unknown>);
  }

  async update(id: string, userId: string, data: Partial<Reminder>): Promise<Reminder | null> {
    const doc = await ReminderModel.findOneAndUpdate(
      { _id: id, userId },
      { $set: data },
      { new: true },
    ).lean();
    if (!doc) return null;
    return toReminder(doc as Record<string, unknown>);
  }

  async delete(id: string, userId: string): Promise<boolean> {
    const result = await ReminderModel.deleteOne({ _id: id, userId });
    return (result.deletedCount ?? 0) > 0;
  }
}

export const reminderRepository = new ReminderRepository();
