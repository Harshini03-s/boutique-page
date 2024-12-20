document.addEventListener("DOMContentLoaded", function () {
    const changePasswordForm = document.querySelector("form[action='/change-password']");
    const updateAccountForm = document.querySelector("form[action='/update-account-info']");
    
    // Password confirmation check for password change form
    if (changePasswordForm) {
        changePasswordForm.addEventListener("submit", function (event) {
            const newPassword = document.getElementById('new-password').value;
            const confirmPassword = document.getElementById('confirm-password').value;
            
            if (newPassword !== confirmPassword) {
                alert("Passwords do not match. Please try again.");
                event.preventDefault(); // Prevent form submission
            }
        });
    }

    // Simple email validation for the account info update form
    if (updateAccountForm) {
        updateAccountForm.addEventListener("submit", function (event) {
            const email = document.getElementById('email').value;
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!emailRegex.test(email)) {
                alert("Please enter a valid email address.");
                event.preventDefault();
            }
        });
    }
});
