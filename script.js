// Jake Cozza DJ Services - Interactive Features
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all features
    initSmoothScrolling();
    initFormValidation();
    initModalHandling();
    initAnimations();
    initAnalytics();
});

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
    
    // Prepare form data
    const formData = new FormData(e.target);
    
    // Submit to Netlify (or your chosen service)
    fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(formData).toString()
    })
    .then(response => {
        if (response.ok) {
            showSuccessMessage();
            trackFormSubmission();
        } else {
            throw new Error('Network response was not ok');
        }
    })
    .catch(error => {
        console.error('Form submission error:', error);
        showErrorMessage();
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

function showErrorMessage() {
    alert('Sorry, there was an error sending your request. Please try again or contact us directly.');
}

// Animation on scroll
function initAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll(
        '.service-card, .feature, .about__content, .why-choose__grid'
    );
    
    animateElements.forEach(el => observer.observe(el));
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

// Header scroll effect
window.addEventListener('scroll', throttle(() => {
    const header = document.querySelector('.header');
    const scrolled = window.scrollY > 50;
    
    if (scrolled) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = 'none';
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