import { useEffect } from 'react';
import { gsap, ScrollTrigger } from '../lib/gsap';

/**
 * Site-wide, fully bidirectional scroll-reveal controller built on GSAP +
 * ScrollTrigger.
 *
 * Markup contract:
 * - `data-reveal="up|down|left|right|scale|fade|clip|clip-right"` on any
 *   element reveals it as it scrolls into view and — because every trigger
 *   uses `toggleActions: "play reverse play reverse"` — reverses smoothly
 *   back to its hidden state the moment it scrolls back out, so scrolling up
 *   always re-plays the entrance instead of finding content that just
 *   "already happened". The hidden starting values live in CSS (see
 *   index.css) so there is never a flash of fully-visible content before
 *   this effect attaches.
 * - `data-reveal-group` on a container builds one GSAP timeline covering
 *   every `[data-reveal]` / `.reveal-icon` descendant in DOM order, each
 *   offset by `STAGGER_STEP` seconds. Reversing a GSAP timeline naturally
 *   reverses the stagger order too (the last item in is the first item
 *   back out), which is exactly how a real deck of cards would un-stack.
 * - `.reveal-bg-zoom` drives a continuous, scroll-scrubbed background-size
 *   zoom (no discrete state at all — it just IS the scroll position).
 *
 * A MutationObserver keeps wiring newly-mounted elements (a menu category
 * filter, a gallery filter, a search result) and prunes triggers whose
 * element has since been removed from the DOM, so this works correctly
 * across in-page filtering, not just route changes.
 */
const REVEAL_SELECTOR = '[data-reveal]';
const GROUP_SELECTOR = '[data-reveal-group]';
const BG_ZOOM_SELECTOR = '.reveal-bg-zoom';
const STAGGER_STEP = 0.09;
const TWEEN_DURATION = 0.85;
const START = 'top 85%';
const END = 'bottom 15%';

type Cleanup = () => void;

function visibleVarsFor(el: Element): gsap.TweenVars {
  const isIconOnly = el.classList.contains('reveal-icon') && !el.hasAttribute('data-reveal');
  if (isIconOnly) return { opacity: 1, scale: 1, rotate: 0 };

  switch (el.getAttribute('data-reveal')) {
    case 'up':
    case 'down':
    case 'left':
    case 'right':
      return { opacity: 1, x: 0, y: 0 };
    case 'scale':
      return { opacity: 1, scale: 1 };
    case 'clip':
    case 'clip-right':
      return { clipPath: 'inset(0% 0% 0% 0%)' };
    case 'fade':
    default:
      return { opacity: 1 };
  }
}

