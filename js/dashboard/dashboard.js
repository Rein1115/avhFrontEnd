

$(document).ready(function() {
    var token = localStorage.getItem('authToken');

        if (!token) {
            window.location.href = '404.html';
            return;
        }

    axios.get('https://avhapi.onrender.com/api/dashboard', {
        headers:{
          'Authorization' : 'Bearer '+ token,
          'Accept'  : 'application/json'
        }
    }) 
    .then(function(response) {
        // console.log(response);
        var data = response.data;
        var totalSales = parseFloat(data.totalSales);
        var incomeToday = parseFloat(data.incomeToday);
        var totalProfit = parseFloat(data.totalProfit);
        var totalCosts = parseFloat(data.totalCost);
        $('.totalSales').text(totalSales.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }));
        $('.incomeToday').text(incomeToday.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }));
        $('.totalProfit').text(totalProfit.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }));
        $('.totalCosts').text(totalCosts.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }));
    })
    .catch(function(error) {
        console.log(error);
    });

    $('#logoutConf').click(function() {
        localStorage.removeItem('authToken');
        window.location.href = 'login.html';
    });

});

function resetCounter() {
    $('alertCounter').text('0');
}

function fetchAlerts() {
    var token = localStorage.getItem('authToken');

        if (!token) {
            window.location.href = '404.html';
            return;
        }

    axios.get('https://avhapi.onrender.com/api/alert', {
        headers:{
          'Authorization' : 'Bearer '+ token,
          'Accept'  : 'application/json'
        }
    })
    .then(function(response) {
        let dataArray = response.data;

        let dropdownMenu = document.getElementById('dropdownMenu');

        dropdownMenu.innerHTML = '';

        let currentCount = parseInt($('#alertCounter').text());
        $('#alertCounter').text(currentCount + dataArray.length);

        dataArray.forEach(function(data) {
            // Create the outer anchor element
            let anchor = document.createElement('a');
            anchor.className = 'dropdown-item d-flex align-items-center';
            anchor.href = 'sales.html';

            // Create the icon div
            let iconDiv = document.createElement('div');
            iconDiv.className = 'mr-3';
            let iconCircle = document.createElement('div');
            iconCircle.className = 'icon-circle bg-success';
            let icon = document.createElement('i');
            icon.className = 'fas fa-donate text-white';
            iconCircle.appendChild(icon);
            iconDiv.appendChild(iconCircle);

            // Create the alert content div
            let alertContent = document.createElement('div');
            alertContent.id = 'alertContent';

            // Create the date div
            let alertDate = document.createElement('div');
            alertDate.className = 'small text-gray-500 adate';
            alertDate.id = 'alertDate';
            alertDate.textContent = data.soldDate;

            // Create the content text
            let contentText = document.createElement('div');
            contentText.innerHTML = `
                <div style="padding: 5px; border-radius: 3px;" class="my-1 pb-1">
                    <hr class="my-1 pb-1">
                    <p><strong>📦 New Item Sold Today!<strong><p/>
                    <p>🛍️ <strong>Product Name:</strong> ${data.prodName}</p>
                    <p>🔢 <strong>Quantity Sold:</strong> ${data.qtySold}</p>
                    <p>💵 <strong>Total Sales:</strong> ${data.totalSales}</p>
                    <p>🧾 <strong>Trans #:</strong> ${data.transaction_number}</p>
                    <hr class="my-1 pb-1">
                </div>
            `;


            // Append the date and content text to the alert content div
            alertContent.appendChild(alertDate);
            alertContent.appendChild(contentText);

            // Append the icon and alert content to the anchor
            anchor.appendChild(iconDiv);
            anchor.appendChild(alertContent);

            // Append the anchor to the dropdown menu
            dropdownMenu.appendChild(anchor);
        });
    })
    .catch(function(error) {
        console.log(error);
    });
}

$(document).ready(function() {
    fetchAlerts();
    $('#alertsDropdown').on('click', resetCounter);
});