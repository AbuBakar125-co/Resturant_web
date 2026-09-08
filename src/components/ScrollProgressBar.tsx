import React, { useEffect, useRef } from 'react';

/**
 * Extremely thin (2px) fixed indicator of scroll position through the
 * current page. rAF-throttled, transform-only (scaleX), so it never
 * triggers layout. Resets whenever the route changes.
 */
export const ScrollProgressBar: React.FC<{ routeKey: unknown }> = ({ routeKey }) => {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    const bar = barRef.current;
    if (!bar) return;

    bar.style.transition = prefersReduced
      ? 'none'
      : 'transform 120ms linear';

    let rafId = 0;
    const update = () => {
      rafId = 0;
      const doc = document.documentElement;
      const max = doc.scrollHeight - doc.clientHeight;
      const progress = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      bar.style.transform = `scaleX(${progress})`;
    };
    const onScroll = () => {
      if (!rafId) rafId = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (rafId) window.cancelAnimationFrame(rafId);
    };
  }, [routeKey]);

  return (
    <div id="scroll-progress-track" aria-hidden="true">
      <div id="scroll-progress-bar" ref={barRef} />
    </div>
  );
};
