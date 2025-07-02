// ================================================
// Moksy.AI Landing Page JavaScript
// ================================================

document.addEventListener('DOMContentLoaded', function() {
    // Get elements
    const promptInput = document.querySelector('.prompt-input');
    const promptButton = document.querySelector('.prompt-button');
    
    // Show/hide button based on input
    if (promptInput && promptButton) {
        promptInput.addEventListener('input', function() {
            if (this.value.trim().length > 0) {
                promptButton.classList.add('visible');
            } else {
                promptButton.classList.remove('visible');
            }
        });
        // On page load, ensure button is hidden
        promptButton.classList.remove('visible');
    }

    // Handle prompt button click
    if (promptButton) {
        promptButton.addEventListener('click', function() {
            handlePromptSubmit();
        });
    }
    
    // Handle Enter key press in input
    if (promptInput) {
        promptInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter' && promptInput.value.trim().length > 0) {
                handlePromptSubmit();
            }
        });
        
        // Add focus animation
        promptInput.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        promptInput.addEventListener('blur', function() {
            this.parentElement.classList.remove('focused');
        });
    }
    
    // Handle prompt submission
    function handlePromptSubmit() {
        const inputValue = promptInput.value.trim();
        
        if (inputValue) {
            // Add loading state
            promptButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
            promptButton.disabled = true;
            
            // Simulate processing (replace with actual API call)
            setTimeout(function() {
                // Reset button
                promptButton.innerHTML = '<i class="fas fa-arrow-right"></i>';
                promptButton.disabled = false;
                
                // Show success message (you can replace this with actual functionality)
                showMessage('Thank you! We\'ll process your request shortly.', 'success');
                
                // Clear input
                promptInput.value = '';
                promptButton.classList.remove('visible');
            }, 2000);
        } else {
            showMessage('Please enter a description of what you want to build.', 'error');
        }
    }
    
    // Show message function
    function showMessage(message, type) {
        // Remove existing messages
        const existingMessage = document.querySelector('.message');
        if (existingMessage) {
            existingMessage.remove();
        }
        
        // Create message element
        const messageEl = document.createElement('div');
        messageEl.className = `message message-${type}`;
        messageEl.textContent = message;
        
        // Add styles
        messageEl.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 12px 20px;
            border-radius: 8px;
            color: white;
            font-family: var(--font-primary);
            font-size: 14px;
            font-weight: 500;
            z-index: 10000;
            animation: slideInRight 0.3s ease-out;
            ${type === 'success' ? 'background-color: var(--color-success);' : 'background-color: var(--color-alert);'}
        `;
        
        // Add to page
        document.body.appendChild(messageEl);
        
        // Remove after 4 seconds
        setTimeout(function() {
            messageEl.style.animation = 'slideOutRight 0.3s ease-out';
            setTimeout(function() {
                if (messageEl.parentNode) {
                    messageEl.remove();
                }
            }, 300);
        }, 4000);
    }
    
    // Add CSS animations for messages
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOutRight {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
        
        .input-group.focused {
            transform: scale(1.02);
            transition: transform 0.2s ease;
        }
    `;
    document.head.appendChild(style);
    
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Navbar scroll effect
    const navbar = document.querySelector('#navbar');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Scrolling down
            navbar.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });
    
    // Add transition to navbar
    navbar.style.transition = 'transform 0.3s ease-in-out';
});
