document.addEventListener("DOMContentLoaded", function() {
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const cartItemsContainer = document.querySelector('.cart-items');
    const totalSpan = document.getElementById('total');
    const checkoutBtn = document.querySelector('.checkout-btn');
    const checkoutForm = document.getElementById('checkout-form');
    const checkoutMessage = document.getElementById('checkout-message');

    let cart = [];

    addToCartButtons.forEach(button => {
        button.addEventListener('click', () => {
            const product = button.parentElement;
            const productInfo = {
                name: product.querySelector('h3').textContent,
                price: parseInt(product.querySelector('p').textContent.substring(1)),
                size: product.querySelector('select').value
            };
            cart.push(productInfo);
            updateCart();
        });
    });

    function updateCart() {
        cartItemsContainer.innerHTML = '';
        let total = 0;
        cart.forEach(item => {
            const cartItem = document.createElement('div');
            cartItem.textContent = `${item.name} - ${item.size} - $${item.price}`;
            cartItemsContainer.appendChild(cartItem);
            total += item.price;
        });
        totalSpan.textContent = total;
        if (cart.length > 0) {
            checkoutBtn.removeAttribute('disabled');
        } else {
            checkoutBtn.setAttribute('disabled', 'true');
        }
    }

    checkoutForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const address = document.getElementById('address').value;
        // Perform validation if needed
        // Here we'll just display a message for demonstration
        if (name && email && address) {
            checkoutMessage.textContent = 'Order placed successfully!';
            // You can add further processing logic here, e.g., sending data to a server
        } else {
            checkoutMessage.textContent = 'Please fill in all required fields.';
        }
    });
});
