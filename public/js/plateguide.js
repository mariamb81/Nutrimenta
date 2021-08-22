// import ApexCharts from 'apexcharts'

var options = {
          series: [20, 30, 30, 20],
          chart: {
          width: 380,
          type: 'pie',
        },
        labels: ['Fruits', 'Vegetables', 'Grains', 'Protein'],
        responsive: [{
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: 'bottom'
            }
          }
        }]
        };

var chart = new ApexCharts(document.querySelector("#chart"), options);
chart.render();