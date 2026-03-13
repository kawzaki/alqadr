/**
 * main.js - alqadr webpage logic
 */

// 1. Global Functions (Defined first for reliable onclick access)
window.toggleContent = function(fullId, previewId, wrapper) {
    const full = document.getElementById(fullId);
    const preview = document.getElementById(previewId);
    
    if (full && preview) {
        full.classList.toggle('hidden');
        preview.classList.toggle('hidden');
    } else if (full) {
        // Fallback for simple toggles
        full.classList.toggle('hidden');
    }
};

window.showTab = function(event, tabId) {
    const parent = event.currentTarget.closest('.content-step');
    if (!parent) return;

    const buttons = parent.querySelectorAll('.tab-btn');
    buttons.forEach(btn => btn.classList.remove('active'));
    event.currentTarget.classList.add('active');

    const contents = parent.querySelectorAll('.tab-content');
    contents.forEach(content => content.classList.remove('active'));
    
    const target = document.getElementById(tabId);
    if (target) {
        target.classList.add('active');
    }
};

window.copyDua = function(button) {
    const textElement = button.parentElement.querySelector('.dua-text');
    if (!textElement) return;
    
    const text = textElement.innerText;
    navigator.clipboard.writeText(text).then(() => {
        const originalText = button.innerText;
        button.innerText = 'تم النسخ';
        button.style.color = '#4caf50';
        setTimeout(() => {
            button.innerText = originalText;
            button.style.color = '';
        }, 2000);
    });
};

// 2. Initialization on DOM Load
document.addEventListener('DOMContentLoaded', () => {
    initStars();
    initCheckboxes();
    initScrollReveal();
});

// 3. Dynamic Stars Effect
function initStars() {
    const container = document.getElementById('stars');
    if (!container) return;

    const starCount = 100;
    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        const size = Math.random() * 2 + 1 + 'px';
        star.style.width = size;
        star.style.height = size;
        star.style.top = Math.random() * 100 + '%';
        star.style.left = Math.random() * 100 + '%';
        star.style.setProperty('--duration', Math.random() * 3 + 2 + 's');
        container.appendChild(star);
    }
}

// 4. Progress Tracking with LocalStorage
function initCheckboxes() {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(cb => {
        const id = cb.getAttribute('data-id');
        if (localStorage.getItem('alqadr_23_' + id) === 'true') {
            cb.checked = true;
        }
        cb.addEventListener('change', (e) => {
            localStorage.setItem('alqadr_23_' + id, e.target.checked);
        });
    });
}

// 5. Scroll Reveal Animations
function initScrollReveal() {
    if (!window.IntersectionObserver) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.content-step, .dua-wrapper').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(40px)';
        el.style.transition = 'all 0.8s ease-out';
        observer.observe(el);
    });
}

// 6. Scroll Interactivity (Go to Top)
window.onscroll = function() {
    const scrollBtn = document.getElementById('goToTop');
    if (scrollBtn) {
        if (document.body.scrollTop > 500 || document.documentElement.scrollTop > 500) {
            scrollBtn.style.display = 'flex';
        } else {
            scrollBtn.style.display = 'none';
        }
    }
};
