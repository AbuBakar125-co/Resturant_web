import { useEffect } from 'react';

/**
 * Site-wide image animation controller.
 *
 * - Tags eligible <img> elements inside <main> with `.img-anim` and reveals
 *   them (fade + gentle rise + de-zoom) as they enter the viewport.
 * - Applies a very subtle parallax drift to any element marked
 *   `[data-parallax]` / `.img-parallax`.
 * - Fully respects `prefers-reduced-motion` and cleans up on unmount / route
 *   change. Uses transform + opacity only, so it stays on the compositor.
 *
 * Pass the current route so it re-scans after the page swaps its DOM.
 */
export function useImageAnimations(routeKey: unknown): void {
  useEffect(() => {
    const prefersReduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    const main = document.getElementById('main-content');
    if (!main) return;

    // --- collect target images ------------------------------------------------
    const scan = (): HTMLImageElement[] => {
      const imgs = Array.from(
        main.querySelectorAll<HTMLImageElement>('img')
      ).filter(
        (img) =>
          !img.classList.contains('hero-slide-img') &&
          !img.closest('#home-hero') &&
          !img.dataset.noAnim
      );
      imgs.forEach((img) => {
        if (!img.classList.contains('img-anim')) img.classList.add('img-anim');
      });
      return imgs;
    };

    let images = scan();

    if (prefersReduced) {
      images.forEach((img) => img.classList.add('is-revealed', 'reveal-done'));
      return;
    }

    // --- viewport reveal ----------------------------------------------------
    const revealTimers = new Map<Element, number>();

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target as HTMLImageElement;
          el.classList.add('is-revealed');
          const t = window.setTimeout(
            () => el.classList.add('reveal-done'),
            1000
          );
          revealTimers.set(el, t);
          io.unobserve(el);
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
    );

    images.forEach((img) => io.observe(img));

    // Re-scan shortly after mount to catch late-rendered / lazy images.
    const rescan = window.setTimeout(() => {
      images = scan();
      images.forEach((img) => {
        if (!img.classList.contains('is-revealed')) io.observe(img);
      });
    }, 400);

    // Safety net: never leave an image invisible.
    const safety = window.setTimeout(() => {
      scan().forEach((img) =>
        img.classList.add('is-revealed', 'reveal-done')
      );
    }, 3000);

    // --- subtle parallax --------------------------------------------------
    const parallaxEls = Array.from(
      main.querySelectorAll<HTMLElement>('[data-parallax], .img-parallax')
    );
    const enableParallax =
      parallaxEls.length > 0 && window.innerWidth >= 768;

    let rafId = 0;
    const updateParallax = () => {
      rafId = 0;
      const vh = window.innerHeight;
      parallaxEls.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.bottom < -200 || rect.top > vh + 200) return;
        const factor = Number(el.dataset.parallax) || 0.08;
        const offset = (rect.top + rect.height / 2 - vh / 2) * -factor;
        el.style.transform = `translate3d(0, ${offset.toFixed(1)}px, 0)`;
      });
    };
    const onScroll = () => {
      if (!rafId) rafId = window.requestAnimationFrame(updateParallax);
    };

    if (enableParallax) {
      updateParallax();
      window.addEventListener('scroll', onScroll, { passive: true });
      window.addEventListener('resize', onScroll, { passive: true });
    }

    return () => {
      io.disconnect();
      window.clearTimeout(rescan);
      window.clearTimeout(safety);
      revealTimers.forEach((t) => window.clearTimeout(t));
      if (enableParallax) {
        window.removeEventListener('scroll', onScroll);
        window.removeEventListener('resize', onScroll);
        if (rafId) window.cancelAnimationFrame(rafId);
        parallaxEls.forEach((el) => (el.style.transform = ''));
      }
    };
  }, [routeKey]);
}
