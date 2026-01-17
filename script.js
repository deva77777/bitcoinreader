// Reading Progress Bar (Optimized)
let ticking = false;

function updateProgressBar() {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    const progressBar = document.getElementById('progress-bar');
    if (progressBar) {
        progressBar.style.width = scrolled + '%';
    }
    ticking = false;
}

window.addEventListener('scroll', function() {
    if (!ticking) {
        window.requestAnimationFrame(updateProgressBar);
        ticking = true;
    }
});

// Smooth Scrolling for Anchor Links
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Toast Notification
function showToast(message) {
    // Remove existing toast if any
    const existingToast = document.querySelector('.toast');
    if (existingToast) {
        existingToast.remove();
    }
    
    // Create new toast
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    document.body.appendChild(toast);
    
    // Show toast
    setTimeout(() => toast.classList.add('show'), 10);
    
    // Hide and remove toast
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// Copy Link Function
function copyLink() {
    navigator.clipboard.writeText(window.location.href).then(() => {
        showToast('Link copied to clipboard!');
    }).catch(() => {
        showToast('Failed to copy link');
    });
}

// Theme Toggle
let isDarkMode = false;

function toggleTheme() {
    isDarkMode = !isDarkMode;
    document.body.classList.toggle('dark-mode', isDarkMode);
    
    // Save preference
    localStorage.setItem('darkMode', isDarkMode);
    
    showToast(isDarkMode ? 'Dark mode enabled' : 'Light mode enabled');
}

function initThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
    
    // Check saved preference
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    if (savedDarkMode) {
        isDarkMode = true;
        document.body.classList.add('dark-mode');
    }
}

// Calculate Read Time
function calculateReadTime() {
    const content = document.querySelector('main');
    if (content) {
        const text = content.innerText;
        const wordCount = text.split(/\s+/).length;
        const readTime = Math.ceil(wordCount / 200); // Average reading speed
        const readTimeElement = document.getElementById('read-time');
        if (readTimeElement) {
            readTimeElement.textContent = `${readTime} min read`;
        }
    }
}

// Intersection Observer for Fade-in Animation
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe all articles
    document.querySelectorAll('article').forEach(article => {
        observer.observe(article);
    });
}

// Share Functions
function shareOnTwitter() {
    const text = encodeURIComponent('Check out this amazing summary of "The Bitcoin Standard" by Saifedean Ammous!');
    const url = encodeURIComponent(window.location.href);
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank');
}

function shareOnLinkedIn() {
    const url = encodeURIComponent(window.location.href);
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank');
}

// Active Chapter Highlighting
function initActiveChapterHighlighting() {
    const chapters = document.querySelectorAll('article[id^="chapter"]');
    const chapterLinks = document.querySelectorAll('a[href^="#chapter"]');
    
    const observerOptions = {
        threshold: 0.3,
        rootMargin: '-100px 0px -50% 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                chapterLinks.forEach(link => {
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('ring-2', 'ring-orange-500');
                    } else {
                        link.classList.remove('ring-2', 'ring-orange-500');
                    }
                });
            }
        });
    }, observerOptions);
    
    chapters.forEach(chapter => observer.observe(chapter));
}

// Initialize Everything on DOM Load
document.addEventListener('DOMContentLoaded', () => {
    initSmoothScrolling();
    initThemeToggle();
    calculateReadTime();
    initScrollAnimations();
    initActiveChapterHighlighting();
    
    // Attach share button event listeners
    const twitterBtn = document.querySelector('button:has(.w-5.h-5[fill="currentColor"])');
    const linkedInBtn = document.querySelectorAll('button')[1];
    
    // Update progress bar on load
    updateProgressBar();
});

// Keyboard Navigation
document.addEventListener('keydown', (e) => {
    // Press 'T' to toggle theme
    if (e.key === 't' && !e.ctrlKey && !e.metaKey && document.activeElement.tagName !== 'INPUT') {
        toggleTheme();
    }
    
    // Press 'Home' to go to top
    if (e.key === 'Home') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    
    // Press 'End' to go to bottom
    if (e.key === 'End') {
        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    }
});
