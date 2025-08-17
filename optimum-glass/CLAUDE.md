# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Overview

This is a professional glass services landing page for Optimum Glass in the Indianapolis area. It's a static website built with vanilla HTML, CSS, and JavaScript, optimized for performance and accessibility. The site was adapted from a DJ services template to create a professional glass business website.

## Project Structure

- `index.html` - Main landing page with semantic HTML structure for glass services
- `styles.css` - Complete stylesheet using CSS custom properties design system with professional blue/green theme
- `script.js` - Interactive features (form validation, modal handling, smooth scrolling, emergency service detection)
- `sw.js` - Service worker for PWA features and caching
- `manifest.json` - Web app manifest for PWA installation
- `netlify.toml` - Netlify deployment configuration with security headers and redirects

## Development Commands

This is a static website with no build process required:

- **Local Development**: Open `index.html` directly in browser or use Live Server extension
- **Testing**: Manual testing across different devices and browsers
- **Deployment**: Automatic deployment via Netlify when pushing to GitHub

## Architecture & Design System

### CSS Architecture
- **Design System**: CSS custom properties in `:root` for colors, typography, spacing
- **Color Scheme**: Professional blue/green theme (`--color-primary: #2563eb`, `--color-accent: #059669`)
- **Typography**: Inter and Roboto font families with responsive scale
- **Layout**: CSS Grid and Flexbox for responsive design
- **Mobile-First**: Responsive design starting at 320px width

### JavaScript Architecture
- **Modular Functions**: Each feature in separate initialization function
- **Event-Driven**: All interactions use addEventListener pattern
- **Form Handling**: Client-side validation with Netlify Forms backend
- **Accessibility**: Focus management and keyboard navigation support
- **Emergency Service**: After-hours emergency banner with special phone tracking

### Component Structure
- **Header**: Fixed navigation with smooth scrolling
- **Hero Section**: Call-to-action with glass pattern background
- **About Section**: Professional bio with 10+ years experience
- **Services**: Grid layout of glass service offerings (Auto, Residential, Commercial)
- **Why Choose**: Feature highlights with family business focus
- **Contact**: Modal form with validation and success states

## Business Information

### Contact Information
- Phone: (469) 794-5717
- Email: info@optimumglasstech.com
- Service area: Indianapolis & Surrounding Areas

### Services Offered
- Auto Glass Repair and Replacement
- Residential Window Installation
- Commercial Glass Solutions
- Emergency Glass Repair (24/7)

### Key Value Propositions
- Family-owned business with 10+ years experience
- "Quality work at the best price"
- "We aren't satisfied until our customers are satisfied"
- Professional, reliable, and affordable service

## Form Integration

- **Backend**: Netlify Forms with automatic spam protection
- **Form Name**: `glass-quote-request` for Netlify Forms processing
- **Validation**: Real-time client-side validation with error messages
- **Honeypot**: Anti-spam field (`bot-field`) hidden from users
- **Success Handling**: In-modal success message after submission
- **Service Pre-selection**: URL parameters can auto-select service type (`?service=auto`)

## Performance & SEO

### Performance Targets
- Load time: <3 seconds on 3G connection
- Lighthouse scores: >90 Performance, >95 Accessibility
- File sizes: Total <500KB

### SEO Features
- Semantic HTML with proper heading hierarchy
- Meta tags optimized for local search ("Indianapolis glass repair")
- Open Graph and Twitter Card meta tags
- Structured data ready for business information
- Local business schema markup ready for implementation

## Deployment

- **Platform**: Netlify with automatic GitHub integration
- **Configuration**: `netlify.toml` handles security headers and redirects
- **SSL**: Automatic HTTPS with Netlify certificate
- **Forms**: Netlify Forms automatically processes contact form submissions
- **Redirects**: SEO-friendly redirects for common glass service searches

## Special Features

### Emergency Service Detection
- After-hours banner (before 7am or after 6pm) with emergency contact
- Emergency call tracking for analytics
- Prominent emergency service messaging

### Analytics Integration
- Google Analytics with custom events for glass business
- Service interest tracking by card clicks
- Estimate request conversion tracking
- Emergency contact tracking
- Scroll depth and engagement metrics

### URL Parameters
- `?service=auto` - Auto-opens quote modal with auto glass pre-selected
- `?service=residential` - Pre-selects residential windows
- `?service=commercial` - Pre-selects commercial glass
- `?service=emergency` - Pre-selects emergency repair

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

## Content Areas in `index.html`

### Key Sections
- Hero section: Lines ~56-118 (glass pattern background, main CTA)
- About section: Lines ~121-176 (company info, experience highlights)
- Services grid: Lines ~179-234 (auto, residential, commercial glass)
- Testimonials: Lines ~237-304 (customer reviews carousel)
- Why choose section: Lines ~308-334 (family business, pricing, satisfaction)
- Contact modal: Lines ~374-447 (estimate request form)

### Contact Form Structure
- Located in modal starting at line ~374
- Form ID: `quoteForm`
- Required fields: name, email, phone, serviceType
- Optional: message for project details
- Netlify Forms integration with honeypot protection

## Customization Notes

When updating content:
- Contact information is in multiple locations (hero, contact section, modal, footer)
- Service descriptions in services grid can be customized for specific offerings
- Testimonials can be updated with real customer reviews
- Emergency hours logic is in script.js `handleEmergencyService()` function
- Analytics tracking can be customized in script.js `initAnalytics()` function