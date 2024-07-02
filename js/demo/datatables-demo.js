$(document).ready(function() {
  // Initialize DataTable
  var table = $('#dataTable').DataTable({
      processing: true,
      serverSide: false, // Set to false since we are handling the data ourselves
      ajax: function(data, callback, settings) {
          axios.get('http://127.0.0.1:8000/api/customers')
              .then(function(response) {
                  // Log the API response
                  console.log("API response:", response.data);

                  // Map the data to the expected format
                  var customers = response.data.customers.map(function(customer) {
                    return {
                      custName: customer.custName,
                      custCon: customer.custCon,
                      custAdr: customer.custAdr,
                      action: `
                          <button class="btn btn-primary btn-sm btnEdit" data-id="${customer.id}">Edit</button>
                          <button class="btn btn-danger btn-sm btnDelete" data-id="${customer.id}">Delete</button>
                      `
                  };
                  });
                  // Use callback to pass the processed data to DataTables
                  callback({
                      data: customers
                  });
              })
              .catch(function(error) {
                  console.error("Error fetching data:", error);
              });
      },
      columns: [
          { data: 'custName', title: 'Name' },
          { data: 'custCon', title: 'Contact #' },
          { data: 'custAdr', title: 'Address' },
          { data: 'action', title: 'Action' }
      ]
  });


  
});