document.addEventListener('DOMContentLoaded', function() {
    const basketList = document.getElementById('basket-list');
    const totalElement = document.getElementById('total');
    const payhere = document.getElementById('to_checkout_btn');
    const productsGrid = document.querySelector('.products-grid');
    const basket = document.getElementById('basket');

    // Check if elements exist before attempting to manipulate them
    if (basketList && totalElement && payhere && productsGrid && basket) {
        // Function to show "Pay Here" button and total element
        function showCheckout() {
            payhere.style.display = 'block';
            totalElement.style.display = 'block';
            basket.style.display = 'block';
            productsGrid.style.flex = '0 0 80%';
        }

        // Function to hide "Pay Here" button and total element
        function hideCheckout() {
            payhere.style.display = 'none';
            totalElement.style.display = 'none';
            basket.style.display = 'none';
            productsGrid.style.flex = '0 0 100%';
        }

        const products = [
            { id: 1, name: "Cup", price: 40, image: "productImages/cup.jpg" },
            { id: 2, name: "Hoodie", price: 110, image: "productImages/hoodie.jpg" },
            { id: 2, name: "T-Shirt", price: 58, image: "productImages/tshirt.jpg" },
            { id: 3, name: "Cap", price: 20, image: "productImages/cap.jpg"},
            { id: 3, name: "Bottle", price: 40, image: "productImages/bottle.jpg"},
            { id: 3, name: "Keytag", price: 10, image: "productImages/keytag.jpg"},
            { id: 3, name: "Umbrella", price: 50, image: "productImages/umbrella.jpg"}
            // Add more products as needed
        ];

        // Function to create product elements
        function createProductElement(product) {
            const productElement = document.createElement('div');
            productElement.classList.add('product');
            productElement.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <div class="product-details">
                <h2>${product.name}</h2>
                <p>Price: $${product.price}</p>
                <label for="quantity">Quantity:</label>
                <input type="number" class="quantity" name="quantity" value="1" min="1">
                <button class="add-to-cart">Add to Cart</button>
            </div>
        `;
            return productElement;
        }

        // Render products on the page
        products.forEach(product => {
            const productElement = createProductElement(product);
            productsGrid.appendChild(productElement);

            // Add event listener to "Add to Cart" button
            const addToCartBtn = productElement.querySelector('.add-to-cart');
            addToCartBtn.addEventListener('click', function() {
                const quantity = parseInt(productElement.querySelector('.quantity').value);
                addToBasket(product, quantity);
                updateTotal();
                showCheckout();
            });
        });

        // Function to add product to the basket
        function addToBasket(product, quantity) {
            if (basketList) {
                const item = document.createElement('li');
                item.innerHTML = `${product.name} x${quantity} - $${product.price * quantity} <button class="remove-item">Remove</button>`;
                basketList.appendChild(item);
                // Add event listener to "Remove" button
                const removeBtn = item.querySelector('.remove-item');
                removeBtn.addEventListener('click', function() {
                    basketList.removeChild(item);
                    removeFromLocalStorage(product.name); // Remove item from local storage
                    updateTotal();
                    if (basketList.children.length === 0) {
                        hideCheckout(); // Hide "Pay Here" button and total if basket is empty
                    }
                });
                // Save basket items to localStorage
                saveBasketToLocalStorage();
            }
        }

        // Function to update total price
        function updateTotal() {
            if (basketList && totalElement) {
                const items = basketList.querySelectorAll('li');
                let total = 0;
                items.forEach(item => {
                    const price = parseFloat(item.textContent.split('$')[1]);
                    total += price;
                });
                totalElement.textContent = `Total: $${total.toFixed(2)}`;
            }
        }

        // Event listener for "Proceed to Checkout" button
        if (payhere) {
            payhere.addEventListener('click', function() {
                // Redirect to checkout page
                window.location.href = 'checkout.html';
            });
        }

        // Function to save basket items to localStorage
        function saveBasketToLocalStorage() {
            const items = [];
            if (basketList) {
                const basketItems = basketList.querySelectorAll('li');
                basketItems.forEach(item => {
                    const name = item.textContent.split(' x')[0];
                    const quantity = parseInt(item.textContent.split('x')[1].split('-')[0].trim());
                    const price = parseFloat(item.textContent.split('$')[1]);
                    items.push({ name, quantity, price });
                });
                localStorage.setItem('basketItems', JSON.stringify(items));
            }
        }

        // Function to remove item from local storage
        function removeFromLocalStorage(name) {
            const items = JSON.parse(localStorage.getItem('basketItems'));
            const updatedItems = items.filter(item => item.name !== name);
            localStorage.setItem('basketItems', JSON.stringify(updatedItems));
        }
    } else {
        console.error('One or more elements not found.');
    }
});
