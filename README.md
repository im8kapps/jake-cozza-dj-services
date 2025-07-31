# Jake Cozza DJ Services - Landing Page

A professional, mobile-first landing page for Jake Cozza's DJ services in the Indianapolis area.

## Features

- **Responsive Design**: Mobile-first approach with desktop optimization
- **Performance Optimized**: <3 second load time, optimized for Core Web Vitals
- **Accessibility**: WCAG 2.1 AA compliant with keyboard navigation
- **Form Integration**: Quote request form with Netlify Forms integration
- **Analytics Ready**: Google Analytics 4 integration with conversion tracking
- **SEO Optimized**: Meta tags, Open Graph, and local SEO optimization

## Technology Stack

- **HTML5**: Semantic markup with accessibility features
- **CSS3**: Custom properties, CSS Grid, Flexbox, mobile-first responsive design
- **Vanilla JavaScript**: Form validation, modal handling, smooth scrolling
- **Netlify Forms**: Contact form handling with spam protection
- **Service Worker**: Basic PWA features and caching

## Project Structure

```
├── index.html          # Main landing page
├── styles.css          # Complete stylesheet with design system
├── script.js           # Interactive features and form handling
├── sw.js              # Service worker for PWA features
├── manifest.json      # Web app manifest
└── README.md          # This file
```

## Performance Targets

- **Load Time**: <3 seconds on 3G connection
- **Lighthouse Scores**: >90 Performance, >95 Accessibility
- **Core Web Vitals**: LCP <2.5s, FID <100ms, CLS <0.1
- **File Sizes**: Total <500KB, Images <300KB

## Deployment

### Netlify (Recommended)
1. Connect GitHub repository to Netlify
2. Build settings: None required (static site)
3. Form handling: Automatically detected
4. Custom domain: Configure DNS settings

### Alternative Platforms
- **Vercel**: Zero-config deployment
- **GitHub Pages**: Enable in repository settings
- **Firebase Hosting**: Use Firebase CLI

## Form Setup

The quote request form is configured for Netlify Forms:
- Automatic spam protection with honeypot
- Email notifications to site owner
- Success/error handling with user feedback
- Form validation with real-time error messages

To use with other services:
1. Update form action in HTML
2. Modify form submission handler in script.js
3. Configure backend service (Formspree, EmailJS, etc.)

## Analytics Setup

1. Replace `GA_MEASUREMENT_ID` in index.html with your Google Analytics ID
2. Configure conversion goals in Google Analytics
3. Set up Google Tag Manager (optional)

## Content Updates

### Contact Information
Current contact details:
- Phone number: (312) 438-8771
- Email address: jakecozzadj@gmail.com
- Service area: Greater Indianapolis Area

### Services & Content
- Hero section: Lines 45-65
- About section: Lines 80-110
- Services: Lines 115-150
- Why Choose: Lines 155-185

### Styling
All styles are in `styles.css` using CSS custom properties:
- Colors: Lines 2-13
- Typography: Lines 15-25
- Spacing: Lines 27-37

## SEO Optimization

- **Title Tags**: Optimized for local search
- **Meta Description**: Compelling with call-to-action
- **Header Structure**: Proper H1-H6 hierarchy
- **Local Keywords**: "Indianapolis", "DJ services"
- **Structured Data**: Business information markup
- **Open Graph**: Social media sharing optimization

## Accessibility Features

- **Semantic HTML**: Proper heading structure and landmarks
- **Keyboard Navigation**: Full keyboard accessibility
- **Screen Reader Support**: ARIA labels and descriptions
- **Color Contrast**: WCAG AA compliant contrast ratios
- **Focus Management**: Visible focus indicators
- **Reduced Motion**: Respects user motion preferences

## Browser Support

- **Chrome**: Latest 2 versions
- **Firefox**: Latest 2 versions
- **Safari**: Latest 2 versions
- **Edge**: Latest 2 versions
- **Mobile**: iOS Safari, Chrome Android

## Development

### Local Development
1. Clone repository
2. Open `index.html` in browser
3. Use Live Server for auto-reload during development

### Testing Checklist
- [ ] Mobile responsiveness (320px - 1920px)
- [ ] Form submission and validation
- [ ] Cross-browser compatibility
- [ ] Lighthouse performance audit
- [ ] Accessibility audit (WAVE, axe)
- [ ] Contact information accuracy

## Customization

### Colors
Update CSS custom properties in `:root`:
```css
--color-primary: #1a1a2e;
--color-accent: #ff6b35;
```

### Fonts
Replace Google Fonts link in HTML:
```html
<link href="https://fonts.googleapis.com/css2?family=YourFont&display=swap">
```

### Layout
Modify grid layouts in CSS:
- Hero: `.hero__container`
- Services: `.services__grid`
- Features: `.why-choose__grid`

## License

© 2025 Jake Cozza DJ Services. All rights reserved.

## Support

For technical issues or customization requests, please contact the development team.