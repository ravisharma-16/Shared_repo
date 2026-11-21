import { motion, useReducedMotion } from 'framer-motion';
import PolaroidCard from './PolaroidCard';
import { HeartIcon } from './Hearts';

// Same scrapbook language every month, with a different rhythm.
const ALIGN = ['items-start text-left', 'items-center text-center', 'items-end text-right'];
const COLUMNS = [
  'columns-2 md:columns-3',
  'columns-2 md:columns-3 xl:columns-4',
  'columns-2 md:columns-2 lg:columns-3',
];

export default function MonthSection({ month, monthIndex, onOpen }) {
  const reduce = useReducedMotion();
  const { id, label, photos } = month;

  return (
    <section id={id} aria-labelledby={`${id}-title`} className="scroll-mt-16 py-14 md:py-20">
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '0px 0px -80px 0px' }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className={`mb-10 flex flex-col gap-2 md:mb-14 ${ALIGN[monthIndex % 3]}`}
      >
        <h2 id={`${id}-title`} className="font-display text-6xl font-semibold md:text-8xl">
          {label}
        </h2>
        <HeartIcon className="h-4 w-4 text-dustyrose-400" />
      </motion.div>

      {photos.length > 0 ? (
        <ul className={`${COLUMNS[monthIndex % 3]} gap-4 sm:gap-7`}>
          {photos.map((photo, i) => (
            <PolaroidCard key={photo.src} photo={photo} position={i} seed={monthIndex * 3} onOpen={onOpen} />
          ))}
        </ul>
      ) : (
        import.meta.env.DEV && (
          <p className="text-center font-hand text-xl text-ink/50">
            Add photos to public/memories/{id}/ and list them in src/data/memories.js
          </p>
        )
      )}
    </section>
  );
}
