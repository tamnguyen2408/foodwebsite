document.addEventListener("DOMContentLoaded", function () {
    const contactForm = document.getElementById("contactForm");
    const successMessage = document.getElementById("success-message");

    function validateForm() {
        const nameValid = validateInput("name", "Please enter your name.", value => value.trim() !== "");
        const emailValid = validateInput("email", "Invalid email address.", value => /\S+@\S+\.\S+/.test(value));
        const messageValid = validateInput("message", "Please enter a message with at least 10 characters.", value => value.length >= 10);

        return nameValid && emailValid && messageValid;
    }

    function validateInput(inputId, errorMessage, validationFunction) {
        const inputElement = document.getElementById(inputId);
        const errorElement = document.getElementById(`${inputId}Error`); // Corrected error ID

        function checkInput() {
            const isValid = validationFunction(inputElement.value);
            if (isValid) {
                hideError(errorElement);
            } else {
                showError(errorElement, errorMessage);
            }
            return isValid;
        }

        inputElement.addEventListener("input", checkInput);

        // Check on form submission as well
        contactForm.addEventListener("submit", function (event) {
            const isValid = checkInput();
            if (!isValid) {
                event.preventDefault(); // Prevent form submission if validation fails
            }
        });

        return validationFunction(inputElement.value);
    }

    // Validate name (non-empty)
    validateInput("name", "Please enter your name.", value => value.trim() !== "");

    // Validate email (must contain @ and after @ must contain .)
    validateInput("email", "Invalid email address.", value => /\S+@\S+\.\S+/.test(value));

    // Validate message (minimum 10 characters)
    validateInput("message", "Please enter a message with at least 10 characters.", value => value.length >= 10);

    function showError(errorElement, errorMessage) {
        errorElement.textContent = errorMessage;
        errorElement.style.color = "red";
    }

    function hideError(errorElement) {
        errorElement.textContent = "";
    }
});
