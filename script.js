/**
 * Romantic Apology Website - JavaScript
 * Handles floating sorry gestures, popup modal, and animations
 */

document.addEventListener('DOMContentLoaded', function () {
    // Initialize all components
    initFloatingSorry();
    initPopupModal();
    initSmoothScrolling();
});

/**
 * Floating Sorry Animation
 * Creates subtle, classy floating "sorry" with gesture in the background
 */
function initFloatingSorry() {
    const container = document.getElementById('heartsContainer');
    const sorryTexts = ['Sorry 🙏', 'Maafi 🙏', 'Sorry 🥺', '🙏 Sorry', 'माफी 🙏', 'Sorry 💫'];

    function createSorry() {
        const sorry = document.createElement('span');
        sorry.className = 'floating-sorry';
        sorry.textContent = sorryTexts[Math.floor(Math.random() * sorryTexts.length)];

        // Random horizontal position
        sorry.style.left = Math.random() * 100 + '%';

        // Random size variation
        const size = 0.85 + Math.random() * 0.4;
        sorry.style.fontSize = size + 'rem';

        // Random animation duration (18-28 seconds for slower, elegant movement)
        const duration = 18 + Math.random() * 10;
        sorry.style.animationDuration = duration + 's';

        // Random delay
        sorry.style.animationDelay = Math.random() * 5 + 's';

        container.appendChild(sorry);

        // Remove after animation completes
        setTimeout(() => {
            if (sorry.parentNode) {
                sorry.remove();
            }
        }, (duration + 5) * 1000);
    }

    // Create initial sorry elements
    for (let i = 0; i < 6; i++) {
        setTimeout(createSorry, i * 600);
    }

    // Continuously create new ones (sparsely for elegance)
    setInterval(createSorry, 4000);
}

/**
 * Popup Modal Functionality
 */
function initPopupModal() {
    const forgiveBtn = document.getElementById('forgiveBtn');
    const popupOverlay = document.getElementById('popupOverlay');
    const popupClose = document.getElementById('popupClose');

    // Open popup when "Forgive Me?" button is clicked
    forgiveBtn.addEventListener('click', function () {
        popupOverlay.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scrolling

        // Add a subtle button feedback
        this.style.transform = 'scale(0.98)';
        setTimeout(() => {
            this.style.transform = '';
        }, 150);
    });

    // Close popup when close button is clicked
    popupClose.addEventListener('click', function () {
        closePopup();
    });

    // Close popup when clicking outside the card
    popupOverlay.addEventListener('click', function (e) {
        if (e.target === popupOverlay) {
            closePopup();
        }
    });

    // Close popup with Escape key
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && popupOverlay.classList.contains('active')) {
            closePopup();
        }
    });

    function closePopup() {
        popupOverlay.classList.remove('active');
        document.body.style.overflow = ''; // Restore scrolling
    }
}

/**
 * Smooth Scrolling Enhancement
 */
function initSmoothScrolling() {
    // Add smooth reveal animations as elements come into view
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe message paragraphs for subtle entrance animations
    const messageTexts = document.querySelectorAll('.message-text');
    messageTexts.forEach((text, index) => {
        text.style.opacity = '0';
        text.style.transform = 'translateY(20px)';
        text.style.transition = `opacity 0.6s ease ${index * 0.15}s, transform 0.6s ease ${index * 0.15}s`;
        observer.observe(text);
    });

    // Trigger animations after a short delay to ensure CSS is loaded
    setTimeout(() => {
        messageTexts.forEach(text => {
            text.style.opacity = '1';
            text.style.transform = 'translateY(0)';
        });
    }, 800);
}

/**
 * Add touch feedback for mobile devices
 */
document.querySelectorAll('.forgive-btn, .popup-close').forEach(button => {
    button.addEventListener('touchstart', function () {
        this.style.opacity = '0.9';
    });

    button.addEventListener('touchend', function () {
        this.style.opacity = '1';
    });
});

/**
 * Background image is loaded via CSS
 * No additional preloading required
 */
