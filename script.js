// Jake Cozza DJ Services - Interactive Features
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all features
    initSmoothScrolling();
    initFormValidation();
    initModalHandling();
    initAnimations();
    initAnalytics();
    initTestimonialCarousel();
});

// Testimonial Carousel
let currentTestimonialIndex = 0;
const testimonials = document.querySelectorAll('.testimonial');
const dots = document.querySelectorAll('.dot');

function initTestimonialCarousel() {
    // Auto-advance testimonials every 8 seconds
    setInterval(() => {
        changeTestimonial(1);
    }, 8000);
}

function showTestimonial(index) {
    // Hide all testimonials
    testimonials.forEach(testimonial => {
        testimonial.classList.remove('active');
    });
    
    // Remove active class from all dots
    dots.forEach(dot => {
        dot.classList.remove('active');
    });
    
    // Show current testimonial and activate corresponding dot
    if (testimonials[index]) {
        testimonials[index].classList.add('active');
    }
    if (dots[index]) {
        dots[index].classList.add('active');
    }
}

function changeTestimonial(direction) {
    currentTestimonialIndex += direction;
    
    // Wrap around if necessary
    if (currentTestimonialIndex >= testimonials.length) {
        currentTestimonialIndex = 0;
    } else if (currentTestimonialIndex < 0) {
        currentTestimonialIndex = testimonials.length - 1;
    }
    
    showTestimonial(currentTestimonialIndex);
    
    // Track analytics
    if (typeof gtag === 'function') {
        gtag('event', 'testimonial_interaction', {
            event_category: 'engagement',
            event_label: `testimonial_${currentTestimonialIndex + 1}`
        });
    }
}

function currentTestimonial(index) {
    currentTestimonialIndex = index - 1; // Convert to 0-based index
    showTestimonial(currentTestimonialIndex);
    
    // Track analytics
    if (typeof gtag === 'function') {
        gtag('event', 'testimonial_click', {
            event_category: 'engagement',
            event_label: `dot_${index}`
        });
    }
}

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav__link[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Modal handling
function openQuoteModal() {
    const modal = document.getElementById('quoteModal');
    const form = document.getElementById('quoteForm');
    const success = document.getElementById('quoteSuccess');
    
    // Reset modal state
    form.style.display = 'block';
    success.style.display = 'none';
    form.reset();
    clearFormErrors();
    
    // Show modal
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
    
    // Focus first input
    setTimeout(() => {
        const firstInput = form.querySelector('input[type="text"]');
        if (firstInput) firstInput.focus();
    }, 100);
    
    // Track analytics
    if (typeof trackQuoteClick === 'function') {
        trackQuoteClick();
    }
}

function closeQuoteModal() {
    const modal = document.getElementById('quoteModal');
    modal.classList.remove('show');
    document.body.style.overflow = '';
}

// Form validation
function initFormValidation() {
    const form = document.getElementById('quoteForm');
    const inputs = form.querySelectorAll('.form-input');
    
    // Real-time validation
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
        
        input.addEventListener('input', function() {
            if (this.classList.contains('error')) {
                validateField(this);
            }
        });
    });
    
    // Form submission
    form.addEventListener('submit', handleFormSubmit);
}

function validateField(field) {
    const value = field.value.trim();
    const fieldName = field.name;
    const errorElement = document.getElementById(fieldName + 'Error');
    let isValid = true;
    let errorMessage = '';
    
    // Required field validation
    if (field.hasAttribute('required') && !value) {
        isValid = false;
        errorMessage = 'This field is required.';
    }
    
    // Specific field validations
    if (value && isValid) {
        switch(fieldName) {
            case 'email':
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(value)) {
                    isValid = false;
                    errorMessage = 'Please enter a valid email address.';
                }
                break;
                
            case 'phone':
                const phoneRegex = /^[\+]?[\s\-\(\)]?[\d\s\-\(\)]{10,}$/;
                if (!phoneRegex.test(value)) {
                    isValid = false;
                    errorMessage = 'Please enter a valid phone number.';
                }
                break;
                
            case 'eventDate':
                const selectedDate = new Date(value);
                const today = new Date();
                today.setHours(0, 0, 0, 0);
                
                if (selectedDate < today) {
                    isValid = false;
                    errorMessage = 'Event date cannot be in the past.';
                }
                break;
        }
    }
    
    // Update UI
    if (isValid) {
        field.classList.remove('error');
        if (errorElement) errorElement.textContent = '';
    } else {
        field.classList.add('error');
        if (errorElement) errorElement.textContent = errorMessage;
    }
    
    return isValid;
}

