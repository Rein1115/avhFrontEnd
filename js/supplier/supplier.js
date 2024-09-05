$(document).ready(function(){
    var token = localStorage.getItem('authToken');
            if (!token) {
                window.location.href = '404.html';
                return;
            }
    var table = $('#dataTable').DataTable({
        processing: true,
        serverSide: false, // Set to false since we are handling the data ourselves
        ajax: function(data, callback, settings) {
            axios.get('https://avhapi.onrender.com/api/suppliers', {
                headers:{
                    'Authorization' : 'Bearer '+ token,
                    'Accept'  : 'application/json'
                  }
            })
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
                            <button class="btn btn-primary btn-sm btnEdit" data-id="${supplier.id}"><svg class="icon-16" width="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">                                    <path d="M13.7476 20.4428H21.0002" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M12.78 3.79479C13.5557 2.86779 14.95 2.73186 15.8962 3.49173C15.9485 3.53296 17.6295 4.83879 17.6295 4.83879C18.669 5.46719 18.992 6.80311 18.3494 7.82259C18.3153 7.87718 8.81195 19.7645 8.81195 19.7645C8.49578 20.1589 8.01583 20.3918 7.50291 20.3973L3.86353 20.443L3.04353 16.9723C2.92866 16.4843 3.04353 15.9718 3.3597 15.5773L12.78 3.79479Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>                                    <path d="M11.021 6.00098L16.4732 10.1881" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>  </button>
                            <button class="btn btn-danger btn-sm btnDelete" data-id="${supplier.id}"><svg class="icon-16" width="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">                                    <path d="M19.3248 9.46826C19.3248 9.46826 18.7818 16.2033 18.4668 19.0403C18.3168 20.3953 17.4798 21.1893 16.1088 21.2143C13.4998 21.2613 10.8878 21.2643 8.27979 21.2093C6.96079 21.1823 6.13779 20.3783 5.99079 19.0473C5.67379 16.1853 5.13379 9.46826 5.13379 9.46826" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>                                    <path d="M20.708 6.23975H3.75" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>                                    <path d="M17.4406 6.23973C16.6556 6.23973 15.9796 5.68473 15.8256 4.91573L15.5826 3.69973C15.4326 3.13873 14.9246 2.75073 14.3456 2.75073H10.1126C9.53358 2.75073 9.02558 3.13873 8.87558 3.69973L8.63258 4.91573C8.47858 5.68473 7.80258 6.23973 7.01758 6.23973" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>                                </svg> </button>
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
            axios.post('https://avhapi.onrender.com/api/suppliers', formData, {
                headers:{
                    'Authorization' : 'Bearer '+ token,
                    'Accept'  : 'application/json'
                  }
            })
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

    axios.get('https://avhapi.onrender.com/api/suppliers/' + id, {
        headers:{
            'Authorization' : 'Bearer '+ token,
            'Accept'  : 'application/json'
          }
    })
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
        axios.put('https://avhapi.onrender.com/api/suppliers/' + id, formData, {
            headers:{
                'Authorization' : 'Bearer '+ token,
                'Accept'  : 'application/json'
              }
        })
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
        axios.delete('https://avhapi.onrender.com/api/suppliers/' + id, {
            headers:{
                'Authorization' : 'Bearer '+ token,
                'Accept'  : 'application/json'
              }
        })
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