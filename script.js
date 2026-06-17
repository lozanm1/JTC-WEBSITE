/* ============================================
   MODERN WEBSITE INTERACTIONS & ANIMATIONS
   JTC GROUP OF COMPANIES
   ============================================ */

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Contact form submission
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

if (contactForm) {
    contactForm.addEventListener('submit', async function (e) {
        e.preventDefault();

        const formData = new FormData(this);
        
        try {
            const response = await fetch('process-contact.php', {
                method: 'POST',
                body: formData
            });

            const result = await response.json();

            if (result.success) {
                formMessage.textContent = 'Thank you! Your message has been sent successfully.';
                formMessage.classList.add('success');
                formMessage.classList.remove('error');
                contactForm.reset();
            } else {
                formMessage.textContent = 'Error: ' + (result.message || 'Unable to send message');
                formMessage.classList.add('error');
                formMessage.classList.remove('success');
            }
        } catch (error) {
            formMessage.textContent = 'Error: Unable to send message. Please try again.';
            formMessage.classList.add('error');
            formMessage.classList.remove('success');
        }

        // Hide message after 5 seconds
        setTimeout(() => {
            formMessage.style.display = 'none';
        }, 5000);
    });
}

// Edit Mission/Vision functionality
function toggleEdit(type) {
    const elementId = type === 'mission' ? 'mission-text' : 'vision-text';
    const element = document.getElementById(elementId);
    const btn = event.target;

    if (element.contentEditable === 'true') {
        // Save mode
        element.contentEditable = 'false';
        btn.textContent = 'Edit';
        element.style.backgroundColor = 'transparent';
        
        // Optional: Save to backend
        saveMissionVision(type, element.textContent);
    } else {
        // Edit mode
        element.contentEditable = 'true';
        btn.textContent = 'Save';
        element.style.backgroundColor = '#fff9e6';
        element.focus();
    }
}

// Save mission/vision to backend
async function saveMissionVision(type, content) {
    try {
        const response = await fetch('update-content.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                type: type,
                content: content
            })
        });

        const result = await response.json();
        
        if (result.success) {
            console.log(`${type.charAt(0).toUpperCase() + type.slice(1)} updated successfully`);
        } else {
            console.error('Failed to update content');
        }
    } catch (error) {
        console.error('Error saving content:', error);
    }
}

// Load mission/vision from backend on page load
document.addEventListener('DOMContentLoaded', function () {
    loadMissionVision();
    addScrollAnimations();
    animateGalleryItems();
    animateTeamMembers();
    animateServiceCards();
});

// Load mission and vision from backend
async function loadMissionVision() {
    try {
        const response = await fetch('get-content.php');
        const data = await response.json();

        if (data.mission) {
            document.getElementById('mission-text').textContent = data.mission;
        }
        if (data.vision) {
            document.getElementById('vision-text').textContent = data.vision;
        }
    } catch (error) {
        console.error('Error loading content:', error);
    }
}

// Scroll animations for all elements
function addScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.card, .about-wrapper, .gallery-item, .team-member, .service-card').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
}

// Animate gallery items with staggered effect
function animateGalleryItems() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach((item, index) => {
        item.style.animation = `fadeInUp 0.6s ease-out ${0.1 * index}s both`;
    });
}

// Animate team members with staggered effect
function animateTeamMembers() {
    const teamMembers = document.querySelectorAll('.team-member');
    teamMembers.forEach((member, index) => {
        member.style.animation = `fadeInUp 0.6s ease-out ${0.1 * index}s both`;
    });
}

// Animate service cards with staggered effect
function animateServiceCards() {
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach((card, index) => {
        card.style.animation = `fadeInUp 0.6s ease-out ${0.1 * index}s both`;
    });
}

// Navbar active link highlighting
window.addEventListener('scroll', function () {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    let currentSection = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop - 200) {
            currentSection = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === currentSection) {
            link.style.borderBottom = '2px solid #6366f1';
        } else {
            link.style.borderBottom = 'none';
        }
    });
});

// Form input focus effects
document.querySelectorAll('.form-input').forEach(input => {
    input.addEventListener('focus', function () {
        this.parentElement.style.transform = 'scale(1.02)';
    });

    input.addEventListener('blur', function () {
        this.parentElement.style.transform = 'scale(1)';
    });
});

// Gallery image hover effects with parallax
document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('mousemove', function(e) {
        const image = this.querySelector('.gallery-image');
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const moveX = (x - rect.width / 2) * 0.05;
        const moveY = (y - rect.height / 2) * 0.05;
        
        image.style.transform = `scale(1.1) translate(${moveX}px, ${moveY}px)`;
    });

    item.addEventListener('mouseleave', function() {
        const image = this.querySelector('.gallery-image');
        image.style.transform = 'scale(1) translate(0, 0)';
    });
});

// Team member hover effects
document.querySelectorAll('.team-member').forEach(member => {
    member.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-15px) scale(1.02)';
    });

    member.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Service card hover with glow effect
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.boxShadow = '0 20px 50px rgba(99, 102, 241, 0.2)';
    });

    card.addEventListener('mouseleave', function() {
        this.style.boxShadow = '0 5px 20px rgba(21, 19, 63, 0.08)';
    });
});

// Counter animation for scroll-triggered elements
function createCounterAnimation(element, target, duration = 2000) {
    let current = 0;
    const increment = target / (duration / 16);
    
    const counter = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(counter);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// Button ripple effect
function createRipple(event) {
    const button = event.currentTarget;
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple');

    button.appendChild(ripple);

    setTimeout(() => {
        ripple.remove();
    }, 600);
}

document.querySelectorAll('.cta-button').forEach(button => {
    button.addEventListener('click', createRipple);
});

// Image lazy loading for better performance
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Add smooth page load animation
window.addEventListener('load', function () {
    document.body.style.opacity = '1';
    
    // Trigger animations for visible elements
    const visibleElements = document.querySelectorAll('[style*="opacity"]');
    visibleElements.forEach(el => {
        el.style.animation = 'fadeInUp 0.8s ease-out forwards';
    });
});

// Keyboard navigation support
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        // Close any open modals if implemented
    }
});

// Performance: Debounce scroll events
let scrollTimeout;
window.addEventListener('scroll', function() {
    if (scrollTimeout) {
        window.cancelAnimationFrame(scrollTimeout);
    }
    scrollTimeout = window.requestAnimationFrame(function() {
        // Scroll event logic here
    });
});

// Console log for debugging
console.log('JTC Website JavaScript loaded successfully');
console.log('Features: Smooth scrolling, gallery animations, team member hover effects, service card interactions');
