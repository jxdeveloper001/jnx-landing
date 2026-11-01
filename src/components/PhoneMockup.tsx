import {
  Bell,
  BatteryFull,
  CalendarDays,
  ChevronRight,
  Compass,
  Home,
  Plus,
  Signal,
  User,
  Wifi,
} from 'lucide-react';
import { content } from '../content';
import { Landscape } from './Illustrations';

const NAV = [
  { label: 'Home', Icon: Home, active: true },
  { label: 'Explore', Icon: Compass, active: false },
  { label: 'Schedule', Icon: CalendarDays, active: false },
  { label: 'Profile', Icon: User, active: false },
];

function NavItem({ label, Icon, active }: (typeof NAV)[number]) {
  return (
    <div className="relative flex min-h-[44px] flex-1 flex-col items-center justify-center gap-0.5">
      {active && (
        <span className="absolute -top-px h-[3px] w-6 rounded-b-full bg-[#54258A]" aria-hidden />
      )}
      <Icon
        size={19}
        strokeWidth={active ? 2.2 : 1.8}
        className={active ? 'text-[#54258A]' : 'text-[#8A8A99]'}
      />
      <span
        className={`text-[9px] leading-none ${
          active ? 'font-semibold text-[#54258A]' : 'font-medium text-[#8A8A99]'
        }`}
      >
        {label}
      </span>
    </div>
  );
}

/** CSS-built phone showing a JNX mobile app: status bar, app bar, content cards, bottom tab bar. */
export function Phone() {
  const p = content.hero.phone;
  return (
    <div
      className="relative h-[570px] w-[280px] rounded-[46px] bg-[#0A0A0F] p-[10px] shadow-lift ring-1 ring-white/10"
      role="img"
      aria-label="JNX app preview"
    >
      <div className="relative flex h-full w-full flex-col overflow-hidden rounded-[37px] bg-[#F7F6FA]">
        {/* Status bar */}
        <div className="relative flex h-[42px] shrink-0 items-end justify-between bg-white px-5 pb-1.5">
          <span className="text-[11px] font-semibold tabular-nums text-ink">9:41</span>
          <div className="absolute left-1/2 top-[9px] h-[22px] w-[84px] -translate-x-1/2 rounded-full bg-[#0A0A0F]" />
          <div className="flex items-center gap-1 text-ink">
            <Signal size={12} strokeWidth={2.2} />
            <Wifi size={12} strokeWidth={2.2} />
            <BatteryFull size={15} strokeWidth={1.8} />
          </div>
        </div>

        {/* App bar */}
        <div className="flex shrink-0 items-center justify-between border-b border-[#ECEAF2] bg-white px-4 pb-2.5 pt-1">
          <div className="flex items-center gap-2">
            <span className="grid h-7 w-7 place-items-center rounded-full bg-gradient-to-br from-[#35145B] to-[#7950B5] text-[11px] font-bold text-white">
              A
            </span>
            <span className="text-xs font-semibold text-ink">Hi, Alex</span>
          </div>
          <span className="relative grid h-8 w-8 place-items-center rounded-full border border-[#ECEAF2] bg-white">
            <Bell size={15} className="text-ink" />
            <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-[#7950B5] ring-2 ring-white" />
          </span>
        </div>

        {/* Scrollable content */}
        <div className="flex min-h-0 flex-1 flex-col px-4 pt-3.5">
          <h3 className="text-[22px] font-bold leading-[1.1] tracking-tight text-ink">{p.title}</h3>

          <div className="mt-3.5 flex items-center justify-between">
            <p className="text-[12px] font-semibold text-ink">Recommended</p>
            <ChevronRight size={14} className="text-[#8A8A99]" aria-hidden />
          </div>
          <div className="mt-2 grid grid-cols-2 gap-2">
            {p.recommended.map((r, i) => (
              <div
                key={r}
                className="overflow-hidden rounded-2xl border border-[#ECEAF2] bg-white shadow-[0_1px_2px_rgba(36,17,61,0.04)]"
              >
                <div className="h-[68px]">
                  <Landscape v={i + 1} />
                </div>
                <p className="px-2.5 py-2 text-[11px] font-semibold text-ink">{r}</p>
              </div>
            ))}
          </div>

          <div className="mt-3 flex items-center gap-2 rounded-2xl border border-[#ECEAF2] bg-white p-2 shadow-[0_1px_2px_rgba(36,17,61,0.04)]">
            <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-[#F1EAFB] text-[#54258A]">
              <CalendarDays size={17} />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-[12px] font-semibold leading-tight text-ink">{p.schedule}</p>
              <p className="mt-0.5 text-[9.5px] leading-tight text-mute">{p.scheduleSub}</p>
            </div>
            <span className="btn-black rounded-full px-2.5 py-1.5 text-[10px] font-medium text-white">
              {p.scheduleBtn}
            </span>
          </div>
        </div>

        {/* Bottom tab bar */}
        <div className="relative shrink-0 border-t border-[#ECEAF2] bg-white px-2 pb-3 pt-1.5">
          <div className="flex items-center">
            <NavItem {...NAV[0]} />
            <NavItem {...NAV[1]} />
            <div className="flex flex-1 justify-center">
              <span className="btn-black -mt-6 grid h-11 w-11 place-items-center rounded-full text-white ring-4 ring-white">
                <Plus size={20} />
              </span>
            </div>
            <NavItem {...NAV[2]} />
            <NavItem {...NAV[3]} />
          </div>
          <div className="mx-auto mt-1.5 h-1 w-24 rounded-full bg-ink/80" aria-hidden />
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
      className="pointer-events-none absolute -bottom-[225px] left-1/2 z-20 w-[400px] -translate-x-1/2"
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
