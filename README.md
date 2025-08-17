# Jake Cozza DJ Services 🎧

A modern, vibrant website for professional DJ services in the Indianapolis area. Built with vanilla HTML, CSS, and JavaScript, featuring glassmorphism design effects, smooth animations, and a complete backend integration for quote requests.

## 🌟 Features

- **Modern Design**: Glassmorphism effects with vibrant DJ-themed colors
- **Responsive Layout**: Mobile-first design that works on all devices
- **Interactive Elements**: Animated music visualizer, spinning vinyl records, and smooth transitions
- **Contact Form**: Integrated with database storage and email notifications
- **Admin Dashboard**: Simple dashboard to manage quote requests
- **PWA Ready**: Service worker for offline functionality

## 🎨 Design System

- **Primary Colors**: Electric Purple (#6366f1), Hot Pink (#ec4899), Cyan (#06b6d4)
- **Effects**: Glassmorphism with backdrop-filter and rgba backgrounds
- **Typography**: Inter font family with responsive scaling
- **Animations**: CSS animations for visual appeal and user engagement

## 🚀 Tech Stack

- **Frontend**: Vanilla HTML, CSS, JavaScript
- **Backend**: Vercel Serverless Functions
- **Database**: Supabase PostgreSQL
- **Email**: Resend email service
- **Hosting**: Vercel with automatic deployments

## 📁 Project Structure

```
jake-cozza-dj-services/
├── index.html              # Main landing page
├── admin.html              # Admin dashboard
├── styles.css              # Complete stylesheet
├── script.js               # Interactive features
├── sw.js                   # Service worker
├── manifest.json           # PWA manifest
├── api/
│   ├── contact.js          # Contact form handler
│   └── admin.js            # Admin API endpoints
├── lib/
│   └── email.js            # Email service module
├── database/
│   └── schema.sql          # Database schema
├── package.json            # Dependencies
├── vercel.json             # Vercel configuration
└── .env.example            # Environment variables template
```

## 🛠️ Setup Instructions

### 1. Clone and Install

```bash
git clone https://github.com/your-username/jake-cozza-dj-services.git
cd jake-cozza-dj-services
npm install
```

### 2. Database Setup (Supabase)

1. Create a new project at [supabase.com](https://supabase.com)
2. Run the SQL commands from `database/schema.sql` in the Supabase SQL editor
3. Get your project URL and service role key from Settings > API

### 3. Email Setup (Resend)

1. Create an account at [resend.com](https://resend.com)
2. Get your API key from the dashboard
3. Verify your domain (optional, but recommended for production)

### 4. Environment Variables

1. Copy `.env.example` to `.env.local`
2. Fill in your actual values:

```env
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
RESEND_API_KEY=re_your-api-key
FROM_EMAIL=noreply@jakecozzadj.com
ADMIN_EMAIL=jakecozzadj@gmail.com
ADMIN_PASSWORD=your-secure-password
```

### 5. Deploy to Vercel

1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

## 🔧 Development

### Local Development

```bash
npm run dev
# or
vercel dev
```

This starts the Vercel development server with serverless functions.

### Testing Contact Form

1. Fill out the contact form on the homepage
2. Check Vercel function logs for processing details
3. Verify email notifications are sent
4. Check Supabase dashboard for database entries

### Admin Dashboard

Access the admin dashboard at `/admin.html` with your admin password (if configured).

## 📊 Database Schema

The `quote_requests` table stores all contact form submissions:

- **id**: Auto-incrementing primary key
- **name**: Customer name
- **email**: Customer email
- **phone**: Customer phone number
- **event_date**: Date of the event
- **event_type**: Type of event (Wedding, Corporate, etc.)
- **message**: Additional details (optional)
- **status**: Request status (pending, contacted, quoted, booked, etc.)
- **created_at**: Timestamp of submission
- **updated_at**: Timestamp of last update

## 📧 Email Integration

### Features

- **Admin Notifications**: Jake receives detailed quote requests
- **Customer Confirmations**: Optional thank you emails to customers
- **Professional Templates**: HTML and plain text versions
- **Contact Links**: Direct email and phone links for easy response

### Email Templates

The email service includes professional templates with:
- Branded headers with gradient styling
- Organized contact information
- Action buttons for quick response
- Mobile-responsive design

## 🔐 Security

- **Environment Variables**: Sensitive data stored in environment variables
- **Row Level Security**: Database access controlled by Supabase RLS
- **Input Validation**: Server-side validation for all form inputs
- **CORS Configuration**: Proper CORS headers for API security

## 🚀 Performance

- **Optimized Assets**: Compressed images and efficient CSS
- **Service Worker**: Caching for offline functionality
- **Lazy Loading**: Efficient resource loading
- **CDN Delivery**: Vercel's global CDN for fast loading

## 📱 Mobile Experience

- **Responsive Design**: Mobile-first approach
- **Touch Interactions**: Optimized for touch devices
- **Fast Loading**: Optimized for mobile networks
- **PWA Features**: Installable web app

## 🎵 Content Management

### Updating Contact Information

Edit the contact details in:
- `index.html` (lines ~325-330)
- `lib/email.js` (phone numbers in templates)
- Environment variables for email addresses

### Adding New Services

Add services to the services grid in `index.html` (lines ~115-150).

### Modifying Colors

Update CSS custom properties in `styles.css` (lines ~1-15) to change the color scheme.

## 🔍 Monitoring

### Error Tracking

- Check Vercel function logs for API errors
- Monitor Supabase logs for database issues
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
- **Email**: jakecozzadj@gmail.com
- **Phone**: (312) 438-8771
- **Service Area**: Greater Indianapolis Area

## 📄 License

MIT License - see LICENSE file for details.

---

**Jake Cozza DJ Services** - Making moments unforgettable 🎵