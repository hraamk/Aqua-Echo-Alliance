document.addEventListener('DOMContentLoaded', function() {
    const basketItemsContainer = document.getElementById('basket-items');
    const totalElement = document.getElementById('total');
    const checkoutForm = document.getElementById('checkout-form');

    // Retrieve basket items from localStorage
    const basketItems = getBasketItemsFromLocalStorage();

    // Function to create basket item elements
    function createBasketItemElement(item) {
        const basketItem = document.createElement('div');
        basketItem.textContent = `${item.name} x${item.quantity} - $${(item.price * item.quantity).toFixed(2)}`;
        basketItemsContainer.appendChild(basketItem);
    }

    // Render basket items on the checkout page
    basketItems.forEach(item => {
        createBasketItemElement(item);
    });

    // Update total price on the checkout page
    function updateTotal() {
        let total = 0;
        basketItems.forEach(item => {
            total += item.price * item.quantity;
        });
        totalElement.textContent = `Total: $${total.toFixed(2)}`;
    }
    updateTotal(); // Update total initially

    // Handle form submission
    checkoutForm.addEventListener('submit', function(event) {
        event.preventDefault();
        // Implement form submission logic here, e.g., validation, AJAX request, etc.
        alert('Form submitted!'); // Placeholder alert
    });

    // Function to retrieve basket items from localStorage
    function getBasketItemsFromLocalStorage() {
        const storedItems = localStorage.getItem('basketItems');
        return storedItems ? JSON.parse(storedItems) : [];
    }
});
