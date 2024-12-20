document.addEventListener("DOMContentLoaded", () => {
    const productGrid = document.getElementById("productGrid");
    const categoryFilter = document.getElementById("product-category");
    const sortOrder = document.getElementById("sort-order");

    // Filter by category
    categoryFilter.addEventListener("change", () => {
        const category = categoryFilter.value;
        const products = productGrid.querySelectorAll(".product-card");

        products.forEach((product) => {
            const isVisible = category === "all" || product.dataset.category === category;
            product.style.display = isVisible ? "block" : "none";
        });
    });

    // Sort products
    sortOrder.addEventListener("change", () => {
        const products = Array.from(productGrid.children);
        const sortOption = sortOrder.value;

        const compareFunctions = {
            "price-low-high": (a, b) =>
                parseFloat(a.querySelector(".discounted-price").textContent.replace("₹", "")) -
                parseFloat(b.querySelector(".discounted-price").textContent.replace("₹", "")),
            "price-high-low": (a, b) =>
                parseFloat(b.querySelector(".discounted-price").textContent.replace("₹", "")) -
                parseFloat(a.querySelector(".discounted-price").textContent.replace("₹", "")),
        };

        products.sort(compareFunctions[sortOption]);

        // Append sorted products back to the grid
        products.forEach((product) => productGrid.appendChild(product));
    });
});
