/**
 * Interactive grid effect - moves grid based on mouse position
 * Applies to elements with .grid-overlay class
 * Adds warping effect when hovering over grid elements
 */

export function initGridEffect(): () => void {
  // Find all grid overlay elements
  const gridElements = document.querySelectorAll<HTMLElement>('.grid-overlay');

  if (gridElements.length === 0) return () => {};

  // Damping factor - controls how much the grid moves (lower = more subtle)
  const DAMPING = 0.015;

  // Warp intensity - controls the scale transformation on hover
  const WARP_INTENSITY = 0.03;

  // Track mouse position
  let mouseX = 0;
  let mouseY = 0;

  // Handle mouse move
  const handleMouseMove = (e: MouseEvent) => {
    // Get mouse position relative to viewport center
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;

    mouseX = (e.clientX - centerX) * DAMPING;
    mouseY = (e.clientY - centerY) * DAMPING;

    // Check if hovering over any grid element
    gridElements.forEach(element => {
      const rect = element.getBoundingClientRect();
      const isHovering = (
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom
      );

      if (isHovering) {
        // Calculate position within element (0 to 1)
        const relativeX = (e.clientX - rect.left) / rect.width;
        const relativeY = (e.clientY - rect.top) / rect.height;

        // Calculate warp based on distance from center
        const distanceFromCenterX = (relativeX - 0.5) * 2;
        const distanceFromCenterY = (relativeY - 0.5) * 2;

        // Create subtle scale and skew effect
        const scaleX = 1 + (Math.abs(distanceFromCenterX) * WARP_INTENSITY);
        const scaleY = 1 + (Math.abs(distanceFromCenterY) * WARP_INTENSITY);
        const skewX = distanceFromCenterX * 2;
        const skewY = distanceFromCenterY * 2;

        element.classList.add('warping');
        element.style.backgroundPosition = `${mouseX}px ${mouseY}px`;
        element.style.transform = `scale(${scaleX}, ${scaleY}) skew(${skewX}deg, ${skewY}deg)`;
      } else {
        element.classList.remove('warping');
        element.style.backgroundPosition = `${mouseX}px ${mouseY}px`;
        element.style.transform = '';
      }
    });
  };

  // Add mouse move listener
  document.addEventListener('mousemove', handleMouseMove);

  // Reset on mouse leave
  const handleMouseLeave = () => {
    gridElements.forEach(element => {
      element.classList.remove('warping');
      element.style.backgroundPosition = '0px 0px';
      element.style.transform = '';
    });
  };
  document.addEventListener('mouseleave', handleMouseLeave);

  // Return cleanup function
  return () => {
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseleave', handleMouseLeave);
  };
}

// Auto-initialize when DOM is ready
if (typeof document !== 'undefined') {
  // Skip if user prefers reduced motion
  if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    // Early exit - no initialization for users who prefer reduced motion
  } else {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', initGridEffect);
    } else {
      initGridEffect();
    }
  }
}
