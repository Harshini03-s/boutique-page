// Wait for the DOM to load
document.addEventListener('DOMContentLoaded', function () {

    // Form Validation - Ensuring all required fields are filled out
    const profileForm = document.querySelector('form');
    if (profileForm) {
        profileForm.addEventListener('submit', function (event) {
            // Grab all the input fields
            const firstName = document.getElementById('first-name');
            const lastName = document.getElementById('last-name');
            const email = document.getElementById('email');
            const phone = document.getElementById('phone');

            // Validate if any field is empty
            if (!firstName.value.trim() || !lastName.value.trim() || !email.value.trim() || !phone.value.trim()) {
                alert("Please fill in all required fields.");
                event.preventDefault(); // Prevent form submission
            }
        });
    }

    // Flash Message - Automatically disappear after a few seconds
    const flashMessages = document.querySelector('.flash-messages');
    if (flashMessages) {
        setTimeout(function () {
            flashMessages.style.opacity = '0';
            flashMessages.style.transition = 'opacity 1s ease-out';
        }, 3000); // 3 seconds to fade out
    }

});