function validateForm() {
    const form = document.getElementById('quoteForm');
    const requiredFields = form.querySelectorAll('[required]');
    let isFormValid = true;
    
    requiredFields.forEach(field => {
        if (!validateField(field)) {
            isFormValid = false;
        }
    });
    
    return isFormValid;
}

function clearFormErrors() {
    const form = document.getElementById('quoteForm');
    const errorElements = form.querySelectorAll('.form-error');
    const inputs = form.querySelectorAll('.form-input');
    
    errorElements.forEach(error => error.textContent = '');
    inputs.forEach(input => input.classList.remove('error'));
}

function handleFormSubmit(e) {
    e.preventDefault();
    
    if (!validateForm()) {
        // Focus on first error field
        const firstError = document.querySelector('.form-input.error');
        if (firstError) {
            firstError.focus();
        }
        return;
    }
    
    // Show loading state
    const submitButton = e.target.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    submitButton.textContent = 'Sending...';
    submitButton.disabled = true;
    
    // Prepare form data for Vercel API
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    
    // Remove Netlify-specific fields
    delete data['form-name'];
    delete data['bot-field'];
    
    // Debug: Log form data
    console.log('Form data being submitted:', data);
    
    // Check if running locally (for development)
    const isLocalhost = window.location.hostname === 'localhost' || 
                       window.location.hostname === '127.0.0.1' || 
                       window.location.protocol === 'file:';
    
    if (isLocalhost) {
        // Simulate form submission for local development
        console.log('Local development - simulating form submission');
        setTimeout(() => {
            showSuccessMessage();
            trackFormSubmission();
            // Reset button state
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        }, 1000);
        return;
    }
    
    // Submit to Vercel API (production)
    fetch('/api/contact', {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (response.ok) {
            showSuccessMessage();
            trackFormSubmission();
        } else {
            console.error('Form submission failed:', {
                status: response.status,
                statusText: response.statusText,
                url: response.url
            });
            throw new Error(`Form submission failed: ${response.status} ${response.statusText}`);
        }
    })
    .catch(error => {
        console.error('Form submission error:', error);
        showErrorMessage(error);
    })
    .finally(() => {
        // Reset button state
        submitButton.textContent = originalText;
        submitButton.disabled = false;
    });
}

function showSuccessMessage() {
    const form = document.getElementById('quoteForm');
    const success = document.getElementById('quoteSuccess');
    
    form.style.display = 'none';
    success.style.display = 'block';
}

function showErrorMessage(error) {
    const errorMsg = error?.message || 'Unknown error occurred';
    console.error('Detailed error:', errorMsg);
    alert(`Sorry, there was an error sending your request: ${errorMsg}. Please try again or contact us directly at jakecozza.dj@gmail.com`);
}

// Enhanced animation on scroll
function initAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const animationType = element.dataset.animate || 'fade-in-up';
                element.classList.add(animationType);
                observer.unobserve(element);
            }
        });
    }, observerOptions);
    
    // Observe elements for animation with specific animation types
    const animateElements = [
        // Service cards with staggered animation
        ...document.querySelectorAll('.service-card'),
        // Features with different directions
        ...document.querySelectorAll('.feature'),
        // About content from left
        ...document.querySelectorAll('.about__text'),
        // About image from right
        ...document.querySelectorAll('.about__image'),
        // Highlights with scale
        ...document.querySelectorAll('.highlight'),
        // Section titles
        ...document.querySelectorAll('.services__title, .why-choose__title, .contact__title')
    ];
    
    // Add data attributes for different animation types
    document.querySelectorAll('.service-card').forEach((card, index) => {
        card.dataset.animate = 'fade-in-up';
        card.classList.add(`animate-delay-${(index % 3) + 1}`);
    });
    
    document.querySelectorAll('.feature').forEach((feature, index) => {
        feature.dataset.animate = 'fade-in-scale';
        feature.classList.add(`animate-delay-${index + 1}`);
    });
    
    document.querySelectorAll('.highlight').forEach((highlight, index) => {
        highlight.dataset.animate = 'fade-in-scale';
        highlight.classList.add(`animate-delay-${index + 1}`);
    });
    
    const aboutText = document.querySelector('.about__text');
    if (aboutText) aboutText.dataset.animate = 'fade-in-left';
    
    const aboutImage = document.querySelector('.about__image');
    if (aboutImage) aboutImage.dataset.animate = 'fade-in-right';
    
    document.querySelectorAll('.services__title, .why-choose__title, .contact__title').forEach(title => {
        title.dataset.animate = 'slide-in-bottom';
    });
    
    animateElements.forEach(el => observer.observe(el));
    
    // Add hero content animation on page load
    setTimeout(() => {
        const heroContent = document.querySelector('.hero__content');
        const heroImage = document.querySelector('.hero__image');
        
        if (heroContent) {
            heroContent.style.animation = 'fadeInLeft 1s var(--animation-elastic) forwards';
        }
        if (heroImage) {
            heroImage.style.animation = 'fadeInRight 1s var(--animation-elastic) 0.3s forwards';
            heroImage.style.opacity = '0';
            setTimeout(() => heroImage.style.opacity = '1', 300);
        }
    }, 100);
}

