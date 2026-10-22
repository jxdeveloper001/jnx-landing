import { Bell, CalendarDays, Compass, Home, Plus, User } from 'lucide-react';
import { content } from '../content';
import { Landscape } from './Illustrations';

/** CSS-built phone showing the JNX app UI with black phone body and purple accents. */
export function Phone() {
  const p = content.hero.phone;
  return (
    <div
      className="relative h-[570px] w-[280px] rounded-[46px] bg-[#0A0A0F] p-[10px] shadow-lift"
      role="img"
      aria-label="JNX app preview"
    >
      <div className="absolute left-1/2 top-[18px] z-10 h-6 w-24 -translate-x-1/2 rounded-full bg-[#0A0A0F]" />
      <div className="flex h-full w-full flex-col overflow-hidden rounded-[37px] bg-white px-4 pb-3 pt-12">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-mute">Hi, Alex</span>
          <Bell size={16} className="text-purple" />
        </div>
        <h3 className="mt-2 text-[26px] font-bold leading-[1.05] text-ink">{p.title}</h3>
        <p className="mt-4 text-[13px] font-semibold text-ink">Recommended</p>
        <div className="mt-2 grid grid-cols-2 gap-2">
          {p.recommended.map((r, i) => (
            <div key={r} className="overflow-hidden rounded-2xl border border-line bg-wash/50">
              <div className="h-20">
                <Landscape v={i + 1} />
              </div>
              <p className="px-2 py-1.5 text-[11px] font-semibold text-ink">{r}</p>
            </div>
          ))}
        </div>
        <div className="mt-4 flex items-center justify-between rounded-2xl bg-wash p-3">
          <div>
            <p className="text-[13px] font-semibold text-ink">{p.schedule}</p>
            <p className="text-[10px] text-mute">{p.scheduleSub}</p>
          </div>
          <span className="btn-black rounded-full px-3 py-1.5 text-[10px] font-medium text-white">
            {p.scheduleBtn}
          </span>
        </div>
        <div className="mt-auto flex items-center justify-between rounded-full border border-line px-4 py-2">
          <Home size={18} className="text-purple" />
          <Compass size={18} className="text-mute" />
          <span className="btn-black -my-3 grid h-11 w-11 place-items-center rounded-full text-white shadow-card">
            <Plus size={20} />
          </span>
          <CalendarDays size={18} className="text-mute" />
          <User size={18} className="text-mute" />
        </div>
      </div>
    </div>
  );
}

/** Black illustrated hand gripping the phone with subtle dark-grey shading and faint rim lines. */
export function Hand() {
  return (
    <svg
      viewBox="0 0 360 260"
      className="pointer-events-none absolute -bottom-40 left-1/2 z-20 w-[400px] -translate-x-1/2"
      aria-hidden
    >
      {/* Palm / base: black #0A0A0F with dark-grey shading #1A1A22 / #26262F */}
      <path
        d="M70 260 C60 190 80 140 120 122 L240 122 C285 140 300 190 290 260Z"
        fill="#0A0A0F"
        stroke="#26262F"
        strokeWidth="3"
      />
      {/* Palm shadow contour */}
      <path
        d="M100 170 C140 160 200 160 240 175"
        stroke="#1A1A22"
        strokeWidth="2.5"
        fill="none"
        opacity="0.8"
      />

      {/* Thumb grasping left side: subtle dark-grey #1A1A22 with #26262F stroke */}
      <rect
        x="52"
        y="40"
        width="46"
        height="130"
        rx="23"
        transform="rotate(-18 75 105)"
        fill="#1A1A22"
        stroke="#26262F"
        strokeWidth="3"
      />
      {/* Thumb inner highlight / knuckle */}
      <path
        d="M66 75 C63 92 65 110 70 128"
        stroke="#26262F"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />
      {/* Faint lighter rim line on thumb edge */}
      <path
        d="M56 54 C54 70 58 92 64 112"
        stroke="rgba(255,255,255,0.18)"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
      />

      {/* Fingers wrapped around right side with subtle dark-grey shading */}
      {/* Index finger: subtle dark-grey #1A1A22 */}
      <rect
        x="262"
        y="52"
        width="70"
        height="34"
        rx="17"
        fill="#1A1A22"
        stroke="#26262F"
        strokeWidth="3"
      />
      <line x1="280" y1="69" x2="296" y2="69" stroke="#26262F" strokeWidth="2" strokeLinecap="round" />
      {/* Faint lighter rim line */}
      <line x1="264" y1="58" x2="310" y2="58" stroke="rgba(255,255,255,0.18)" strokeWidth="1.2" strokeLinecap="round" />

      {/* Middle finger: black #0A0A0F */}
      <rect
        x="264"
        y="90"
        width="70"
        height="34"
        rx="17"
        fill="#0A0A0F"
        stroke="#26262F"
        strokeWidth="3"
      />
      <line x1="282" y1="107" x2="298" y2="107" stroke="#1A1A22" strokeWidth="2" strokeLinecap="round" />
      {/* Faint lighter rim line */}
      <line x1="266" y1="96" x2="312" y2="96" stroke="rgba(255,255,255,0.18)" strokeWidth="1.2" strokeLinecap="round" />

      {/* Ring / pinky finger: #14141A */}
      <rect
        x="266"
        y="128"
        width="70"
        height="34"
        rx="17"
        fill="#14141A"
        stroke="#26262F"
        strokeWidth="3"
      />
      <line x1="284" y1="145" x2="300" y2="145" stroke="#1A1A22" strokeWidth="2" strokeLinecap="round" />
      {/* Faint lighter rim line */}
      <line x1="268" y1="134" x2="314" y2="134" stroke="rgba(255,255,255,0.18)" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}
