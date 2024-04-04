document.addEventListener("DOMContentLoaded", function() {
    const feedbackForm = document.getElementById('feedback-form');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const visitInputs = document.querySelectorAll('input[name="visit"]');
    const convYesInput = document.getElementById('yes-conv'); // Define convYesInput
    const convNoInput = document.getElementById('no-conv');   // Define convNoInput
    const improvementInput = document.getElementById('improvement');
    const ratingInputs = document.querySelectorAll('input[name="rating"]');
    const recommendInputs = document.querySelectorAll('input[name="recommend"]');
    const updatesSelect = document.getElementById('updates');
    const commentInput = document.getElementById('comment');
    const previewDiv = document.getElementById('preview');
    const confirmationDiv = document.getElementById('confirmation');

    // Event listener for the "Yes" radio button for the question "Was this website informative and easy to navigate through?"
    convYesInput.addEventListener('change', function() {
        if (this.checked) {
            improvementInput.value = "I am satisfied with the website";
        }
    });

    // Event listener for the "No" radio button for the question "Was this website informative and easy to navigate through?"
    convNoInput.addEventListener('change', function() {
        if (this.checked) {
            improvementInput.value = ""; // Clear the text area if "No" is checked
        }
    });

    feedbackForm.addEventListener('submit', function(event) {
        event.preventDefault();

        // Clear previous error messages
        clearErrorMessages();

        // Validate form inputs
        let isValid = true;
        if (nameInput.value.trim() === '') {
            displayErrorMessage('name', 'Name is required');
            isValid = false;
        }
        if (emailInput.value.trim() === '') {
            displayErrorMessage('email', 'Email is required');
            isValid = false;
        }
        if (!isValidEmail(emailInput.value.trim())) {
            displayErrorMessage('email', 'Invalid email format');
            isValid = false;
        }

        if (improvementInput.value.trim() === '') {
            displayErrorMessage('improvement', 'Improvement suggestion is required');
        }


        if (updatesSelect.value === '') {
            displayErrorMessage('updates-error', 'Please select an option');
            isValid = false;
        }
        // Check if any field is empty
        const inputs = [nameInput, emailInput, improvementInput, updatesSelect];
        inputs.forEach(input => {
            if (input.value.trim() === '') {
                displayErrorMessage(input.id, `${input.placeholder} is required`);
                isValid = false;
            }
        });

        if (isValid) {
            
            // Store form data in sessionStorage
            const feedbackData = {
                name: nameInput.value.trim(),
                email: emailInput.value.trim(),
                visit: getSelectedRadioValue(visitInputs),
                conv: getSelectedRadioValue(convYesInput, convNoInput), // Pass convYesInput and convNoInput
                improvement: improvementInput.value.trim(),
                rating: getSelectedRadioValue(ratingInputs),
                recommend: getSelectedRadioValue(recommendInputs),
                updates: updatesSelect.value,
                comment: commentInput.value.trim(),

            };
            sessionStorage.setItem('feedbackData', JSON.stringify(feedbackData));

            // Display preview
            displayPreview(feedbackData);
        }
    });

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function isRadioChecked(inputs) {
        return Array.from(inputs).some(input => input.checked);
    }

    function getSelectedRadioValue(inputs) {
        const checkedInput = Array.from(inputs).find(input => input.checked);
        return checkedInput ? checkedInput.value : '';
    }

    function displayErrorMessage(inputId, message) {
        const errorMessageElement = document.getElementById(`${inputId}-error`);
        errorMessageElement.textContent = message;
    }

    function clearErrorMessages() {
        const errorMessages = document.querySelectorAll('.error-message');
        errorMessages.forEach(errorMessage => {
            errorMessage.textContent = '';
        });
    }
    function displayPreview(feedbackData) {
        previewDiv.textContent = ''; // Clear existing content
        if (feedbackData) {
            const {
                name,
                email,
                visit,
                improvement,
                rating,
                recommend,
                updates,
                comment,
                conv
            } = feedbackData;
            const informativeAndNavigable = conv === 'Yes' ? 'Yes' : 'No';
            previewDiv.innerHTML = `
                <h2>Preview:</h2>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>First time visiting:</strong> ${visit}</p>
                <p><strong>Informative and easy to navigate:</strong> ${informativeAndNavigable}</p>
                <p><strong>Improvement suggestion:</strong> ${improvement}</p>
                <p><strong>Rating:</strong> ${rating}</p>
                <p><strong>Recommendation:</strong> ${recommend}</p>
                <p><strong>Receive updates:</strong> ${updates}</p>
                <p><strong>Additional comments:</strong> ${comment}</p>
                <button id="edit-button">Edit</button>
                <button id="submit-button">Submit</button>
            `;
    
            // Add event listener for edit button
            const editButton = document.getElementById('edit-button');
            editButton.addEventListener('click', function() {
                previewDiv.textContent = ''; // Clear preview
            });
    
            // Add event listener for submit button
            const submitButton = document.getElementById('submit-button');
            submitButton.addEventListener('click', function() {
                confirmationDiv.textContent = 'Feedback submitted successfully!';
            });
        }
    }
    
});
