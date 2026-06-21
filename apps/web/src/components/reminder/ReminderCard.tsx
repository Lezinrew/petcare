import { Reminder } from '../../types/reminder';
import { formatDate, isOverdue, isUpcoming } from '../../utils/formatDate';
import { recurrenceLabels, reminderTypeLabels } from '../../utils/labels';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';

type Props = {
  reminder: Reminder;
  highlight?: boolean;
  onDone: (id: string) => void;
  onEdit: (reminder: Reminder) => void;
  onDelete: (id: string) => void;
};

export function ReminderCard({ reminder, highlight, onDone, onEdit, onDelete }: Props) {
  const overdue = reminder.status === 'pending' && isOverdue(reminder.dueDate);
  const upcoming = reminder.status === 'pending' && isUpcoming(reminder.dueDate);

  return (
    <Card className={`flex flex-col gap-3 ${highlight ? 'ring-2 ring-primary' : ''} ${overdue ? 'border-health/50' : ''}`}>
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-semibold">{reminder.title}</h3>
          <p className="text-sm text-text-secondary">{formatDate(reminder.dueDate)}</p>
        </div>
        <div className="flex flex-col items-end gap-1">
          <Badge color="bg-primary-light text-primary">{reminderTypeLabels[reminder.type]}</Badge>
          {reminder.status === 'done' && <Badge color="bg-green-100 text-feeding">Concluído</Badge>}
          {overdue && <Badge color="bg-red-100 text-health">Atrasado</Badge>}
          {upcoming && !overdue && <Badge color="bg-yellow-100 text-behavior">Próximo</Badge>}
        </div>
      </div>
      <p className="text-xs text-text-secondary">Recorrência: {recurrenceLabels[reminder.recurrence]}</p>
      <div className="flex gap-2">
        {reminder.status === 'pending' && reminder.id && (
          <Button variant="secondary" className="flex-1" onClick={() => onDone(reminder.id!)}>
            Concluir
          </Button>
        )}
        <Button variant="ghost" onClick={() => onEdit(reminder)}>
          Editar
        </Button>
        <Button variant="ghost" className="text-health" onClick={() => reminder.id && onDelete(reminder.id)}>
          Excluir
        </Button>
      </div>
    </Card>
  );
}
