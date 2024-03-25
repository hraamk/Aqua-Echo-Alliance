document.addEventListener('DOMContentLoaded', function() {
    const basketList = document.getElementById('basket-list');
    const productsGrid = document.querySelector('.products-grid');
    const totalElement = document.createElement('div');
    totalElement.id = 'total';
    totalElement.textContent = 'Total: $0.00';
    const proceedToCheckoutBtn = document.createElement('button');
    proceedToCheckoutBtn.textContent = 'Proceed to Checkout';
    proceedToCheckoutBtn.classList.add('add-to-cart'); // Applying same style as "Add to Cart" button

    // Sample products data
    const products = [
        { name: "Product 1", price: 10 },
        { name: "Product 2", price: 20 },
        { name: "Product 1", price: 10 },
        { name: "Product 2", price: 20 },
        { name: "Product 1", price: 10 },
        { name: "Product 2", price: 20 },
        { name: "Product 3", price: 30 }
        // Add more products as needed
    ];

    // Function to create product elements
    function createProductElement(product) {
        const productElement = document.createElement('div');
        productElement.classList.add('product');
        productElement.innerHTML = `
            <h2>${product.name}</h2>
            <p>Price: $${product.price}</p>
            <label for="quantity">Quantity:</label>
            <input type="number" class="quantity" name="quantity" value="1" min="1">
            <button class="add-to-cart">Add to Cart</button>
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
        });
    });

    // Function to add product to the basket
    function addToBasket(product, quantity) {
        const item = document.createElement('li');
        item.innerHTML = `${product.name} x${quantity} - $${product.price * quantity} <button class="remove-item">Remove</button>`;
        basketList.appendChild(item);
        // Add event listener to "Remove" button
        const removeBtn = item.querySelector('.remove-item');
        removeBtn.addEventListener('click', function() {
            basketList.removeChild(item);
            updateTotal();
        });
    }

    // Function to update total price
    function updateTotal() {
        const items = basketList.querySelectorAll('li');
        let total = 0;
        items.forEach(item => {
            const price = parseFloat(item.textContent.split('$')[1]);
            total += price;
        });
        totalElement.textContent = `Total: $${total.toFixed(2)}`;
    }

    // Append total element and "Proceed to Checkout" button to the basket
    basketList.parentNode.appendChild(totalElement);
    basketList.parentNode.appendChild(proceedToCheckoutBtn);

    // Event listener for "Proceed to Checkout" button
    proceedToCheckoutBtn.addEventListener('click', function() {
        // Redirect to checkout page
        window.location.href = 'checkout.html';
    });
});
