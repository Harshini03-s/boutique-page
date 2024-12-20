// Example orders data
const ordersData = [
    { id: 1, date: '2024-08-15', status: 'Shipped', total: 250.00, details: 'Details about Order 1...' },
    { id: 2, date: '2024-07-22', status: 'Delivered', total: 180.00, details: 'Details about Order 2...' },
    { id: 3, date: '2024-07-10', status: 'Canceled', total: 120.00, details: 'Details about Order 3...' }
];

// Function to display orders on the page
function displayOrders(orders) {
    const orderList = document.getElementById('order-list');
    orderList.innerHTML = ''; // Clear existing orders

    orders.forEach(order => {
        const orderItem = document.createElement('div');
        orderItem.classList.add('order-item');

        orderItem.innerHTML = `
            <div class="order-info">
                <h2>Order ${order.id}</h2>
                <p>Date: ${order.date}</p>
                <p>Status: ${order.status}</p>
            </div>
            <div class="order-total">
                <p>Total: $${order.total.toFixed(2)}</p>
                <button class="view-details" data-order-id="${order.id}">View Details</button>
            </div>
        `;

        orderList.appendChild(orderItem);
    });
}

// Function to show order details in the modal
function showOrderDetails(orderId) {
    const order = ordersData.find(o => o.id === orderId);
    const modalContent = document.getElementById('modalOrderDetails');
    modalContent.innerHTML = `
        <h3>Order ID: ${order.id}</h3>
        <p>Date: ${order.date}</p>
        <p>Status: ${order.status}</p>
        <p>Total: $${order.total.toFixed(2)}</p>
        <p>Details: ${order.details}</p>
    `;
    document.getElementById('orderModal').style.display = 'block';
}

// Close modal functionality
function closeModal() {
    document.getElementById('orderModal').style.display = 'none';
}

// Event listener for view details buttons
document.addEventListener('DOMContentLoaded', () => {
    displayOrders(ordersData);
    const viewDetailsButtons = document.querySelectorAll('.view-details');
    viewDetailsButtons.forEach(button => {
        button.addEventListener('click', () => {
            const orderId = parseInt(button.getAttribute('data-order-id'));
            showOrderDetails(orderId);
        });
    });

    // Event listener for closing the modal
    document.querySelector('.close-button').addEventListener('click', closeModal);
});

// Close modal when clicking outside of it
window.onclick = function(event) {
    const modal = document.getElementById('orderModal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
};


document.addEventListener('DOMContentLoaded', () => {
    const orderList = document.getElementById('order-list'); // Element to display orders

    // Retrieve product details from localStorage
    const product = JSON.parse(localStorage.getItem('selectedProduct'));

    if (product) {
        // Generate order details HTML
        const orderHTML = `
            <div class="order-item">
                <img src="${product.image}" alt="${product.name}" class="product-image">
                <div class="order-details">
                    <h3>${product.name}</h3>
                    <p>Price: ₹${product.price}</p>
                </div>
            </div>
        `;

        // Insert the order details into the page
        orderList.innerHTML = orderHTML;

        // Clear the stored data after displaying it
        localStorage.removeItem('selectedProduct');
    } else {
        // Default message if no orders are found
        orderList.innerHTML = '<p>No orders placed yet.</p>';
    }
});
