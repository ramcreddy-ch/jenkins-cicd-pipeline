/* Portfolio — minimal JS */

// ── Navbar scroll effect ─────────────────────────────────────
const navbar = document.getElementById('navbar');
const burger  = document.getElementById('nav-burger');
const navMenu = document.getElementById('nav-links');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 10);
  updateActiveNav();
}, { passive: true });

// ── Hamburger toggle ─────────────────────────────────────────
if (burger) {
  burger.addEventListener('click', () => {
    navMenu.classList.toggle('open');
  });

  navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => navMenu.classList.remove('open'));
  });
}

// ── Active nav link ──────────────────────────────────────────
function updateActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const scrollY  = window.scrollY + 100;

  sections.forEach(sec => {
    const top    = sec.offsetTop;
    const height = sec.offsetHeight;
    const id     = sec.getAttribute('id');
    const link   = document.querySelector(`.nav-links a[href="#${id}"]`);
    if (!link) return;
    link.classList.toggle('active', scrollY >= top && scrollY < top + height);
  });
}

// ── Scroll-reveal (IntersectionObserver) ─────────────────────
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        // Don't unobserve so re-scroll works if needed
      }
    });
  },
  { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
);

document.querySelectorAll('.reveal, .timeline-item, .project-card').forEach(el => {
  observer.observe(el);
});

// ── Stagger delay for grid children ──────────────────────────
document.querySelectorAll('.projects-grid, .achievements-grid, .certs-grid, .repos-grid').forEach(grid => {
  Array.from(grid.children).forEach((child, i) => {
    child.style.transitionDelay = `${i * 80}ms`;
  });
});

updateActiveNav();
