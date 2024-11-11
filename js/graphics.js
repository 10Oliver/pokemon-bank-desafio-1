//graphics.js
/**
 * Data
 */
const depositList = [];
const withdraw = [];
const catGastos = ['Supermercado', 'Educación', 'Entretenimiento', 'Salud', 'Servicios Públicos', 'Energía Eléctrica', 'Internet', 'Telefonía', 'Agua Potable'];
const catIngresos = ['Sueldo', 'Transferencia Bancaria', 'Otros'];
let expenseData = [];
let incomeData = [];

/**
 * Methods
 */

// Función para crear el gráfico de líneas
const createGraphic = () => {
  const ctx = document.getElementById('graphics-chart').getContext('2d');

  const lineChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
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

// Función para crear gráfico de pastel para gastos
const createPieChart0 = () => {
  const ctxPie1 = document.getElementById('pie-chart-1').getContext('2d');

  const pieChart1 = new Chart(ctxPie1, {
    type: 'pie',
    data: {
      labels: catGastos,
      datasets: [{
        label: 'Gastos',
        data: expenseData, // Se usa expenseData para las categorías de gastos
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

// Función para crear gráfico de pastel para ingresos
const createPieChart1 = () => {
  const ctxPie2 = document.getElementById('pie-chart-2').getContext('2d');

  console.log(incomeData)

  const pieChart2 = new Chart(ctxPie2, {
    type: 'pie',
    data: {
      labels: catIngresos,
      datasets: [{
        label: 'Ingresos',
        data: incomeData, // Se usa incomeData para las categorías de ingresos
        backgroundColor: [
          'rgba(255, 206, 86, 0.7)', // Amarillo
          'rgba(75, 192, 192, 0.7)',  // Verde agua
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
  expenseData = catGastos.map(cat => 
    expenses.filter(expense => expense.category === cat)
            .reduce((sum, expense) => sum + expense.amount, 0)
  );

  // Register new categories
  const incomeCategory = {};
  const expenseCategory = {};

  /**
   * Group amounts by categories
   */
  incomes.forEach((income) => {
    if (!incomeCategory[income.category]) {
      // Where category is not registered yet
      incomeCategory[income.category] = income.amount;
    } else {
      // Add amount in current category
      incomeCategory[income.category] = incomeCategory[income.category] + income.amount;
    }
  });

  expenses.forEach((income) => {
    if (!expenseCategory[income.category]) {
      // Where category is not registered yet
      expenseCategory[income.category] = income.amount;
    } else {
      // Add amount in current category
      expenseCategory[income.category] = expenseCategory[income.category] + income.amount;
    }
  });

  /**
   * Create the structure for chart.js
   */

  incomeData = Object.keys(incomeCategory).map((categoryKey) => {
    return {
      label: categoryKey,
      value: incomeCategory[categoryKey]
    }
  });

  expenseData = Object.keys(expenseCategory).map((categoryKey) => {
    return {
      label: categoryKey,
      value: expenseCategory[categoryKey]
    }
  })


/*   // Registro para confirmar el contenido de expenseData e incomeData
  console.log("Datos de expenseData:", expenseData);
  console.log("Datos de incomeData:", incomeData); */
}

// Función para crear una lista de categorías de gastos debajo del gráfico
const createGastosList = () => {
  let gastosListContainer = document.getElementById('gastos-list');
  let listHTML = '<ul>';

  // Sum all category value
  const totalExpenses = expenseData.reduce((sum, item) => sum + item.value, 0);

  catGastos.forEach((cat, index) => {
    const categoryFounded = expenseData.find((item) => item.label == cat.toLocaleLowerCase());
    const value = categoryFounded?.value ?? 0;

    const percentage = ((value/totalExpenses)*100).toFixed(2);
    listHTML += `<li>${cat}: ${percentage}%</li>`;
  });
  listHTML += '</ul>';
  gastosListContainer.innerHTML = listHTML;
}

// Función para crear una lista de categorías de ingresos debajo del gráfico
const createIngresosList = () => {
  let ingresosListContainer = document.getElementById('ingresos-list');
  let listHTML = '<ul>';

  // Sum all category value
  const totalIncomes = incomeData.reduce((sum, item) => sum + item.value, 0);

  catIngresos.forEach((cat, index) => {
    const categoryFounded = incomeData.find((item) => item.label == cat.toLocaleLowerCase());
    const value = categoryFounded?.value ?? 0;

    const percentage = ((value/totalIncomes)*100).toFixed(2);
    listHTML += `<li>${cat}: ${percentage}%</li>`;
  });

  listHTML += '</ul>';
  ingresosListContainer.innerHTML = listHTML;
}

// Llama a la función al cargar el DOM
document.addEventListener("DOMContentLoaded", () => {
  loadTransactionData(); // Cargar datos reales
  createGraphic(); // Llama al gráfico de línea
  createPieChart0(); // Llama al primer gráfico de pastel (gastos)
  createPieChart1();  // Llama al segundo gráfico de pastel (ingresos)
  createGastosList(); // Lista de categorías de gastos
  createIngresosList(); // Lista de categorías de ingresos

  // Load navbar and footer
  fetch('navbar.html')
      .then(response => response.text())
      .then(data => {
        document.getElementById('navbar-placeholder').innerHTML = data;
        // Set active navbar button
        document.getElementById("graphics-navbar-button").classList.add("active");
      })
      .catch(error => console.log('Error'.error));

    fetch('footer.html')
      .then(response => response.text())
      .then(data => { document.getElementById('footer-placeholder').innerHTML = data; });
});