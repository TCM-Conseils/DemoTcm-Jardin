// ========================================
// JardinExpert Québec - JavaScript
// ========================================

// ==================== DOM ELEMENTS ====================
const spinner = document.getElementById('spinner');
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const backToTop = document.getElementById('backToTop');
const chatIcon = document.getElementById('chatIcon');
const newsletterForm = document.getElementById('newsletterForm');
const navLinks = document.querySelectorAll('.nav-menu a');
const filterBtns = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');
const counters = document.querySelectorAll('.counter');
const testimonialsSlider = document.getElementById('testimonialsSlider');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

// ==================== SPINNER ====================
window.addEventListener('load', () => {
    setTimeout(() => {
        spinner.classList.add('hide');
    }, 500);
});

// ==================== NAVBAR SCROLL EFFECT ====================
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    // Add shadow on scroll
    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    // Back to top button
    if (currentScroll > 300) {
        backToTop.classList.add('show');
    } else {
        backToTop.classList.remove('show');
    }

    // Active nav link based on scroll position
    updateActiveNav();

    lastScroll = currentScroll;
});

// ==================== MOBILE MENU ====================
hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    const icon = hamburger.querySelector('i');
    
    if (navMenu.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});

// Close menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const icon = hamburger.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
        navMenu.classList.remove('active');
        const icon = hamburger.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});

// ==================== SMOOTH SCROLLING ====================
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        
        if (targetId.startsWith('#')) {
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// Back to top smooth scroll
backToTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ==================== ACTIVE NAV LINK ====================
function updateActiveNav() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPos = window.pageYOffset + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// ==================== PORTFOLIO FILTER ====================
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        filterBtns.forEach(b => b.classList.remove('active'));
        // Add active class to clicked button
        btn.classList.add('active');

        const filterValue = btn.getAttribute('data-filter');

        portfolioItems.forEach(item => {
            if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                item.style.display = 'block';
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'scale(1)';
                }, 10);
            } else {
                item.style.opacity = '0';
                item.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    item.style.display = 'none';
                }, 300);
            }
        });
    });
});

// ==================== COUNTER ANIMATION ====================
let counterAnimated = false;

function animateCounters() {
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000; // 2 seconds
        const increment = target / (duration / 16); // 60 FPS
        let current = 0;

        const updateCounter = () => {
            current += increment;
            if (current < target) {
                counter.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };

        updateCounter();
    });
}

// Trigger counter animation when stats section is visible
const statsSection = document.querySelector('.stats');
if (statsSection) {
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !counterAnimated) {
                animateCounters();
                counterAnimated = true;
            }
        });
    }, { threshold: 0.5 });

    statsObserver.observe(statsSection);
}

// ==================== TESTIMONIALS SLIDER ====================
let currentSlide = 0;
const testimonialCards = document.querySelectorAll('.testimonial-card');
const totalSlides = testimonialCards.length;

function showSlide(index) {
    if (index >= totalSlides) {
        currentSlide = 0;
    } else if (index < 0) {
        currentSlide = totalSlides - 1;
    } else {
        currentSlide = index;
    }

    const offset = -currentSlide * 100;
    testimonialsSlider.style.transform = `translateX(${offset}%)`;
}

if (prevBtn && nextBtn) {
    prevBtn.addEventListener('click', () => {
        showSlide(currentSlide - 1);
    });

    nextBtn.addEventListener('click', () => {
        showSlide(currentSlide + 1);
    });

    // Auto slide every 5 seconds
    setInterval(() => {
        showSlide(currentSlide + 1);
    }, 5000);
}

// ==================== CHATBOT ICON ANIMATION ====================
if (chatIcon) {
    chatIcon.addEventListener('click', () => {
        alert('🌿 Chatbot sera intégré ici !\n\nVous pourrez bientôt :\n✓ Poser des questions\n✓ Demander un devis\n✓ Prendre rendez-vous\n✓ Obtenir des conseils jardinage');
    });

    // Pulsing effect
    setInterval(() => {
        chatIcon.style.transform = 'scale(1.1)';
        setTimeout(() => {
            chatIcon.style.transform = 'scale(1)';
        }, 300);
    }, 4000);
}

