// JavaScript to handle auto-redirect after logout (optional)
window.onload = function() {
    setTimeout(function() {
        // Redirect to the login page after 5 seconds
        window.location.href = "login.html";
    }, 5000); // 5000ms = 5 seconds
};
