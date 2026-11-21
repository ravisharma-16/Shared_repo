import { motion, useReducedMotion } from 'framer-motion';
import FloatingHearts, { HeartIcon } from './Hearts';

export default function Closing({ photos, onTop }) {
  const reduce = useReducedMotion();
  return (
    <footer className="relative overflow-hidden px-6 pb-20 pt-24 text-center">
      <FloatingHearts />
      <div className="relative z-10 mx-auto max-w-xl">
        {photos.length > 0 && (
          <div className="relative mx-auto mb-10 h-44 w-64 sm:h-56 sm:w-80">
            {photos.map((p, i) => (
              <motion.div
                key={p.src}
                initial={reduce ? false : { opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.8 }}
                className="absolute top-0 w-28 bg-white p-1.5 pb-5 shadow-polaroid sm:w-36"
                style={{ left: `${25 + i * (photos.length > 1 ? 50 / (photos.length - 1) : 0) - (photos.length > 1 ? 0 : 0)}%`, x: '-50%', rotate: (i - (photos.length - 1) / 2) * 10 }}
              >
                <img src={p.src} alt={p.alt} loading="lazy" decoding="async" className="aspect-[4/5] w-full object-cover" />
              </motion.div>
            ))}
          </div>
        )}

        <motion.div
          className="mx-auto mb-6 h-14 w-14 text-dustyrose-400"
          animate={reduce ? undefined : { scale: [1, 1.14, 1] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
        >
          <HeartIcon className="h-full w-full" />
        </motion.div>

        <p className="font-hand text-3xl leading-snug sm:text-4xl">
          Every picture holds a little piece of my happiness. ❤️
        </p>

        <button
          type="button"
          onClick={onTop}
          className="mt-10 min-h-12 rounded-full border border-dustyrose-500 px-8 py-3 text-dustyrose-500 transition-colors hover:bg-dustyrose-500 hover:text-white"
        >
          Back to the top
        </button>
      </div>
    </footer>
  );
}
