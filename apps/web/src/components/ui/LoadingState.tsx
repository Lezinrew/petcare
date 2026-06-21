export function LoadingState({ message = 'Carregando...' }: { message?: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary-light border-t-primary" />
      <p className="mt-4 text-text-secondary">{message}</p>
    </div>
  );
}
