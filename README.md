# JNX Landing (React + TypeScript + Vite)

High-performance digital agency landing page built with React 18, Vite, TypeScript, Tailwind CSS, and Framer Motion.

## Development

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # type-check + production build
npm run preview  # preview production build
```

## Contact Form Setup (Web3Forms)

The "Got A Question For JNX?" contact form delivers submissions directly to `jnx.webcraft@gmail.com` using [Web3Forms](https://web3forms.com).

To enable sending:
1. Visit [web3forms.com](https://web3forms.com) and create an access key for `jnx.webcraft@gmail.com`.
2. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```
3. Set your access key in `.env`:
   ```bash
   VITE_WEB3FORMS_KEY=your_actual_access_key_here
   ```
4. Restart the dev server (`npm run dev`) or deploy with `VITE_WEB3FORMS_KEY` configured in your hosting platform (Vercel, Netlify, etc.).

## Architecture & Configuration

- **All Copy & Content**: `src/content.ts`
- **Theme & Styles**: `tailwind.config.js`, `src/index.css`
- **Sections**: `src/components/`
- **Reduced Motion**: Full support for `prefers-reduced-motion` (static marquees, static timeline, instant transitions).
