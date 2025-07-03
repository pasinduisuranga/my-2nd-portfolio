// Style switcher toggle functionality with modern animations
const styleSwitcherToggle = document.querySelector(".style-switcher-toggler");
const styleSwitcher = document.querySelector(".style-switcher");

styleSwitcherToggle.addEventListener("click", () => {
    styleSwitcher.classList.toggle("open");
    
    // Add rotation animation to the toggle icon
    const icon = styleSwitcherToggle.querySelector("i");
    if (styleSwitcher.classList.contains("open")) {
        icon.style.transform = "rotate(180deg)";
    } else {
        icon.style.transform = "rotate(0deg)";
    }
});

// Hide style switcher on scroll with smooth animation
let scrollTimeout;
window.addEventListener("scroll", () => {
    if (styleSwitcher.classList.contains("open")) {
        // Add a small delay to prevent flickering during scroll
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            styleSwitcher.classList.remove("open");
            const icon = styleSwitcherToggle.querySelector("i");
            icon.style.transform = "rotate(0deg)";
        }, 100);
    }
});

// Enhanced color switching with smooth transitions
const alternateStyles = document.querySelectorAll(".alternate-style");
function setActiveStyle(color) {
    // Add loading effect
    document.body.style.transition = "all 0.3s ease";
    
    alternateStyles.forEach((style) => {
        if (color === style.getAttribute("title")) {
            style.removeAttribute("disabled");
        } else {
            style.setAttribute("disabled", "true");
        }
    });
    
    // Save color preference
    localStorage.setItem("selectedColor", color);
    
    // Add visual feedback
    const colorSpans = document.querySelectorAll(".colors span");
    colorSpans.forEach(span => {
        span.style.transform = "scale(1)";
        span.style.boxShadow = "none";
    });
    
    const activeSpan = document.querySelector(`.colour-${color.split("-")[1]}`);
    if (activeSpan) {
        activeSpan.style.transform = "scale(1.2)";
        activeSpan.style.boxShadow = "0 0 20px rgba(0, 0, 0, 0.3)";
    }
}

// Enhanced theme light/dark mode toggle with modern animations
const dayNight = document.querySelector(".day-night");
dayNight.addEventListener("click", () => {
    const icon = dayNight.querySelector("i");
    
    // Add rotation animation during transition
    icon.style.transform = "rotate(180deg) scale(0.8)";
    
    setTimeout(() => {
        icon.classList.toggle("fa-sun");
        icon.classList.toggle("fa-moon");
        document.body.classList.toggle("dark");
        
        // Save theme preference in localStorage
        const isDark = document.body.classList.contains("dark");
        localStorage.setItem("theme", isDark ? "dark" : "light");
        
        // Reset icon animation
        icon.style.transform = "rotate(0deg) scale(1)";
    }, 150);
});

// Initialize theme and color on page load
window.addEventListener("load", () => {
    // Check for saved theme, default to dark if none exists
    const savedTheme = localStorage.getItem("theme");
    const isDarkMode = savedTheme ? savedTheme === "dark" : true; // Default to dark
    
    if (isDarkMode) {
        document.body.classList.add("dark");
        dayNight.querySelector("i").classList.add("fa-sun");
        dayNight.querySelector("i").classList.remove("fa-moon");
        // Save dark as default if no preference exists
        if (!savedTheme) {
            localStorage.setItem("theme", "dark");
        }
    } else {
        document.body.classList.remove("dark");
        dayNight.querySelector("i").classList.add("fa-moon");
        dayNight.querySelector("i").classList.remove("fa-sun");
    }
    
    // Load saved color
    const savedColor = localStorage.getItem("selectedColor");
    if (savedColor) {
        setActiveStyle(savedColor);
    }
    
    // Add smooth entrance animation
    setTimeout(() => {
        styleSwitcher.style.opacity = "1";
        styleSwitcher.style.transform = "translateX(100%)";
    }, 500);
});

// Add hover effects for better UX
const colorSpans = document.querySelectorAll(".colors span");
colorSpans.forEach(span => {
    span.addEventListener("mouseenter", () => {
        span.style.transform = "scale(1.15) rotate(5deg)";
    });
    
    span.addEventListener("mouseleave", () => {
        const isActive = span.classList.contains("active");
        span.style.transform = isActive ? "scale(1.2)" : "scale(1)";
        span.style.rotate = "0deg";
    });
});

// Add keyboard navigation support
document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && styleSwitcher.classList.contains("open")) {
        styleSwitcher.classList.remove("open");
        const icon = styleSwitcherToggle.querySelector("i");
        icon.style.transform = "rotate(0deg)";
    }
});