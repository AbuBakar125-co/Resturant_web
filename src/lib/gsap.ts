import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// A gentle, premium-feeling default. Individual tweens can override.
gsap.defaults({ ease: 'power3.out', duration: 0.9 });

export { gsap, ScrollTrigger };
