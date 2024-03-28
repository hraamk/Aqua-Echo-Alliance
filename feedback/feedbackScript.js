document.addEventListener("DOMContentLoaded", function() {
    const feedbackForm = document.getElementById('feedback-form');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const ratingInput = document.getElementById('rating');
    const commentInput = document.getElementById('comment');
    const previewDiv = document.getElementById('preview');
    const confirmationDiv = document.getElementById('confirmation');

    feedbackForm.addEventListener('submit', function(event) {
        event.preventDefault();

        // Clear previous error messages
        clearErrorMessages();

        // Validate form inputs
        let isValid = true;
        if (!nameInput.value.trim()) {
            displayErrorMessage('name', 'Name is required');
            isValid = false;
        }
        if (emailInput.value.trim() && !isValidEmail(emailInput.value.trim())) {
            displayErrorMessage('email', 'Invalid email format');
            isValid = false;
        }
        if (!commentInput.value.trim()) {
            displayErrorMessage('comment', 'Comment is required');
            isValid = false;
        }

        if (isValid) {
            // Display preview
            displayPreview();
        }
    });

    function isValidEmail(email) {
        // Simple email validation using regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function displayErrorMessage(inputName, message) {
        const errorMessageElement = document.getElementById(`${inputName}-error`);
        errorMessageElement.textContent = message;
    }

    function clearErrorMessages() {
        const errorMessages = document.querySelectorAll('.error-message');
        errorMessages.forEach(errorMessage => {
            errorMessage.textContent = '';
        });
    }

    function displayPreview() {
        previewDiv.innerHTML = `
            <h2>Preview:</h2>
            <p><strong>Name:</strong> ${nameInput.value}</p>
            <p><strong>Email:</strong> ${emailInput.value}</p>
            <p><strong>Rating:</strong> ${ratingInput.value}</p>
            <p><strong>Comment:</strong> ${commentInput.value}</p>
            <button id="edit-button">Edit</button>
            <button id="submit-button">Submit</button>
        `;

        // Add event listener for edit button
        const editButton = document.getElementById('edit-button');
        editButton.addEventListener('click', function() {
            previewDiv.innerHTML = '';
        });

        // Add event listener for submit button
        const submitButton = document.getElementById('submit-button');
        submitButton.addEventListener('click', function() {
            // Here you can implement sending the form data via email
            // For demo purposes, we'll display a confirmation message
            confirmationDiv.textContent = 'Feedback submitted successfully!';
        });
    }
});
