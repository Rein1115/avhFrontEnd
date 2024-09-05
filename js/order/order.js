$(document).ready(function() {
    var token = localStorage.getItem('authToken');
            if (!token) {
                window.location.href = '404.html';
                return;
            }
    var table = $('#dataTable').DataTable({
        processing: true,
        serverSide: false, // Set to false since we are handling the data ourselves
        ajax: function(data, callback, settings) {
            axios.get('https://avhapi.onrender.com/api/orders', {
                headers:{
                    'Authorization' : 'Bearer '+ token,
                    'Accept'  : 'application/json'
                  }
            })
                .then(function(response) {
                    // Log the API response
                    console.log("API response:", response.data);

                    // Map the data to the expected format
                    var order = response.data.orders.map(function(order) {

                        var actionButtons = `
                        <button class="btn btn-primary btn-sm btnEdit" data-id="${order.id}">
                        <svg class="icon-16" width="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">                                    <path d="M13.7476 20.4428H21.0002" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M12.78 3.79479C13.5557 2.86779 14.95 2.73186 15.8962 3.49173C15.9485 3.53296 17.6295 4.83879 17.6295 4.83879C18.669 5.46719 18.992 6.80311 18.3494 7.82259C18.3153 7.87718 8.81195 19.7645 8.81195 19.7645C8.49578 20.1589 8.01583 20.3918 7.50291 20.3973L3.86353 20.443L3.04353 16.9723C2.92866 16.4843 3.04353 15.9718 3.3597 15.5773L12.78 3.79479Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>                                    <path d="M11.021 6.00098L16.4732 10.1881" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>  </button>
                        <button class="btn btn-danger btn-sm btnDelete" data-id="${order.id}">
                        <svg class="icon-16" width="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">                                    <path d="M19.3248 9.46826C19.3248 9.46826 18.7818 16.2033 18.4668 19.0403C18.3168 20.3953 17.4798 21.1893 16.1088 21.2143C13.4998 21.2613 10.8878 21.2643 8.27979 21.2093C6.96079 21.1823 6.13779 20.3783 5.99079 19.0473C5.67379 16.1853 5.13379 9.46826 5.13379 9.46826" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>                                    <path d="M20.708 6.23975H3.75" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>                                    <path d="M17.4406 6.23973C16.6556 6.23973 15.9796 5.68473 15.8256 4.91573L15.5826 3.69973C15.4326 3.13873 14.9246 2.75073 14.3456 2.75073H10.1126C9.53358 2.75073 9.02558 3.13873 8.87558 3.69973L8.63258 4.91573C8.47858 5.68473 7.80258 6.23973 7.01758 6.23973" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>                                </svg> </button>
                        `;
                        if (order.status === 1) {
                            actionButtons += `<button class="btn btn-warning btn-sm btnProcessed" data-id="${order.id}">
                            <svg class="icon-16" width="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                   <path fill-rule="evenodd" clip-rule="evenodd" d="M16.3345 2.75024H7.66549C4.64449 2.75024 2.75049 4.88924 2.75049 7.91624V16.0842C2.75049 19.1112 4.63549 21.2502 7.66549 21.2502H16.3335C19.3645 21.2502 21.2505 19.1112 21.2505 16.0842V7.91624C21.2505 4.88924 19.3645 2.75024 16.3345 2.75024Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                                                   <path d="M8.43994 12.0002L10.8139 14.3732L15.5599 9.6272" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                                             </svg></button>`;
                        } else if (order.status === 0) {
                            actionButtons += `<button class="btn btn-info btn-sm btnReceive" data-id="${order.id}">
                            <svg class="icon-16" width="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                   <path fill-rule="evenodd" clip-rule="evenodd" d="M21.25 12.0005C21.25 17.1095 17.109 21.2505 12 21.2505C6.891 21.2505 2.75 17.1095 2.75 12.0005C2.75 6.89149 6.891 2.75049 12 2.75049C17.109 2.75049 21.25 6.89149 21.25 12.0005Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                                                   <path d="M15.4316 14.9429L11.6616 12.6939V7.84692" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                                             </svg></button>`;
                        }

                        return {
                        prodName: order.prodName,
                        prodType: order.prodType,
                        prodBrand: order.prodBrand,
                        ordQty: order.ordQty,
                        prodOPrice: order.prodOPrice,
                        prodSPrice: order.prodSPrice,
                        totalOrderPrice: order.totalOrderPrice,
                        ordDate: order.ordDate,
                        action: actionButtons
                    };
                    });
                    // Use callback to pass the processed data to DataTables
                    callback({
                        data: order
                    });
                })
                .catch(function(error) {
                    console.error("Error fetching data:", error);
                });
        },
        columns: [
            { data: 'prodName', title: 'Product Name' , width : '15%', className: 'text-center'},
            { data: 'prodType', title: 'Type', className: 'text-center' },
            { data: 'prodBrand', title: 'Brand', className: 'text-center' },
            { data: 'ordQty', title: 'Order Qty', width: '10%', className: 'text-center' },
            { data: 'prodOPrice', title: 'Original Price', className: 'text-center' },
            { data: 'prodSPrice', title: 'Selling Price', className: 'text-center' },
            { data: 'totalOrderPrice', title: 'Total Price', className: 'text-center'},
            { data: 'ordDate', title: 'Order Date', className: 'text-center'},
            { data: 'action', title: 'Action', width: '15%', className: 'text-center'}
        ]
    });

    function populateSelect(data, selectElement) {
        var options = '';
        $.each(data, function(index, item) {
            options += '<option value="' + item + '">' + item + '</option>';
        });
        $(selectElement).html(options);
    }

    $.ajax({
        url: 'https://avhapi.onrender.com/api/brands', 
        type: 'GET',
        headers: {
            'Authorization' : 'Bearer '+ token,
            'Accept'  : 'application/json'
        },  // Include your token here in the Authorization header.
        success: function(response) {
            console.log(response);

            // Check if prodTypes and prodBrands are present in the response
            if (response.prodTypes && response.prodBrands) {
                // Populate the prodType select
                populateSelect(response.prodTypes, 'select[name="prodType"]');

                // Populate the prodBrand select
                populateSelect(response.prodBrands, 'select[name="prodBrand"]');
            } else {
                console.error('Expected data properties not found:', response);
            }
        },
        error: function(xhr, status, error) {
            console.error("Error fetching data:", error);
        }
    });


    $('#addOrder').on('click', function(){
        var formData = {
            prodName : $('#prodName').val(),
            prodType : $('#prodType').val(),
            prodBrand : $('#prodBrand').val(),
            ordQty : $('#ordQty').val(),
            prodOPrice : $('#prodOPrice').val(),
            prodSPrice : $('#prodSPrice').val(),
            totalOrderPrice : $('#totalOrderPrice').val(),
            ordDate : $('#ordDate').val(),
        }
        console.log(formData);

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
                axios.post('https://avhapi.onrender.com/api/orders', formData, {
                    headers:{
                        'Authorization' : 'Bearer '+ token,
                        'Accept'  : 'application/json'
                      }
                })
                .then(function (response) {
                    console.log(response);
                    swal({
                        title: "Order Added!",
                        text: "The item has been Added Successfully.",
                        icon: "success",
                        button: "OK",
                    });
                    $('#addOrderModal').modal('hide');
                    // Optionally reload or update the data table
                    $('#dataTable').DataTable().ajax.reload();
                })
                .catch(function (error) {
                    // Handle error
                    console.error('Error fetching data:', error);
                });
            }
        }); 
    });

    $('#parentModal').on('input','.poPrice, .oQty', function () {
           updateTotalPrice(); 
        });
    function updateTotalPrice(row) {
        var price = parseFloat($('.poPrice').val()) || 0;
        var quantity = parseFloat($('.oQty').val()) || 0;
    
        var total = price * quantity;
        $('.toPrice').val(total.toFixed(2));
    }

    $('#parentModalEdit').on('input','.poPriceEdit, .oQtyEdit', function () {
        updateTotalPriceEdit(); 
     });
    function updateTotalPriceEdit(row) {
        var price = parseFloat($('.poPriceEdit').val()) || 0;
        var quantity = parseFloat($('.oQtyEdit').val()) || 0;
    
        var total = price * quantity;
        $('.toPriceEdit').val(total.toFixed(2));
    }

    $('#dataTable').on('click','.btnEdit',function(){
        var id = $(this).data('id');
        console.log(id);

        axios.get('https://avhapi.onrender.com/api/orders/' + id , {
            headers:{
                'Authorization' : 'Bearer '+ token,
                'Accept'  : 'application/json'
              }
        })
        .then(function(response) {
            console.log("Supplier data:", response.data);
            var order = response.data;
                $('#editOrderModal #prodNameEdit').val(order.prodName);
                $('#editOrderModal #prodTypeEdit').val(order.prodType);
                $('#editOrderModal #prodBrandEdit').val(order.prodBrand);
                $('#editOrderModal #ordQtyEdit').val(order.ordQty);
                $('#editOrderModal #prodOPriceEdit').val(order.prodOPrice);
                $('#editOrderModal #prodSPriceEdit').val(order.prodSPrice);
                $('#editOrderModal #totalOrderPriceEdit').val(order.totalOrderPrice);
                $('#editOrderModal #ordDateEdit').val(order.ordDate);
                $('#editOrder').data('id', id);
                // Show the modal
                $('#editOrderModal').modal('show');
        })
        .catch(function (error) {
            console.log(error);
        });
        
    });

    $('#editOrder').on('click', function(){
        var id = $(this).data('id');
        var formData = {
            prodName : $('#prodNameEdit').val(),
            prodType : $('#prodTypeEdit').val(),
            prodBrand : $('#prodBrandEdit').val(),
            ordQty : $('#ordQtyEdit').val(),
            prodOPrice : $('#prodOPriceEdit').val(),
            prodSPrice : $('#prodSPriceEdit').val(),
            totalOrderPrice : $('#totalOrderPriceEdit').val(),
            ordDate : $('#ordDateEdit').val(),
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
            axios.put('https://avhapi.onrender.com/api/orders/' + id, formData, {
                headers:{
                    'Authorization' : 'Bearer '+ token,
                    'Accept'  : 'application/json'
                  }
            })
        .then(function(response) {
            console.log(response);
            // Optionally close the modal after successful submission
            $('#editOrderModal').modal('hide');
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
        axios.delete('https://avhapi.onrender.com/api/orders/' + id, {
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

    $('#dataTable').on('click', '.btnReceive', function () {
        var id = $(this).data('id');
        let token = localStorage.getItem('authToken');
        if (!token) {
            window.location.href = '404.html';
            return;
        }
    
        swal({
            title: "Item received?",
            text: "You won't be able to revert this!",
            icon: "warning",
            buttons: {
                cancel: {
                    text: "Cancel",
                    value: null,
                    visible: true,
                    className: "btn btn-danger",
                    closeModal: true,
                },
                confirm: {
                    text: "Yes, receive it!",
                    value: true,
                    visible: true,
                    className: "btn btn-primary",
                    closeModal: true
                }
            }
        })
        .then((result) => {
            if (result) {
                axios.post('https://avhapi.onrender.com/api/order/status/' + id, {}, {
                    headers: {
                        'Authorization': 'Bearer ' + token,
                        'Accept': 'application/json'
                    }
                })
                .then(function (response) {
                    // Handle success
                    console.log(response.data);
                    swal({
                        title: "Order Received!",
                        text: "Proceed to the product list.",
                        icon: "success"
                    });
                    $('#dataTable').DataTable().ajax.reload();
                })
                .catch(function (error) {
                    // Handle error
                    console.error(error);
                    swal({
                        title: "Error",
                        text: "Failed to receive order. Please try again later.",
                        icon: "error"
                    });
                });
            } else {
                swal("Cancelled", "Your action was cancelled.", "info");
            }
        });
    });
    

    $('#dataTable').on('click','.btnProcessed', function() {
        swal({
            title: "Item Already Recieved!",
            text: "You cannot proccess this item",
            icon: "error",
            button: "OK",
        })
    });
    
    


});