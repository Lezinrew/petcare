import { FormEvent, useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { PageHeader } from '../components/layout/PageHeader';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { ErrorState } from '../components/ui/ErrorState';
import { Input } from '../components/ui/Input';
import { LoadingState } from '../components/ui/LoadingState';
import { clearAdminToken, getAdminToken, loginAdmin, setAdminToken } from '../services/adminAuth.service';
import { fetchAnalyticsSummary } from '../services/analytics.service';
import { ApiClientError } from '../services/api';
import { AnalyticsSummary, CountMetric, DeviceType } from '../types/analytics';

function formatDate(value?: string) {
  if (!value) return 'Sem acesso recente';
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(value));
}

function pageLabel(path: string, title?: string) {
  if (path === '/') return 'Home';
  if (path === '/admin') return 'Admin';
  if (path === '/privacidade') return 'Privacidade';
  if (title && title !== 'PetCare Responsável') return title;
  return path.replace(/^\//, '').replaceAll('-', ' ') || 'Home';
}

const countryNames: Record<string, string> = {
  BR: 'Brasil',
  PT: 'Portugal',
  US: 'Estados Unidos',
  AR: 'Argentina',
  MX: 'México',
};

function countryLabel(code: string) {
  return countryNames[code] ?? code;
}

function areaLabel(countryCode: string, region?: string) {
  const country = countryLabel(countryCode);
  if (!region) return country;
  return `${region}, ${country}`;
}

function deviceLabel(deviceType: DeviceType) {
  const labels: Record<DeviceType, string> = {
    mobile: 'Celular',
    tablet: 'Tablet',
    desktop: 'Computador',
    unknown: 'Não identificado',
  };
  return labels[deviceType];
}

const speciesLabels: Record<string, string> = {
  dogs: 'Cães',
  cats: 'Gatos',
  fish: 'Peixes',
  hamsters: 'Hamsters',
  birds: 'Aves',
  rabbits: 'Coelhos',
  turtles: 'Tartarugas',
  twisters: 'Twisters',
  'guinea-pigs': 'Porquinhos-da-índia',
  chinchillas: 'Chinchilas',
  gerbils: 'Gerbos',
  ferrets: 'Furões',
  lizards: 'Lagartos',
};

function speciesLabel(key: string) {
  return speciesLabels[key] ?? key;
}

function MetricBarList({
  items,
  emptyMessage,
  formatLabel,
}: {
  items: CountMetric[];
  emptyMessage: string;
  formatLabel?: (label: string) => string;
}) {
  const activeItems = items.filter((item) => item.views > 0);
  const maxViews = Math.max(...activeItems.map((item) => item.views), 1);

  if (activeItems.length === 0) {
    return <Card className="p-5 text-text-secondary">{emptyMessage}</Card>;
  }

  return (
    <div className="overflow-hidden rounded-lg border border-border bg-card shadow-soft">
      {activeItems.map((item) => (
        <div key={item.label} className="border-b border-border px-4 py-3 last:border-b-0">
          <div className="mb-1 flex items-center justify-between gap-2 text-sm">
            <span className="font-medium text-brand">{formatLabel ? formatLabel(item.label) : item.label}</span>
            <span className="font-bold text-brand">{item.views}</span>
          </div>
          <div className="h-2 rounded-full bg-muted">
            <div
              className="h-2 rounded-full bg-primary/70"
              style={{ width: `${Math.round((item.views / maxViews) * 100)}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export function AdminPage() {
  const [summary, setSummary] = useState<AnalyticsSummary | null>(null);
  const [loading, setLoading] = useState(() => Boolean(getAdminToken()));
  const [error, setError] = useState<string | null>(null);
  const [needsAuth, setNeedsAuth] = useState(() => !getAdminToken());
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState<string | null>(null);
  const [loggingIn, setLoggingIn] = useState(false);

  const load = async () => {
    if (!getAdminToken()) {
      setNeedsAuth(true);
      setSummary(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);
    try {
      setSummary(await fetchAnalyticsSummary());
      setNeedsAuth(false);
    } catch (err) {
      if (err instanceof ApiClientError && err.status === 401) {
        clearAdminToken();
        setNeedsAuth(true);
        setSummary(null);
      } else {
        setError(err instanceof Error ? err.message : 'Erro ao carregar métricas');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (event: FormEvent) => {
    event.preventDefault();
    setLoggingIn(true);
    setLoginError(null);
    try {
      const session = await loginAdmin(password);
      setAdminToken(session);
      setPassword('');
      await load();
    } catch (err) {
      setLoginError(err instanceof Error ? err.message : 'Não foi possível entrar');
    } finally {
      setLoggingIn(false);
    }
  };

  const handleLogout = () => {
    clearAdminToken();
    setSummary(null);
    setNeedsAuth(true);
    setError(null);
  };

  useEffect(() => {
    if (!getAdminToken()) {
      setNeedsAuth(true);
      setLoading(false);
      return;
    }
    void load();
  }, []);

  const mostViewed = useMemo(() => summary?.topPages[0], [summary]);
  const totalDeviceViews = useMemo(
    () => summary?.deviceBreakdown.reduce((acc, item) => acc + item.views, 0) ?? 0,
    [summary],
  );

  return (
    <div className="page-container">
      <PageHeader
        backTo="/"
        backLabel="← Início"
        title="Admin"
        subtitle="Métricas locais de visualização, perfil de dispositivo e interesse por região."
      />

      {needsAuth && !loading && (
        <Card className="mx-auto max-w-md p-5">
          <h2 className="text-lg font-bold text-brand">Acesso administrativo</h2>
          <p className="mt-1 text-sm text-text-secondary">
            Esta área é restrita. Digite a senha configurada no servidor para ver as métricas.
          </p>
          <form className="mt-4 space-y-4" onSubmit={handleLogin}>
            <Input
              label="Senha"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              error={loginError ?? undefined}
            />
            <Button type="submit" fullWidth disabled={loggingIn || !password}>
              {loggingIn ? 'Entrando...' : 'Entrar'}
            </Button>
          </form>
        </Card>
      )}

      {loading && <LoadingState message="Carregando métricas..." />}
      {error && <ErrorState message={error} onRetry={load} />}

      {!loading && !error && !needsAuth && summary && (
        <div className="space-y-6">
          <div className="flex justify-end">
            <Button variant="secondary" size="sm" onClick={handleLogout}>
              Sair
            </Button>
          </div>
          <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
            <Card className="p-4">
              <p className="text-sm font-semibold text-text-secondary">Visualizações</p>
              <p className="mt-2 text-3xl font-bold text-brand">{summary.totalViews}</p>
            </Card>
            <Card className="p-4">
              <p className="text-sm font-semibold text-text-secondary">Visitantes únicos</p>
              <p className="mt-2 text-3xl font-bold text-brand">{summary.engagement.uniqueVisitors}</p>
            </Card>
            <Card className="p-4">
              <p className="text-sm font-semibold text-text-secondary">Sessões estimadas</p>
              <p className="mt-2 text-3xl font-bold text-brand">{summary.engagement.estimatedSessions}</p>
            </Card>
            <Card className="p-4">
              <p className="text-sm font-semibold text-text-secondary">Páginas / sessão</p>
              <p className="mt-2 text-3xl font-bold text-brand">{summary.engagement.avgPagesPerSession}</p>
            </Card>
            <Card className="p-4">
              <p className="text-sm font-semibold text-text-secondary">Páginas medidas</p>
              <p className="mt-2 text-3xl font-bold text-brand">{summary.uniquePages}</p>
            </Card>
            <Card className="p-4">
              <p className="text-sm font-semibold text-text-secondary">Mais acessada</p>
              <p className="mt-2 truncate text-xl font-bold text-brand">
                {mostViewed ? pageLabel(mostViewed.path, mostViewed.title) : 'Sem dados'}
              </p>
            </Card>
          </section>

          <section className="grid gap-6 lg:grid-cols-2">
            <div className="space-y-3">
              <div>
                <h2 className="text-xl font-bold text-brand">Horários de pico</h2>
                <p className="text-sm text-text-secondary">Distribuição por hora (fuso America/Sao_Paulo).</p>
              </div>
              <MetricBarList
                items={summary.hourlyBreakdown}
                emptyMessage="Sem dados de horário ainda."
                formatLabel={(hour) => `${hour}h`}
              />
            </div>
            <div className="space-y-3">
              <div>
                <h2 className="text-xl font-bold text-brand">Dias da semana</h2>
                <p className="text-sm text-text-secondary">Em quais dias o app recebe mais navegação.</p>
              </div>
              <MetricBarList items={summary.weekdayBreakdown} emptyMessage="Sem dados por dia da semana ainda." />
            </div>
          </section>

          <section className="grid gap-6 lg:grid-cols-2">
            <div className="space-y-3">
              <div>
                <h2 className="text-xl font-bold text-brand">Espécies mais acessadas</h2>
                <p className="text-sm text-text-secondary">Grupos do catálogo com mais visualizações.</p>
              </div>
              <MetricBarList
                items={summary.speciesBreakdown}
                emptyMessage="Nenhuma ficha de espécie acessada ainda."
                formatLabel={speciesLabel}
              />
            </div>
            <div className="space-y-3">
              <div>
                <h2 className="text-xl font-bold text-brand">Sistema operacional</h2>
                <p className="text-sm text-text-secondary">Derivado do navegador, sem armazenar user-agent completo.</p>
              </div>
              <MetricBarList items={summary.osBreakdown} emptyMessage="Sem dados de sistema operacional ainda." />
            </div>
          </section>

          <section className="grid gap-6 lg:grid-cols-3">
            <div className="space-y-3">
              <div>
                <h2 className="text-xl font-bold text-brand">Origem externa</h2>
                <p className="text-sm text-text-secondary">Sites que enviaram tráfego para o app.</p>
              </div>
              <MetricBarList
                items={summary.externalReferrerBreakdown}
                emptyMessage="Nenhum referrer externo registrado ainda."
              />
            </div>
            <div className="space-y-3">
              <div>
                <h2 className="text-xl font-bold text-brand">UTM source</h2>
                <p className="text-sm text-text-secondary">Campanhas identificadas por utm_source na URL.</p>
              </div>
              <MetricBarList items={summary.utmSourceBreakdown} emptyMessage="Nenhuma UTM source registrada ainda." />
            </div>
            <div className="space-y-3">
              <div>
                <h2 className="text-xl font-bold text-brand">UTM campaign</h2>
                <p className="text-sm text-text-secondary">Campanhas identificadas por utm_campaign na URL.</p>
              </div>
              <MetricBarList items={summary.utmCampaignBreakdown} emptyMessage="Nenhuma UTM campaign registrada ainda." />
            </div>
          </section>

          <section className="grid gap-6 lg:grid-cols-2">
            <div className="space-y-3">
              <div>
                <h2 className="text-xl font-bold text-brand">Acessos por país</h2>
                <p className="text-sm text-text-secondary">
                  Localização aproximada via infraestrutura (sem API externa obrigatória).
                </p>
              </div>
              {summary.geoByCountry.length === 0 ? (
                <Card className="p-5 text-text-secondary">
                  Nenhum país identificado ainda. Em produção, headers como CF-IPCountry preenchem esta seção.
                </Card>
              ) : (
                <div className="overflow-hidden rounded-lg border border-border bg-card shadow-soft">
                  {summary.geoByCountry.map((geo) => (
                    <div
                      key={geo.countryCode}
                      className="flex items-center justify-between gap-3 border-b border-border px-4 py-3 last:border-b-0"
                    >
                      <span className="font-semibold text-brand">{countryLabel(geo.countryCode)}</span>
                      <span className="rounded-full bg-primary-light px-3 py-1 text-sm font-bold text-brand">
                        {geo.views}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="space-y-3">
              <div>
                <h2 className="text-xl font-bold text-brand">Perfil de dispositivo</h2>
                <p className="text-sm text-text-secondary">Distribuição por tipo de aparelho e idioma do navegador.</p>
              </div>
              <Card className="divide-y divide-border p-0">
                {summary.deviceBreakdown.map((device) => (
                  <div key={device.deviceType} className="flex items-center justify-between gap-3 px-4 py-3">
                    <span className="font-semibold text-brand">{deviceLabel(device.deviceType)}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-text-secondary">
                        {totalDeviceViews > 0 ? Math.round((device.views / totalDeviceViews) * 100) : 0}%
                      </span>
                      <span className="rounded-full bg-primary-light px-3 py-1 text-sm font-bold text-brand">
                        {device.views}
                      </span>
                    </div>
                  </div>
                ))}
              </Card>
              {summary.localeBreakdown.length > 0 && (
                <div className="overflow-hidden rounded-lg border border-border bg-card shadow-soft">
                  <div className="border-b border-border bg-muted px-4 py-2 text-xs font-bold uppercase tracking-wide text-text-secondary">
                    Idiomas do navegador
                  </div>
                  {summary.localeBreakdown.map((item) => (
                    <div
                      key={item.locale}
                      className="flex items-center justify-between gap-3 border-b border-border px-4 py-3 last:border-b-0"
                    >
                      <span className="font-medium text-brand">{item.locale}</span>
                      <span className="text-sm font-bold text-brand">{item.views}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>

          <section className="space-y-3">
            <div>
              <h2 className="text-xl font-bold text-brand">Nicho por área</h2>
              <p className="text-sm text-text-secondary">
                Páginas mais acessadas em cada região — útil para priorizar conteúdo local.
              </p>
            </div>
            {summary.areaInsights.length === 0 ? (
              <Card className="p-5 text-text-secondary">Sem dados regionais suficientes para cruzar interesse por área.</Card>
            ) : (
              <div className="grid gap-4 md:grid-cols-2">
                {summary.areaInsights.map((area) => (
                  <Card key={`${area.countryCode}-${area.region ?? 'all'}`} className="p-4">
                    <div className="mb-3 flex items-center justify-between gap-2">
                      <h3 className="font-bold text-brand">{areaLabel(area.countryCode, area.region)}</h3>
                      <span className="rounded-full bg-primary-light px-3 py-1 text-sm font-bold text-brand">
                        {area.views} views
                      </span>
                    </div>
                    <ul className="space-y-2">
                      {area.topPages.map((page) => (
                        <li key={page.path} className="flex items-center justify-between gap-2 text-sm">
                          <Link to={page.path} className="truncate font-medium text-brand hover:underline">
                            {pageLabel(page.path, page.title)}
                          </Link>
                          <span className="shrink-0 text-text-secondary">{page.views}</span>
                        </li>
                      ))}
                    </ul>
                  </Card>
                ))}
              </div>
            )}
          </section>

          <section className="space-y-3">
            <div>
              <h2 className="text-xl font-bold text-brand">Páginas mais acessadas</h2>
              <p className="text-sm text-text-secondary">Ranking agregado a partir dos eventos de navegação do app.</p>
            </div>

            {summary.topPages.length === 0 ? (
              <Card className="p-5 text-text-secondary">Nenhuma visualização registrada ainda.</Card>
            ) : (
              <div className="overflow-hidden rounded-lg border border-border bg-card shadow-soft">
                <div className="grid grid-cols-[1fr_auto_auto] gap-3 border-b border-border bg-muted px-4 py-3 text-xs font-bold uppercase tracking-wide text-text-secondary">
                  <span>Página</span>
                  <span>Views</span>
                  <span>Último acesso</span>
                </div>
                {summary.topPages.map((page) => (
                  <div
                    key={page.path}
                    className="grid grid-cols-[1fr_auto_auto] items-center gap-3 border-b border-border px-4 py-3 last:border-b-0"
                  >
                    <div className="min-w-0">
                      <Link to={page.path} className="block truncate font-semibold text-brand hover:underline">
                        {pageLabel(page.path, page.title)}
                      </Link>
                      <p className="truncate text-xs text-text-secondary">{page.path}</p>
                    </div>
                    <span className="rounded-full bg-primary-light px-3 py-1 text-sm font-bold text-brand">{page.views}</span>
                    <span className="text-sm text-text-secondary">{formatDate(page.lastViewedAt)}</span>
                  </div>
                ))}
              </div>
            )}
          </section>

          <section className="space-y-3">
            <div>
              <h2 className="text-xl font-bold text-brand">Acessos recentes</h2>
              <p className="text-sm text-text-secondary">Últimas páginas registradas nesta base local.</p>
            </div>
            <div className="grid gap-3">
              {summary.recentViews.map((view) => (
                <Card key={view.id} className="flex flex-col gap-2 p-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="min-w-0">
                    <p className="truncate font-semibold text-brand">{pageLabel(view.path, view.title)}</p>
                    <p className="truncate text-xs text-text-secondary">{view.path}</p>
                    {(view.countryCode || view.deviceType) && (
                      <p className="mt-1 text-xs text-text-secondary">
                        {[
                          view.countryCode ? areaLabel(view.countryCode, view.region) : null,
                          view.city,
                          view.deviceType ? deviceLabel(view.deviceType) : null,
                          view.os,
                          view.browser,
                          view.utmSource ? `utm:${view.utmSource}` : null,
                          view.externalReferrer ? `de:${view.externalReferrer}` : null,
                        ]
                          .filter(Boolean)
                          .join(' · ')}
                      </p>
                    )}
                  </div>
                  <span className="shrink-0 text-sm text-text-secondary">{formatDate(view.createdAt)}</span>
                </Card>
              ))}
            </div>
          </section>
        </div>
      )}
    </div>
  );
}
