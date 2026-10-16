import { Bell, CalendarDays, Compass, Home, Plus, User } from 'lucide-react';
import { content } from '../content';
import { Landscape } from './Illustrations';

/** CSS-built phone showing the JNX app UI. */
export function Phone() {
  const p = content.hero.phone;
  return (
    <div className="relative h-[570px] w-[280px] rounded-[46px] bg-ink p-[10px] shadow-lift" role="img" aria-label="JNX app preview">
      <div className="absolute left-1/2 top-[18px] z-10 h-6 w-24 -translate-x-1/2 rounded-full bg-ink" />
      <div className="flex h-full w-full flex-col overflow-hidden rounded-[37px] bg-white px-4 pb-3 pt-12">
        <div className="flex items-center justify-between"><span className="text-xs font-semibold text-mute">Hi, Alex</span><Bell size={16} /></div>
        <h3 className="mt-2 text-[26px] font-bold leading-[1.05]">{p.title}</h3>
        <p className="mt-4 text-[13px] font-semibold">Recommended</p>
        <div className="mt-2 grid grid-cols-2 gap-2">
          {p.recommended.map((r, i) => (
            <div key={r} className="overflow-hidden rounded-2xl border border-line"><div className="h-20"><Landscape v={i + 1} /></div><p className="px-2 py-1.5 text-[11px] font-semibold">{r}</p></div>
          ))}
        </div>
        <div className="mt-4 flex items-center justify-between rounded-2xl bg-wash p-3">
          <div><p className="text-[13px] font-semibold">{p.schedule}</p><p className="text-[10px] text-mute">{p.scheduleSub}</p></div>
          <span className="rounded-full bg-ink px-3 py-1.5 text-[10px] font-medium text-white">{p.scheduleBtn}</span>
        </div>
        <div className="mt-auto flex items-center justify-between rounded-full border border-line px-4 py-2">
          <Home size={18} /><Compass size={18} className="text-mute" />
          <span className="-my-3 grid h-11 w-11 place-items-center rounded-full bg-ink text-white shadow-card"><Plus size={20} /></span>
          <CalendarDays size={18} className="text-mute" /><User size={18} className="text-mute" />
        </div>
      </div>
    </div>
  );
}
/** Greyscale hand gripping the phone. */
export function Hand() {
  const f = { fill: '#E4E4E7', stroke: '#A1A1AA', strokeWidth: 3 };
  return (
    <svg viewBox="0 0 360 260" className="pointer-events-none absolute -bottom-40 left-1/2 z-20 w-[400px] -translate-x-1/2" aria-hidden style={{ filter: 'grayscale(1)' }}>
      <path d="M70 260 C60 190 80 140 120 122 L240 122 C285 140 300 190 290 260Z" {...f} />
      <rect x="52" y="40" width="46" height="130" rx="23" transform="rotate(-18 75 105)" {...f} />
      {[0, 1, 2].map((i) => <rect key={i} x={262 + i * 2} y={52 + i * 38} width="70" height="34" rx="17" {...f} />)}
    </svg>
  );
}
