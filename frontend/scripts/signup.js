// Function to handle sign-up form submission
const handleSignup = async () => {
    // Get form input values
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const roleRadios = document.getElementsByName('role'); // Get all role radio buttons
    let role;
    let organizationName; // Declare organizationName variable

    // Loop through radio buttons to find the selected role
    for (const radio of roleRadios) {
        if (radio.checked) {
            role = radio.value;
            // If admin role is selected, check if organization name is provided
            if (role === 'admin') {
                organizationName = document.getElementById('organizationName').value; // Get organization name value
                if (!organizationName) {
                    alert('Organization Name is required for Admin role.');
                    return;
                }
            }
            break;
        }
    }

    // Validate form input (client-side validation)
    if (!firstName || !lastName || !email || !password || !confirmPassword || !role) { // Fixed validation check
        alert('All fields are required.');
        return;
    }

    if (password !== confirmPassword) {
        alert('Passwords do not match.');
        return;
    }

    // Create user object
    let user = {
        firstName,
        lastName,
        email,
        password,
        role // Include selected role in user object
    };

    // If admin role is selected, add organization name to user object
    if (role === 'admin') {
        user.organizationName = organizationName;
    }
    console.log(user);

    try {
        // Send POST request to server to register user
        const response = await fetch('http://localhost:3000/api/auth/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        });

        if (response.ok) {
            // Registration successful
            alert('User registered successfully.');
            window.location.href = '/frontend/login.html'; // Redirect to login page
        } else {
            // Registration failed
            const errorMessage = await response.json();
            alert(errorMessage.message);
        }
    } catch (error) {
        console.error('Error registering user:', error);
        alert('An error occurred. Please try again later.');
    }
};

// Function to toggle visibility of organization name field based on selected role
const toggleOrganizationNameField = () => {
    const adminRadio = document.getElementById('admin');
    const organizationNameField = document.getElementById('org');

    organizationNameField.style.display = adminRadio.checked ? 'block' : 'none';
};

// Event listeners for sign-up form submission and role radio button changes
document.getElementById('signup-btn').addEventListener('click', handleSignup);
document.getElementsByName('role').forEach(radio => radio.addEventListener('change', toggleOrganizationNameField));
