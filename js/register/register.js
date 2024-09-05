$(document).ready(function() {
    $('#registerForm').submit(function(event) {
        event.preventDefault(); // Prevent the default form submission

        var formData = {
            name: $('input[name="name"]').val(),
            email: $('input[name="email"]').val(),
            password: $('input[name="password"]').val(),
            password_confirmation: $('input[name="confirmPW"]').val(),
        };

        // console.log(formData);

        axios.post('https://avhapi.onrender.com/api/register', formData)
        .then(function(response) {
            Swal.fire({
                icon: 'success',
                title: 'Account Created',
                showConfirmButton: false,
                timer: 1500
            }).then(() => {
                // Redirect to the login page after the alert
                window.location.href = 'login.html';
            });
        })
        .catch(function(error) {
            console.error(error);
            if (error.response && error.response.data) {
                Swal.fire({
                    icon: 'error',
                    title: 'Registration failed',
                    text: JSON.stringify(error.response.data)
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Registration failed',
                    text: 'An unknown error occurred'
                });
            }
        });
    });
});
