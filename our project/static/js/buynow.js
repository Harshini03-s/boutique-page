document.querySelectorAll('.buy-now').forEach(button => {
    button.addEventListener('click', function (event) {
        event.preventDefault(); // Prevent default link behavior

        // Collect product details from the button
        const product = {
            name: this.dataset.name, // Product Name
            price: this.dataset.price, // Product Price
            image: this.dataset.image // Product Image URL
        };

        // Save product details in localStorage
        localStorage.setItem('selectedProduct', JSON.stringify(product));

        // Redirect to orders.html
        window.location.href = 'orders.html';
    });
});
