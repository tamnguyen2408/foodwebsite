document.getElementById('loginForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent the default form submission

    // Perform authentication here (validate username and password)
    // For example:
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;

    // Check for empty fields
    if (username.trim() === '' || password.trim() === '') {
        // Display an error message for empty fields
        document.getElementById('loginMessage').innerHTML = '<p style="color: red;">Username and password are required.</p>';
    } else if (username.length < 3 || password.length < 6) {
        // Display an error message for insufficient username or password length
        document.getElementById('loginMessage').innerHTML = '<p style="color: red;">Username should be at least 3 characters, and password should be at least 6 characters.</p>';
    } else if (!isValidUsername(username) || !isValidPassword(password)) {
        // Display an error message for invalid characters in username or password
        document.getElementById('loginMessage').innerHTML = '<p style="color: red;">Invalid characters in username or password. Please use only letters, numbers, and underscores.</p>';
    } else {
        // Dummy authentication check
        if (username === 'tamnn_09' && password === 'P@s12345') {
            // Display a success message for successful login
            document.getElementById('loginMessage').innerHTML = '<p style="color: green;">Login successful!</p>';

            // Redirect to 'index.html' after successful login
            window.location.href = 'index.html';
        } else {
            // Display an error message for invalid username or password
            document.getElementById('loginMessage').innerHTML = '<p style="color: red;">Invalid username or password. Please try again.</p>';
        }
    }
});

// Function to validate the username format
function isValidUsername(username) {
    // Add your username validation logic here
    // For example, allow only letters, numbers, and underscores
    var usernameRegex = /^[a-zA-Z0-9_]+$/;
    return usernameRegex.test(username);
}

// Function to validate the password format
function isValidPassword(password) {
    // Add your password validation logic here
    // For example, require at least one uppercase letter, one lowercase letter, and one number
    var passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;
    return passwordRegex.test(password);
}

var showPassword = document.getElementById('showPassword');
var hidePassword = document.getElementById('hidePassword');
var passwordInput = document.getElementById('password');

showPassword.addEventListener('click', function () {
    passwordInput.type = 'text';
    showPassword.style.display = 'none';
    hidePassword.style.display = 'block';
});

hidePassword.addEventListener('click', function () {
    passwordInput.type = 'password';
    showPassword.style.display = 'block';
    hidePassword.style.display = 'none';
});