export function toISODateString(date: Date): string {
  return date.toISOString().split('T')[0];
}

export function parseDate(value: string): Date {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    throw new Error('Data inválida');
  }
  return date;
}
