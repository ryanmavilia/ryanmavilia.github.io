# Brutalist Design System

## Overview

This site uses a deconstructed magazine-style brutalist aesthetic with sage green accents.

## Colors

- **Black:** `#000000` - Primary text, borders
- **White:** `#FFFFFF` - Backgrounds
- **Sage Green:** `#87A878` - Accent color for highlights, hover states
- **Grid Gray:** `#E5E5E5` - Construction lines

## Typography

**Font:** IBM Plex Mono (monospace)

**Scale:**
- 10px - Rotated labels, metadata
- 12px - Secondary labels
- 16-18px - Body text
- 24-48px - Headings
- 72-120px - Display text (hero, page titles)

## Components

### Borders
- Primary: 4px solid black
- Secondary: 2px solid black
- Accent: 4px or 8px solid sage

### Rotated Labels
- 10px uppercase text
- Rotated 90deg (vertical)
- Used for metadata, section labels

### Cards
- Flat design (no shadows)
- Thick borders
- Hover: Border color change to sage

### Grid Overlay
- 80px repeating grid
- Visible on hero and select sections
- Creates "construction" aesthetic

## Patterns

### Featured Content
- First item: Sage background, white text
- Subsequent items: White background, varying border treatments

### Blog Posts
- Alternating left/right border accents
- Sage backgrounds on every other post
- Rotated date labels

### Interactive Elements
- Hover: Background changes to sage, text inverts
- Transitions: 200ms ease
- No animations on scroll (subtle only)

## Responsive Behavior

- Mobile: Simplified chaos, stack layouts, preserve key rotated elements
- Desktop: Full deconstructed layouts, overlapping sections, chaotic grid

## Accessibility

- Maintain color contrast (black on white, white on sage)
- Preserve semantic HTML
- Ensure rotated text has proper aria labels if needed
- Keyboard navigation fully supported
