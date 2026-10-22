/** Purple-tinted landscape thumbnail (map pins, phone cards). */
export function Landscape({ v = 0, className = 'h-full w-full' }: { v?: number; className?: string }) {
  const bg = ['#EDE8F5', '#E2D9EE', '#F6F3FA'][v % 3];
  return (
    <svg viewBox="0 0 100 100" className={className} preserveAspectRatio="xMidYMid slice" aria-hidden>
      <rect width="100" height="100" fill={bg} />
      <circle cx={20 + ((v * 13) % 60)} cy="26" r={v % 2 ? 9 : 12} fill="#FFFFFF" opacity=".9" />
      <path d={`M0 72 L${25 + (v % 3) * 8} 38 L${52 + (v % 2) * 10} 72 Z`} fill="#8C7DAA" />
      <path d="M30 76 L68 32 L108 76 Z" fill="#5A437E" />
      <path d="M0 100 V78 Q50 62 100 80 V100Z" fill="#0A0A0F" />
      {v % 2 === 0 && <path d="M72 82 l5-14 5 14z M80 82 l4-10 4 10z" fill="#FFFFFF" opacity=".6" />}
    </svg>
  );
}

/** Cartoon avatar with black & purple palette. */
export function Avatar({ v = 0, className = 'h-full w-full' }: { v?: number; className?: string }) {
  const skin = ['#EAE4F4', '#DDD4EB', '#F5F1FA', '#D4C8E6'][v % 4];
  const hair = ['#0A0A0F', '#26262F', '#4C1D95', '#1A1A22'][(v + 1) % 4];
  const bg = ['#F7F6FA', '#EBE5F5', '#FAF8FC'][v % 3];
  const shirt = ['#0A0A0F', '#4C1D95', '#26262F'][v % 3];

  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden>
      <rect width="100" height="100" fill={bg} />
      <path d="M12 100 Q50 58 88 100Z" fill={shirt} />
      <circle cx="50" cy="46" r="19" fill={skin} />
      {v % 2 ? (
        <path d="M30 46 Q30 22 50 24 Q70 22 70 46 Q62 34 50 36 Q38 34 30 46Z" fill={hair} />
      ) : (
        <>
          <path d="M30 44 Q32 20 50 22 Q68 20 70 44 Q60 30 50 32 Q40 30 30 44Z" fill={hair} />
          <circle cx="50" cy="19" r="7" fill={hair} />
        </>
      )}
      <circle cx="43" cy="48" r="1.8" fill="#0A0A0F" />
      <circle cx="57" cy="48" r="1.8" fill="#0A0A0F" />
      <path d="M44 56 Q50 61 56 56" stroke="#0A0A0F" strokeWidth="1.6" fill="none" strokeLinecap="round" />
    </svg>
  );
}
