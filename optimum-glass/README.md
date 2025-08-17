# Optimum Glass - Professional Glass Services Website

A professional, responsive website for Optimum Glass, a family-owned glass repair and replacement business serving the Indianapolis area. Built with modern web technologies and optimized for performance, accessibility, and SEO.

## 🌟 Features

- **Professional Design**: Clean, modern design with glass-themed visual elements
- **Mobile-First Responsive**: Optimized for all devices and screen sizes
- **Fast Performance**: Lightweight vanilla JavaScript, optimized images, and efficient CSS
- **SEO Optimized**: Semantic HTML, meta tags, and structured data ready
- **Accessibility**: WCAG 2.1 AA compliant with keyboard navigation and screen reader support
- **PWA Ready**: Service worker caching and web app manifest
- **Form Integration**: Contact form with Netlify Forms backend and spam protection
- **Emergency Service**: After-hours emergency banner with priority contact options

## 🚀 Quick Start

### Local Development

1. Clone or download this repository
2. Open `index.html` in your web browser
3. Or use a local server like Live Server extension in VS Code

No build process required - this is a static website!

### Deployment

This site is configured for easy deployment on Netlify:

1. Connect your GitHub repository to Netlify
2. Netlify will automatically deploy on every push to main branch
3. Forms will work automatically with Netlify Forms
4. SSL certificate is automatically provisioned

## 📁 Project Structure

```
optimum-glass/
├── index.html          # Main landing page
├── styles.css          # All styles and design system
├── script.js           # Interactive functionality
├── manifest.json       # PWA manifest
├── sw.js              # Service worker for caching
├── netlify.toml       # Deployment configuration
├── CLAUDE.md          # Developer documentation
└── README.md          # This file
```

## 🎨 Design System

### Color Palette
- **Primary Blue**: #2563eb (Professional, trustworthy)
- **Secondary Blue**: #1e40af (Depth and reliability)  
- **Accent Green**: #059669 (Growth and quality)
- **Professional Gray**: #1e293b (Modern, clean)

### Typography
- **Primary Font**: Inter (clean, readable)
- **Display Font**: Roboto (professional headings)
- **Responsive Scale**: 0.75rem to 4rem with fluid scaling

### Key Components
- Professional glass-themed animations
- Interactive service cards with hover effects
- Modal-based quote request form
- Testimonial carousel
- Emergency service banner (after hours)

## 📱 Services Offered

1. **Auto Glass Services**
   - Windshield repair and replacement
   - Window replacement
   - Mobile service available

2. **Residential Glass**
   - Window replacement and installation
   - Security glass options
   - Energy-efficient solutions

3. **Commercial Glass**
   - Storefront glass installation
   - Office windows
   - Emergency repair services

## 🔧 Configuration

### Contact Information
Update contact details in these locations:
- Hero section contact info
- Contact section details  
- Modal form email settings
- Footer information

### Analytics
Replace `GA_MEASUREMENT_ID` in index.html with your Google Analytics tracking ID.

### Form Handling
The contact form uses Netlify Forms. Ensure the form includes:
```html
<input type="hidden" name="form-name" value="glass-quote-request" />
```

### Emergency Hours
Emergency service banner appears outside business hours (before 7am or after 6pm). Modify the logic in `script.js` function `handleEmergencyService()`.

## 🚀 Performance Features

- **Lightweight**: Total size under 500KB
- **Fast Loading**: Critical CSS inlined, fonts optimized
- **Caching**: Service worker caches resources
- **Optimized Images**: WebP with fallbacks where needed
- **Minified Assets**: Production-ready code

## ♿ Accessibility Features

- Semantic HTML structure
- ARIA labels and landmarks
- Keyboard navigation support
- Screen reader optimization
- High contrast ratios
- Respects `prefers-reduced-motion`

## 🔍 SEO Optimization

- Meta tags for local search
- Open Graph and Twitter Card tags
- Semantic HTML structure
- Local business schema ready
- Optimized for "Indianapolis glass repair" searches

## 📈 Analytics & Tracking

The site includes comprehensive analytics tracking:
- Page load performance
- User engagement metrics
- Service interest tracking
- Form conversion tracking
- Emergency contact tracking
- Scroll depth analysis

## 🛠️ Customization

### Adding New Services
1. Update the services grid in `index.html`
2. Add corresponding tracking in `script.js`
3. Update the contact form service options

### Changing Business Hours
Modify the emergency service detection in `script.js`:
```javascript
const isAfterHours = currentHour < 7 || currentHour > 18;
```

### Updating Testimonials
Replace testimonial content in the carousel section of `index.html`.

## 🌐 Browser Support

- Chrome, Firefox, Safari, Edge (latest 2 versions)
- Mobile browsers (iOS Safari, Chrome Android)
- Progressive enhancement for older browsers

## 📞 Business Information

- **Phone**: (469) 794-5717
- **Email**: info@optimumglasstech.com
- **Service Area**: Indianapolis & Surrounding Areas
- **Experience**: 10+ years in glass services
- **Specialization**: Auto, residential, and commercial glass

## 🔒 Security Features

- Security headers via Netlify configuration
- XSS protection enabled
- Content Security Policy ready
- Form spam protection with honeypot
- HTTPS enforcement

## 📝 License

This project is created for Optimum Glass. All rights reserved.

## 🤝 Support

For technical support or modifications, refer to the `CLAUDE.md` file for detailed developer documentation.