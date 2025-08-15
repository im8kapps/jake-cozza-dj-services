# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Overview

This is a professional DJ services landing page for Jake Cozza's business in the Indianapolis area. It's a static website built with vanilla HTML, CSS, and JavaScript, optimized for performance and accessibility.

## Project Structure

- `index.html` - Main landing page with semantic HTML structure
- `styles.css` - Complete stylesheet using CSS custom properties design system
- `script.js` - Interactive features (form validation, modal handling, smooth scrolling)
- `sw.js` - Service worker for PWA features and caching
- `manifest.json` - Web app manifest for PWA installation
- `netlify.toml` - Netlify deployment configuration with security headers

## Development Commands

This is a static website with no build process required:

- **Local Development**: Open `index.html` directly in browser or use Live Server extension
- **Testing**: Manual testing across different devices and browsers
- **Deployment**: Automatic deployment via Netlify when pushing to GitHub

## Architecture & Design System

### CSS Architecture
- **Design System**: CSS custom properties in `:root` for colors, typography, spacing
- **Color Scheme**: Professional blue theme (`--color-primary: #1e3a8a`)
- **Typography**: Inter font family with responsive scale
- **Layout**: CSS Grid and Flexbox for responsive design
- **Mobile-First**: Responsive design starting at 320px width

### JavaScript Architecture
- **Modular Functions**: Each feature in separate initialization function
- **Event-Driven**: All interactions use addEventListener pattern
- **Form Handling**: Client-side validation with Netlify Forms backend
- **Accessibility**: Focus management and keyboard navigation support

### Component Structure
- **Header**: Fixed navigation with smooth scrolling
- **Hero Section**: Call-to-action with quote modal trigger
- **About Section**: Professional bio and credentials
- **Services**: Grid layout of DJ service offerings
- **Why Choose**: Feature highlights with icons
- **Contact**: Modal form with validation and success states

## Form Integration

- **Backend**: Netlify Forms with automatic spam protection
- **Validation**: Real-time client-side validation with error messages
- **Honeypot**: Anti-spam field (`bot-field`) hidden from users
- **Success Handling**: In-modal success message after submission

## Performance & SEO

### Performance Targets
- Load time: <3 seconds on 3G connection
- Lighthouse scores: >90 Performance, >95 Accessibility
- File sizes: Total <500KB

### SEO Features
- Semantic HTML with proper heading hierarchy
- Meta tags optimized for local search ("Indianapolis DJ")
- Open Graph and Twitter Card meta tags
- Structured data ready for business information

## Deployment

- **Platform**: Netlify with automatic GitHub integration
- **Configuration**: `netlify.toml` handles security headers and redirects
- **SSL**: Automatic HTTPS with Netlify certificate
- **Forms**: Netlify Forms automatically processes contact form submissions

## Content Structure

### Contact Information (Current)
- Phone: (312) 438-8771
- Email: jakecozzadj@gmail.com
- Service area: Greater Indianapolis Area

### Key Sections in `index.html`
- Hero section: Lines ~45-65
- About section: Lines ~80-110
- Services grid: Lines ~115-150
- Why choose section: Lines ~155-185
- Contact modal: Lines ~190-230

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge - latest 2 versions)
- Mobile browsers (iOS Safari, Chrome Android)
- Progressive enhancement for older browsers

## Accessibility Features

- WCAG 2.1 AA compliant
- Semantic HTML with proper landmarks
- Keyboard navigation support
- Screen reader friendly with ARIA labels
- High contrast ratios
- Reduced motion respect (`prefers-reduced-motion`)