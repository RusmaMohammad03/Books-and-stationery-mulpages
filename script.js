// Contact Form Handling
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                subject: document.getElementById('subject').value,
                message: document.getElementById('message').value,
                newsletter: document.getElementById('newsletter').checked
            };
            
            // Validate form
            if (!formData.name || !formData.email || !formData.subject || !formData.message) {
                alert('Please fill in all required fields.');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(formData.email)) {
                alert('Please enter a valid email address.');
                return;
            }
            
            // Simulate form submission
            console.log('Form Data Submitted:', formData);
            
            // Store in localStorage (simulating backend storage)
            let submissions = JSON.parse(localStorage.getItem('contactSubmissions')) || [];
            submissions.push({
                ...formData,
                timestamp: new Date().toISOString()
            });
            localStorage.setItem('contactSubmissions', JSON.stringify(submissions));
            
            // Hide form and show success message
            contactForm.style.display = 'none';
            document.getElementById('successMessage').style.display = 'block';
            
            // Reset form after 3 seconds
            setTimeout(function() {
                contactForm.reset();
                contactForm.style.display = 'block';
                document.getElementById('successMessage').style.display = 'none';
            }, 5000);
        });
    }
    
    // Filter buttons functionality (for Books and Stationery pages)
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    if (filterButtons.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                this.classList.add('active');
                
                // Get filter category
                const category = this.textContent.trim();
                
                // Filter products
                filterProducts(category);
            });
        });
    }
    
    function filterProducts(category) {
        const productCards = document.querySelectorAll('.product-card');
        
        productCards.forEach(card => {
            if (category === 'All Books' || category === 'All Items') {
                card.style.display = 'block';
            } else {
                const productCategory = card.querySelector('.category');
                if (productCategory && productCategory.textContent.includes(category)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            }
        });
        
        // Smooth scroll animation
        productCards.forEach((card, index) => {
            if (card.style.display !== 'none') {
                card.style.opacity = '0';
                setTimeout(() => {
                    card.style.transition = 'opacity 0.3s ease';
                    card.style.opacity = '1';
                }, index * 50);
            }
        });
    }
    
    // Add to Cart functionality
    const addToCartButtons = document.querySelectorAll('.btn-small');
    
    addToCartButtons.forEach(button => {
        if (button.textContent.includes('Add to Cart')) {
            button.addEventListener('click', function() {
                const productCard = this.closest('.product-card');
                const productName = productCard.querySelector('h3').textContent;
                const productPrice = productCard.querySelector('.price').textContent;
                
                // Add to cart (store in localStorage)
                let cart = JSON.parse(localStorage.getItem('cart')) || [];
                cart.push({
                    name: productName,
                    price: productPrice,
                    quantity: 1
                });
                localStorage.setItem('cart', JSON.stringify(cart));
                
                // Show confirmation
                const originalText = this.textContent;
                this.textContent = '✓ Added!';
                this.style.backgroundColor = '#27ae60';
                
                setTimeout(() => {
                    this.textContent = originalText;
                    this.style.backgroundColor = '';
                }, 2000);
            });
        }
    });
    
    // Mobile menu toggle (if needed in future)
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
        });
    }
    
    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // View cart count (if cart exists)
    function updateCartCount() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const cartCount = document.querySelector('.cart-count');
        if (cartCount) {
            cartCount.textContent = cart.length;
        }
    }
    
    updateCartCount();
    
    // Console message for developers
    console.log('%cBookWorm Website', 'font-size: 24px; font-weight: bold; color: #3498db;');
    console.log('%cBuilt with HTML, CSS, and JavaScript', 'font-size: 14px; color: #7f8c8d;');
    console.log('%cForm submissions are stored in localStorage', 'font-size: 12px; color: #27ae60;');
});

// Utility function to view all form submissions (for testing)
function viewSubmissions() {
    const submissions = JSON.parse(localStorage.getItem('contactSubmissions')) || [];
    console.table(submissions);
    return submissions;
}

// Utility function to clear all submissions (for testing)
function clearSubmissions() {
    localStorage.removeItem('contactSubmissions');
    console.log('All submissions cleared!');
}

// Make functions available globally for testing
window.viewSubmissions = viewSubmissions;
window.clearSubmissions = clearSubmissions;
