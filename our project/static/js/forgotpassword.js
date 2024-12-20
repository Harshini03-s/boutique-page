document.addEventListener("DOMContentLoaded", function () {
    const forgotPasswordForm = document.querySelector("form[action='/forgot_password']");
    const emailInput = document.getElementById("email");

    // Add event listener to validate the form before submission
    if (forgotPasswordForm) {
        forgotPasswordForm.addEventListener("submit", function (event) {
            const email = emailInput.value.trim();
            
            // Basic email validation
            if (!validateEmail(email)) {
                alert("Please enter a valid email address.");
                event.preventDefault(); // Prevent form submission
            }
        });
    }

    // Email validation function
    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Optional: Flash message auto-dismiss functionality (if you're using flash messages)
    const flashMessages = document.querySelectorAll(".flashes li");
    if (flashMessages.length > 0) {
        setTimeout(() => {
            flashMessages.forEach(message => {
                message.style.display = "none"; // Hide messages after a few seconds
            });
        }, 5000); // 5 seconds
    }
});
