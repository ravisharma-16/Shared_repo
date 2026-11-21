import { motion } from 'framer-motion';
import FloatingHearts, { HeartIcon } from './Hearts';

// Wrapper div holds the tilt (Tailwind); inner motion.div does the entrance.
const SPOTS = [
  'left-[4%] top-[6%] w-24 -rotate-6 sm:w-32 md:w-44',
  'right-[5%] top-[7%] hidden w-28 rotate-6 sm:block sm:w-36 md:w-48',
  'left-[7%] bottom-[8%] hidden w-28 rotate-3 sm:block sm:w-36 md:w-48',
  'right-[5%] bottom-[6%] w-24 -rotate-3 sm:w-32 md:w-44',
];

const container = { hidden: {}, show: { transition: { staggerChildren: 0.18, delayChildren: 0.2 } } };
const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } },
};

export default function Hero({ photos, onExplore }) {
  return (
    <header className="relative flex min-h-[100svh] items-center justify-center overflow-hidden px-6">
      <FloatingHearts />

      {SPOTS.map((spot, i) => (
        <div key={i} className={`absolute ${spot}`} aria-hidden={!photos[i]}>
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.5 + i * 0.15, duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="bg-white p-1.5 pb-5 shadow-polaroid md:p-2 md:pb-7"
          >
            {photos[i] ? (
              <img src={photos[i].src} alt={photos[i].alt} decoding="async" className="aspect-[4/5] w-full object-cover" />
            ) : (
              <div className="grid aspect-[4/5] w-full place-items-center bg-blush-100">
                <HeartIcon className="h-6 w-6 text-dustyrose-300" />
              </div>
            )}
          </motion.div>
        </div>
      ))}

      <motion.div variants={container} initial="hidden" animate="show" className="relative z-10 max-w-2xl text-center">
        <motion.h1 variants={item} className="font-display text-5xl font-semibold leading-[1.05] sm:text-7xl md:text-8xl">
          Our Little World
        </motion.h1>
        <motion.p variants={item} className="mt-5 font-hand text-2xl text-dustyrose-500 sm:text-3xl">
          Some moments are too special to leave behind.
        </motion.p>
        <motion.div variants={item} className="mt-9">
          <button
            type="button"
            onClick={onExplore}
            className="min-h-12 rounded-full bg-dustyrose-500 px-8 py-3 font-body text-base text-white shadow-polaroid transition-colors hover:bg-dustyrose-400"
          >
            Explore Our Memories
          </button>
        </motion.div>
      </motion.div>
    </header>
  );
}
