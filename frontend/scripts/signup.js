document.addEventListener('DOMContentLoaded', function () {
    let role;
    let organizationName;

    // Setup event listener for radio buttons
    const radioButtons = document.querySelectorAll('input[type="radio"]');
    radioButtons.forEach(function (radio) {
        radio.addEventListener('click', function () {
            role = this.value;
            if (role === 'admin') {
                document.getElementById('org').style.display = 'block';
                organizationName = document.getElementById('organizationName').value;
            } else {
                document.getElementById('org').style.display = 'none';
            }
        });
    });

    // Setup event listener for form submission
    document.querySelector('form').addEventListener('submit', function (e) {
        e.preventDefault();

        const fname = document.getElementById('fname').value;
        const lname = document.getElementById('lname').value;
        const email = document.querySelector('input[type="email"]').value;
        const password = document.querySelectorAll('input[type="password"]')[0].value;
        const confirmPassword = document.querySelectorAll('input[type="password"]')[1].value;

        if (password !== confirmPassword) {
            showError("Passwords do not match.");
        } else {
            if (role === 'admin') {
                organizationName = document.getElementById('organizationName').value;
                if (!organizationName) {
                    showError("Organization Name is required for Admin role.");
                    return;
                }
            }

            const data = {
                firstName: fname,
                lastName: lname,
                email: email,
                password: password,
                role: role,
            };

            if (role === 'admin') {
                data.organizationName = organizationName;
            }

            fetch('http://localhost:3000/api/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            }).then(response => {
                return Promise.all([response.json(), Promise.resolve(response.status)]);
            }).then(([data, statusCode]) => {
                console.log(data, statusCode); // Output the data object
                if (statusCode !== 201) {
                    showError(data.message);
                } else {
                    window.location.href = 'login.html';
                }
            })

        }
    });

    function showError(message) {
        const errorElement = document.querySelector('.error');
        errorElement.textContent = message;
        errorElement.classList.add('showerror');
        setTimeout(() => {
            errorElement.classList.remove('showerror');
        }, 3000);
    }
});
