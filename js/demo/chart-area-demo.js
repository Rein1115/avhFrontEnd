// Set new default font family and font color to mimic Bootstrap's default styling
Chart.defaults.global.defaultFontFamily = 'Nunito', '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#858796';

function number_format(number, decimals, dec_point, thousands_sep) {
  // *     example: number_format(1234.56, 2, ',', ' ');
  // *     return: '1 234,56'
  number = (number + '').replace(',', '').replace(' ', '');
  var n = !isFinite(+number) ? 0 : +number,
    prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
    sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
    dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
    s = '',
    toFixedFix = function(n, prec) {
      var k = Math.pow(10, prec);
      return '' + Math.round(n * k) / k;
    };
  // Fix for IE parseFloat(0.55).toFixed(0) = 0;
  s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
  if (s[0].length > 3) {
    s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
  }
  if ((s[1] || '').length < prec) {
    s[1] = s[1] || '';
    s[1] += new Array(prec - s[1].length + 1).join('0');
  }
  return s.join(dec);
}

document.addEventListener('DOMContentLoaded', function() {
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
          var data = response.data;

          var totalSales = parseFloat(data.totalSales);
          var totalProfit = parseFloat(data.totalProfit);
          var totalCosts = parseFloat(data.totalCost);

          var ctx = document.getElementById('myAreaChart').getContext('2d');
          var myChart = new Chart(ctx, {
              type: 'line',
              data: {
                  labels: ['Total Sales', 'Total Costs', 'Total Profit'],
                  datasets: [{
                      label: 'Amount',
                      data: [totalSales, totalCosts, totalProfit],
                      backgroundColor: [
                          'rgba(54, 162, 235, 0.2)', // Blue for total sales
                          'rgba(255, 99, 132, 0.2)', // Red for total costs
                          'rgba(75, 192, 192, 0.2)'  // Green for total profit
                      ],
                      borderColor: [
                          'rgba(54, 162, 235, 1)',
                          'rgba(255, 99, 132, 1)',
                          'rgba(75, 192, 192, 1)'
                      ],
                      pointBackgroundColor: [
                          'rgba(54, 162, 235, 1)',
                          'rgba(255, 99, 132, 1)',
                          'rgba(75, 192, 192, 1)'
                      ],
                      pointBorderColor: [
                          'rgba(54, 162, 235, 1)',
                          'rgba(255, 99, 132, 1)',
                          'rgba(75, 192, 192, 1)'
                      ],
                      pointHoverBackgroundColor: [
                          'rgba(54, 162, 235, 1)',
                          'rgba(255, 99, 132, 1)',
                          'rgba(75, 192, 192, 1)'
                      ],
                      pointHoverBorderColor: [
                          'rgba(54, 162, 235, 1)',
                          'rgba(255, 99, 132, 1)',
                          'rgba(75, 192, 192, 1)'
                      ],
                      borderWidth: 2,
                      pointRadius: 3,
                      pointBorderWidth: 2,
                      pointHoverRadius: 5,
                      lineTension: 0.3
                  }]
              },
              options: {
                  maintainAspectRatio: false,
                  layout: {
                      padding: {
                          left: 10,
                          right: 25,
                          top: 25,
                          bottom: 0
                      }
                  },
                  scales: {
                      x: {
                          time: {
                              unit: 'month'
                          },
                          grid: {
                              display: false,
                              drawBorder: false
                          },
                          ticks: {
                              maxTicksLimit: 3
                          }
                      },
                      y: {
                          ticks: {
                              maxTicksLimit: 5,
                              padding: 10,
                              // Include a dollar sign in the ticks
                              callback: function(value, index, values) {
                                  return '$' + value.toLocaleString();
                              }
                          },
                          grid: {
                              color: "rgb(234, 236, 244)",
                              zeroLineColor: "rgb(234, 236, 244)",
                              drawBorder: false,
                              borderDash: [2],
                              zeroLineBorderDash: [2]
                          }
                      }
                  },
                  plugins: {
                      legend: {
                          display: false
                      },
                      tooltip: {
                          backgroundColor: "rgb(255,255,255)",
                          bodyFontColor: "#858796",
                          titleMarginBottom: 10,
                          titleFontColor: '#6e707e',
                          titleFontSize: 14,
                          borderColor: '#dddfeb',
                          borderWidth: 1,
                          xPadding: 15,
                          yPadding: 15,
                          displayColors: false,
                          intersect: false,
                          mode: 'index',
                          caretPadding: 10,
                          callbacks: {
                              label: function(tooltipItem) {
                                  return tooltipItem.dataset.label + ': $' + tooltipItem.raw.toLocaleString();
                              }
                          }
                      }
                  }
              }
          });
      })
      .catch(function(error) {
          console.log(error);
      });


      
});


