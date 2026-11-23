import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';

const slide = {
  enter: (d) => ({ x: d > 0 ? 70 : -70, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (d) => ({ x: d > 0 ? -70 : 70, opacity: 0 }),
};

const Chevron = ({ flip }) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className={`h-6 w-6 ${flip ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 5l7 7-7 7" />
  </svg>
);

export default function Lightbox({ photos, index, onClose, onNavigate }) {
  const reduce = useReducedMotion();
  const [direction, setDirection] = useState(0);
  const dialogRef = useRef(null);
  const total = photos.length;
  const photo = photos[index];
  const isVideo = photo.type === 'video';

  const go = useCallback(
    (step) => {
      if (total < 2) return;
      setDirection(step);
      onNavigate((index + step + total) % total);
    },
    [index, total, onNavigate]
  );

  // Keyboard: Esc, arrows, and a simple focus trap.
  useEffect(() => {
    const onKey = (e) => {
      const onVideo = e.target instanceof HTMLVideoElement;
      if (e.key === 'Escape') onClose();
      else if (e.key === 'ArrowRight' && !onVideo) go(1);
      else if (e.key === 'ArrowLeft' && !onVideo) go(-1);
      else if (e.key === 'Tab') {
        const btns = dialogRef.current.querySelectorAll('button');
        const first = btns[0];
        const last = btns[btns.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [go, onClose]);

  // Lock page scroll, move focus in, and restore it on close.
  useEffect(() => {
    const previous = document.activeElement;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    dialogRef.current.querySelector('button')?.focus();
    return () => {
      document.body.style.overflow = overflow;
      previous?.focus?.();
    };
  }, []);

  // Preload neighbours for instant navigation.
  useEffect(() => {
    [index - 1, index + 1].forEach((i) => {
      const p = photos[(i + total) % total];
      if (p && p.type !== 'video') new Image().src = p.src;
    });
  }, [index, photos, total]);

  const onDragEnd = (_, { offset, velocity }) => {
    if (offset.x < -80 || velocity.x < -500) go(1);
    else if (offset.x > 80 || velocity.x > 500) go(-1);
  };

  const navBtn = 'absolute top-1/2 z-10 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-white/85 text-ink shadow-polaroid transition hover:bg-white';

  return (
    <motion.div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label="Photo viewer"
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#2b1d20]/85 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: reduce ? 0 : 0.25 }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <button type="button" onClick={onClose} aria-label="Close photo viewer" className="absolute right-3 top-3 z-10 grid h-12 w-12 place-items-center rounded-full bg-white/85 text-2xl text-ink shadow-polaroid hover:bg-white">
        <span aria-hidden="true">×</span>
      </button>

      {total > 1 && (
        <>
          <button type="button" onClick={() => go(-1)} aria-label="Previous photo" className={`${navBtn} left-2 sm:left-6`}><Chevron flip /></button>
          <button type="button" onClick={() => go(1)} aria-label="Next photo" className={`${navBtn} right-2 sm:right-6`}><Chevron /></button>
        </>
      )}

      <AnimatePresence mode="wait" custom={direction} initial={false}>
        <motion.div
          key={photo.src}
          custom={direction}
          variants={slide}
          initial={reduce ? false : 'enter'}
          animate="center"
          exit={reduce ? { opacity: 0 } : 'exit'}
          transition={{ duration: reduce ? 0 : 0.28, ease: 'easeOut' }}
          drag={total > 1 && !isVideo ? 'x' : false}
          dragSnapToOrigin
          dragElastic={0.4}
          dragConstraints={{ left: 0, right: 0 }}
          onDragEnd={onDragEnd}
          style={{ touchAction: 'pan-y' }}
          className="bg-white p-2 shadow-polaroid sm:p-3"
        >
          {isVideo ? (
            <video
              src={photo.src}
              controls
              autoPlay
              playsInline
              className="block max-h-[68svh] max-w-[84vw] bg-black sm:max-w-[80vw]"
            />
          ) : (
            <img src={photo.src} alt={photo.alt} draggable="false" className="block max-h-[68svh] max-w-[84vw] object-contain sm:max-w-[80vw]" />
          )}
          <p className="min-h-8 px-2 pb-1 pt-3 text-center font-hand text-xl leading-tight text-ink sm:min-h-10 sm:text-2xl">
            {photo.caption}
          </p>
        </motion.div>
      </AnimatePresence>

      <p className="absolute bottom-4 left-0 right-0 text-center font-hand text-xl text-white/80" aria-live="polite">
        {index + 1} / {total}
      </p>
    </motion.div>
  );
}
