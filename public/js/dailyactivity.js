var recentActivity = document.getElementById('recentActivity');
var recentChart = new Chart(recentActivity, {
    type: 'doughnut',
    data: {
        datasets: [{
            data: [10, 20, 30, 20],
            backgroundColor: [
                'rgba(255, 99, 132, 0.5)',
                'rgba(54, 162, 235, 0.5)',
                'rgba(255, 206, 86, 0.5)',
                'rgba(105, 100, 50, 0.5)',
            ],
        }],
        // These labels appear in the legend and in the tooltips when hovering different arcs
        labels: ['s', 'v', 'g', 'h']
    },
    options: {
        legend: {
            display: false,
        }
    }
})


var steps = document.getElementById('stepsCanvas');
var stepsGraph = new Chart(steps, {
    type: 'doughnut',
    data: {
        datasets: [{
            data: [7, 10],
            backgroundColor: [
                'rgba(54, 162, 235, 0.5)',
                'rgba(2, 10, 132, 0.5)',
                ],
            }],
            // These labels appear in the legend and in the tooltips when hovering different arcs
            labels: ['current', 'goal']
        },
        options: {
            circumference: Math.PI,
            rotation: -Math.PI,
            legend: {
                display: false
            }
    }
});

var calorie = document.getElementById('caloriesChart');
var calorieGraph = new Chart(calorie,{
    type: 'doughnut',
    data: {
        datasets: [{
            data: [7, 10],
            backgroundColor: [
                'rgba(255, 99, 132, 0.5)',
                'rgba(21, 10, 132, 0.5)',
                ],
            }],
            // These labels appear in the legend and in the tooltips when hovering different arcs
            labels: ['current', 'goal']
        },
        options: {
            legend: {
                display: false,
            }
    }
})

var sleepCanvas = document.getElementById('sleepCanvas');
var sleepGraph = new Chart(sleepCanvas, {
    type: 'line',
    data: {
      labels: ['sun', 'mon', 'tue', 'wed', 'thur', 'fri', 'sat', ''],
      datasets: [{ 
          data: [1,6,2,3,8,9,12,24],
          borderColor: "#3e95cd",
          fill: false
        },
      ]
    },
    options: {
      title: {
        display: false,
      },
      legend: {
          display: false,
      }
    }
  });
  