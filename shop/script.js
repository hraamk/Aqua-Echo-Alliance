document.addEventListener('DOMContentLoaded', function() {
    const orderDetails = document.querySelector('.order-details');
    const totalElement = document.querySelector('.total');

    // Retrieve data from local storage
    const storedItems = localStorage.getItem('basketItems');

    // Check if data exists in local storage
    if (storedItems) {
        // Parse the JSON string into an array of items
        const items = JSON.parse(storedItems);

        // Update order details with fetched data
        items.forEach(item => {
            const productLine = document.createElement('p');
            productLine.textContent = `${item.name} - $${item.price * item.quantity}`;
            orderDetails.appendChild(productLine);
        });

        // Update total
        let total = 0;
        items.forEach(item => {
            total += item.price * item.quantity;
        });
        totalElement.textContent = `Total: $${total.toFixed(2)}`;
    } else {
        console.log('No data found in local storage.');
    }

    // Add event listener to payment button
    const paymentBtn = document.getElementById('payment_btn');
    paymentBtn.addEventListener('click', function() {
        // Add your payment logic here
        console.log('Processing payment...');
    });
});
