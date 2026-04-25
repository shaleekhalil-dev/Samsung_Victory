// تبديل الإشعارات العلوية بشكل آلي
const notifications = document.querySelectorAll('.notify-text');
let currentNotification = 0;

setInterval(() => {
    notifications[currentNotification].classList.remove('active');
    currentNotification = (currentNotification + 1) % notifications.length;
    notifications[currentNotification].classList.add('active');
}, 4000);

// فتح وإغلاق سلة المشتريات المنبثقة
const cartModal = document.getElementById('cart-modal');

function toggleCart() {
    if (cartModal.style.display === 'flex') {
        cartModal.style.display = 'none';
    } else {
        cartModal.style.display = 'flex';
    }
}

// إغلاق السلة عند النقر خارج المربع الزجاجي
window.onclick = function(event) {
    if (event.target === cartModal) {
        cartModal.style.display = "none";
    }
}

// تأثير الظهور المتدرج للعناصر عند التمرير (Scroll Animation)
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-up').forEach(element => {
    observer.observe(element);
});

// تأثير بسيط لإضافة المنتجات للسلة
const addButtons = document.querySelectorAll('.add-to-cart-btn');
const cartCountElement = document.querySelector('.cart-count');
let cartCount = 0;

addButtons.forEach(button => {
    button.addEventListener('click', () => {
        cartCount++;
        cartCountElement.textContent = cartCount;
        
        // تأثير حركي خفيف على الزر عند الضغط
        button.innerHTML = '<i class="fas fa-check"></i> تمت الإضافة';
        button.style.background = 'var(--primary-red)';
        
        setTimeout(() => {
            button.innerHTML = '<i class="fas fa-plus"></i> تصفح';
            button.style.background = 'transparent';
        }, 2000);
    });
});