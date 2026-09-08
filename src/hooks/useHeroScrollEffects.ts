import { useEffect } from 'react';
import { gsap, ScrollTrigger } from '../lib/gsap';

/**
 * Cinematic, fully scroll-scrubbed hero: one GSAP timeline ties both the
 * content (fades up/away + scales down slightly) and the background layers
 * (drift + slow zoom) directly to how far the visitor has scrolled through
 * the hero's own height. Because it's `scrub`-driven rather than a discrete
 * enter/leave trigger, there is no "state" to reverse — scrolling back up
 * simply re-plays the timeline backwards for free, exactly in sync with the
 * scrollbar. Disabled entirely under `prefers-reduced-motion`.
 *
 * Marker contract inside `#<sectionId>`:
 * - `.hero-content-fade` — the readable content layer (heading, copy, CTAs).
 * - `[data-hero-bg]` — background image wrapper(s); do not also attach the
 *   generic `data-parallax` rAF effect to these, GSAP owns their transform.
 */
export function useHeroScrollEffects(sectionId: string): void {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const section = document.getElementById(sectionId);
    if (!section) return;

    const content = section.querySelectorAll<HTMLElement>('.hero-content-fade');
    const bgLayers = section.querySelectorAll<HTMLElement>('[data-hero-bg]');
    if (content.length === 0 && bgLayers.length === 0) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: 'bottom top',
        scrub: 0.4,
      },
    });

    if (content.length) {
      tl.to(content, { opacity: 0, y: 44, scale: 0.95, ease: 'none' }, 0);
    }
    if (bgLayers.length) {
      tl.to(bgLayers, { y: 70, scale: 1.14, ease: 'none' }, 0);
    }

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
      ScrollTrigger.refresh();
    };
  }, [sectionId]);
}
