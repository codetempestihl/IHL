var canvas = document.getElementById("myChart");
var myChart = new Chart(canvas, {
    type: 'bar',
    data: {
        labels: ["Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"],
        datasets: [{
            label: 'Past Activity',
            data: [12, 19, 3, 5, 2, 3, 4, 8, 11, 2, 13, 10],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(73, 21, 97, 0.2)',
                'rgba(3, 121, 97, 0.2)',
                'rgba(33, 221, 97, 0.2)',
                'rgba(111, 101, 97, 0.2)',
                'rgba(173, 211, 97, 0.2)',
                'rgba(143, 121, 97, 0.2)',
            ],
            borderColor: [
                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
                'rgba(73, 21, 97, 1)',
                'rgba(3, 121, 97, 1)',
                'rgba(33, 221, 97, 1)',
                'rgba(111, 101, 97, 1)',
                'rgba(173, 211, 97, 1)',
                'rgba(143, 121, 97, 1)',
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true
                }
            }]
        }
    }
});