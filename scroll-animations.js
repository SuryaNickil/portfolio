// Enhanced Intersection Observer for scroll animations
const observerOptions = {
  threshold: 0.15,
  rootMargin: '0px 0px -80px 0px'
};

const observer = new IntersectionObserver(function(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // Add animate-in class to trigger animation
      entry.target.classList.add('animate-in');
      // Optional: remove observer to save resources
      // observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe all elements that should animate on scroll
document.addEventListener('DOMContentLoaded', () => {
  // Select all sections, cards, jobs, and text elements
  const elementsToObserve = document.querySelectorAll(
    'section, .project-card, .job, h2, h3, p, .skill-category'
  );
  
  elementsToObserve.forEach(el => {
    observer.observe(el);
  });
  
  console.log(`✓ Observing ${elementsToObserve.length} elements for scroll animations`);
});

// Parallax effect on scroll
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const parallaxElements = document.querySelectorAll('[data-parallax]');
  
  parallaxElements.forEach(el => {
    const parallaxValue = scrolled * 0.5;
    el.style.transform = `translateY(${parallaxValue}px)`;
  });
  
  // Sticky header visibility
  const header = document.querySelector('.sticky-header');
  if (header) {
    if (scrolled > 100) {
      header.classList.add('visible');
    } else {
      header.classList.remove('visible');
    }
  }
}, { passive: true });

// Smooth scroll offset for sticky header
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      const headerOffset = 100;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// Glow effect on mouse move
document.addEventListener('mousemove', (e) => {
  const cards = document.querySelectorAll('.project-card, .job');
  cards.forEach(card => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    card.style.setProperty('--mouse-x', x + 'px');
    card.style.setProperty('--mouse-y', y + 'px');
  });
});

console.log('✓ Scroll animations loaded');
