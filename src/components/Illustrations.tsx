/** Grayscale landscape thumbnail (map pins, phone cards). */
export function Landscape({ v = 0, className = 'h-full w-full' }: { v?: number; className?: string }) {
  const bg = ['#E5E7EB', '#D4D4D8', '#F1F1F3'][v % 3];
  return (
    <svg viewBox="0 0 100 100" className={className} preserveAspectRatio="xMidYMid slice" aria-hidden>
      <rect width="100" height="100" fill={bg} />
      <circle cx={20 + ((v * 13) % 60)} cy="26" r={v % 2 ? 9 : 12} fill="#fff" opacity=".9" />
      <path d={`M0 72 L${25 + (v % 3) * 8} 38 L${52 + (v % 2) * 10} 72 Z`} fill="#6B7280" />
      <path d="M30 76 L68 32 L108 76 Z" fill="#374151" />
      <path d="M0 100 V78 Q50 62 100 80 V100Z" fill="#0A0A0A" />
      {v % 2 === 0 && <path d="M72 82 l5-14 5 14z M80 82 l4-10 4 10z" fill="#fff" opacity=".6" />}
    </svg>
  );
}
/** Grayscale cartoon avatar. */
export function Avatar({ v = 0, className = 'h-full w-full' }: { v?: number; className?: string }) {
  const skin = ['#E4E4E7', '#D4D4D8', '#F4F4F5', '#C7C7CC'][v % 4];
  const hair = ['#0A0A0A', '#3F3F46', '#52525B', '#18181B'][(v + 1) % 4];
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden>
      <rect width="100" height="100" fill={['#F4F4F5', '#E5E7EB', '#FAFAFA'][v % 3]} />
      <path d="M12 100 Q50 58 88 100Z" fill={['#0A0A0A', '#52525B', '#A1A1AA'][v % 3]} />
      <circle cx="50" cy="46" r="19" fill={skin} />
      {v % 2 ? <path d="M30 46 Q30 22 50 24 Q70 22 70 46 Q62 34 50 36 Q38 34 30 46Z" fill={hair} />
        : <><path d="M30 44 Q32 20 50 22 Q68 20 70 44 Q60 30 50 32 Q40 30 30 44Z" fill={hair} /><circle cx="50" cy="19" r="7" fill={hair} /></>}
      <circle cx="43" cy="48" r="1.8" fill="#0A0A0A" /><circle cx="57" cy="48" r="1.8" fill="#0A0A0A" />
      <path d="M44 56 Q50 61 56 56" stroke="#0A0A0A" strokeWidth="1.6" fill="none" strokeLinecap="round" />
    </svg>
  );
}
