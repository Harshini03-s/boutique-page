document.addEventListener("DOMContentLoaded", () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const checkoutContainer = document.getElementById("checkout-container");

    // Populate the cart items into the checkout container
    if (cart.length > 0) {
        checkoutContainer.innerHTML = `
            <table>
                <thead>
                    <tr>
                        <th>Product</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    ${cart.map(item => `
                        <tr>
                            <td>${item.name}</td>
                            <td>₹${item.price.toFixed(2)}</td>
                            <td>${item.quantity}</td>
                            <td>₹${(item.price * item.quantity).toFixed(2)}</td>
                        </tr>
                    `).join("")}
                </tbody>
            </table>
            <p><strong>Total: ₹${cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}</strong></p>
        `;
    } else {
        checkoutContainer.innerHTML = `<p>Your cart is currently empty.</p>`;
    }
});

// Function to handle order placement
function placeOrder() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    // Prepare order data
    const orderData = {
        items: cart,
        total: cart.reduce((total, item) => total + item.price * item.quantity, 0)
    };

    // Send order data to the server
    fetch("/checkout", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(orderData)
    })
        .then(response => {
            if (response.ok) {
                alert("Order placed successfully!");
                localStorage.removeItem("cart"); // Clear cart
                window.location.href = "/shop.html"; // Redirect to the shop page
            } else {
                return response.json().then(data => {
                    alert(`Failed to place order: ${data.message}`);
                });
            }
        })
        .catch(error => {
            console.error("Error placing order:", error);
            alert("Something went wrong while placing your order. Please try again.");
        });
}

console.log(JSON.parse(localStorage.getItem("cart")));

if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
}

fetch('/checkout', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        items: cart
    })
})
.then(response => response.json())
.then(data => {
    console.log('Success:', data);
    // Redirect or show success message
})
.catch((error) => {
    console.error('Error:', error);
});
