document.getElementById('signupForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default submission first
    
    const password = document.getElementById('password').value;
    const privacyChecked = document.getElementById('privacy-check').checked;
    const fullName = document.getElementById('full name').value;
    const email = document.getElementById('email').value;
    const languagePairs = document.getElementById('language-pairs').value;
    const cv = document.getElementById('cv').value;
    const portfolio = document.getElementById('portfolio').value;
    
    let isValid = true;
    let errorMessage = '';

    // Validate required fields
    if (!fullName || !email || !password || !languagePairs || !cv || !portfolio) {
        errorMessage += 'Please fill in all required fields.\n';
        isValid = false;
    }

    // Password validation
    if (password.length < 8) {
        errorMessage += 'Password must be at least 8 characters long.\n';
        isValid = false;
    }

    // Privacy policy agreement validation
    if (!privacyChecked) {
        errorMessage += 'You must agree to the Privacy Policy to sign up.\n';
        isValid = false;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        errorMessage += 'Please enter a valid email address.\n';
        isValid = false;
    }

    if (!isValid) {
        alert(errorMessage);
        return;
    }

    // If validation passes, submit the form
    this.submit();
});
