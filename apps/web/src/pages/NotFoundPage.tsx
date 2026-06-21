import { ButtonLink } from '../components/ui/ButtonLink';

export function NotFoundPage() {
  return (
    <div className="page-container flex flex-col items-center justify-center py-20 text-center">
      <span className="text-6xl">🐾</span>
      <h1 className="mt-4 text-2xl font-bold tracking-tight">Página não encontrada</h1>
      <p className="mt-2 text-text-secondary">A página que você procura não existe.</p>
      <ButtonLink to="/" className="mt-6">
        Voltar ao início
      </ButtonLink>
    </div>
  );
}
