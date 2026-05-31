document.addEventListener('DOMContentLoaded', () => {
  initMobileNav();
  initGalleryCarousel();
});

function initMobileNav() {
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  if (!menuToggle || !navLinks) return;

  function closeMenu() {
    navLinks.classList.remove('active');
    menuToggle.setAttribute('aria-expanded', 'false');
    navLinks.setAttribute('aria-hidden', 'true');
  }

  menuToggle.addEventListener('click', () => {
    const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
    if (isExpanded) {
      closeMenu();
    } else {
      navLinks.classList.add('active');
      menuToggle.setAttribute('aria-expanded', 'true');
      navLinks.setAttribute('aria-hidden', 'false');
    }
  });

  // Close menu when a nav link is tapped
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // Close menu when tapping outside
  document.addEventListener('click', e => {
    if (!menuToggle.contains(e.target) && !navLinks.contains(e.target)) {
      closeMenu();
    }
  });
}

function initGalleryCarousel() {
  const track = document.getElementById('galleryTrack');
  if (!track) return;

  const slides = track.querySelectorAll('.gallery-slide');
  if (slides.length <= 1) return;

  let index = 0;

  function goTo(i) {
    index = (i + slides.length) % slides.length;
    track.style.transform = `translateX(-${index * 100}%)`;
    document.querySelectorAll('#galleryNav .carousel-dot').forEach((dot, j) => {
      dot.classList.toggle('active', j === index);
    });
  }

  // Build nav dots
  const nav = document.getElementById('galleryNav');
  if (nav) {
    slides.forEach((_, i) => {
      const dot = document.createElement('span');
      dot.className = 'carousel-dot' + (i === 0 ? ' active' : '');
      dot.addEventListener('click', () => goTo(i));
      nav.appendChild(dot);
    });
  }

  // Auto-advance
  let timer = setInterval(() => goTo(index + 1), 5000);
  track.addEventListener('mouseenter', () => clearInterval(timer));
  track.addEventListener('mouseleave', () => {
    timer = setInterval(() => goTo(index + 1), 5000);
  });

  // Expose for inline onclick handlers
  window.prevGallerySlide = () => goTo(index - 1);
  window.nextGallerySlide = () => goTo(index + 1);
}
