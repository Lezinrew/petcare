type Props = {
  title: string;
  icon: string;
  color: string;
  borderColor: string;
  children: React.ReactNode;
  disclaimer?: string;
};

export function CareInfoCard({ title, icon, color, borderColor, children, disclaimer }: Props) {
  return (
    <div className={`rounded-2xl border-l-4 bg-white p-4 shadow-sm ${borderColor}`}>
      <div className="mb-3 flex items-center gap-2">
        <span className="text-xl">{icon}</span>
        <h3 className={`text-lg font-semibold ${color}`}>{title}</h3>
      </div>
      <div className="space-y-2 text-sm text-text-secondary">{children}</div>
      {disclaimer && (
        <p className="mt-3 rounded-lg bg-red-50 p-2 text-xs text-health">{disclaimer}</p>
      )}
    </div>
  );
}
