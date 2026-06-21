import { Button } from './Button';

type Props = {
  message?: string;
  onRetry?: () => void;
};

export function ErrorState({ message = 'Algo deu errado.', onRetry }: Props) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="mb-4 text-4xl">😿</div>
      <p className="text-text-secondary">{message}</p>
      {onRetry && (
        <Button variant="secondary" className="mt-4" onClick={onRetry}>
          Tentar novamente
        </Button>
      )}
    </div>
  );
}
