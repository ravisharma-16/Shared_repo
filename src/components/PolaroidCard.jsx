import { memo, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import useMediaQuery from '../hooks/useMediaQuery';
import { HeartIcon } from './Hearts';

const ROTATIONS = [-3, 2, -1.5, 3, -2.5, 1.5, -1, 2.5];
const BOTTOM_PAD = ['pb-7', 'pb-9', 'pb-8', 'pb-10'];
const WIDTHS = ['w-full', 'w-[93%]', 'w-full', 'w-[96%]'];

function PolaroidCard({ photo, position, seed, onOpen }) {
  const reduce = useReducedMotion();
  const isMobile = useMediaQuery('(max-width: 639px)');
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);

  if (failed) return null; // never show a broken image

  const isVideo = photo.type === 'video';
  const hasCaption = Boolean(photo.caption);
  const rotate = ROTATIONS[(position + seed) % ROTATIONS.length] * (isMobile ? 0.4 : 1);
  const hover = reduce ? undefined : { rotate: 0, y: -8, scale: 1.03 };
  const showTape = position % 3 === 0;
  const showHeart = position % 7 === 3;
  const kind = isVideo ? 'video' : 'photo';

  return (
    <motion.li
      className="mb-4 break-inside-avoid sm:mb-7"
      initial={reduce ? false : { opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -50px 0px' }}
      transition={{ duration: 0.7, delay: (position % 3) * 0.1, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.button
        type="button"
        onClick={() => onOpen(photo.index)}
        aria-label={`Open ${kind} ${photo.index + 1}${hasCaption ? `: ${photo.caption}` : ''}`}
        style={{ rotate }}
        whileHover={hover}
        whileFocus={hover}
        whileTap={reduce ? undefined : { scale: 0.98 }}
        transition={{ type: 'spring', stiffness: 260, damping: 22 }}
        className={`relative mx-auto block bg-white p-1.5 text-center shadow-polaroid sm:p-2 ${WIDTHS[position % 4]} ${
          hasCaption ? '' : BOTTOM_PAD[position % 4]
        }`}
      >
        {showTape && (
          <span aria-hidden="true" className="absolute -top-2.5 left-1/2 z-10 h-5 w-14 -translate-x-1/2 -rotate-3 bg-blush-300/60" />
        )}
        {showHeart && <HeartIcon className="absolute -bottom-2 -right-2 z-10 h-6 w-6 text-dustyrose-400 drop-shadow" />}

        {isVideo ? (
          <span className="relative block">
            {/* #t=0.1 makes the browser show a still frame as the thumbnail */}
            <video
              src={`${photo.src}#t=0.1`}
              muted
              playsInline
              preload="metadata"
              aria-hidden="true"
              onLoadedData={() => setLoaded(true)}
              onError={() => setFailed(true)}
              className="block aspect-[4/5] w-full bg-cream-200 object-cover"
            />
            <span aria-hidden="true" className="absolute inset-0 grid place-items-center">
              <span className="grid h-12 w-12 place-items-center rounded-full bg-white/85 text-dustyrose-500 shadow-polaroid">
                <svg viewBox="0 0 24 24" className="ml-0.5 h-5 w-5" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
              </span>
            </span>
          </span>
        ) : (
          <img
            src={photo.src}
            alt={photo.alt}
            loading="lazy"
            decoding="async"
            onLoad={() => setLoaded(true)}
            onError={() => setFailed(true)}
            className={`block w-full bg-cream-200 object-cover ${loaded ? 'h-auto' : 'aspect-[4/5]'}`}
          />
        )}

        {hasCaption && (
          <span className="block px-1 pb-1.5 pt-2 font-hand text-lg leading-tight text-ink sm:text-xl">
            {photo.caption}
          </span>
        )}
      </motion.button>
    </motion.li>
  );
}

export default memo(PolaroidCard);
