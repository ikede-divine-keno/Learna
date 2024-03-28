// Function to retrieve JWT token from local storage
function getToken() {
    return localStorage.getItem('token');
}

document.addEventListener('DOMContentLoaded', function () {
    const signinForm = document.getElementById('signin-form');

    signinForm.addEventListener('submit', function (event) {
        event.preventDefault();

        // Get email and password from the form
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        const headers = {
            'Content-Type' : 'application/json'
        };

        // Add token to request headers
        const token = getToken();
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }

        // Send a POST request to the server for authentication
        fetch('http://localhost:3000/api/auth/signin', {
            method: 'POST',
            headers: headers,
            body: JSON.stringify({ email, password })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Invalid email or password.');
            }
            return response.json();
        })
        .then(data => {
            // Save the JWT token and login time in local storage
            localStorage.setItem('token', data.token);
            localStorage.setItem('loginTime', Date.now());

            // Redirect to dashboard page
            window.location.href = '../dashboard.html';
        })
        .catch(error => {
            console.error('Error occurred while signing in:', error);
            alert(error.message || 'An error occurred while signing in. Please try again.');
        });
    });

    // Check for token expiration and cancel the session after 15 minutes
    const checkExpiration = () => {
        const loginTime = localStorage.getItem('loginTime');
        if (loginTime && (Date.now() - parseInt(loginTime)) > 15 * 60 * 1000) {
            console.log('Session expired. Logging out.');
            alert('Status code 400: Bad request');
            // Clear local storage and redirect to login page
            localStorage.removeItem('token');
            localStorage.removeItem('loginTime');
            window.location.href = '../login.html';
        }
    };

    // Check for token expiration every minute
    setInterval(checkExpiration, 60 * 1000);
});
