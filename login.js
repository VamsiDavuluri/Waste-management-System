document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('login')) {
        document.getElementById('login').addEventListener('submit', function(e) {
            e.preventDefault();
            const email = document.getElementById('login-email').value;
            const password = document.getElementById('login-password').value;

            // For demonstration, we're just redirecting to the home page without actual authentication
            // In a real application, you would authenticate the user here

            console.log(`Email: ${email}, Password: ${password}`);
            alert('Login successful!');
            window.location.href = 'home.html'; // Redirect to home page
        });
    }
});