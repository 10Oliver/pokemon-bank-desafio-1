/**
 * Data
 */
let depositList = [500, 550, 600, 450, 650, 450, 300, 635, 456, 120, 453, 720];
let withdraw = [200, 500, 100, 450, 520, 500, 789, 123, 345, 0, 52, 896];

/**
 * Methods
 */

const createGraphic = () => {
  const ctx = document.getElementById('graphics-chart').getContext('2d');

  const lineChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciemmbre'],
      datasets: [
        {
          label: 'Depósitos',
          data: depositList,
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 2,
          fill: false
        },
        {
          label: 'Retiros',
          data: withdraw,
          borderColor: 'rgba(120, 130, 250, 1)',
          borderWidth: 2,
          fill: false
        }
      ]
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true // Asegura que el eje Y comience desde cero
        }
      },
    }
  })
}

/**
 * Events
 */
document.addEventListener("DOMContentLoaded", () => {
  createGraphic();
})
/* const labels = Utils.months({ count: 7 });
const data = {
  labels: labels,
  datasets: [{
    label: 'My First Dataset',
    data: [65, 59, 80, 81, 56, 55, 40],
    fill: false,
    borderColor: 'rgb(75, 192, 192)',
    tension: 0.1
  }]
}; */