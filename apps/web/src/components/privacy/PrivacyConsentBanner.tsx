import { Link } from 'react-router-dom';
import { usePrivacyConsent } from '../../contexts/PrivacyConsentContext';
import { Button } from '../ui/Button';

export function PrivacyConsentBanner() {
  const { status, accept, reject } = usePrivacyConsent();

  if (status !== 'pending') return null;

  return (
    <div
      role="dialog"
      aria-labelledby="privacy-consent-title"
      aria-describedby="privacy-consent-description"
      className="fixed inset-x-0 bottom-[calc(4.5rem+env(safe-area-inset-bottom))] z-[60] px-4 md:bottom-4 md:px-6"
    >
      <div className="mx-auto max-w-3xl rounded-2xl border border-border bg-card p-4 shadow-lg md:p-5">
        <p id="privacy-consent-title" className="text-sm font-bold text-brand">
          Privacidade e métricas de uso
        </p>
        <p id="privacy-consent-description" className="mt-2 text-sm leading-relaxed text-text-secondary">
          Com seu consentimento, coletamos dados técnicos — região aproximada, dispositivo, sistema operacional,
          páginas visitadas, origem de campanhas (UTM) e site externo de referência — para entender o uso do app e
          melhorar o conteúdo educativo. Não vendemos dados nem identificamos você nominalmente. O tratamento segue a{' '}
          <strong className="font-semibold text-brand">Lei Geral de Proteção de Dados (LGPD)</strong>.
        </p>
        <p className="mt-2 text-sm text-text-secondary">
          <Link to="/privacidade" className="font-semibold text-brand underline-offset-2 hover:underline">
            Saiba como tratamos seus dados
          </Link>
        </p>
        <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:justify-end">
          <Button variant="outline" size="sm" onClick={reject} className="sm:min-w-[7.5rem]">
            Recusar
          </Button>
          <Button size="sm" onClick={accept} className="sm:min-w-[7.5rem]">
            Aceitar métricas
          </Button>
        </div>
      </div>
    </div>
  );
}
