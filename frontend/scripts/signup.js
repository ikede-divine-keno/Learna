// Function to handle sign-up form submission
const handleSignup = async () => {
    // Get form input values
    const name = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const roleRadios = document.getElementsByName('role'); // Get all role radio buttons
    let role;

    // Loop through radio buttons to find the selected role
    for (const radio of roleRadios) {
        if (radio.checked) {
            role = radio.value;
            // If admin role is selected, check if organization name is provided
            if (role === 'admin') {
                const organizationName = document.getElementById('organizationName').value;
                if (!organizationName) {
                    alert('Organization Name is required for Admin role.');
                    return;
                }
            }
            break;
        }
    }

    // Validate form input (client-side validation)
    if (!name || !email || !password || !confirmPassword || !role) {
        alert('All fields are required.');
        return;
    }

    if (password !== confirmPassword) {
        alert('Passwords do not match.');
        return;
    }

    // Create user object
    const user = {
        name,
        email,
        password,
        role // Include selected role in user object
    };

    // If admin role is selected, add organization name to user object
    if (role === 'admin') {
        user.organizationName = organizationName;
    }

    try {
        // Send POST request to server to register user
        const response = await fetch('/api/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        });

        if (response.ok) {
            // Registration successful
            alert('User registered successfully.');
            window.location.href = '/login'; // Redirect to login page
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
    const admin = document.getElementById('admin');
    const org = document.getElementById('org');

    org.style.display = admin.checked ? 'block' : 'none';
};

// Event listeners for sign-up form submission and role radio button changes
document.getElementById('signup-btn').addEventListener('click', handleSignup);
document.getElementsByName('role').forEach(radio => radio.addEventListener('change', toggleOrganizationNameField));
