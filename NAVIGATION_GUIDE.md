# 🧭 Navigation Guide - Jake Cozza DJ Services

## Quick Reference Navigation

### 📖 Documentation Hierarchy
```
📁 Jake Cozza DJ Services Documentation
├── 🏠 PROJECT_INDEX.md          # Complete project overview and reference
├── 📋 README.md                 # Main project documentation
├── 🚀 DEPLOYMENT.md             # Live site and deployment info
├── 🔧 GIT_WORKFLOW.md           # Version control and development workflow
├── 🧭 NAVIGATION_GUIDE.md       # This navigation reference
└── 🤖 CLAUDE.md                 # AI assistant project context
```

---

## 🎯 What Do You Need?

### 🚀 **Getting Started**
- **New to the project?** → Start with [`README.md`](README.md)
- **Complete overview?** → Go to [`PROJECT_INDEX.md`](PROJECT_INDEX.md)
- **Need to deploy?** → Check [`DEPLOYMENT.md`](DEPLOYMENT.md)

### 🔍 **Finding Specific Information**

#### 📋 Project Overview & Setup
- **Technology stack** → [`README.md`](README.md#technology-stack)
- **Features list** → [`README.md`](README.md#features)
- **Installation guide** → [`README.md`](README.md#development)
- **Browser support** → [`README.md`](README.md#browser-support)

#### 🏗️ **Architecture & Code Structure**
- **Complete file structure** → [`PROJECT_INDEX.md`](PROJECT_INDEX.md#-project-structure)
- **Code architecture** → [`PROJECT_INDEX.md`](PROJECT_INDEX.md#️-architecture--technology-stack)
- **Core files breakdown** → [`PROJECT_INDEX.md`](PROJECT_INDEX.md#-core-files-reference)
- **Design system** → [`PROJECT_INDEX.md`](PROJECT_INDEX.md#-design-system)

#### 🎨 **Customization & Content**
- **Updating content** → [`README.md`](README.md#content-updates) or [`PROJECT_INDEX.md`](PROJECT_INDEX.md#-code-navigation-guide)
- **Styling changes** → [`README.md`](README.md#customization) or [`PROJECT_INDEX.md`](PROJECT_INDEX.md#-design-system)
- **Color scheme** → [`PROJECT_INDEX.md`](PROJECT_INDEX.md#color-palette)
- **Typography system** → [`PROJECT_INDEX.md`](PROJECT_INDEX.md#typography-scale)

#### 🔧 **Development & Workflow**
- **Git workflow** → [`GIT_WORKFLOW.md`](GIT_WORKFLOW.md)
- **Making changes** → [`GIT_WORKFLOW.md`](GIT_WORKFLOW.md#development-workflow)
- **Commit conventions** → [`GIT_WORKFLOW.md`](GIT_WORKFLOW.md#commit-message-conventions)
- **Testing checklist** → [`README.md`](README.md#testing-checklist)

#### 🚀 **Deployment & Live Site**
- **Live site URL** → [`DEPLOYMENT.md`](DEPLOYMENT.md)
- **Deployment status** → [`DEPLOYMENT.md`](DEPLOYMENT.md#-deployment-details)
- **Form handling** → [`DEPLOYMENT.md`](DEPLOYMENT.md#-form-handling)
- **Performance metrics** → [`PROJECT_INDEX.md`](PROJECT_INDEX.md#-performance--analytics)

#### 📊 **Performance & Analytics**
- **Performance targets** → [`README.md`](README.md#performance-targets)
- **Analytics setup** → [`README.md`](README.md#analytics-setup)
- **Core Web Vitals** → [`PROJECT_INDEX.md`](PROJECT_INDEX.md#performance-targets)
- **SEO features** → [`README.md`](README.md#seo-optimization)

#### ♿ **Accessibility & Compliance**
- **Accessibility features** → [`README.md`](README.md#accessibility-features)
- **WCAG compliance** → [`PROJECT_INDEX.md`](PROJECT_INDEX.md#-accessibility-features)
- **Testing guidelines** → [`PROJECT_INDEX.md`](PROJECT_INDEX.md#accessibility-testing)

---

## 📁 File-Specific Navigation

### `index.html` - Main Landing Page
| Need to find... | Go to section... | Line numbers |
|------------------|-------------------|--------------|
| **Page title & meta tags** | Head section | 1-39 |
| **Navigation menu** | Header | 42-53 |
| **Hero section content** | Hero | 56-118 |
| **About Jake content** | About | 121-176 |
| **Service offerings** | Services | 179-234 |
| **Customer testimonials** | Testimonials | 237-306 |
| **Contact information** | Contact | 337-371 |
| **Quote form** | Modal | 374-448 |
| **Analytics setup** | Scripts | 461-479 |

### `styles.css` - Complete Stylesheet
| Need to change... | Go to section... | Line numbers |
|--------------------|-------------------|--------------|
| **Colors & branding** | CSS Variables | 1-85 |
| **Fonts & typography** | Typography vars | 34-47 |
| **Button styling** | Button components | 144-234 |
| **Navigation styling** | Navigation | 235-300 |
| **Hero section design** | Hero section | 301-590 |
| **About section layout** | About section | 592-771 |
| **Service cards** | Services | 773-901 |
| **Form styling** | Modal & Forms | 1061-1354 |
| **Animations** | Keyframes | 1469-1547 |
| **Mobile responsive** | Media queries | Throughout |

### `script.js` - Interactive Features
| Need to modify... | Go to function... | Line numbers |
|--------------------|-------------------|--------------|
| **Testimonial carousel** | Testimonial functions | 12-76 |
| **Navigation scrolling** | initSmoothScrolling | 78-99 |
| **Modal behavior** | Modal functions | 101-133 |
| **Form validation** | Form validation | 135-235 |
| **Form submission** | handleFormSubmit | 237-329 |
| **Page animations** | initAnimations | 331-407 |
| **Analytics tracking** | Analytics functions | 409-481 |

---

## 🎯 Common Tasks Quick Reference

### 📝 **Content Updates**
1. **Update Jake's bio** → [`index.html`](index.html) lines 130-134
2. **Change contact info** → [`index.html`](index.html) lines 350, 356, 362
3. **Modify services** → [`index.html`](index.html) lines 187-231
4. **Edit testimonials** → [`index.html`](index.html) lines 245-285

### 🎨 **Design Changes**
1. **Change color scheme** → [`styles.css`](styles.css) lines 2-27
2. **Update fonts** → [`styles.css`](styles.css) lines 34-47
3. **Modify button styles** → [`styles.css`](styles.css) lines 144-234

### 🔧 **Technical Changes**
1. **Form validation rules** → [`script.js`](script.js) lines 157-212
2. **Analytics events** → [`script.js`](script.js) lines 409-481
3. **Performance optimization** → [`PROJECT_INDEX.md`](PROJECT_INDEX.md#-performance--analytics)

### 🚀 **Deployment Tasks**
1. **Push changes** → [`GIT_WORKFLOW.md`](GIT_WORKFLOW.md#development-workflow)
2. **Check live site** → [`DEPLOYMENT.md`](DEPLOYMENT.md)
3. **Monitor forms** → Netlify admin panel

---

## 🔍 Search & Find Guide

### Finding Code Patterns
```bash
# Find all color references
grep -n "color-primary" styles.css

# Find form-related code
grep -rn "form" *.js *.html

# Find analytics tracking
grep -n "gtag" script.js
```

### Finding Content
```bash
# Find contact information
grep -rn "312" *.html *.md

# Find testimonials
grep -n "testimonial" index.html

# Find service descriptions
grep -A 5 "service-card__title" index.html
```

---

## 📞 Quick Contact Reference

### Project Contacts
- **Client**: Jake Cozza DJ Services
- **Phone**: (312) 438-8771
- **Email**: jakecozza.dj@gmail.com
- **Service Area**: Greater Indianapolis Area

### Technical Information
- **Live Site**: https://jake-cozza-dj-services.netlify.app
- **GitHub**: https://github.com/im8kapps/jake-cozza-dj-services
- **Netlify Admin**: https://app.netlify.com/projects/jake-cozza-dj-services

---

## 🚀 Emergency Quick Fixes

### Site Down?
1. Check [`DEPLOYMENT.md`](DEPLOYMENT.md) for live site status
2. Verify GitHub repository is accessible
3. Check Netlify admin panel for deployment errors

### Form Not Working?
1. Verify form validation in [`script.js`](script.js) lines 135-329
2. Confirm the form attributes in [`index.html`](index.html) lines 374-448 include `data-netlify="true"`
3. Check Netlify Forms configuration and notifications

### Styling Issues?
1. Check [`styles.css`](styles.css) for CSS conflicts
2. Verify CSS custom properties in lines 1-85
3. Test responsive design on multiple devices

### Content Updates Needed?
1. **Bio**: [`index.html`](index.html) lines 130-134
2. **Contact**: [`index.html`](index.html) lines 350, 356, 362
3. **Services**: [`index.html`](index.html) lines 187-231

---

*This navigation guide helps you quickly find what you need in the Jake Cozza DJ Services project. For complete project overview, see [`PROJECT_INDEX.md`](PROJECT_INDEX.md).*
