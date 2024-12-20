document.addEventListener("DOMContentLoaded", () => {
    let cart = JSON.parse(localStorage.getItem("cart")) || []; // Load cart from localStorage or initialize an empty array
    const cartCountElement = document.getElementById("cart-count");

    // Function to save the cart to localStorage
    const saveCart = () => {
        localStorage.setItem("cart", JSON.stringify(cart));
    };

    // Function to update the cart count in the UI
    const updateCartCount = () => {
        const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
        cartCountElement.textContent = totalItems;
    };

    // Add to Cart Event
    document.querySelectorAll(".add-to-cart").forEach(button => {
        button.addEventListener("click", event => {
            event.preventDefault();

            // Get product details from data attributes
            const productName = button.getAttribute("data-name");
            const productPrice = parseFloat(button.getAttribute("data-price"));
            const productQuantity = parseInt(button.getAttribute("data-quantity"));

            // Add product to cart array
            const product = {
                name: productName,
                price: productPrice,
                quantity: productQuantity
            };

            // Check if the product is already in the cart
            const existingProduct = cart.find(item => item.name === productName);

            if (existingProduct) {
                existingProduct.quantity += productQuantity; // Increment quantity
            } else {
                cart.push(product); // Add new product to cart
            }

            // Save updated cart to localStorage
            saveCart();

            // Update cart count in UI
            updateCartCount();

            alert(`${productName} added to cart!`);
        });
    });

    // Initialize cart count on page load
    updateCartCount();
});



// Function to clear the entire cart
function clearCart() {
    if (confirm("Are you sure you want to clear the cart?")) {
        localStorage.removeItem("cart"); // Remove the cart from localStorage
        window.location.reload(); // Refresh the page
    }
}

// Function to calculate and update the total price
function updateTotalPrice() {
    const total = cart.reduce((total, item) => total + item.price * item.quantity, 0);
    document.getElementById("total-price").textContent = total.toFixed(2);
}

// Call this function to ensure the total price is updated on load
updateTotalPrice();

// Function to handle checkout
function checkout() {
    // Check if the cart is empty
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    if (cart.length === 0) {
        alert("Your cart is empty. Please add some items before proceeding to checkout.");
        return;
    }

    // Redirect to the checkout page (you should have a checkout page in your project)
    window.location.href = "/checkout"; // Replace "/checkout" with the actual path to your checkout page
}
