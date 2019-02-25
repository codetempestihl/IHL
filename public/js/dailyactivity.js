var dailyActivity = document.getElementById('dailyActivity');
var dailyChart = new Chart(dailyActivity, {
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
        labels: activities
    },
    options: {
        legend: {
            display: false,
        }
    }
});

var steps = document.getElementById('stepsCanvas');
var stepsGraph = new Chart(steps, {
    type: 'doughnut',
    data: {
        datasets: [{
            data: [5, 10],
            backgroundColor: [
                'rgba(54, 162, 235, 0.5)',
                'rgba(2, 10, 132, 0.5)',
                ],
            }],
            // These labels appear in the legend and in the tooltips when hovering different arcs
            labels: steps
        },
        options: {
            circumference: Math.PI,
            rotation: -Math.PI,
            legend: {
                display: false
            }
    }
});