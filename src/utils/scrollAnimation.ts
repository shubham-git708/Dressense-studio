
/**
 * Utility functions for scroll animations inspired by taikisato.com
 */

// Set up intersection observer to trigger animations when elements come into view
export const setupScrollAnimations = () => {
  // Options for the intersection observer
  const options = {
    root: null, // viewport is the root
    rootMargin: '0px',
    threshold: 0.1 // Trigger when at least 10% of the element is visible
  };

  // Handler for intersection changes
  const handleIntersection = (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
    entries.forEach(entry => {
      // Add animation class when element enters viewport
      if (entry.isIntersecting) {
        if (entry.target.classList.contains('scroll-fade')) {
          entry.target.classList.add('animate-fade-in');
        } else if (entry.target.classList.contains('scroll-slide')) {
          entry.target.classList.add('animate-slide-in-right');
        } else if (entry.target.classList.contains('scroll-scale')) {
          entry.target.classList.add('animate-scale-in');
        } else if (entry.target.classList.contains('scroll-parallax')) {
          entry.target.classList.add('parallax-active');
        }
        
        // If the animation should only happen once, unobserve after it's done
        if (entry.target.classList.contains('once')) {
          observer.unobserve(entry.target);
        }
      } else {
        // Optional: remove animation class when element leaves viewport
        // Uncomment if you want animations to repeat every time an element enters the viewport
        /*
        if (!entry.target.classList.contains('once')) {
          entry.target.classList.remove('animate-fade-in', 'animate-slide-in-right', 'animate-scale-in', 'parallax-active');
        }
        */
      }
    });
  };

  // Create observer
  const observer = new IntersectionObserver(handleIntersection, options);

  // Observe all elements with animation classes
  const animatedElements = document.querySelectorAll('.scroll-fade, .scroll-slide, .scroll-scale, .scroll-parallax');
  animatedElements.forEach(el => observer.observe(el));

  // Parallax effect on scroll
  const handleParallaxScroll = () => {
    const parallaxElements = document.querySelectorAll('.parallax-active');
    parallaxElements.forEach(element => {
      const el = element as HTMLElement;
      const speed = el.dataset.speed || '0.05';
      const scrollY = window.pageYOffset;
      const y = scrollY * parseFloat(speed);
      el.style.transform = `translateY(${y}px)`;
    });
  };

  // Add scroll event listener for parallax
  window.addEventListener('scroll', handleParallaxScroll);

  // Return cleanup function
  return () => {
    window.removeEventListener('scroll', handleParallaxScroll);
    animatedElements.forEach(el => observer.unobserve(el));
  };
};

// Initialize horizontal scroll container
export const setupHorizontalScroll = (containerSelector: string) => {
  const scrollContainer = document.querySelector(containerSelector) as HTMLElement;
  if (!scrollContainer) return;

  const handleWheel = (e: WheelEvent) => {
    e.preventDefault();
    scrollContainer.scrollLeft += e.deltaY;
  };

  scrollContainer.addEventListener('wheel', handleWheel);

  // Return cleanup function
  return () => {
    scrollContainer.removeEventListener('wheel', handleWheel);
  };
};
