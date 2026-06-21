import { ReminderRecurrence, ReminderType } from '../types/reminder';

export const sizeLabels: Record<string, string> = {
  pequeno: 'Pequeno',
  médio: 'Médio',
  grande: 'Grande',
  gigante: 'Gigante',
};

export const energyLabels: Record<string, string> = {
  baixo: 'Baixo',
  moderado: 'Moderado',
  alto: 'Alto',
  'muito alto': 'Muito alto',
};

export const reminderTypeLabels: Record<ReminderType, string> = {
  vaccine: 'Vacina',
  deworming: 'Vermífugo',
  bath: 'Banho',
  grooming: 'Tosa',
  vet: 'Consulta',
  medicine: 'Medicação',
  walk: 'Passeio',
  food: 'Alimentação',
  other: 'Outro',
};

export const recurrenceLabels: Record<ReminderRecurrence, string> = {
  none: 'Nenhuma',
  daily: 'Diária',
  weekly: 'Semanal',
  monthly: 'Mensal',
  yearly: 'Anual',
};

export const speciesLabels: Record<string, string> = {
  dog: 'Cão',
  cat: 'Gato',
  other: 'Outro',
};

export const sexLabels: Record<string, string> = {
  male: 'Macho',
  female: 'Fêmea',
  unknown: 'Não informado',
};
