document.addEventListener("DOMContentLoaded", function () {
    const signupForm = document.getElementById("signupForm");
    const successMessage = document.getElementById("success-message");

    function validateForm() {
        const usernameValid = validateInput("username", "Username must be at least 5 characters.", value => value.length >= 5);
        const emailValid = validateInput("email", "Invalid email address.", value => /\S+@\S+\.\S+/.test(value));
        const passwordValid = validateInput("password", "Password must be at least 8 characters.", value => value.length >= 8);
        const confirmPasswordValid = validateConfirmPassword();

        return usernameValid && emailValid && passwordValid && confirmPasswordValid;
    }

    function validateInput(inputId, errorMessage, validationFunction) {
        const inputElement = document.getElementById(inputId);
        const errorElement = document.getElementById(`${inputId}-error`);

        function checkInput() {
            if (validationFunction(inputElement.value)) {
                hideError(errorElement);
            } else {
                showError(errorElement, errorMessage);
            }
        }

        inputElement.addEventListener("input", checkInput);

        // Check on form submission as well
        signupForm.addEventListener("submit", function (event) {
            checkInput();
            if (validateForm()) {
                showSuccessMessage();
            }
        });
    }

    // Validate username (minimum 5 characters)
    validateInput("username", "Username must be at least 5 characters.", value => value.length >= 5);

    // Validate email (must contain @ and after @ must contain .)
    validateInput("email", "Invalid email address.", value => /\S+@\S+\.\S+/.test(value));

    // Validate password (optional: add more complex rules)
    validateInput("password", "Password must be at least 8 characters.", value => value.length >= 8);

    // Validate confirm password
    function validateConfirmPassword() {
        const password = document.getElementById("password").value;
        const confirm = document.getElementById("confirm").value;
        const confirmErrorElement = document.getElementById("confirm-error");

        if (password === confirm) {
            hideError(confirmErrorElement);
            return true;
        } else {
            showError(confirmErrorElement, "Passwords do not match.");
            return false;
        }
    }

    validateInput("confirm", "Passwords do not match.", validateConfirmPassword);

    function showError(errorElement, errorMessage) {
        errorElement.textContent = errorMessage;
        errorElement.style.color = "red";
    }

    function hideError(errorElement) {
        errorElement.textContent = "";
    }

    function showSuccessMessage() {
        successMessage.textContent = "Account created successfully!";
        successMessage.style.color = "green";
    }
});