import { Link } from 'react-router-dom';
import { Card } from '../components/ui/Card';
import { ButtonLink } from '../components/ui/ButtonLink';
import { TOTAL_BREEDS } from '../config/species';

const navCards = [
  { to: '/explore', title: 'Explorar Pets', desc: `${TOTAL_BREEDS} raças e espécies catalogadas`, icon: '🔍', color: 'from-primary to-primary-dark' },
  { to: '/my-pets', title: 'Meu Pet', desc: 'Cadastre e organize seus pets', icon: '🐾', color: 'from-feeding to-environment' },
  { to: '/reminders', title: 'Lembretes', desc: 'Vacinas, banho, consultas e mais', icon: '🔔', color: 'from-behavior to-exercise' },
  { to: '/adoption-match', title: 'Adoção responsável', desc: 'Descubra qual raça combina com você', icon: '❤️', color: 'from-health to-exercise' },
];

const stats = [
  { value: String(TOTAL_BREEDS), label: 'Raças catalogadas' },
  { value: '6', label: 'Tipos de pets' },
  { value: 'PWA', label: 'Instalável no celular' },
];

export function HomePage() {
  return (
    <div className="page-container">
      <section className="hero-gradient relative mb-8 overflow-hidden rounded-2xl p-6 text-white shadow-soft md:p-10">
        <div className="relative z-10">
          <p className="text-sm font-medium tracking-wide text-primary-light/90">PetCare Responsável</p>
          <h1 className="mt-2 text-3xl font-bold leading-tight tracking-tight md:text-4xl">
            Conheça melhor. Cuide melhor. Abandone menos.
          </h1>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-primary-light/95">
            Ajudamos tutores a entenderem as necessidades de cada raça, organizarem rotinas de cuidado
            e tomarem decisões mais conscientes sobre adoção.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <ButtonLink to="/explore" variant="inverse" size="lg">
              Explorar pets
            </ButtonLink>
            <ButtonLink to="/adoption-match" variant="glass" size="lg">
              Simular adoção
            </ButtonLink>
          </div>
        </div>
        <div className="pointer-events-none absolute -right-6 -top-6 text-[8rem] opacity-10 md:text-[10rem]">
          🐾
        </div>
      </section>

      <div className="mb-8 grid grid-cols-3 gap-3">
        {stats.map((stat) => (
          <div key={stat.label} className="stat-tile">
            <p className="text-xl font-bold text-primary md:text-2xl">{stat.value}</p>
            <p className="mt-1 text-xs text-text-secondary md:text-sm">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="mb-8 grid gap-4 sm:grid-cols-2">
        {navCards.map((card) => (
          <Link key={card.to} to={card.to} className="group block">
            <Card interactive className="h-full">
              <div
                className={`mb-3 inline-flex rounded-xl bg-gradient-to-br ${card.color} p-3 text-2xl text-white shadow-soft`}
              >
                {card.icon}
              </div>
              <h2 className="text-lg font-semibold transition-colors group-hover:text-primary">{card.title}</h2>
              <p className="mt-1 text-sm text-text-secondary">{card.desc}</p>
            </Card>
          </Link>
        ))}
      </div>

      <section className="mb-8">
        <h2 className="mb-4 text-xl font-bold tracking-tight">Por que isso importa?</h2>
        <Card>
          <p className="leading-relaxed text-text-secondary">
            Muitos animais são abandonados por falta de informação antes da adoção ou compra.
            Cada raça tem necessidades diferentes de espaço, energia, cuidados de saúde e convivência.
            Com informação clara e rotina organizada, você cuida melhor do seu pet e reduz riscos de abandono.
          </p>
          <p className="mt-3 text-sm font-medium text-primary">
            O app transforma informação em cuidado prático.
          </p>
        </Card>
      </section>

      <aside className="disclaimer-banner">
        ⚕️ Este app oferece informações educativas e <strong>não substitui orientação veterinária</strong>.
      </aside>
    </div>
  );
}
