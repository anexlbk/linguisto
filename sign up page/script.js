document.getElementById('signupForm').addEventListener('submit', function(event) {
    const password = document.getElementById('password').value;
    const termsChecked = document.getElementById('terms').checked;

    // Password length validation
    if (password.length < 8) {
        alert('Password must be at least 8 characters long.');
        event.preventDefault(); // Prevent form submission
    }

    // Terms agreement validation
    if (!termsChecked) {
        alert('You must agree to the Terms and Conditions to sign up.');
        event.preventDefault(); // Prevent form submission
    }
});
