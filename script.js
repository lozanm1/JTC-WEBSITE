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

// Scroll animations
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

    document.querySelectorAll('.card, .about-wrapper').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
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
}

document.querySelectorAll('.cta-button').forEach(button => {
    button.addEventListener('click', createRipple);
});

// Prevent negative animations on initial load
window.addEventListener('load', function () {
    document.body.style.opacity = '1';
});

console.log('JTC Website JavaScript loaded successfully');