// ==================== NEWSLETTER FORM ====================
if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const emailInput = newsletterForm.querySelector('input[type="email"]');
        const email = emailInput.value;

        // Simulate form submission
        if (email) {
            alert(`✅ Merci de votre inscription !\n\nUn email de confirmation a été envoyé à : ${email}\n\nVous recevrez bientôt nos conseils jardinage et offres exclusives ! 🌱`);
            emailInput.value = '';
        }
    });
}

// ==================== SCROLL ANIMATIONS ====================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
const animatedElements = document.querySelectorAll('.service-card, .portfolio-item, .team-card, .testimonial-card');
animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease';
    observer.observe(el);
});

// ==================== LAZY LOADING IMAGES ====================
const lazyImages = document.querySelectorAll('img[data-src]');

const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.getAttribute('data-src');
            img.removeAttribute('data-src');
            imageObserver.unobserve(img);
        }
    });
});

lazyImages.forEach(img => imageObserver.observe(img));

// ==================== SEASONAL GREETING ====================
function getSeasonalGreeting() {
    const month = new Date().getMonth();
    
    if (month >= 2 && month <= 4) {
        return '🌸 Printemps - Temps de planter !';
    } else if (month >= 5 && month <= 7) {
        return '☀️ Été - Profitez de votre jardin !';
    } else if (month >= 8 && month <= 10) {
        return '🍂 Automne - Préparez votre jardin pour l\'hiver !';
    } else {
        return '❄️ Hiver - Planifiez votre jardin 2025 !';
    }
}

// Display seasonal greeting in console
console.log(`%c🌱 JardinExpert Québec`, 'color: #16A34A; font-size: 20px; font-weight: bold;');
console.log(`%c${getSeasonalGreeting()}`, 'color: #92400E; font-size: 14px;');

