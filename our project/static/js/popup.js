document.addEventListener("DOMContentLoaded", () => {
    const modal = document.getElementById("modal");
    const modalClose = modal.querySelector(".close");
    const openModalBtns = document.querySelectorAll(".open-modal-btn");

    if (!modal || !modalClose) {
        console.error("Modal or close button element is missing.");
        return;
    }

    openModalBtns.forEach((btn) => {
        btn.addEventListener("click", (event) => {
            event.preventDefault();
            modal.style.display = "block"; // Opens the modal
        });
    });

    modalClose.addEventListener("click", () => {
        modal.style.display = "none"; // Closes the modal on close button click
    });

    window.addEventListener("click", (event) => {
        if (event.target === modal) {
            modal.style.display = "none"; // Closes the modal when clicking outside of it
        }
    });
});
