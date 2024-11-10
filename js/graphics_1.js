//graphics.js
/**
 * Data
 */
const depositList = [];
const withdraw = [];
const catGastos = ['Suspermercado', 'Educación', 'Entretenimiento', 'Salud', 'Servicio Públicos', 'Energía Eléctrica', 'Internet', 'Telefonía', 'Agua Potable'];
const catIngresos = ['Sueldo', 'Transferencia Bancaria', 'Otros'];
let categoryData = [];

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
  });
}

// Función para crear gráfico de pastel
const createPieChart0 = () => {
  const ctxPie1 = document.getElementById('pie-chart-1').getContext('2d');

  const pieChart1 = new Chart(ctxPie1, {
    type: 'pie',
    data: {
      labels: catGastos,
      datasets: [{
        label: 'Gastos',
        data: categoryData, // Ahora toma todos los valores para las categorías de gastos
        backgroundColor: [
          'rgba(255, 99, 132, 0.7)',   // Rojo
          'rgba(54, 162, 235, 0.7)',   // Azul
          'rgba(255, 206, 86, 0.7)',   // Amarillo
          'rgba(75, 192, 192, 0.7)',   // Verde agua
          'rgba(153, 102, 255, 0.7)',  // Morado
          'rgba(255, 159, 64, 0.7)',   // Naranja
          'rgba(100, 255, 86, 0.7)',   // Verde claro
          'rgba(255, 0, 255, 0.7)',    // Fucsia
          'rgba(54, 255, 164, 0.7)'    // Verde menta
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(100, 255, 86, 1)',
          'rgba(255, 0, 255, 1)',
          'rgba(54, 255, 164, 1)'
        ],
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          display: false // Ocultar leyenda
        }
      }
    }
  });
}

// Función para crear el segundo gráfico de pastel
const createPieChart1 = () => {
  const ctxPie2 = document.getElementById('pie-chart-2').getContext('2d');

  const pieChart2 = new Chart(ctxPie2, {
    type: 'pie',
    data: {
      labels: catIngresos, //
      datasets: [{
        label: 'Ingresos',
        data: categoryData, // Últimos dos valores
        backgroundColor: [
          'rgba(255, 206, 86, 0.7)', // Consulta de saldo
          'rgba(75, 192, 192, 0.7)',  // Pagar servicios
          'rgba(255, 0, 255, 0.7)'    // Fucsia
        ],
        borderColor: [
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(255, 0, 255, 1)'
        ],
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          display: false // Ocultar leyenda
        }
      }
    }
  });
}

/**
 * Events
 */
// Función para cargar datos reales de ingresos y gastos
function loadTransactionData() {
  const incomes = getIncomes();
  const expenses = getExpenses();

  // Agrupa por mes para el gráfico de líneas
  const months = Array(12).fill(0);  // Inicializa 12 posiciones para los meses
  incomes.forEach(income => {
      const month = new Date(income.date).getMonth();
      months[month] += income.amount;
  });
  depositList.push(...months);  // Añade a la lista de depósitos mensual

  const expensesByMonth = Array(12).fill(0);
  expenses.forEach(expense => {
      const month = new Date(expense.date).getMonth();
      expensesByMonth[month] += expense.amount;
  });
  withdraw.push(...expensesByMonth);

  // Agrupa por categorías para los gráficos de pastel
  const incomeCategories = { 'Sueldo': 0, 'Transferencia Bancaria': 0, 'Otros': 0 };
  incomes.forEach(income => {
      if (incomeCategories[income.category] !== undefined) {
          incomeCategories[income.category] += income.amount;
      }
  });
  const expenseCategories = {
      'Supermercado': 0, 'Educación': 0, 'Entretenimiento': 0, 'Salud': 0,
      'Servicios Públicos': 0, 'Energía Eléctrica': 0, 'Internet': 0, 'Telefonía': 0, 'Agua Potable': 0
  };
  expenses.forEach(expense => {
      if (expenseCategories[expense.category] !== undefined) {
          expenseCategories[expense.category] += expense.amount;
      }
  });

  categoryData = [
      ...Object.values(expenseCategories),  // Datos para categorías de gastos
      ...Object.values(incomeCategories)    // Datos para categorías de ingresos
  ];
  // Registro para confirmar el contenido de categoryData
  console.log("Datos de categoryData:", categoryData);
}

// Función para crear una lista de categorías de gastos debajo del gráfico
const createGastosList = () => {
  let gastosListContainer = document.getElementById('gastos-list');
  let listHTML = '<ul>';
  catGastos.forEach((cat, index) => {
    listHTML += `<li>${cat}: ${categoryData[index]}%</li>`;
  });
  listHTML += '</ul>';
  gastosListContainer.innerHTML = listHTML;
}
// Función para crear una lista de categorías de ingresos debajo del gráfico
const createIngresosList = () => {
  let ingresosListContainer = document.getElementById('ingresos-list');
  let listHTML = '<ul>';
  catIngresos.forEach((cat, index) => {
    listHTML += `<li>${cat}: ${categoryData[9 + index]}%</li>`;
  });
  listHTML += '</ul>';
  ingresosListContainer.innerHTML = listHTML;
}

// Llama a la función al cargar el DOM
document.addEventListener("DOMContentLoaded", () => {
  loadTransactionData(); // Cargar datos reales
  createGraphic(); // Llama al gráfico de línea
  createPieChart0(); // Llama al primer gráfico de pastel
  createPieChart1();  // Llama al segundo gráfico de pastel
  createGastosList(); // Lista de categorías de gastos
  createIngresosList(); // Lista de categorías de ingresos
});