// ==================== PARALLAX EFFECT ====================
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.hero');
    
    parallaxElements.forEach(el => {
        const speed = 0.5;
        el.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// ==================== LOCAL STORAGE - PREFERENCES ====================
// Save user preferences
function savePreference(key, value) {
    localStorage.setItem(`jardinexpert_${key}`, value);
}

function getPreference(key) {
    return localStorage.getItem(`jardinexpert_${key}`);
}

// Example: Remember if user has visited before
if (!getPreference('visited')) {
    console.log('Bienvenue chez JardinExpert Québec ! 🌿');
    savePreference('visited', 'true');
    savePreference('first_visit', new Date().toISOString());
} else {
    console.log('Content de vous revoir ! 🌱');
}

// ==================== DYNAMIC YEAR IN FOOTER ====================
const currentYear = new Date().getFullYear();
const yearElements = document.querySelectorAll('.current-year');
yearElements.forEach(el => {
    el.textContent = currentYear;
});

// ==================== FORM VALIDATION ====================
const allForms = document.querySelectorAll('form');
allForms.forEach(form => {
    form.addEventListener('submit', (e) => {
        const inputs = form.querySelectorAll('input[required]');
        let isValid = true;

        inputs.forEach(input => {
            if (!input.value.trim()) {
                isValid = false;
                input.style.borderColor = '#DC2626';
            } else {
                input.style.borderColor = '';
            }
        });

        if (!isValid) {
            e.preventDefault();
            alert('⚠️ Veuillez remplir tous les champs obligatoires.');
        }
    });
});

// ==================== TOOLTIP FUNCTIONALITY ====================
const tooltipElements = document.querySelectorAll('[data-tooltip]');

tooltipElements.forEach(el => {
    el.addEventListener('mouseenter', (e) => {
        const tooltip = document.createElement('div');
        tooltip.className = 'tooltip';
        tooltip.textContent = el.getAttribute('data-tooltip');
        tooltip.style.cssText = `
            position: absolute;
            background: var(--dark);
            color: white;
            padding: 8px 12px;
            border-radius: 6px;
            font-size: 0.85rem;
            z-index: 1000;
            pointer-events: none;
            white-space: nowrap;
        `;
        document.body.appendChild(tooltip);

        const rect = el.getBoundingClientRect();
        tooltip.style.top = `${rect.top - tooltip.offsetHeight - 10}px`;
        tooltip.style.left = `${rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2)}px`;

        el.addEventListener('mouseleave', () => {
            tooltip.remove();
        }, { once: true });
    });
});

// ==================== ACCESSIBILITY IMPROVEMENTS ====================
// Skip to main content
const skipLink = document.createElement('a');
skipLink.href = '#services';
skipLink.textContent = 'Passer au contenu principal';
skipLink.className = 'skip-link';
skipLink.style.cssText = `
    position: absolute;
    top: -40px;
    left: 0;
    background: var(--primary);
    color: white;
    padding: 8px 16px;
    text-decoration: none;
    z-index: 10000;
`;
skipLink.addEventListener('focus', () => {
    skipLink.style.top = '0';
});
skipLink.addEventListener('blur', () => {
    skipLink.style.top = '-40px';
});
document.body.insertBefore(skipLink, document.body.firstChild);

// ==================== PERFORMANCE MONITORING ====================
window.addEventListener('load', () => {
    if ('performance' in window) {
        const perfData = performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        console.log(`⚡ Page chargée en ${pageLoadTime}ms`);
    }
});

// ==================== SERVICE WORKER REGISTRATION ====================
// Uncomment when you have a service worker
/*
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => console.log('SW registered:', registration))
            .catch(error => console.log('SW registration failed:', error));
    });
}
*/

// ==================== ANALYTICS TRACKING ====================
function trackEvent(category, action, label) {
    console.log(`📊 Event tracked: ${category} - ${action} - ${label}`);
    // Integrate with your analytics service here (Google Analytics, etc.)
}

// Track button clicks
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', () => {
        trackEvent('Button', 'Click', btn.textContent.trim());
    });
});

// Track phone number clicks
document.querySelectorAll('a[href^="tel:"]').forEach(link => {
    link.addEventListener('click', () => {
        trackEvent('Contact', 'Phone Call', 'Emergency Number');
    });
});

// ==================== DARK MODE TOGGLE (OPTIONAL) ====================
/*
const darkModeToggle = document.createElement('button');
darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
darkModeToggle.className = 'dark-mode-toggle';
darkModeToggle.style.cssText = `
    position: fixed;
    top: 50%;
    right: 20px;
    width: 50px;
    height: 50px;
    background: var(--primary);
    color: white;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    z-index: 998;
    box-shadow: 0 4px 15px rgba(0,0,0,0.2);
`;
document.body.appendChild(darkModeToggle);

darkModeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    darkModeToggle.innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
    savePreference('dark_mode', isDark);
});

// Load dark mode preference
if (getPreference('dark_mode') === 'true') {
    document.body.classList.add('dark-mode');
    darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
}
*/

// ==================== ERROR HANDLING ====================
window.addEventListener('error', (e) => {
    console.error('❌ Erreur détectée:', e.message);
    // You can send errors to a logging service here
});

// ==================== CONSOLE EASTER EGG ====================
console.log('%c🌿 Vous aimez jardiner ?', 'color: #16A34A; font-size: 16px; font-weight: bold;');
console.log('%cContactez-nous pour transformer votre terrain !', 'color: #92400E; font-size: 14px;');
console.log('%c📞 +1 418 555 VERT', 'color: #16A34A; font-size: 18px; font-weight: bold;');

// ==================== END OF SCRIPT ====================
console.log('✅ JardinExpert Québec - JavaScript chargé avec succès!');