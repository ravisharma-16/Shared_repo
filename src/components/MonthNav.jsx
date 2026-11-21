import { Fragment, useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

export default function MonthNav({ months, onSelect }) {
  const [active, setActive] = useState(months[0].id);
  const barRef = useRef(null);

  // Highlight the month currently crossing the middle of the screen.
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' }
    );
    months.forEach((m) => {
      const el = document.getElementById(m.id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, [months]);

  // Keep the active month visible in the scrollable bar (mobile).
  useEffect(() => {
    const bar = barRef.current;
    const btn = bar?.querySelector(`[data-id="${active}"]`);
    if (bar && btn) bar.scrollTo({ left: btn.offsetLeft - (bar.clientWidth - btn.clientWidth) / 2, behavior: 'smooth' });
  }, [active]);

  return (
    <nav aria-label="Jump to a month" className="sticky top-0 z-30 border-b border-cream-300/70 bg-cream-100/85 backdrop-blur">
      <div
        ref={barRef}
        className="relative mx-auto flex max-w-3xl items-center gap-1 overflow-x-auto px-3 sm:justify-center [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {months.map((m, i) => (
          <Fragment key={m.id}>
            {i > 0 && <span aria-hidden="true" className="text-dustyrose-300">·</span>}
            <button
              type="button"
              data-id={m.id}
              onClick={() => onSelect(m.id)}
              aria-current={active === m.id ? 'true' : undefined}
              className={`relative min-h-11 shrink-0 px-3 font-display text-lg transition-colors sm:text-xl ${
                active === m.id ? 'text-ink' : 'text-ink/55 hover:text-ink'
              }`}
            >
              {m.label}
              {active === m.id && (
                <motion.span layoutId="nav-underline" className="absolute inset-x-3 bottom-1.5 h-px bg-dustyrose-500" />
              )}
            </button>
          </Fragment>
        ))}
      </div>
    </nav>
  );
}
