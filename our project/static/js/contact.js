document.addEventListener("DOMContentLoaded", () => {
    // Select the contact form
    const contactForm = document.querySelector(".contact-form form");
    
    // Add submit event listener
    contactForm.addEventListener("submit", (event) => {
        event.preventDefault(); // Prevent default form submission behavior
        
        // Validate the form inputs
        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const message = document.getElementById("message").value.trim();
        
        if (!name || !email || !message) {
            alert("Please fill out all fields before submitting.");
            return;
        }

        if (!validateEmail(email)) {
            alert("Please enter a valid email address.");
            return;
        }

        // Optionally, you can show a loading spinner here
        
        // Simulate form submission and show a success message
        // Replace this with an actual AJAX request if needed
        alert("Thank you for contacting us! Your message has been sent.");
        contactForm.reset(); // Reset the form after submission
    });

    // Function to validate email using regex
    function validateEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }
});
