// Wait until the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form');
    
    // Form validation on submit
    form.addEventListener('submit', function(event) {
        let isValid = true;
        
        // Clear any previous error messages
        const errorMessages = document.querySelectorAll('.error-message');
        errorMessages.forEach(message => message.remove());

        // Check if email is provided and valid
        const email = document.querySelector('#email');
        const emailValue = email.value.trim();
        if (!emailValue || !validateEmail(emailValue)) {
            isValid = false;
            const emailError = document.createElement('div');
            emailError.classList.add('error-message');
            emailError.textContent = 'Please enter a valid email address.';
            email.parentElement.appendChild(emailError);
        }

        // Check if password is provided
        const password = document.querySelector('#password');
        const passwordValue = password.value.trim();
        if (!passwordValue) {
            isValid = false;
            const passwordError = document.createElement('div');
            passwordError.classList.add('error-message');
            passwordError.textContent = 'Please enter your password.';
            password.parentElement.appendChild(passwordError);
        }

        // If validation fails, prevent form submission
        if (!isValid) {
            event.preventDefault();
        }
    });

    // Flash messages handling
    const flashMessages = document.querySelector('.flashes');
    if (flashMessages) {
        setTimeout(() => {
            flashMessages.style.display = 'none'; // Hide messages after 5 seconds
        }, 5000);
    }

    // Function to validate email format
    function validateEmail(email) {
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        return emailRegex.test(email);
    }
});
