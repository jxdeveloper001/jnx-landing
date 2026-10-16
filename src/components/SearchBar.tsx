import { motion } from 'framer-motion';
import { Calendar, MapPin, Search } from 'lucide-react';
import { content } from '../content';
export default function SearchBar() {
  return (
    <motion.form role="search" onSubmit={(e) => e.preventDefault()} whileHover={{ y: -4 }} transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="flex w-full max-w-xl items-center gap-2 rounded-full border border-line bg-white p-2 pl-6 shadow-card transition-shadow hover:shadow-lift">
      <label className="flex min-w-0 flex-1 items-center gap-3">
        <MapPin size={20} className="shrink-0" />
        <span className="min-w-0"><span className="block text-xs font-semibold">Location</span>
          <input type="text" placeholder={content.search.location} className="w-full bg-transparent text-sm text-mute outline-none placeholder:text-mute" /></span>
      </label>
      <span className="h-8 w-px bg-line" />
      <label className="flex min-w-0 flex-1 items-center gap-3">
        <Calendar size={20} className="shrink-0" />
        <span className="min-w-0"><span className="block text-xs font-semibold">Date</span>
          <input type="text" placeholder={content.search.date} onFocus={(e) => (e.currentTarget.type = 'date')} onBlur={(e) => { if (!e.currentTarget.value) e.currentTarget.type = 'text'; }} className="w-full bg-transparent text-sm text-mute outline-none placeholder:text-mute" /></span>
      </label>
      <motion.button type="submit" aria-label="Search" whileHover={{ rotate: 14, scale: 1.05 }} whileTap={{ scale: 0.92 }} className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-ink text-white"><Search size={20} /></motion.button>
    </motion.form>
  );
}
