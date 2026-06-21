import { Link } from 'react-router-dom';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { TOTAL_BREEDS } from '../config/species';

const navCards = [
  { to: '/explore', title: 'Explorar Pets', desc: `${TOTAL_BREEDS} raças e espécies catalogadas`, icon: '🔍', color: 'from-primary to-blue-700' },
  { to: '/my-pets', title: 'Meu Pet', desc: 'Cadastre e organize seus pets', icon: '🐾', color: 'from-feeding to-green-700' },
  { to: '/reminders', title: 'Lembretes', desc: 'Vacinas, banho, consultas e mais', icon: '🔔', color: 'from-behavior to-yellow-700' },
  { to: '/adoption-match', title: 'Adoção responsável', desc: 'Descubra qual raça combina com você', icon: '❤️', color: 'from-health to-red-700' },
];

const stats = [
  { value: String(TOTAL_BREEDS), label: 'Raças catalogadas' },
  { value: '6', label: 'Tipos de pets' },
  { value: 'PWA', label: 'Instalável no celular' },
];

export function HomePage() {
  return (
    <div className="page-container">
      <section className="hero-gradient mb-8 overflow-hidden rounded-2xl p-6 text-white md:p-10">
        <div className="relative z-10">
          <p className="text-sm font-medium tracking-wide text-primary-light/90">PetCare Responsável</p>
          <h1 className="mt-2 text-3xl font-bold leading-tight md:text-4xl">
            Conheça melhor. Cuide melhor. Abandone menos.
          </h1>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-primary-light">
            Ajudamos tutores a entenderem as necessidades de cada raça, organizarem rotinas de cuidado
            e tomarem decisões mais conscientes sobre adoção.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link to="/explore">
              <Button className="bg-white text-primary hover:bg-primary-light">
                Explorar pets
              </Button>
            </Link>
            <Link to="/adoption-match">
              <Button variant="secondary" className="border border-white/30 bg-white/10 text-white hover:bg-white/20">
                Simular adoção
              </Button>
            </Link>
          </div>
        </div>
        <div className="pointer-events-none absolute -right-6 -top-6 text-[8rem] opacity-10 md:text-[10rem]">
          🐾
        </div>
      </section>

      <div className="mb-8 grid grid-cols-3 gap-3">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-xl border border-slate-200 bg-white px-3 py-4 text-center shadow-sm"
          >
            <p className="text-xl font-bold text-primary md:text-2xl">{stat.value}</p>
            <p className="mt-1 text-xs text-text-secondary md:text-sm">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="mb-8 grid gap-4 sm:grid-cols-2">
        {navCards.map((card) => (
          <Link key={card.to} to={card.to} className="group">
            <Card className="h-full transition-all duration-200 group-hover:-translate-y-0.5 group-hover:shadow-md">
              <div className={`mb-3 inline-flex rounded-xl bg-gradient-to-br ${card.color} p-3 text-2xl text-white shadow-sm`}>
                {card.icon}
              </div>
              <h2 className="text-lg font-semibold group-hover:text-primary">{card.title}</h2>
              <p className="mt-1 text-sm text-text-secondary">{card.desc}</p>
            </Card>
          </Link>
        ))}
      </div>

      <section className="mb-8">
        <h2 className="mb-4 text-xl font-bold">Por que isso importa?</h2>
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

      <aside className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm leading-relaxed text-amber-900">
        ⚕️ Este app oferece informações educativas e <strong>não substitui orientação veterinária</strong>.
      </aside>
    </div>
  );
}