// Analytics tracking
function initAnalytics() {
    // Track scroll depth
    let maxScroll = 0;
    let scrollThresholds = [25, 50, 75, 100];
    let trackedThresholds = [];
    
    window.addEventListener('scroll', throttle(() => {
        const scrollPercent = Math.round(
            (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
        );
        
        if (scrollPercent > maxScroll) {
            maxScroll = scrollPercent;
            
            scrollThresholds.forEach(threshold => {
                if (scrollPercent >= threshold && !trackedThresholds.includes(threshold)) {
                    trackedThresholds.push(threshold);
                    
                    if (typeof gtag === 'function') {
                        gtag('event', 'scroll_depth', {
                            event_category: 'engagement',
                            event_label: threshold + '%',
                            value: threshold
                        });
                    }
                }
            });
        }
    }, 250));
    
    // Track CTA clicks
    const ctaButtons = document.querySelectorAll('[onclick="openQuoteModal()"]');
    ctaButtons.forEach(button => {
        button.addEventListener('click', () => {
            if (typeof gtag === 'function') {
                gtag('event', 'cta_click', {
                    event_category: 'engagement',
                    event_label: 'quote_request_button'
                });
            }
        });
    });
    
    // Track contact link clicks
    const contactLinks = document.querySelectorAll('.contact__link');
    contactLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const linkType = link.href.includes('tel:') ? 'phone' : 'email';
            
            if (typeof gtag === 'function') {
                gtag('event', 'contact_click', {
                    event_category: 'engagement',
                    event_label: linkType
                });
            }
        });
    });
}

function trackFormSubmission() {
    if (typeof gtag === 'function') {
        gtag('event', 'form_submit', {
            event_category: 'conversion',
            event_label: 'quote_request_submitted'
        });
        
        // Track as conversion
        gtag('event', 'conversion', {
            send_to: 'GA_MEASUREMENT_ID/quote_request'
        });
    }
}

// Utility functions
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Keyboard accessibility
document.addEventListener('keydown', function(e) {
    // Close modal with Escape key
    if (e.key === 'Escape') {
        const modal = document.getElementById('quoteModal');
        if (modal.classList.contains('show')) {
            closeQuoteModal();
        }
    }
});

// Header scroll effect with parallax
window.addEventListener('scroll', throttle(() => {
    const header = document.querySelector('.header');
    const heroImage = document.querySelector('.hero__image-photo');
    const scrolled = window.scrollY > 50;
    const scrollPercent = window.scrollY / window.innerHeight;
    
    // Header background effect
    if (scrolled) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = 'none';
    }
    
    // Subtle parallax effect for hero image (only on desktop)
    if (heroImage && window.innerWidth > 768 && scrollPercent < 1) {
        const translateY = scrollPercent * 50;
        heroImage.style.transform = `perspective(1000px) rotateY(-5deg) translateY(${translateY}px)`;
    }
}, 16));

// Page load performance tracking
window.addEventListener('load', function() {
    // Track page load time
    const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
    
    if (typeof gtag === 'function') {
        gtag('event', 'timing_complete', {
            name: 'page_load',
            value: Math.round(loadTime)
        });
    }
    
    // Track Core Web Vitals if supported
    if ('web-vital' in window) {
        getCLS(metric => {
            gtag('event', 'web_vital', {
                event_category: 'performance',
                event_label: 'CLS',
                value: Math.round(metric.value * 1000)
            });
        });
        
        getFID(metric => {
            gtag('event', 'web_vital', {
                event_category: 'performance',
                event_label: 'FID',
                value: Math.round(metric.value)
            });
        });
        
        getLCP(metric => {
            gtag('event', 'web_vital', {
                event_category: 'performance',
                event_label: 'LCP',
                value: Math.round(metric.value)
            });
        });
    }
});

// Error handling
window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
    
    if (typeof gtag === 'function') {
        gtag('event', 'exception', {
            description: e.error?.message || 'Unknown error',
            fatal: false
        });
    }
});

// Service Worker registration for PWA features (optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(function(registration) {
                console.log('ServiceWorker registration successful');
            })
            .catch(function(err) {
                console.log('ServiceWorker registration failed');
            });
    });
}