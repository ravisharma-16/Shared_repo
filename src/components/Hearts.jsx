import { motion, useReducedMotion } from 'framer-motion';

export function HeartIcon({ className = '' }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor" className={className}>
      <path d="M12 21s-7.5-4.6-9.6-9.3C.9 8.2 2.8 4.5 6.4 4.5c2.1 0 3.8 1.1 5.6 3.2 1.8-2.1 3.5-3.2 5.6-3.2 3.6 0 5.5 3.7 4 7.2C19.5 16.4 12 21 12 21z" />
    </svg>
  );
}

const HEARTS = Array.from({ length: 9 }, (_, i) => ({
  left: 6 + ((i * 10.5) % 88),
  size: 10 + ((i * 7) % 14),
  delay: i * 1.4,
  duration: 12 + ((i * 3) % 7),
}));

export default function FloatingHearts() {
  const reduce = useReducedMotion();
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      {HEARTS.map((h, i) =>
        reduce ? (
          i < 4 && (
            <span key={i} className="absolute text-dustyrose-300/40" style={{ left: `${h.left}%`, top: `${20 + i * 18}%` }}>
              <HeartIcon className="" />
            </span>
          )
        ) : (
          <motion.span
            key={i}
            className="absolute text-dustyrose-300"
            style={{ left: `${h.left}%`, bottom: '-6%', width: h.size, height: h.size }}
            initial={{ y: 0, opacity: 0 }}
            animate={{ y: '-110vh', x: [0, 14, -10, 0], opacity: [0, 0.5, 0.5, 0] }}
            transition={{ duration: h.duration, delay: h.delay, repeat: Infinity, ease: 'linear' }}
          >
            <HeartIcon className="h-full w-full" />
          </motion.span>
        )
      )}
    </div>
  );
}
