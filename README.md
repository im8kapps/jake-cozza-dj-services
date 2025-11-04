# Jake Cozza DJ Services 🎧

A modern, vibrant website for professional DJ services in the Indianapolis area. Built with vanilla HTML, CSS, and JavaScript, featuring glassmorphism design effects, smooth animations, and a complete backend integration for quote requests.

## 🌟 Features

- **Modern Design**: Glassmorphism effects with vibrant DJ-themed colors
- **Responsive Layout**: Mobile-first design that works on all devices
- **Interactive Elements**: Animated music visualizer, spinning vinyl records, and smooth transitions
- **Contact Form**: Captures leads via Netlify Forms with instant email notices
- **Admin Dashboard**: Simple dashboard to manage quote requests
- **PWA Ready**: Service worker for offline functionality

## 🎨 Design System

- **Primary Colors**: Electric Purple (#6366f1), Hot Pink (#ec4899), Cyan (#06b6d4)
- **Effects**: Glassmorphism with backdrop-filter and rgba backgrounds
- **Typography**: Inter font family with responsive scaling
- **Animations**: CSS animations for visual appeal and user engagement

## 🚀 Tech Stack

- **Frontend**: Vanilla HTML, CSS, JavaScript
- **Backend**: Netlify Functions (Node 18)
- **Storage**: Netlify Forms submissions (status tracked via submission state)
- **Notifications**: Netlify Form email alerts
- **Hosting**: Netlify Sites + CDN

## 📁 Project Structure

```
jake-cozza-dj-services/
├── index.html              # Main landing page
├── admin.html              # Admin dashboard
├── styles.css              # Complete stylesheet
├── script.js               # Interactive features
├── sw.js                   # Service worker
├── manifest.json           # PWA manifest
├── assets/                 # Marketing imagery
├── netlify/
│   └── functions/
│       └── admin.js        # Admin dashboard API + status updates
├── netlify.toml            # Netlify configuration (redirects, headers)
├── package.json            # Scripts and dependencies
└── docs (*.md)             # Project guides and workflow references
```

## 🛠️ Setup Instructions

### 1. Clone and Install

```bash
git clone https://github.com/your-username/jake-cozza-dj-services.git
cd jake-cozza-dj-services
npm install
```

### 2. Netlify Forms & Notifications

1. Deploy the site once so Netlify detects the `quote` form.
2. In the Netlify dashboard, enable email notifications for the form so the admin receives new requests.
3. Copy the form ID from **Site dashboard → Forms → quote → Settings & usage** for use in the admin API.

### 3. Environment Variables

1. Create a `.env.local` file in the project root.
2. Add the following variables:

```env
ADMIN_PASSWORD=your-secure-password
NETLIFY_FORM_ID=your-netlify-form-id
NETLIFY_ACCESS_TOKEN=your-netlify-personal-access-token
```

> The Netlify access token needs the `forms:read` scope to fetch submissions and `forms:write` to update their state.

### 4. Deploy to Netlify

1. Install the Netlify CLI (`npm install -g netlify-cli`) or use the Netlify UI.
2. Run `netlify init` to link the site (or connect the repository via app.netlify.com).
3. Configure the same environment variables in the Netlify dashboard.
4. Deploy with `npm run deploy` or by pushing to the connected branch.

## 🔧 Development

### Local Development

```bash
npm run dev
```

> Requires the Netlify CLI. Install it globally with `npm install -g netlify-cli` if you haven't already.

The dev server proxies Netlify Functions at `/api/*`, so the contact form and dashboard behave the same as production.

### Testing Contact Form

1. Fill out the quote form on the homepage.
2. Check Netlify function logs (`netlify functions:log`) for admin API activity.
3. Confirm the email notification arrives in the admin inbox.
4. Verify the submission appears under **Forms → quote** in the Netlify dashboard.

### Admin Dashboard

Access the admin dashboard at `/admin.html` with your admin password (if configured).

## 📊 Quote Storage & Statuses

- **Quote submissions** are stored automatically by Netlify Forms and can be reviewed in the Netlify dashboard.
- **Status updates** (pending or accepted) mirror the submission state (`new` or `read`) and are managed through the admin dashboard.
- **Admin access** requires the password you define in `ADMIN_PASSWORD` and uses your Netlify personal access token behind the scenes.

## 📧 Email Notifications

- Configure email notifications inside Netlify so the admin is alerted as soon as a submission arrives.
- Add additional recipients in **Forms → quote → Notifications** if multiple team members should be notified.
- No third-party email provider or API keys are required.

## 🔐 Security

- **Environment Variables**: Protect admin credentials and Netlify tokens outside of version control
- **Admin Password**: Bearer token guard on the dashboard API
- **Input Validation**: Client-side validation before submissions reach Netlify
- **Netlify Forms**: Honeypot field and spam filtering built into the platform

## 🚀 Performance

- **Optimized Assets**: Compressed images and efficient CSS
- **Service Worker**: Caching for offline functionality
- **Lazy Loading**: Efficient resource loading
- **CDN Delivery**: Netlify's global CDN for fast loading

## 📱 Mobile Experience

- **Responsive Design**: Mobile-first approach
- **Touch Interactions**: Optimized for touch devices
- **Fast Loading**: Optimized for mobile networks
- **PWA Features**: Installable web app

## 🎵 Content Management

### Updating Contact Information

Edit the contact details in `index.html` (lines ~325-330) and update the Netlify form notification recipients if the destination email changes.

### Adding New Services

Add services to the services grid in `index.html` (lines ~115-150).

### Modifying Colors

Update CSS custom properties in `styles.css` (lines ~1-15) to change the color scheme.

## 🔍 Monitoring

### Error Tracking

- Check Netlify function logs for API errors
- Review Netlify Forms dashboard for submission issues or spam flags
- Review browser console for frontend errors

### Analytics

Consider adding:
- Google Analytics for traffic monitoring
- Hotjar for user behavior analysis
- Uptime monitoring for availability

## 🚀 Future Enhancements

- **User Authentication**: Secure admin login system
- **Quote Management**: Update quote status and add notes
- **Calendar Integration**: Sync with Google Calendar
- **Payment Integration**: Stripe for booking deposits
- **SMS Notifications**: Text message alerts
- **Advanced Analytics**: Business intelligence dashboard

## 📞 Support

For technical support or questions:
- **Email**: jakecozza.dj@gmail.com
- **Phone**: (312) 438-8771
- **Service Area**: Greater Indianapolis Area

## 📄 License

MIT License - see LICENSE file for details.

---

**Jake Cozza DJ Services** - Making moments unforgettable 🎵
