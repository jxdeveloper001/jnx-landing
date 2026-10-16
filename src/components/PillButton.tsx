import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import type { ReactNode } from 'react';
import Magnetic from './Magnetic';
import { scrollToHash } from '../lib/scroll';

type Props = { children: ReactNode; variant?: 'dark' | 'outline'; arrow?: boolean; magnetic?: boolean; href?: string; className?: string; onClick?: () => void };
const base = 'group inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-[15px] font-medium transition-colors';
const styles = { dark: 'bg-ink text-white hover:bg-neutral-800', outline: 'border border-ink/20 text-ink hover:border-ink' };

export default function PillButton({ children, variant = 'dark', arrow, magnetic, href, className = '', onClick }: Props) {
  const cls = `${base} ${styles[variant]} ${className}`;
  const content = <>{children}{arrow && <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1.5" />}</>;
  const el = href ? (
    <motion.a href={href} className={cls} whileTap={{ scale: 0.96 }} onClick={(e) => { if (href.startsWith('#')) { e.preventDefault(); scrollToHash(href); } onClick?.(); }}>{content}</motion.a>
  ) : (
    <motion.button type="button" className={cls} whileTap={{ scale: 0.96 }} onClick={onClick}>{content}</motion.button>
  );
  return magnetic ? <Magnetic>{el}</Magnetic> : el;
}
