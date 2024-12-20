document.addEventListener("DOMContentLoaded", function () {
    // Add functionality for form submission
    const form = document.querySelector("form");

    form.addEventListener("submit", function (event) {
        event.preventDefault();  // Prevent form submission for validation

        // Get form values
        const firstName = document.getElementById("first-name").value;
        const lastName = document.getElementById("last-name").value;
        const email = document.getElementById("email").value;
        const phone = document.getElementById("phone").value;

        // Basic validation before submitting the form
        if (firstName && lastName && email && phone) {
            // Simulate profile update
            alert("Profile updated successfully!");

            // You would usually submit the form here
            // form.submit(); 
        } else {
            alert("Please fill in all fields.");
        }
    });
});
