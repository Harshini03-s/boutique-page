// Optional: Confirmation before removing an item from the wishlist
document.querySelectorAll('.btn-remove').forEach(button => {
    button.addEventListener('click', function (event) {
        const confirmRemove = confirm("Are you sure you want to remove this item from your wishlist?");
        if (!confirmRemove) {
            event.preventDefault(); // Prevent the form submission if the user cancels
        }
    });
});
