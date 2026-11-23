import { useMemo, useState } from 'react';

const TILTS = [-3, 2, -1.5, 3, -2.5, 1.5];
const MIN_PER_HALF = 10; // keeps the strip wider than any screen, so the loop has no gap
const SECONDS_PER_PHOTO = 2; // lower = faster, higher = slower

export default function PhotoLoop({ photos, onOpen }) {
  const [paused, setPaused] = useState(false);

  // Repeat a short list until one "half" is long enough, then render it twice.
  const half = useMemo(() => {
    const stills = photos.filter((p) => p.type !== 'video'); // the loop shows photos only
    if (!stills.length) return [];
    const reps = Math.ceil(MIN_PER_HALF / stills.length);
    return Array.from({ length: reps }, () => stills).flat();
  }, [photos]);

  if (!half.length) return null;

  const renderCard = (photo, i, hidden) => (
    <li key={`${hidden ? 'b' : 'a'}-${i}`} className="shrink-0" aria-hidden={hidden || undefined}>
      <button
        type="button"
        tabIndex={hidden ? -1 : 0}
        onClick={() => onOpen(photo.index)}
        aria-label={`Open photo ${photo.index + 1}${photo.caption ? `: ${photo.caption}` : ''}`}
        style={{ rotate: `${TILTS[i % TILTS.length]}deg` }}
        className="block w-36 bg-white p-1.5 text-center shadow-polaroid transition-transform duration-300 hover:-translate-y-2 hover:rotate-0 sm:w-44 sm:p-2 md:w-52"
      >
        <img
          src={photo.src}
          alt={hidden ? '' : photo.alt}
          loading={!hidden && i < 8 ? 'eager' : 'lazy'}
          decoding="async"
          draggable="false"
          className="aspect-[4/5] w-full bg-cream-200 object-cover"
        />
        {/* caption (same height on every card so the row stays even) */}
        <span className="mt-1.5 line-clamp-2 block min-h-[2.5em] px-0.5 font-hand text-base leading-tight text-ink sm:text-lg md:text-xl">
          {photo.caption}
        </span>
      </button>
    </li>
  );

  return (
    <section aria-label="Photo loop" className="group relative overflow-hidden py-10 md:py-14">
      <ul
        className="flex w-max animate-loop gap-5 px-2.5 py-4 will-change-transform focus-within:[animation-play-state:paused] sm:gap-7 sm:px-3.5 [@media(hover:hover)]:group-hover:[animation-play-state:paused]"
        style={{
          animationDuration: `${half.length * SECONDS_PER_PHOTO}s`,
          animationPlayState: paused ? 'paused' : undefined,
        }}
      >
        {half.map((p, i) => renderCard(p, i, false))}
        {half.map((p, i) => renderCard(p, i, true))}
      </ul>

      {/* soft fade at both edges */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-cream-100 to-transparent sm:w-24" />
      <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-cream-100 to-transparent sm:w-24" />

      {/* pause / play, so the moving strip is always under the viewer's control */}
      <button
        type="button"
        onClick={() => setPaused((p) => !p)}
        aria-pressed={paused}
        aria-label={paused ? 'Play photo loop' : 'Pause photo loop'}
        className="absolute bottom-2 right-3 z-10 grid h-10 w-10 place-items-center rounded-full bg-white/85 text-ink shadow-polaroid transition hover:bg-white sm:right-6"
      >
        <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4" fill="currentColor">
          {paused ? <path d="M8 5v14l11-7z" /> : <path d="M7 5h4v14H7zM13 5h4v14h-4z" />}
        </svg>
      </button>
    </section>
  );
}
