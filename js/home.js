
let activeUser;

document.addEventListener("DOMContentLoaded", () => {
    //Carga la sesión activa y los datos del usuario
    const sessionUsername = localStorage.getItem("active-session");
    if (!sessionUsername) {
        window.location.href = "../index.html";
        return;
    }

    const users = JSON.parse(localStorage.getItem("storage")) || [];
    activeUser = users.find(user => user.username === sessionUsername);

    if (activeUser) {
        document.getElementById("username").textContent = activeUser.username;
        document.getElementById("account-number").textContent = activeUser.numeroCuenta;
        updateBalanceDisplay();
    }
    else {
        console.error("Usuario activo no encontrado en el almacenamiento.");
    }
});

function updateBalanceDisplay() {
    document.getElementById("saldo").textContent = activeUser.totalBalance.toFixed(2);
}

function finalizarTransaccion(tipo) {
    let monto, categoria;

    if (tipo === 'deposito') {
        monto = parseFloat(document.getElementById("montoDeposito").value);
        categoria = document.getElementById("categoriaDeposito").value;
        if (categoria === "") {
            alert("Selecciona una categoría de depósito.");
            return;
        }
        realizarDeposito(monto, categoria);
        LimpiarCamposDeposito();
    }
    else if (tipo === 'retiro') {
        monto = parseFloat(document.getElementById("montoRetiro").value);
        categoria = document.getElementById("categoriaRetiro").value;
        if (categoria === "") {
            alert("Selecciona una categoría de retiro.");
            return;
        }
        realizarRetiro(monto, categoria);
        LimpiarCamposRetiro();
    }
    else if (tipo === 'servicios') {
        monto = parseFloat(document.getElementById("montoServicio").value);
        categoria = document.getElementById("servicio").value;
        if (categoria === "") {
            alert("Selecciona un servicio.");
            return;
        }
        realizarPagoServicio(monto, categoria);
        LimpiarCamposServicio();
    }
}

function realizarDeposito(monto, categoria) {
    if (isNaN(monto) || monto <= 0) {
        alert("Ingresa un monto válido.");
        return;
    }

    activeUser.totalBalance += monto;
    activeUser.incomes.push({ amount: monto, category: categoria, date: new Date().toISOString() });
    saveUserData();
    updateBalanceDisplay();
    alert("Depósito realizado correctamente.");
}

function realizarRetiro(monto, categoria) {
    if (isNaN(monto) || monto <= 0) {
        alert("Ingresa un monto válido.");
        return;
    }

    if (activeUser.totalBalance < monto) {
        alert("Fondos insuficientes.");
        return;
    }

    activeUser.totalBalance -= monto;
    activeUser.expenses.push({ amount: monto, category: categoria, date: new Date().toISOString() });
    saveUserData();
    updateBalanceDisplay();
    alert("Retiro realizado correctamente.");
}

function realizarPagoServicio(monto, servicio) {
    if (isNaN(monto) || monto <= 0) {
        alert("Ingresa un monto válido.");
        return;
    }

    if (activeUser.totalBalance < monto) {
        alert("Fondos insuficientes.");
        return;
    }

    activeUser.totalBalance -= monto;
    activeUser.expenses.push({ amount: monto, category: servicio, date: new Date().toISOString(), type: "Pago de Servicio" });
    saveUserData();
    updateBalanceDisplay();
    alert("Pago de servicio realizado correctamente.");
}

function saveUserData() {
    const users = JSON.parse(localStorage.getItem("storage")) || [];
    const userIndex = users.findIndex(user => user.username === activeUser.username);

    if (userIndex !== -1) {
        users[userIndex] = activeUser;
        localStorage.setItem("storage", JSON.stringify(users));
    }
}

function LimpiarCamposDeposito() {
    document.getElementById("montoDeposito").value = '';
    document.getElementById("categoriaDeposito").value = '';
}

function LimpiarCamposRetiro() {
    document.getElementById("montoRetiro").value = '';
    document.getElementById("categoriaRetiro").value = '';
}

function LimpiarCamposServicio() {
    document.getElementById("montoServicio").value = '';
    document.getElementById("servicio").value = '';
    document.getElementById("NPE").value = '';
}


fetch('navbar.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('navbar-placeholder').innerHTML = data;
    });

fetch('footer.html')
    .then(response => response.text())
    .then(data => { document.getElementById('footer-placeholder').innerHTML = data; });


document.getElementById("logout-btn").addEventListener("click", () => {
    logout();
    location.href = "../index.html";
})
//s