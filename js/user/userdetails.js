var id;
$('document').ready(function() {
    var token = localStorage.getItem('authToken');

        if (!token) {
            window.location.href = '404.html';
            return;
        }
    axios.get('https://avhapi.onrender.com/api/userdetails', {
        headers:{
        'Authorization' : 'Bearer '+ token,
        'Accept'  : 'application/json'
        }
    })
    .then(function(response) {
        var resp = response.data.user;
        id = resp.id;
        console.log(resp);
        $('#username').text(resp.name);

        $('#inputName').val(resp.name);
        $('#exampleInputEmail').val(resp.email);
        $('#inputContact').val(resp.contact_no);
        
    })
    .catch(function(error) {
        console.log(error);
    });

    // profileImage

    $('#userDetails').on('submit', function(e){
        e.preventDefault();
        // var attachmentName      = "";
        // var attachmentURL      = "";

        // var fp = $("#profileImage"); 
        // var lg = fp[0].files.length;
        // var attachItems = fp[0].files;

        // if (lg > 0) {
        //     attachmentName = attachItems[0].name;
        //     attachmentURL = 'http://127.0.0.1:8000/api/app/profile_pictures/' + attachmentName;
        // }

        var formData = {
            name : $('#inputName').val(),
            email : $('#exampleInputEmail').val(),
            contact_no: $('#inputContact').val(),
            profile_picture : $('#profileImage').val(),
        }
        console.log(formData);
        axios.put('https://avhapi.onrender.com/api/userupdate', formData, {
        headers:{
        'Authorization' : 'Bearer '+ token,
        'Accept'  : 'application/json'
        }
        })
        .then(function(response) {
            console.log(response);
            alert('User updated successfully!');
        })
        .catch(function(error) {
            console.log(error);
        });

    });


    $('#profileImage').on('change', function() {
        var file = this.files[0];
        var reader = new FileReader();
        reader.onloadend = function() {
            $('#profile_picture').val(reader.result);
        }
        if (file) {
            reader.readAsDataURL(file);
        }
    });

    // $('#userDetails').on('submit', function(e){
    //     e.preventDefault();
        
    //     var formData = new FormData();
    //     formData.append('name', $('#inputName').val());
    //     formData.append('email', $('#exampleInputEmail').val());
    //     formData.append('contact', $('#inputContact').val());
    //     formData.append('profile_picture', $('#profileImage')[0].files[0]);
    
    //     axios.put('http://127.0.0.1:8000/api/userupdate/', formData, {
    //         headers: {
    //             'Authorization': 'Bearer ' + token,
    //             'Accept': 'application/json',
    //             'Content-Type': 'multipart/form-data'
    //         }
    //     })
    //     .then(function(response) {
    //         console.log(response);
    //         alert('User updated successfully!');
    //     })
    //     .catch(function(error) {
    //         console.log(error);
    //         alert('An error occurred while updating the user.');
    //     });
    // });
    
});