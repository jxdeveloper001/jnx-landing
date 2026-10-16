import { useEffect, useState } from 'react';
/** Cards visible in the carousel: 1 / 2 / 3 by viewport. */
export function useVisible() {
  const calc = () => (window.innerWidth >= 1024 ? 3 : window.innerWidth >= 640 ? 2 : 1);
  const [v, setV] = useState(calc);
  useEffect(() => { const f = () => setV(calc()); window.addEventListener('resize', f); return () => window.removeEventListener('resize', f); }, []);
  return v;
}
