/** Header hide-on-scroll, mobile drawer, active nav link and smooth anchor scrolling. */
const header = document.getElementById('site-header');
const mobileBtn = document.getElementById('mobile-menu');
const drawer = document.getElementById('mobile-drawer');

if (mobileBtn && drawer) {
  mobileBtn.addEventListener('click', () => {
    const isOpen = !drawer.classList.contains('hidden');
    if (isOpen) {
      drawer.classList.add('hidden');
      mobileBtn.innerHTML = '&#9776;';
      mobileBtn.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    } else {
      drawer.classList.remove('hidden');
      mobileBtn.innerHTML = '&#10005;';
      mobileBtn.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
    }
  });
  drawer.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      drawer.classList.add('hidden');
      mobileBtn.innerHTML = '&#9776;';
      mobileBtn.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });
}

let lastScrollY = window.scrollY;
let ticking = false;

function updateHeader() {
  const currentY = window.scrollY;
  if (currentY < lastScrollY) {
    header.classList.add('visible');
  } else if (currentY > lastScrollY && currentY > 40) {
    header.classList.remove('visible');
  }
  lastScrollY = currentY;
  ticking = false;
}

window.addEventListener('scroll', () => {
  if (!ticking) {
    requestAnimationFrame(updateHeader);
    ticking = true;
  }
}, { passive: true });

const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link[data-nav]');

const navObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(l => l.classList.remove('active'));
      const active = document.querySelector(`.nav-link[data-nav="${entry.target.id}"]`);
      if (active) active.classList.add('active');
    }
  });
}, { rootMargin: '-30% 0px -60% 0px' });

sections.forEach(s => navObserver.observe(s));

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href === '#') return;
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

header.classList.add('visible');
