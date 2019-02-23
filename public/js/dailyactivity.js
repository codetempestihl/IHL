var canvas1 = document.getElementById('dailyActivity');
var dailyActivityChart = new Chart(canvas1, {
    type: 'doughnut',
    data: {
        datasets: [{
            data: [10, 20, 30, 20],
            backgroundColor: [
                'rgba(255, 99, 132, 0.5)',
                'rgba(54, 162, 235, 0.5)',
                'rgba(255, 206, 86, 0.5)',
                'rgba(105, 100, 50, 0.5)',,
            ],
        }],
        // These labels appear in the legend and in the tooltips when hovering different arcs
        labels: [
            'Running',
            'Walking',
            'Sleeping',
            'Cardio',
        ]
    },
    options: {
        legend: {
            display: false,
        }
    }
});

var canvas2 = document.getElementById('stepsActivity');
var stepsActivityChart = new Chart(canvas2, {
    type: 'doughnut',
    data: {
        datasets: [{
            data: [10,20],
            backgroundColor: [
                'rgba(255, 99, 132, 0.5)',
            ],
        }],
        // These labels appear in the legend and in the tooltips when hovering different arcs
        labels: [
            'Steps',
        ]
    },
    options: {
        legend: {
            display: false,
        },
        circumference: Math.PI,
        rotation: Math.PI,
    }
});

var canvas3 = document.getElementById('caloriesBurned');
var stepsActivityChart = new Chart(canvas2, {
    type: 'doughnut',
    data: {
        datasets: [{
            data: [10,20],
            backgroundColor: [
                'rgba(255, 99, 132, 0.5)',
            ],
        }],
        // These labels appear in the legend and in the tooltips when hovering different arcs
        labels: [
            'Steps',
        ]
    },
    options: {
        legend: {
            display: false,
        },
        circumference: Math.PI,
        rotation: Math.PI,
    }
});