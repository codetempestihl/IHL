var bmiCanvas = document.getElementById('bmi');
var sleepGraph = new Chart(sleepCanvas, {
    type: 'line',
    data: {
      labels: ['sun', 'mon', 'tue', 'wed', 'thur', 'fri', 'sat', ''],
      datasets: [{ 
          data: [9,1,2,5,3,9,1,21],
          borderColor: "#3e95cd",
          fill: false
        },
      ],
      datasets: [{ 
        data: [11,16,12,31,18,19,2,4],
        borderColor: "#3a15c1",
        fill: false
      },
    ],
    datasets: [{ 
        data: [3,1,9,13,2,11,12,1],
        borderColor: "#ae95ad",
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