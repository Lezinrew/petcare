import { Reminder } from '../../types/reminder';
import { formatDate, isOverdue, isUpcoming } from '../../utils/formatDate';
import { recurrenceLabels, reminderTypeLabels } from '../../utils/labels';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';

type Props = {
  reminder: Reminder;
  petName?: string;
  highlight?: boolean;
  onDone: (id: string) => void;
  onEdit: (reminder: Reminder) => void;
  onDelete: (id: string) => void;
};

export function ReminderCard({ reminder, petName, highlight, onDone, onEdit, onDelete }: Props) {
  const overdue = reminder.status === 'pending' && isOverdue(reminder.dueDate);
  const upcoming = reminder.status === 'pending' && isUpcoming(reminder.dueDate);
  const date = new Date(reminder.dueDate);
  const day = Number.isNaN(date.getTime()) ? '--' : date.toLocaleDateString('pt-BR', { day: '2-digit' });
  const month = Number.isNaN(date.getTime()) ? 'data' : date.toLocaleDateString('pt-BR', { month: 'short' }).replace('.', '');
  const statusLabel = reminder.status === 'done' ? 'Concluído' : overdue ? 'Atrasado' : upcoming ? 'Próximo' : 'Pendente';
  const statusClass = reminder.status === 'done'
    ? 'bg-emerald-50 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-100'
    : overdue
      ? 'bg-red-50 text-red-700 dark:bg-red-950/55 dark:text-red-100'
      : upcoming
        ? 'bg-amber-50 text-amber-800 dark:bg-amber-950/55 dark:text-amber-100'
        : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200';

  return (
    <article
      className={`overflow-hidden rounded-[1.5rem] border bg-white shadow-xs transition-all hover:-translate-y-0.5 hover:shadow-card dark:bg-slate-900/90 ${
        overdue ? 'border-red-200 dark:border-red-800/70' : highlight ? 'border-amber-200 dark:border-amber-700/70' : 'border-slate-100 dark:border-slate-700/80'
      }`}
    >
      <div className="flex gap-4 p-4">
        <div className={`flex h-20 w-16 shrink-0 flex-col items-center justify-center rounded-2xl ${statusClass}`}>
          <span className="text-2xl font-black leading-none">{day}</span>
          <span className="mt-1 text-xs font-bold uppercase tracking-wide">{month}</span>
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <h3 className="truncate font-serif text-xl font-bold text-emerald-950 dark:text-emerald-50">{reminder.title}</h3>
              <p className="mt-1 text-sm font-semibold text-slate-600 dark:text-slate-300">{formatDate(reminder.dueDate)}</p>
            </div>
            <Badge color={statusClass}>{statusLabel}</Badge>
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            <Badge color="bg-[#f3f7f2] text-emerald-900 dark:bg-emerald-950/50 dark:text-emerald-100">{reminderTypeLabels[reminder.type]}</Badge>
            <Badge color="bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200">{recurrenceLabels[reminder.recurrence]}</Badge>
            {petName && (
              <Badge color="bg-sky-50 text-sky-800 dark:bg-sky-950/50 dark:text-sky-100">Pet: {petName}</Badge>
            )}
          </div>
        </div>
      </div>
      <div className="flex flex-wrap gap-2 border-t border-slate-100 bg-slate-50/70 p-3 dark:border-slate-700/80 dark:bg-slate-950/45">
        {reminder.status === 'pending' && reminder.id && (
          <Button variant="secondary" size="sm" className="flex-1 min-w-[7rem]" onClick={() => onDone(reminder.id!)}>
            Concluir
          </Button>
        )}
        <Button variant="ghost" size="sm" onClick={() => onEdit(reminder)}>
          Editar
        </Button>
        <Button variant="danger-ghost" size="sm" onClick={() => reminder.id && onDelete(reminder.id)}>
          Excluir
        </Button>
      </div>
    </article>
  );
}
