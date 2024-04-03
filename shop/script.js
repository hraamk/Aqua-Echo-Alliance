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
        // Validate form fields
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const contactNumber = document.getElementById('contact-number').value.trim();
        const country = document.getElementById('country').value.trim();
        const state = document.getElementById('state').value.trim();
        const district = document.getElementById('district').value.trim();
        const postcode = document.getElementById('postcode').value.trim();
        const street = document.getElementById('street').value.trim();
        const cardholderName = document.getElementById('cardholder-name').value.trim();
        const cardNumber = document.getElementById('card-number').value.trim();
        const expiryDate = document.getElementById('expiry-date').value.trim();
        const ccv = document.getElementById('ccv').value.trim();

        // Simple validation (you can extend this as needed)
        if (name === '' || email === '' || contactNumber === '' || country === '' || state === '' || district === '' || postcode === '' || street === '' || cardholderName === '' || cardNumber === '' || expiryDate === '' || ccv === '') {
            alert('Please fill in all fields.');
            return;
        }

        // Add your payment logic here
        console.log('Processing payment...');
    });
});
