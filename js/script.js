/* ===========================
   TYPING ANIMATION WITH MODERN EFFECTS
   ===========================*/
var typed = new Typed('.typing', {
    strings: ['Web Developer', 'Software Engineer', 'Tech Enthusiast', 'Problem Solver'],
    typeSpeed: 80,
    backSpeed: 50,
    backDelay: 1000,
    startDelay: 500,
    loop: true,
    showCursor: false, // We'll use our custom cursor
    preStringTyped: function(arrayPos, self) {
        // Add glow effect when typing starts
        document.querySelector('.typing').style.textShadow = '0 0 10px rgba(102, 126, 234, 0.5)';
    },
    onStringTyped: function(arrayPos, self) {
        // Remove glow effect when typing is complete
        setTimeout(() => {
            document.querySelector('.typing').style.textShadow = 'none';
        }, 1000);
    }
});

/* ===========================
   MODERN NAVIGATION FUNCTIONALITY
   ===========================*/

// Enhanced smooth scrolling with modern easing
const navLinks = document.querySelectorAll('.nav a[href^="#"]');

navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            // Add loading animation
            const loader = createLoader();
            document.body.appendChild(loader);
            
            // Calculate offset for smooth scrolling
            const offsetTop = targetSection.offsetTop - 30;
            
            // Enhanced smooth scroll with custom easing
            smoothScrollTo(offsetTop, 800);
            
            // Update active navigation link with animation
            updateActiveNavLink(this);
            
            // Hide mobile menu if open
            closeMobileMenu();
            
            // Remove loader after scroll
            setTimeout(() => {
                if (loader.parentNode) {
                    loader.remove();
                }
            }, 800);
        }
    });
});

// Create loading animation
function createLoader() {
    const loader = document.createElement('div');
    loader.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 40px;
        height: 40px;
        border: 3px solid rgba(255, 255, 255, 0.3);
        border-top: 3px solid var(--skin-color);
        border-radius: 50%;
        animation: spin 1s linear infinite;
        z-index: 9999;
        pointer-events: none;
    `;
    return loader;
}

// Enhanced smooth scroll function
function smoothScrollTo(target, duration) {
    const start = window.pageYOffset;
    const distance = target - start;
    let startTime = null;

    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const run = ease(timeElapsed, start, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) requestAnimationFrame(animation);
    }

    // Easing function for smooth animation
    function ease(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    }

    requestAnimationFrame(animation);
}

// Enhanced active navigation state with animations
function updateActiveNavLink(activeLink) {
    navLinks.forEach(link => {
        link.classList.remove('active');
        // Reset any previous animations
        link.style.transform = '';
    });
    
    activeLink.classList.add('active');
    
    // Add pulse animation to active link
    activeLink.style.animation = 'pulse 0.5s ease-in-out';
    setTimeout(() => {
        activeLink.style.animation = '';
    }, 500);
}

// Enhanced scroll spy with intersection observer
const sections = document.querySelectorAll('.section');
const observerOptions = {
    threshold: 0.3,
    rootMargin: '-100px 0px -100px 0px'
};

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const currentSection = entry.target.getAttribute('id');
            
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${currentSection}`) {
                    link.classList.add('active');
                }
            });
            
            // Add entrance animation to section content
            animateSectionContent(entry.target);
        }
    });
}, observerOptions);

sections.forEach(section => {
    sectionObserver.observe(section);
});

// Animate section content on scroll
function animateSectionContent(section) {
    const elements = section.querySelectorAll('.padd-15, .section-title, .btn');
    elements.forEach((el, index) => {
        el.style.animation = `fadeInUp 0.6s ease-out ${index * 0.1}s both`;
    });
}

// Enhanced mobile navigation
const navToggler = document.querySelector('.nav-toggler');
const aside = document.querySelector('.aside');

