var canvas = document.getElementById("pastActivity");
var myChart = new Chart(canvas, {
    type: 'bar',
    data: {
        labels: ["mon", "tue", "wed", "thur", "fri", "sat", "sun"],
        datasets: [{
            label: "Calories",
            backgroundColor: "#9ad0f5",
            data  : [3, 7, 4, 1, 3, 2, 8]
          }
        ]
    },
    options: {
      scales: {
        yAxes: [{
          scaleLabel: {
            display: true,
            labelString: 'hours'
          },
          ticks: {
            beginAtZero:true
          }
        }],
        xAxes: [{
          barThickness: '10',
          scaleLabel: {
                    display: true,
                    labelString: 'days'
                }
            }]
        }
    }
});