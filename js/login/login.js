$('#loginForm').submit(function(event) {
    event.preventDefault(); // Prevent the default form submission

    var formData = {
        email: $('input[name="email"]').val(),
        password: $('input[name="password"]').val(),
    };

    Swal.fire({
        title: 'Logging in...',
        text: 'Please wait',
        icon: 'info',
        allowOutsideClick: false,
        showConfirmButton: false,
        willOpen: () => {
            Swal.showLoading();
        }
    });

    axios.post('https://avhapi.onrender.com/api/login', formData)
        .then(function(response) {
            Swal.close();
            // Store the token for future use
            localStorage.setItem('authToken', response.data.token);
            // Show success message using SweetAlert
            Swal.fire({
                icon: 'success',
                title: 'Login successful',
                showConfirmButton: false,
                timer: 1500
            }).then(() => {
                // Redirect to the dashboard page after the alert
                window.location.href = 'index.html';
            });
        })
        .catch(function(error) {
            console.error(error);
            if (error.response && error.response.data) {
                Swal.fire({
                    icon: 'error',
                    title: 'Login failed',
                    text: JSON.stringify(error.response.data)
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Login failed',
                    text: 'An unknown error occurred'
                });
            }
        });
});
