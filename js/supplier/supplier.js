$(document).ready(function(){
    var table = $('#dataTable').DataTable({
        processing: true,
        serverSide: false, // Set to false since we are handling the data ourselves
        ajax: function(data, callback, settings) {
            axios.get('http://127.0.0.1:8000/api/suppliers')
                .then(function(response) {
                    // Log the API response
                    console.log("API response:", response.data);

                    // Map the data to the expected format
                    var supplier = response.data.supplier.map(function(supplier) {
                        return {
                        supName: supplier.supName,
                        supBrand: supplier.supBrand,
                        supBrdType: supplier.supBrdType,
                        supAdr: supplier.supAdr,
                        supCon: supplier.supCon,
                        action: `
                            <button class="btn btn-primary btn-sm btnEdit" data-id="${supplier.id}">Edit</button>
                            <button class="btn btn-danger btn-sm btnDelete" data-id="${supplier.id}">Delete</button>
                        `
                    };
                    });
                    // Use callback to pass the processed data to DataTables
                    callback({
                        data: supplier
                    });
                })
                .catch(function(error) {
                    console.error("Error fetching data:", error);
                });
        },
        columns: [
            { data: 'supName', title: 'Name' },
            { data: 'supBrand', title: 'Brand' },
            { data: 'supBrdType', title: 'Brand Type' },
            { data: 'supAdr', title: 'Address' },
            { data: 'supCon', title: 'Contact #' },
            { data: 'action', title: 'Action' }
        ]
    });

  $('#addSupplier').on('click', function(){
    var formData = {
        supName : $('#supName').val(),
        supBrand : $('#supBrand').val(),
        supBrdType : $('#supBrdType').val(),
        supAdr : $('#supAdr').val(),
        supCon : $('#supCon').val()
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
            console.log(formData);
            axios.post('http://127.0.0.1:8000/api/suppliers', formData)
            .then(function (response) {
                console.log(response);
                $('#addSupplierModal').modal('hide');
                // Optionally reload or update the data table
                $('#dataTable').DataTable().ajax.reload();

                swal({
                    title: "Supplier Added!",
                    text: "The item has been Added Successfully.",
                    icon: "success",
                    button: "OK",
                });
            })
            .catch(function (error) {
                // Handle error
                console.error('Error fetching data:', error);
            });
        }
    });
  });

  $('#dataTable').on('click','.btnEdit', function(){
    var id = $(this).data('id');

    axios.get('http://127.0.0.1:8000/api/suppliers/' + id)
    .then(function(response) {
        console.log("Supplier data:", response.data);
        var supplier = response.data;
            $('#editSupplierModal #EditSupName').val(supplier.supName);
            $('#editSupplierModal #EditSupBrand').val(supplier.supBrand);
            $('#editSupplierModal #EditSupBrdType').val(supplier.supBrdType);
            $('#editSupplierModal #EditSupAdr').val(supplier.supAdr);
            $('#editSupplierModal #EditSupCon').val(supplier.supCon);
            
            $('#editSupplier').data('id', id);
            // Show the modal
            $('#editSupplierModal').modal('show');
    })
    .catch(function (error) {
        console.log(error);
    });
  });

  $('#editSupplier').on('click', function(){
    var id = $(this).data('id');
    var formData = {
        supName : $('#EditSupName').val(),
        supBrand : $('#EditSupBrand').val(),
        supBrdType : $('#EditSupBrdType').val(),
        supAdr : $('#EditSupAdr').val(),
        supCon : $('#EditSupCon').val()
    }

    swal({
        title: "Confirm",
        text: "Are you sure you want to save the items?",
        icon: "warning",
        buttons: ["Cancel", "Save"],
        dangerMode: false,
        })
    .then((willSave) => {
        if(willSave) {  
        axios.put('http://127.0.0.1:8000/api/suppliers/' + id, formData)
    .then(function(response) {
        console.log(response);
        // Optionally close the modal after successful submission
        $('#editSupplierModal').modal('hide');
        // Optionally reload or update the data table
        $('#dataTable').DataTable().ajax.reload();

        swal({
            title: "Edited!",
            text: "The item has been Edited.",
            icon: "success",
            button: "OK",
        });
    
    })
    .catch(function(error) {
        console.log(error);
    });
       
     }
    });
  });

  $('#dataTable').on('click','.btnDelete',function(){
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
        axios.delete('http://127.0.0.1:8000/api/suppliers/' + id)
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