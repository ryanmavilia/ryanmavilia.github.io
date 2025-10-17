/**
 * Magnetic hover effects - elements react to mouse proximity
 * Uses data-magnetic attribute to define behavior type
 */

interface MagneticElement {
  element: HTMLElement;
  type: string;
  rect: DOMRect;
  radius: number;
}

type EffectHandler = (element: HTMLElement, intensity: number) => void;

export function initMagneticEffect(): () => void {
  // Check for reduced motion preference
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return () => {};
  }

  // Disable on touch devices
  if ('ontouchstart' in window) {
    return () => {};
  }

  // Find all magnetic elements
  const magneticElements: MagneticElement[] = [];
  const elements = document.querySelectorAll<HTMLElement>('[data-magnetic]');

  if (elements.length === 0) return () => {};

  // Initialize elements with their config
  elements.forEach(element => {
    const type = element.dataset.magnetic || 'lift';
    const radius = parseInt(element.dataset.magneticRadius || '300', 10);

    magneticElements.push({
      element,
      type,
      rect: element.getBoundingClientRect(),
      radius
    });
  });

  // Effect handlers for different magnetic types
  const effectHandlers: Record<string, EffectHandler> = {
    lift: (element, intensity) => {
      const lift = intensity * 15; // Max 15px lift
      const scale = 1 + (intensity * 0.03); // Max 1.03x scale
      element.style.transform = `translate3d(0, ${-lift}px, 0) scale(${scale})`;

      // Find and rotate the sage background more
      const bg = element.querySelector<HTMLElement>('.bg-sage');
      if (bg) {
        const rotation = -1 - (intensity * 2); // -1deg to -3deg
        bg.style.transform = `rotate(${rotation}deg)`;
      }
    },

    spacing: (element, intensity) => {
      const spacing = intensity * 0.1; // Max 0.1em letter spacing
      element.style.letterSpacing = `${spacing}em`;
    },

    underline: (element, intensity) => {
      const width = 100 + (intensity * 20); // 100% to 120%
      element.style.width = `${width}%`;
    },

    slideRight: (element, intensity) => {
      const slide = intensity * 10; // Max 10px slide
      element.style.transform = `translate3d(${slide}px, 0, 0)`;
    },

    slideLeft: (element, intensity) => {
      const slide = intensity * 10; // Max 10px slide
      element.style.transform = `translate3d(${-slide}px, 0, 0)`;
    }
  };

  let isActive = false;
  let animationFrameId: number | null = null;

  // Calculate distance and apply effects
  const updateEffects = (mouseX: number, mouseY: number) => {
    magneticElements.forEach(({ element, type, rect, radius }) => {
      // Calculate element center
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      // Calculate distance from mouse to element center
      const deltaX = mouseX - centerX;
      const deltaY = mouseY - centerY;
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

      if (distance < radius) {
        // Calculate intensity (1.0 at center, 0.0 at radius edge)
        const intensity = 1 - (distance / radius);

        // Apply effect if handler exists
        const handler = effectHandlers[type];
        if (handler) {
          element.classList.add('magnetic-active');
          handler(element, intensity);
        } else {
          console.warn(`Unknown magnetic effect type: ${type}`);
        }
      } else {
        // Reset when outside radius
        element.classList.remove('magnetic-active');
        element.style.transform = '';
        element.style.letterSpacing = '';
        element.style.width = '';

        // Reset sage background if exists
        if (type === 'lift') {
          const bg = element.querySelector<HTMLElement>('.bg-sage');
          if (bg) {
            bg.style.transform = '';
          }
        }
      }
    });
  };

  // Handle mouse move
  const handleMouseMove = (e: MouseEvent) => {
    if (animationFrameId !== null) {
      return; // Skip if animation frame already scheduled
    }

    animationFrameId = requestAnimationFrame(() => {
      updateEffects(e.clientX, e.clientY);
      animationFrameId = null;
    });
  };

  // Handle mouse leave
  const handleMouseLeave = () => {
    magneticElements.forEach(({ element, type }) => {
      element.classList.remove('magnetic-active');
      element.style.transform = '';
      element.style.letterSpacing = '';
      element.style.width = '';

      if (type === 'lift') {
        const bg = element.querySelector<HTMLElement>('.bg-sage');
        if (bg) {
          bg.style.transform = '';
        }
      }
    });
  };

  // Update bounding rects on resize/scroll
  let resizeTimeout: number | null = null;
  const updateRects = () => {
    magneticElements.forEach(item => {
      item.rect = item.element.getBoundingClientRect();
    });
  };

  const handleResize = () => {
    if (resizeTimeout !== null) {
      clearTimeout(resizeTimeout);
    }
    resizeTimeout = window.setTimeout(updateRects, 100);
  };

  // Add event listeners
  document.addEventListener('mousemove', handleMouseMove, { passive: true });
  document.addEventListener('mouseleave', handleMouseLeave);
  window.addEventListener('resize', handleResize);
  window.addEventListener('scroll', handleResize, { passive: true });

  // Initial rect update
  updateRects();

  // Return cleanup function
  return () => {
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseleave', handleMouseLeave);
    window.removeEventListener('resize', handleResize);
    window.removeEventListener('scroll', handleResize);
    if (resizeTimeout !== null) {
      clearTimeout(resizeTimeout);
    }
    if (animationFrameId !== null) {
      cancelAnimationFrame(animationFrameId);
    }
  };
}

// Auto-initialize when DOM is ready
if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMagneticEffect);
  } else {
    initMagneticEffect();
  }
}
