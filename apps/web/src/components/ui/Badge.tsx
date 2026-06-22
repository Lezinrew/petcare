type Props = {
  children: React.ReactNode;
  color?: string;
};

export function Badge({ children, color = 'bg-primary-light font-medium text-brand' }: Props) {
  return (
    <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${color}`}>
      {children}
    </span>
  );
}
