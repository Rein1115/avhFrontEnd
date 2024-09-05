// Set new default font family and font color to mimic Bootstrap's default styling
Chart.defaults.global.defaultFontFamily = 'Nunito', '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#858796';

$(document).ready(function() {
  var token = localStorage.getItem('authToken');
    if (!token) {
      window.location.href = '404.html';
      return;
    }
  axios.get('https://avhapi.onrender.com/api/quantitysold', {
    headers:{
      'Authorization' : 'Bearer '+ token,
      'Accept'  : 'application/json'
    }
  })
  .then(function(response) {
    let brandArray = response.data;

    // Extract labels and data from the response
    let labels = [];
    let data = [];
    let colors = []; // Add more colors if needed

    for (let i = 0; i < 30; i++) { // Generate 5 random colors, for example
      colors.push(getRandomColor());
    }

    brandArray.forEach(function(item, index){
      console.log(item.prodBrand);
      console.log(item.qtySold);

      labels.push(item.prodBrand);
      data.push(item.qtySold);
    });

    var ctx = document.getElementById("myPieChart");
    var myPieChart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: labels, // Use dynamic labels
        datasets: [{
          data: data, // Use dynamic data
          backgroundColor: colors.slice(0, labels.length), // Ensure the color array matches the number of labels
          hoverBackgroundColor: colors.slice(0, labels.length).map(color => color.replace('e', 'd')),
          hoverBorderColor: "rgba(234, 236, 244, 1)",
        }],
      },
      options: {
        maintainAspectRatio: false,
        tooltips: {
          backgroundColor: "rgb(255,255,255)",
          bodyFontColor: "#858796",
          borderColor: '#dddfeb',
          borderWidth: 1,
          xPadding: 15,
          yPadding: 15,
          displayColors: false,
          caretPadding: 10,
        },
        legend: {
          display: false
        },
        cutoutPercentage: 80,
      },
    });

    // Dynamically generate legend
    var legendHtml = '';
    labels.forEach((label, index) => {
      legendHtml += `
        <span class="mr-2">
          <i class="fas fa-circle" style="color:${colors[index]}"></i> ${label}
        </span>`;
    });

    document.querySelector('.mt-4.text-center.small').innerHTML = legendHtml;

  })
  .catch(function(error){
    console.log(error);
  });
});

function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
