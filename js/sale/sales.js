$(document).ready(function(){
    var table = $('#dataTable').DataTable({
        processing: true,
        serverSide: false,
        ajax: function(data, callback, settings) {
            axios.get('http://127.0.0.1:8000/api/sales')
                .then(function(response) {
                    console.log("API response:", response.data);

                    var sales = response.data.map(function(sale) {
                        return {
                            prodName: sale.prodName,
                            prodBrand: sale.prodBrand,
                            prodType: sale.prodType,
                            prodSPrice: sale.prodSPrice,
                            qtySold: sale.qtySold,
                            totalSales: sale.totalSales,
                            custName: sale.custName,
                            soldDate: sale.soldDate,
                            action: `
                                <button class="btn btn-danger btn-sm btnDelete" data-id="${sale.id}">
                                    <svg class="icon-16" width="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M19.3248 9.46826C19.3248 9.46826 18.7818 16.2033 18.4668 19.0403C18.3168 20.3953 17.4798 21.1893 16.1088 21.2143C13.4998 21.2613 10.8878 21.2643 8.27979 21.2093C6.96079 21.1823 6.13779 20.3783 5.99079 19.0473C5.67379 16.1853 5.13379 9.46826 5.13379 9.46826" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                                        <path d="M20.708 6.23975H3.75" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                                        <path d="M17.4406 6.23973C16.6556 6.23973 15.9796 5.68473 15.8256 4.91573L15.5826 3.69973C15.4326 3.13873 14.9246 2.75073 14.3456 2.75073H10.1126C9.53358 2.75073 9.02558 3.13873 8.87558 3.69973L8.63258 4.91573C8.47858 5.68473 7.80258 6.23973 7.01758 6.23973" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                                    </svg>
                                </button>
                                <button class="btn btn-success btn-sm printReciept" data-id="${sale.id}">
                                    <svg class="icon-16" width="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M19.5 8H17V4.5C17 3.67157 16.3284 3 15.5 3H8.5C7.67157 3 7 3.67157 7 4.5V8H4.5C3.67157 8 3 8.67157 3 9.5V15.5C3 16.3284 3.67157 17 4.5 17H7V21.5C7 22.3284 7.67157 23 8.5 23H15.5C16.3284 23 17 22.3284 17 21.5V17H19.5C20.3284 17 21 16.3284 21 15.5V9.5C21 8.67157 20.3284 8 19.5 8ZM15.5 5H8.5C8.22386 5 8 5.22386 8 5.5V8H16V5.5C16 5.22386 15.7761 5 15.5 5ZM16 18H8V20H16V18ZM18.5 16H5.5V10H18.5V16Z" fill="currentColor"/>
                                    </svg>
                                </button>
                            `
                        };
                    });

                    callback({
                        data: sales
                    });
                })
                .catch(function(error) {
                    console.error("Error fetching data:", error);
                });
        },
        columns: [
            { data: 'prodName', title: 'Product Name', className: 'text-center' },
            { data: 'prodBrand', title: 'Brand', className: 'text-center' },
            { data: 'prodType', title: 'Type', className: 'text-center' },
            { data: 'prodSPrice', title: 'Price', className: 'text-center' },
            { data: 'qtySold', title: 'Quantity Sold', className: 'text-center' },
            { data: 'totalSales', title: 'Total Sales', className: 'text-center' },
            { data: 'custName', title: 'Customer Name', className: 'text-center' },
            { data: 'soldDate', title: 'Sold Date', className: 'text-center' },
            { data: 'action', title: 'Action', className: 'text-center', width: '10%' }
        ]
    });

    $('#dataTable').on('click', '.btnDelete', function(){
        var id = $(this).data('id');
        console.log(id);

        swal({
            title: "Confirm",
            text: "Are you sure you want to delete the items?",
            icon: "warning",
            buttons: ["Cancel", "Delete"],
            dangerMode: false,
        }).then((willDelete) => {
            if (willDelete) {
                axios.delete('http://127.0.0.1:8000/api/sales/' + id)
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
                    });
            }
        });
    });

    $('#dataTable').on('click', '.printReciept', function() {
        var id = $(this).data('id');
        console.log(id);

        axios.get('http://127.0.0.1:8000/api/print/' + id)
            .then(response => {
                const saleData = response.data;
                printReceipt(saleData);
            })
            .catch(error => {
                console.error('Error fetching sale data:', error);
            });
    });

    function printReceipt(data) {
        console.log(data);

        document.getElementById('pname').textContent = data.sale.prodName;
        document.getElementById('pbrand').textContent = data.sale.prodBrand;
        document.getElementById('ptype').textContent = data.sale.prodType;
        document.getElementById('pprice').textContent = data.sale.prodSPrice;
        document.getElementById('psold').textContent = data.sale.qtySold;
        document.getElementById('psales').textContent = data.sale.totalSales;
        document.getElementById('cname').textContent = data.sale.custName;
        document.getElementById('sdate').textContent = data.sale.soldDate;
        document.getElementById('transNo').textContent = data.sale.transaction_number;

        window.print();
    }
});
