export default function Logo({ light = false }: { light?: boolean }) {
   const c = light ? "#FFFFFF" : "currentColor";
   return (
      <span className="inline-flex items-center gap-2" style={{ color: c }}>
         <svg width="26" height="22" viewBox="0 0 26 22" aria-hidden>
            <path
               d="M13 1 L25 21 H1 Z"
               fill="none"
               stroke="currentColor"
               strokeWidth="3"
               strokeLinejoin="round"
            />
            <path d="M13 9 L18 17 H8 Z" fill="currentColor" />
         </svg>
         <span className="text-2xl font-extrabold tracking-tighter">JNX</span>
      </span>
   );
}
