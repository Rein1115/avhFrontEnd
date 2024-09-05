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
            axios.get('https://avhapi.onrender.com/api/products',{
                headers:{
                    'Authorization' : 'Bearer '+ token,
                    'Accept'  : 'application/json'
                  }
            })
                .then(function(response) {
                    // Log the API response
                    console.log("API response:", response.data);

                    // Map the data to the expected format
                    var product = response.data.map(function(product) {
                        return {
                        prodName: product.prodName,
                        prodType: product.prodType,
                        prodBrand: product.prodBrand,
                        prodSPrice: product.prodSPrice,
                        prodQty: product.prodQty,
                        action: `
                            <button class="btn btn-primary btn-sm btnEdit" data-id="${product.id}"><svg class="icon-16" width="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">                                    <path d="M13.7476 20.4428H21.0002" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M12.78 3.79479C13.5557 2.86779 14.95 2.73186 15.8962 3.49173C15.9485 3.53296 17.6295 4.83879 17.6295 4.83879C18.669 5.46719 18.992 6.80311 18.3494 7.82259C18.3153 7.87718 8.81195 19.7645 8.81195 19.7645C8.49578 20.1589 8.01583 20.3918 7.50291 20.3973L3.86353 20.443L3.04353 16.9723C2.92866 16.4843 3.04353 15.9718 3.3597 15.5773L12.78 3.79479Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>                                    <path d="M11.021 6.00098L16.4732 10.1881" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>  </button>
                            <button class="btn btn-danger btn-sm btnDelete" data-id="${product.id}">
                            <svg class="icon-16" width="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">                                    <path d="M19.3248 9.46826C19.3248 9.46826 18.7818 16.2033 18.4668 19.0403C18.3168 20.3953 17.4798 21.1893 16.1088 21.2143C13.4998 21.2613 10.8878 21.2643 8.27979 21.2093C6.96079 21.1823 6.13779 20.3783 5.99079 19.0473C5.67379 16.1853 5.13379 9.46826 5.13379 9.46826" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>                                    <path d="M20.708 6.23975H3.75" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>                                    <path d="M17.4406 6.23973C16.6556 6.23973 15.9796 5.68473 15.8256 4.91573L15.5826 3.69973C15.4326 3.13873 14.9246 2.75073 14.3456 2.75073H10.1126C9.53358 2.75073 9.02558 3.13873 8.87558 3.69973L8.63258 4.91573C8.47858 5.68473 7.80258 6.23973 7.01758 6.23973" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>                                </svg> </button>
                            <butto class="btn btn-success btn-sm btnPurchase" data-id="${product.id}">
                            <svg class="icon-16" width="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">                            <path fill-rule="evenodd" clip-rule="evenodd" d="M14.1213 11.2331H16.8891C17.3088 11.2331 17.6386 10.8861 17.6386 10.4677C17.6386 10.0391 17.3088 9.70236 16.8891 9.70236H14.1213C13.7016 9.70236 13.3719 10.0391 13.3719 10.4677C13.3719 10.8861 13.7016 11.2331 14.1213 11.2331ZM20.1766 5.92749C20.7861 5.92749 21.1858 6.1418 21.5855 6.61123C21.9852 7.08067 22.0551 7.7542 21.9652 8.36549L21.0159 15.06C20.8361 16.3469 19.7569 17.2949 18.4879 17.2949H7.58639C6.25742 17.2949 5.15828 16.255 5.04837 14.908L4.12908 3.7834L2.62026 3.51807C2.22057 3.44664 1.94079 3.04864 2.01073 2.64043C2.08068 2.22305 2.47038 1.94649 2.88006 2.00874L5.2632 2.3751C5.60293 2.43735 5.85274 2.72207 5.88272 3.06905L6.07257 5.35499C6.10254 5.68257 6.36234 5.92749 6.68209 5.92749H20.1766ZM7.42631 18.9079C6.58697 18.9079 5.9075 19.6018 5.9075 20.459C5.9075 21.3061 6.58697 22 7.42631 22C8.25567 22 8.93514 21.3061 8.93514 20.459C8.93514 19.6018 8.25567 18.9079 7.42631 18.9079ZM18.6676 18.9079C17.8282 18.9079 17.1487 19.6018 17.1487 20.459C17.1487 21.3061 17.8282 22 18.6676 22C19.4969 22 20.1764 21.3061 20.1764 20.459C20.1764 19.6018 19.4969 18.9079 18.6676 18.9079Z" fill="currentColor"></path>                            </svg></button>
                        `
                    };
                    });
                    // Use callback to pass the processed data to DataTables
                    callback({
                        data: product
                    });
                })
                .catch(function(error) {
                    console.error("Error fetching data:", error);
                });
        },
        columns: [
            { data: 'prodName', title: 'Product Name', className: 'text-center' },
            { data: 'prodType', title: 'Product Type', className: 'text-center' },
            { data: 'prodBrand', title: 'Product Brand', className: 'text-center'},
            { data: 'prodSPrice', title: 'Product Price', className: 'text-center'},
            { data: 'prodQty', title: 'Product Quantity', className: 'text-center'},
            { data: 'action', title: 'Action', className: 'text-center', width:'15%'}
        ]
    });


    function populateSelect(data, selectElement) {
        var options = '';
        $.each(data, function(index, item) {
            options += '<option value="' + escapeHtml(item) + '">' + escapeHtml(item) + '</option>';
        });
        $(selectElement).html(options);
    }
    
    function escapeHtml(text) {
        var map = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#039;'
        };
        return text.replace(/[&<>"']/g, function(m) { return map[m]; });
    }
    
    $.ajax({
        url: 'https://avhapi.onrender.com/api/brands',
        type: 'GET',
        headers: {
                'Authorization' : 'Bearer '+ token,
                'Accept'  : 'application/json'
        },
        success: function(response) {
            console.log(response);
    
            if (response.prodTypes && response.prodBrands) {
                populateSelect(response.prodTypes, 'select[name="prodType"]');
                populateSelect(response.prodBrands, 'select[name="prodBrand"]');
            } else {
                console.error('Expected data properties not found:', response);
            }
        },
        error: function(xhr, status, error) {
            console.error("Error fetching data:", error);
        }
    });
    
    $.ajax({
        url: 'https://avhapi.onrender.com/api/customer',
        type: 'GET',
        headers: {
            'Authorization' : 'Bearer '+ token,
            'Accept'  : 'application/json'
        },
        success: function(response) {
            console.log(response);
    
            if (response.customers) {
                populateSelect(response.customers, 'select[name="custName"]');
            } else {
                console.error('Expected data property "customers" not found:', response);
            }
        },
        error: function(xhr, status, error) {
            console.error("Error fetching data:", error);
        }
    });
    

    $('#dataTable').on('click','.btnEdit', function(){
        var id = $(this).data('id');

        axios.get('https://avhapi.onrender.com/api/products/' + id , {
            headers: {
                'Authorization' : 'Bearer '+ token,
                'Accept'  : 'application/json'
            }
        })
        .then(function(response) {
            console.log("Products data:", response.data);
            var order = response.data;
                $('#editProductsModal #prodNameEdit').val(order.prodName);
                $('#editProductsModal #prodTypeEdit').val(order.prodType);
                $('#editProductsModal #prodBrandEdit').val(order.prodBrand);
                $('#editProductsModal #prodSPriceEdit').val(order.prodSPrice);
                $('#editProductsModal #prodQtyEdit').val(order.prodQty);
                $('#editProduct').data('id', id);
                // Show the modal
                $('#editProductsModal').modal('show');
        })
        .catch(function (error) {
            console.log(error);
        });
    });

    $('#editProduct').on('click', function(){
        var id = $(this).data('id');
        var formData = {
            prodName : $('#prodNameEdit').val(),
            prodType : $('#prodTypeEdit').val(),
            prodBrand : $('#prodBrandEdit').val(),
            prodSPrice : $('#prodSPriceEdit').val(),
            prodQty : $('#prodQtyEdit').val() }
        console.log(formData)

        swal({
            title: "Confirm",
            text: "Are you sure you want to save the items?",
            icon: "warning",
            buttons: ["Cancel", "Save"],
            dangerMode: false,
            })
            .then((willSave) => {
                if(willSave) {  
                axios.put('https://avhapi.onrender.com/api/products/' + id, formData, {
                    headers: {
                        'Authorization' : 'Bearer '+ token,
                        'Accept'  : 'application/json'
                    }
                })
                    .then(function(response) {
                        console.log(response);
                        // Optionally close the modal after successful submission
                        $('#editProductsModal').modal('hide');
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
            axios.delete('https://avhapi.onrender.com/api/products/' + id, {
                headers: {
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

    $('#dataTable').on('click','.btnPurchase', function(){
        var id = $(this).data('id');

        axios.get('https://avhapi.onrender.com/api/sales/' + id, {
            headers: {
                'Authorization' : 'Bearer '+ token,
                'Accept'  : 'application/json'
            }
        })
        .then(function(response) {
            console.log(response);
            let prodQty = response.data.prodQty;
            var sale = response.data;
            if(prodQty === 0) {
                swal({
                    title: "Out of Stock!",
                    text: "The item is out of stock.",
                    icon: "error",
                    button: "OK",
                });
                return;
            }
            $('#PurchaseModal #prodID').val(sale.id);
            $('#PurchaseModal #prodQty').val(sale.prodQty);
            $('#PurchaseModal #prodName').val(sale.prodName);
            $('#PurchaseModal #prodType').val(sale.prodType);
            $('#PurchaseModal #prodBrand').val(sale.prodBrand);
            $('#PurchaseModal #prodSPrice').val(sale.prodSPrice);
            $('#PurchaseModal #prodOPrice').val(sale.prodOPrice);
            $('#purchaseProduct').data('id', id);
            $('#PurchaseModal').modal('show');
        })
        .catch(function (error) {
            console.log(error);
        });
    });

    $('#qtySold').on('input', function () {
        var prodSPrice = parseFloat($('#prodSPrice').val());
        var qtySold = parseInt($('#qtySold').val());
        var totalSales = prodSPrice * qtySold;
        $('#totalSales').val(totalSales.toFixed(2)); 
    });    


    $('#purchaseProduct').on('click', function() {
        var id = $(this).data('id');
        var formData = {
            prodID: $('#prodID').val(),
            prodOPrice: $('#prodOPrice').val(),
            prodName: $('#prodName').val(),
            prodType: $('#prodType').val(),
            prodBrand: $('#prodBrand').val(),
            prodSPrice: $('#prodSPrice').val(),
            qtySold: $('#qtySold').val(),
            custName: $('#custName').val(),
            totalSales: $('#totalSales').val(),
            soldDate: $('#soldDate').val(),
        };

        console.log(formData);
    
        swal({
            title: "Confirm",
            text: "Are you sure you want to save the items?",
            icon: "warning",
            buttons: ["Cancel", "Save"],
            dangerMode: false,
        })
        .then((willSave) => {
            if (willSave) {
                axios.post('https://avhapi.onrender.com/api/purchase', formData, {
                    headers: {
                        'Authorization' : 'Bearer '+ token,
                        'Accept'  : 'application/json'
                    }
                })
                .then(function(response) {
                    console.log(response);
                    var data = response.data;
    
                    if (data.hasOwnProperty('error')) {
                        // If the response contains an error message, display it
                        swal({
                            title: "Error!",
                            text: data.error,
                            icon: "error",
                            button: "OK",
                        });
                    } else {
                        // Otherwise, display success message
                        swal({
                            title: "Purchase Successful",
                            text: "The item has been purchased. Proceed to saleslist for receipt.",
                            icon: "success",
                            button: "OK",
                        })
                        .then((okClicked) => {
                            if (okClicked) {
                                $('#editOrderModal').modal('hide');
                                $('#dataTable').DataTable().ajax.reload();
                                window.location.reload();
                            }
                        });
                    }
                })
                .catch(function(error) {
                    console.log(error);
                    swal({
                        title: "Error",
                        text: "An error occurred while processing your request.",
                        icon: "error",
                        button: "OK",
                    });
                });
            }
        });
    });
    
});