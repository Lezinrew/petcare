import { useParams } from 'react-router-dom';
import { BreedHero } from '../components/animal/BreedHero';
import { BreedStatsBar } from '../components/animal/BreedStatsBar';
import { CareInfoCard } from '../components/animal/CareInfoCard';
import { ButtonLink } from '../components/ui/ButtonLink';
import { ErrorState } from '../components/ui/ErrorState';
import { LoadingState } from '../components/ui/LoadingState';
import { getCategoryByRoute, SpeciesRouteKey } from '../config/species';
import { useAsync } from '../hooks/useAsync';
import { fetchBreedBySlug } from '../services/animals.service';

export function BreedDetailPage() {
  const { speciesKey, slug } = useParams<{ speciesKey: SpeciesRouteKey; slug: string }>();
  const category = speciesKey ? getCategoryByRoute(speciesKey) : undefined;

  const { data: breed, loading, error, refetch } = useAsync(
    () => fetchBreedBySlug(speciesKey!, slug!),
    [speciesKey, slug],
  );

  if (!category) {
    return (
      <div className="page-container">
        <ErrorState message="Categoria não encontrada" />
      </div>
    );
  }

  if (loading) return <div className="page-container"><LoadingState /></div>;
  if (error || !breed) {
    return (
      <div className="page-container">
        <ErrorState message={error ?? 'Ficha não encontrada'} onRetry={refetch} />
      </div>
    );
  }

  const { care } = breed;

  return (
    <div className="page-container space-y-6">
      <div className="flex flex-wrap items-center gap-2">
        <ButtonLink to={`/${speciesKey}`} variant="ghost-primary" size="sm">
          ← Voltar
        </ButtonLink>
        <ButtonLink
          href={`/generated/pets/${speciesKey}/${breed.slug}.html`}
          target="_blank"
          rel="noopener noreferrer"
          variant="outline"
          size="sm"
        >
          Abrir versão HTML
        </ButtonLink>
      </div>

      <BreedHero breed={breed} />
      <BreedStatsBar breed={breed} />

      <div className="grid gap-4 md:grid-cols-2">
        <CareInfoCard title="Alimentação" icon="🍖" color="text-feeding" borderColor="border-feeding">
          <p><strong>Quantidade:</strong> {care.feeding.dailyAmount}</p>
          <p><strong>Refeições:</strong> {care.feeding.mealsPerDay}</p>
          <p><strong>Proibidos:</strong> {care.feeding.forbiddenFoods.join(', ')}</p>
          <p><strong>Necessidades:</strong> {care.feeding.specialNeeds}</p>
        </CareInfoCard>

        <CareInfoCard title="Hidratação" icon="💧" color="text-hydration" borderColor="border-hydration">
          <p><strong>Água:</strong> {care.hydration.waterAmount}</p>
          <p><strong>Sinais de alerta:</strong></p>
          <ul className="list-inside list-disc">
            {care.hydration.dehydrationSigns.map((s) => <li key={s}>{s}</li>)}
          </ul>
        </CareInfoCard>

        <CareInfoCard title="Exercícios" icon="🏃" color="text-exercise" borderColor="border-exercise">
          <p><strong>Atividade:</strong> {care.exercise.dailyWalkTime}</p>
          <p><strong>Energia:</strong> {care.exercise.energyLevel}</p>
          <p><strong>Atividades:</strong></p>
          <ul className="list-inside list-disc">
            {care.exercise.recommendedActivities.map((a) => <li key={a}>{a}</li>)}
          </ul>
        </CareInfoCard>

        <CareInfoCard
          title="Saúde"
          icon="❤️"
          color="text-health"
          borderColor="border-health"
          disclaimer="Informação educativa. Não substitui orientação veterinária."
        >
          <p><strong>Peso ideal:</strong> {care.health.idealWeight}</p>
          <p><strong>Vacinas / prevenção:</strong> {care.health.vaccines.join(', ')}</p>
          <p><strong>Doenças comuns:</strong> {care.health.commonDiseases.join(', ')}</p>
        </CareInfoCard>

        <CareInfoCard title="Higiene" icon="🛁" color="text-hygiene" borderColor="border-hygiene">
          <p><strong>Banho / limpeza:</strong> {care.hygiene.bathFrequency}</p>
          <p><strong>Pelagem / ambiente:</strong> {care.hygiene.coatCare}</p>
        </CareInfoCard>

        <CareInfoCard title="Comportamento" icon="🎾" color="text-behavior" borderColor="border-behavior">
          <p><strong>Temperamento:</strong> {care.behavior.temperament}</p>
          <p><strong>Treinamento:</strong> {care.behavior.trainability}</p>
          <p><strong>Sociabilidade:</strong> {care.behavior.sociability}</p>
          <p><strong>Outros animais:</strong> {care.behavior.otherAnimals}</p>
        </CareInfoCard>

        <CareInfoCard title="Ambiente" icon="🏡" color="text-environment" borderColor="border-environment">
          <p><strong>Espaço:</strong> {care.environment.recommendedSpace}</p>
          <p><strong>Apartamento:</strong> {care.environment.canLiveInApartment}</p>
          <p><strong>Clima:</strong> {care.environment.climateSensitivity}</p>
          <p><strong>Quintal / externo:</strong> {care.environment.backyardNeed}</p>
        </CareInfoCard>

        <CareInfoCard title="Reprodução e crescimento" icon="📏" color="text-primary" borderColor="border-primary">
          <p><strong>Tamanho adulto:</strong> {care.growth.adultSize}</p>
          <p><strong>Fase adulta:</strong> {care.growth.adultAge}</p>
        </CareInfoCard>
      </div>

      <CareInfoCard title="Curiosidades" icon="✨" color="text-primary" borderColor="border-primary">
        <ul className="list-inside list-disc">
          {care.curiosities.map((c) => <li key={c}>{c}</li>)}
        </ul>
      </CareInfoCard>
    </div>
  );
}
