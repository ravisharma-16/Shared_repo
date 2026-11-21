import { useCallback, useState } from 'react';
import { AnimatePresence, useReducedMotion } from 'framer-motion';
import { months, allPhotos, heroPhotos, closingPhotos } from './data/memories';
import Hero from './components/Hero';
import MonthNav from './components/MonthNav';
import MonthSection from './components/MonthSection';
import Lightbox from './components/Lightbox';
import Closing from './components/Closing';

export default function App() {
  const reduce = useReducedMotion();
  const [openIndex, setOpenIndex] = useState(null);
  const behavior = reduce ? 'auto' : 'smooth';

  const scrollToId = useCallback(
    (id) => document.getElementById(id)?.scrollIntoView({ behavior, block: 'start' }),
    [behavior]
  );
  const toTop = useCallback(() => window.scrollTo({ top: 0, behavior }), [behavior]);
  const close = useCallback(() => setOpenIndex(null), []);

  return (
    <>
      <Hero photos={heroPhotos} onExplore={() => scrollToId('gallery')} />

      <main id="gallery">
        <MonthNav months={months} onSelect={scrollToId} />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
          {months.map((month, i) => (
            <MonthSection key={month.id} month={month} monthIndex={i} onOpen={setOpenIndex} />
          ))}
        </div>
      </main>

      <Closing photos={closingPhotos} onTop={toTop} />

      <AnimatePresence>
        {openIndex !== null && (
          <Lightbox key="lightbox" photos={allPhotos} index={openIndex} onClose={close} onNavigate={setOpenIndex} />
        )}
      </AnimatePresence>
    </>
  );
}
