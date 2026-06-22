type Props = {
  section: string;
  className?: string;
};

export function CareIllustration({ section, className = 'h-28 w-28' }: Props) {
  const common = `pointer-events-none select-none ${className}`;

  switch (section) {
    case 'feeding':
      return (
        <svg className={common} viewBox="0 0 120 120" fill="none" aria-hidden>
          <ellipse cx="60" cy="98" rx="42" ry="8" fill="#15803D" opacity="0.15" />
          <path d="M28 52c0-8 6-14 14-14h36c8 0 14 6 14 14v28c0 6-5 11-11 11H39c-6 0-11-5-11-11V52z" fill="#22C55E" />
          <path d="M32 56h56v20c0 4-3 7-7 7H39c-4 0-7-3-7-7V56z" fill="#86EFAC" />
          <circle cx="48" cy="66" r="5" fill="#15803D" opacity="0.5" />
          <circle cx="62" cy="70" r="4" fill="#15803D" opacity="0.4" />
          <circle cx="74" cy="64" r="5" fill="#15803D" opacity="0.45" />
        </svg>
      );
    case 'hydration':
      return (
        <svg className={common} viewBox="0 0 120 120" fill="none" aria-hidden>
          <ellipse cx="60" cy="98" rx="38" ry="7" fill="#0284C7" opacity="0.15" />
          <path d="M60 18c12 18 28 36 28 54a28 28 0 11-56 0c0-18 16-36 28-54z" fill="#38BDF8" />
          <path d="M60 32c8 12 18 24 18 38a18 18 0 11-36 0c0-14 10-26 18-38z" fill="#7DD3FC" opacity="0.8" />
          <ellipse cx="60" cy="88" rx="22" ry="6" fill="#0EA5E9" opacity="0.35" />
        </svg>
      );
    case 'exercise':
      return (
        <svg className={common} viewBox="0 0 120 120" fill="none" aria-hidden>
          <ellipse cx="60" cy="98" rx="40" ry="8" fill="#EA580C" opacity="0.12" />
          <path d="M24 58c8-10 20-14 32-10 6 2 10 6 14 10 4-14 16-22 30-18 10 3 16 12 16 22" stroke="#F97316" strokeWidth="8" strokeLinecap="round" />
          <circle cx="24" cy="58" r="7" fill="#FB923C" />
          <circle cx="116" cy="62" r="7" fill="#FB923C" />
          <path d="M52 44l8 10 10-16" stroke="#EA580C" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case 'health':
      return (
        <svg className={common} viewBox="0 0 120 120" fill="none" aria-hidden>
          <rect x="30" y="36" width="60" height="52" rx="10" fill="#EF4444" />
          <rect x="36" y="42" width="48" height="40" rx="6" fill="#FEE2E2" />
          <path d="M60 50v24M48 62h24" stroke="#DC2626" strokeWidth="5" strokeLinecap="round" />
          <rect x="54" y="28" width="12" height="14" rx="3" fill="#B91C1C" />
        </svg>
      );
    case 'hygiene':
      return (
        <svg className={common} viewBox="0 0 120 120" fill="none" aria-hidden>
          <rect x="34" y="44" width="28" height="48" rx="6" fill="#A78BFA" />
          <rect x="38" y="48" width="20" height="36" rx="4" fill="#DDD6FE" />
          <ellipse cx="78" cy="72" rx="16" ry="22" fill="#7C3AED" opacity="0.85" />
          <ellipse cx="78" cy="68" rx="10" ry="14" fill="#C4B5FD" />
          <circle cx="48" cy="38" r="8" fill="#8B5CF6" />
        </svg>
      );
    case 'behavior':
      return (
        <svg className={common} viewBox="0 0 120 120" fill="none" aria-hidden>
          <ellipse cx="60" cy="98" rx="36" ry="7" fill="#D97706" opacity="0.15" />
          <circle cx="60" cy="52" r="24" fill="#F59E0B" />
          <path d="M36 44c-8-4-14 2-12 10 2 6 8 8 12 6M84 44c8-4 14 2 12 10-2 6-8 8-12 6" fill="#D97706" />
          <circle cx="50" cy="50" r="3" fill="#fff" />
          <circle cx="70" cy="50" r="3" fill="#fff" />
          <ellipse cx="60" cy="58" rx="6" ry="4" fill="#B45309" />
          <path d="M48 68c4 6 20 6 24 0" stroke="#B45309" strokeWidth="3" strokeLinecap="round" />
        </svg>
      );
    case 'environment':
      return (
        <svg className={common} viewBox="0 0 120 120" fill="none" aria-hidden>
          <path d="M24 68h72v28H24V68z" fill="#166534" />
          <path d="M60 24L24 68h72L60 24z" fill="#22C55E" />
          <rect x="50" y="76" width="20" height="20" rx="2" fill="#86EFAC" />
          <rect x="34" y="52" width="14" height="10" rx="2" fill="#BBF7D0" />
          <rect x="72" y="52" width="14" height="10" rx="2" fill="#BBF7D0" />
        </svg>
      );
    case 'growth':
      return (
        <svg className={common} viewBox="0 0 120 120" fill="none" aria-hidden>
          <line x1="36" y1="92" x2="36" y2="28" stroke="#0284C7" strokeWidth="3" strokeLinecap="round" />
          <line x1="30" y1="40" x2="42" y2="40" stroke="#0284C7" strokeWidth="3" strokeLinecap="round" />
          <line x1="30" y1="58" x2="42" y2="58" stroke="#0284C7" strokeWidth="3" strokeLinecap="round" />
          <line x1="30" y1="76" x2="42" y2="76" stroke="#0284C7" strokeWidth="3" strokeLinecap="round" />
          <ellipse cx="72" cy="88" rx="22" ry="8" fill="#0EA5E9" opacity="0.2" />
          <circle cx="72" cy="62" r="18" fill="#38BDF8" />
          <path d="M58 58c-4-6-2-14 6-16 6-2 12 2 14 8" stroke="#0284C7" strokeWidth="4" strokeLinecap="round" />
        </svg>
      );
    case 'curiosities':
      return (
        <svg className={common} viewBox="0 0 120 120" fill="none" aria-hidden>
          <path d="M60 20c-16 0-28 12-28 28 0 10 5 19 13 24l-3 18 18-8c3 1 6 1 10 1 16 0 28-12 28-28S76 20 60 20z" fill="#F59E0B" />
          <path d="M60 36c-6 0-10 4-10 10h6c0-2 2-4 4-4s4 2 4 4c0 4-8 4-8 12h6c0-6 8-6 8-12 0-6-4-10-10-10z" fill="#FFFBEB" />
          <rect x="56" y="72" width="8" height="10" rx="2" fill="#FFFBEB" />
          <path d="M78 24c4 2 8 6 10 10" stroke="#FBBF24" strokeWidth="3" strokeLinecap="round" />
          <path d="M88 38c2 4 2 8 0 12" stroke="#FBBF24" strokeWidth="3" strokeLinecap="round" />
        </svg>
      );
    default:
      return null;
  }
}
