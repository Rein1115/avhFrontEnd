$(function() {
    $('#addCustomer').on('click', function() {
        var formData = {
            custName : $('#custName').val(),
            custCon : $('#custCon').val(),
            custAdr : $('#custAdr').val()
        }
        swal({
            title: "Confirm",
            text: "Are you sure you want to save the items?",
            icon: "warning",
            buttons: ["Cancel", "Save"],
            dangerMode: false,
            })
        .then((willSave) => {
            if(willSave){
                axios.post('http://127.0.0.1:8000/api/customers', formData)
                .then(function(response) {
                    console.log(response);
                    // Optionally close the modal after successful submission
                    $('#addCustomerModal').modal('hide');
                    // Optionally clear the form after submission
                    $('#addCustomerForm')[0].reset();
                    // Optionally reload or update the data table
                    $('#dataTable').DataTable().ajax.reload();
                })
            .catch(function (error) {
                console.log(error);
            });
            }
        });
    });

    $('#dataTable').on('click','.btnEdit', function(){
        var id = $(this).data('id');

        axios.get('http://127.0.0.1:8000/api/customers/' + id)
        .then(function(response) {
            console.log("Customer data:", response.data);
            var customer = response.data;
                $('#editCustomerModal #EditCustName').val(customer.custName);
                $('#editCustomerModal #EditCustCon').val(customer.custCon);
                $('#editCustomerModal #EditCustAdr').val(customer.custAdr);
                
                $('#editCustomer').data('id', id);
                // Show the modal
                $('#editCustomerModal').modal('show');
        })
        .catch(function (error) {
            console.log(error);
        });
      });

      $('#editCustomer').on('click', function(){
        var id = $(this).data('id');
        var formData = {
            custName : $('#EditCustName').val(),
            custCon : $('#EditCustCon').val(),
            custAdr : $('#EditCustAdr').val()
        }

        axios.put('http://127.0.0.1:8000/api/customers/' + id, formData)
        .then(function(response) {
            console.log(response);
            // Optionally close the modal after successful submission
            $('#editCustomerModal').modal('hide');
            // Optionally clear the form after submission
            $('#editCustomerForm')[0].reset();
            // Optionally reload or update the data table
            $('#dataTable').DataTable().ajax.reload();
        })
        .catch(function(error) {
            console.log(error);
        })
      });

    $('#dataTable').on('click','.btnDelete', function(){
        var id = $(this).data('id');

        swal({
            title: "Confirm",
            text: "Are you sure you want to delete the items?",
            icon: "warning",
            buttons: ["Cancel", "Delete"],
            dangerMode: false,
            })
       .then((willDelete) => {
        if(willDelete){
            axios.delete('http://127.0.0.1:8000/api/customers/' + id)
           .then(function(response) {
            console.log(response);
            // Optionally reload or update the data table
            $('#dataTable').DataTable().ajax.reload();
    
            swal({
                title: "Deleted!",
                text: "The item has been deleted.",
                icon: "success",
                button: "OK",
            });
           }).catch(function(error) {
            console.log(error);
           })
          }
        });
    });
});
