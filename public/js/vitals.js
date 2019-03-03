// var bmiCanvas = document.getElementById('bmi');
// var bmiGraph = new Chart(bmiCanvas, {
//     type: 'line',
//     data: {
//       labels: ['sun', 'mon', 'tue', 'wed', 'thur', 'fri', 'sat', ''],
//       datasets: [{ 
//           data: [9,1,2,5,3,9,1,21],
//           borderColor: "#3e95cd",
//           fill: false
//         },
//       ],
//       datasets: [{ 
//         data: [11,16,12,31,18,19,2,4],
//         borderColor: "#3a15c1",
//         fill: false
//       },
//     ],
//     datasets: [{ 
//         data: [3,1,9,13,2,11,12,1],
//         borderColor: "#ae95ad",
//         fill: false
//       },
//     ]
//     },
//     options: {
//       title: {
//         display: false,
//       },
//       legend: {
//           display: false,
//       }
//     }
//   });

var bmiCanvas = document.getElementById("bmi");

Chart.defaults.global.defaultFontFamily = "Lato";
Chart.defaults.global.defaultFontSize = 12;

var dataFirst = {
    label: "Height - meters",
    data: [145, 146, 146, 146, 147, 147],
    fill: false,
    borderColor: "#b3b198",
  };

var dataSecond = {
    label: "Weight - kgs",
    data: [57, 58, 60, 60, 65, 62, 70],
    fill: false,
    borderColor: "#ffe6aa",
  };

  var dataThird = {
    label: "BMI",
    data: [21, 5, 16, 19, 6, 20, 19],
    borderColor: "#3e95cd",
    fill: false
  };

var bmiData = {
  labels: ["june", "july", "aug", "sep", "oct", "nov", "dec"],
  datasets: [dataFirst, dataSecond, dataThird]
};

var chartOptions = {
  legend: {
    display: false,
  }
};

var lineChart = new Chart(bmiCanvas, {
  type: 'line',
  data: bmiData,
  options: chartOptions
});

var Dataset = {
    label: "bpm",
    data: [65, 70, 71, 78, 67, 75, 100],
    fill: false,
    borderColor: "#3e95cd",
};
var pulseData = {
    labels: ["june", "july", "aug", "sep", "oct", "nov", "dec"],
    datasets: [Dataset],
};
var pulseCanvas = document.getElementById("pulse");
var pulseChart = new Chart(pulseCanvas, {
    type: 'line',
    data: pulseData,
    options: chartOptions
  });