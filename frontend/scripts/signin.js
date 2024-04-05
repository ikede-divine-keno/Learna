// Reusable function to make HTTP requests
const makeRequest = async (url, method, body = null, headers = {}) => {
    try {
        const options = {
            method: method.toUpperCase(),
            headers: {
                'Content-Type': 'application/json',
                ...headers
            }
        };
  
        if (body) {
            options.body = JSON.stringify(body);
        }
  
        const response = await fetch(url, options);
  
        if (!response.ok) {
            throw new Error('Request failed.');
        }
  
        return await response.json();
    } catch (error) {
        throw new Error(`An error occurred: ${error.message}`);
    }
  };

// Function to handle sign-in form submission
const handleSignIn = async () => {
    console.log('clicked')
    // Get form input values
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Validate form input (client-side validation)
    if (!email || !password) {
        alert('Email and password are required.');
        return;
    }

    // Create user object
    const user = { email, password };

    try {
        // Make POST request using the reusable function
        const data = await makeRequest('http://localhost:3000/api/auth/signin', 'POST', user);

        if (localStorage.getItem('token')) {
            localStorage.removeItem('token');
        }

        localStorage.setItem('token', data.accessToken); // Save token to local storage
        window.location.href = '/frontend/dashboard.html'; // Redirect to dashboard page
    } catch (error) {
        alert("Invalid login details");
    }
};

// Event listener for sign-in form submission
document.getElementById('signin-btn').addEventListener('click', handleSignIn);

    // Add token to request headers
    // const token = getToken();
    // if (token) {
    //     headers['Authorization'] = `Bearer ${token}`;
    // }

    // Check for token expiration and cancel the session after 15 minutes
    // const checkExpiration = () => {
        //     const loginTime = localStorage.getItem('loginTime');
    //     if (loginTime && (Date.now() - parseInt(loginTime)) > 15 * 60 * 1000) {
    //         console.log('Session expired. Logging out.');
    //         alert('Status code 400: Bad request');
    //         // Clear local storage and redirect to login page
    //         localStorage.removeItem('token');
    //         localStorage.removeItem('loginTime');
    //         window.location.href = '../login.html';
    //     }
    // };

    // // Check for token expiration every minute
    // setInterval(checkExpiration, 60 * 1000);
// });

// Function to retrieve JWT token from local storage
// function getToken() {
//     return localStorage.getItem('token');
// }