export function useScrollReveal(routeKey: unknown): void {
  useEffect(() => {
    const prefersReduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    const main = document.getElementById('main-content');
    if (!main) return;

    if (prefersReduced) {
      main.querySelectorAll<HTMLElement>(REVEAL_SELECTOR).forEach((el) => {
        gsap.set(el, { opacity: 1, x: 0, y: 0, scale: 1, rotate: 0, clipPath: 'inset(0% 0% 0% 0%)' });
      });
      main.querySelectorAll<HTMLElement>('.reveal-icon').forEach((el) => {
        gsap.set(el, { opacity: 1, scale: 1, rotate: 0 });
      });
      return;
    }

    const wired = new Map<Element, Cleanup>();

    const wireGroup = (group: HTMLElement) => {
      const children = Array.from(
        group.querySelectorAll<HTMLElement>(`${REVEAL_SELECTOR}, .reveal-icon`)
      );
      if (children.length === 0) return;

      const tl = gsap.timeline({
        scrollTrigger: { trigger: group, start: START, end: END, toggleActions: 'play reverse play reverse' },
      });
      children.forEach((child, i) => {
        tl.to(child, { ...visibleVarsFor(child), duration: TWEEN_DURATION }, i * STAGGER_STEP);
      });

      wired.set(group, () => {
        tl.scrollTrigger?.kill();
        tl.kill();
      });
    };

    const wireStandalone = (el: HTMLElement) => {
      const tween = gsap.to(el, {
        ...visibleVarsFor(el),
        duration: TWEEN_DURATION,
        scrollTrigger: { trigger: el, start: START, end: END, toggleActions: 'play reverse play reverse' },
      });
      wired.set(el, () => {
        tween.scrollTrigger?.kill();
        tween.kill();
      });
    };

    const wireBgZoom = (el: HTMLElement) => {
      gsap.set(el, { backgroundSize: '100%' });
      const tween = gsap.to(el, {
        backgroundSize: '114%',
        ease: 'none',
        scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: 0.6 },
      });
      wired.set(el, () => {
        tween.scrollTrigger?.kill();
        tween.kill();
      });
    };

    const rewireGroup = (group: HTMLElement) => {
      wired.get(group)?.();
      wired.delete(group);
      wireGroup(group);
    };

    // Wire every not-yet-tracked match under `root` (idempotent). Returns the
    // set of already-wired groups that need a full rebuild because a new
    // child mounted inside them (a fresh timeline snapshot, not a live one).
    const wireNew = (root: ParentNode): Set<HTMLElement> => {
      const rootEl = root as HTMLElement;
      const toRewire = new Set<HTMLElement>();

      const groups = Array.from(root.querySelectorAll<HTMLElement>(GROUP_SELECTOR));
      if (rootEl.matches?.(GROUP_SELECTOR)) groups.push(rootEl);
      groups.forEach((g) => {
        if (!wired.has(g)) wireGroup(g);
      });

      const standalone = Array.from(main!.querySelectorAll<HTMLElement>(REVEAL_SELECTOR)).filter(
        (el) => !el.closest(GROUP_SELECTOR)
      );
      standalone.forEach((el) => {
        if (!wired.has(el)) wireStandalone(el);
      });

      const bgZooms = Array.from(root.querySelectorAll<HTMLElement>(BG_ZOOM_SELECTOR));
      if (rootEl.matches?.(BG_ZOOM_SELECTOR)) bgZooms.push(rootEl);
      bgZooms.forEach((el) => {
        if (!wired.has(el)) wireBgZoom(el);
      });

      // A reveal item (or icon) that mounted straight into an already-wired
      // group needs that group's timeline rebuilt to include it — the old
      // timeline is a frozen snapshot and will never animate a newcomer.
      const newReveals = rootEl.matches?.(REVEAL_SELECTOR) || rootEl.matches?.('.reveal-icon')
        ? [rootEl, ...root.querySelectorAll<HTMLElement>(`${REVEAL_SELECTOR}, .reveal-icon`)]
        : Array.from(root.querySelectorAll<HTMLElement>(`${REVEAL_SELECTOR}, .reveal-icon`));
      newReveals.forEach((el) => {
        const group = el.closest<HTMLElement>(GROUP_SELECTOR);
        if (group && wired.has(group) && !groups.includes(group)) toRewire.add(group);
      });

      return toRewire;
    };

    // Drop triggers whose element has left the document (filtered out).
    const pruneStale = () => {
      wired.forEach((cleanup, el) => {
        if (!el.isConnected) {
          cleanup();
          wired.delete(el);
        }
      });
    };

    wireNew(main);

    let refreshTimer = 0;
    const mo = new MutationObserver((mutations) => {
      let structureChanged = false;
      const dirtyGroups = new Set<HTMLElement>();
      for (const m of mutations) {
        if (m.addedNodes.length || m.removedNodes.length) structureChanged = true;
        m.addedNodes.forEach((node) => {
          if (node.nodeType !== Node.ELEMENT_NODE) return;
          wireNew(node as HTMLElement).forEach((g) => dirtyGroups.add(g));
        });
      }
      if (structureChanged) {
        pruneStale();
        dirtyGroups.forEach((g) => {
          if (g.isConnected) rewireGroup(g);
        });
        window.clearTimeout(refreshTimer);
        refreshTimer = window.setTimeout(() => ScrollTrigger.refresh(), 60);
      }
    });
    mo.observe(main, { childList: true, subtree: true });

    // Late images shift layout after the initial measurement — and most of
    // this site's images are `loading="lazy"`, so they finish well after
    // `window.load` and after the one-off settle timer below. Without this,
    // a trigger measured against a too-short page can decide (wrongly) that
    // it's already scrolled past and jump straight to its revealed state at
    // mount. `load` doesn't bubble, but it does fire during the capture
    // phase on ancestors, so this catches every image as it finishes.
    let imgRefreshTimer = 0;
    const onImgLoad = () => {
      window.clearTimeout(imgRefreshTimer);
      imgRefreshTimer = window.setTimeout(() => ScrollTrigger.refresh(), 80);
    };
    main.addEventListener('load', onImgLoad, true);

    const settleRefresh = window.setTimeout(() => ScrollTrigger.refresh(), 400);
    const onWindowLoad = () => ScrollTrigger.refresh();
    window.addEventListener('load', onWindowLoad);

    return () => {
      mo.disconnect();
      window.clearTimeout(refreshTimer);
      window.clearTimeout(settleRefresh);
      window.clearTimeout(imgRefreshTimer);
      main.removeEventListener('load', onImgLoad, true);
      window.removeEventListener('load', onWindowLoad);
      wired.forEach((cleanup) => cleanup());
      wired.clear();
    };
  }, [routeKey]);
}
