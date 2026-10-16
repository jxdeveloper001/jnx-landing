# JNX Landing (React + TypeScript + Vite)

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # type-check + production build
```

- All copy: `src/content.ts`
- Colors / shadows / font: `tailwind.config.js`, `src/index.css`
- Sections: `src/components/` (Navbar, Hero, PhoneMockup, StatsStrip, Benefits, WorldMap, SearchSection/SearchBar, Community, Testimonials, Faq, Footer)
- Intro timing: `Intro.tsx` (1.4s) and `BASE` in `Hero.tsx` / delay in `Navbar.tsx` (1.3s)
- Reduced motion is respected (Lenis off, Framer transforms off via `MotionConfig`).