if (navToggler) {
    navToggler.addEventListener('click', (e) => {
        e.stopPropagation();
        aside.classList.toggle('open');
        
        // Animate hamburger menu
        const spans = navToggler.querySelectorAll('span');
        spans.forEach(span => {
            span.style.transform = aside.classList.contains('open') 
                ? 'rotate(45deg)' 
                : 'rotate(0deg)';
        });
        
        // Add backdrop blur when menu is open
        if (aside.classList.contains('open')) {
            document.body.style.overflow = 'hidden';
            addBackdrop();
        } else {
            document.body.style.overflow = '';
            removeBackdrop();
        }
    });
}

function addBackdrop() {
    const backdrop = document.createElement('div');
    backdrop.id = 'mobile-backdrop';
    backdrop.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        backdrop-filter: blur(5px);
        z-index: 5;
        animation: fadeIn 0.3s ease-out;
    `;
    backdrop.addEventListener('click', closeMobileMenu);
    document.body.appendChild(backdrop);
}

function removeBackdrop() {
    const backdrop = document.getElementById('mobile-backdrop');
    if (backdrop) {
        backdrop.style.animation = 'fadeOut 0.3s ease-out';
        setTimeout(() => backdrop.remove(), 300);
    }
}

function closeMobileMenu() {
    if (aside.classList.contains('open')) {
        aside.classList.remove('open');
        document.body.style.overflow = '';
        removeBackdrop();
        
        // Reset hamburger animation
        const spans = navToggler.querySelectorAll('span');
        spans.forEach(span => {
            span.style.transform = 'rotate(0deg)';
        });
    }
}

// Close mobile menu on outside click
document.addEventListener('click', (e) => {
    if (!aside.contains(e.target) && !navToggler.contains(e.target)) {
        closeMobileMenu();
    }
});

// Enhanced page load initialization
document.addEventListener('DOMContentLoaded', () => {
    // Add CSS animations to document
    const style = document.createElement('style');
    style.textContent = `
        @keyframes spin {
            0% { transform: translate(-50%, -50%) rotate(0deg); }
            100% { transform: translate(-50%, -50%) rotate(360deg); }
        }
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        @keyframes fadeOut {
            from { opacity: 1; }
            to { opacity: 0; }
        }
        @keyframes pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.05); }
        }
        @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(30px); }
            to { opacity: 1; transform: translateY(0); }
        }
    `;
    document.head.appendChild(style);
    
    // Set home as active by default with animation
    const homeLink = document.querySelector('.nav a[href="#home"]');
    if (homeLink) {
        homeLink.classList.add('active');
    }
    
    // Initialize sections visibility
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('hidden');
    });
    
    // Add parallax effect to background elements
    initParallaxEffect();
    
    // Initialize modern interactions
    initModernInteractions();
});

// Parallax scrolling effect
function initParallaxEffect() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.home::before, .section::before');
        
        parallaxElements.forEach((el, index) => {
            const speed = 0.5 + (index * 0.1);
            el.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
}

// Modern interactions and hover effects
function initModernInteractions() {
    // Add hover effects to buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(btn => {
        btn.addEventListener('mouseenter', () => {
            btn.style.transform = 'translateY(-3px) scale(1.05)';
        });
        
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = '';
        });
    });
    
    // Add magnetic effect to navigation links
    navLinks.forEach(link => {
        link.addEventListener('mousemove', (e) => {
            const rect = link.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            link.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
        });
        
        link.addEventListener('mouseleave', () => {
            link.style.transform = '';
        });
    });
}

// Add scroll-based animations
window.addEventListener('scroll', () => {
    const scrollProgress = window.pageYOffset / (document.documentElement.scrollHeight - window.innerHeight);
    
    // Update CSS custom property for scroll-based animations
    document.documentElement.style.setProperty('--scroll-progress', scrollProgress);
});

// Keyboard navigation support
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeMobileMenu();
    }
    
    // Arrow key navigation
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        e.preventDefault();
        const currentActive = document.querySelector('.nav a.active');
        const allLinks = Array.from(navLinks);
        const currentIndex = allLinks.indexOf(currentActive);
        
        let nextIndex;
        if (e.key === 'ArrowDown') {
            nextIndex = (currentIndex + 1) % allLinks.length;
        } else {
            nextIndex = (currentIndex - 1 + allLinks.length) % allLinks.length;
        }
        
        allLinks[nextIndex].click();
    }
});