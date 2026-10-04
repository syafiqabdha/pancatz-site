import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/** Scroll-linked reveals and card hover tilt. Content stays visible without it. */
export function initMotion() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  gsap.registerPlugin(ScrollTrigger);

  const reveals = document.querySelectorAll('.section-reveal');
  reveals.forEach(el => {
    gsap.fromTo(el,
      { opacity: 0.3, y: 20 },
      { opacity: 1, y: 0, ease: 'none',
        scrollTrigger: { trigger: el, start: 'top 88%', end: 'top 55%', scrub: 1 }
      }
    );
  });

  // ── Process: stage numbers scale + glow ──
  const processNums = document.querySelectorAll('.process-num');
  processNums.forEach((num, i) => {
    gsap.fromTo(num,
      { scale: 0.6, opacity: 0.2 },
      { scale: 1, opacity: 1, duration: 0.8, delay: i * 0.2, ease: 'back.out(1.4)',
        scrollTrigger: { trigger: num, start: 'top 82%', toggleActions: 'play none none reverse' }
      }
    );
  });

  // ── Capabilities: staggered tilt cards ──
  const capCards = document.querySelectorAll('#capabilities .bento-card');
  capCards.forEach((card, i) => {
    gsap.fromTo(card,
      { opacity: 0, y: 40, rotateY: 8, rotateX: -4 },
      { opacity: 1, y: 0, rotateY: 0, rotateX: 0, ease: 'power2.out', duration: 1, delay: i * 0.15,
        scrollTrigger: { trigger: card, start: 'top 85%', toggleActions: 'play none none reverse' }
      }
    );
  });

  // ── Services: depth reveal ──
  const svcCards = document.querySelectorAll('#services .bento-card');
  svcCards.forEach((card, i) => {
    gsap.fromTo(card,
      { opacity: 0, y: 50, scale: 0.96 },
      { opacity: 1, y: 0, scale: 1, ease: 'power3.out', duration: 1, delay: i * 0.12,
        scrollTrigger: { trigger: card, start: 'top 88%', toggleActions: 'play none none reverse' }
      }
    );
  });

  // ── Work/Portfolio: pinned frames ──
  const features = document.querySelectorAll('.editorial-feature');
  features.forEach((f, i) => {
    gsap.fromTo(f,
      { opacity: 0, scale: 0.98, y: 30 },
      { opacity: 1, scale: 1, y: 0, ease: 'power2.out', duration: 1.2, delay: i * 0.2,
        scrollTrigger: { trigger: f, start: 'top 88%', toggleActions: 'play none none reverse' }
      }
    );
  });

  // ── Contact CTA: motion-blur reveal ──
  const ctaSection = document.querySelector('#process .cta-text');
  if (ctaSection) {
    gsap.fromTo(ctaSection,
      { filter: 'blur(8px)', opacity: 0, scale: 0.95 },
      { filter: 'blur(0px)', opacity: 1, scale: 1, ease: 'power3.out', duration: 1.4,
        scrollTrigger: { trigger: ctaSection, start: 'top 90%', toggleActions: 'play none none reverse' }
      }
    );
  }

  // ── Hover tilt on bento cards ──
  const bentoCards = document.querySelectorAll('.bento-card');
  bentoCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      gsap.to(card, { rotateY: x * 3, rotateX: -y * 3, duration: 0.7, ease: 'power2.out' });
    });
    card.addEventListener('mouseleave', () => {
      gsap.to(card, { rotateY: 0, rotateX: 0, duration: 0.7, ease: 'power2.out' });
    });
  });
}
