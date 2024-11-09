
let activeUser;

document.addEventListener("DOMContentLoaded", () => {
    const sessionUsername = localStorage.getItem("active-session");
    if (!sessionUsername) {
        window.location.href = "../index.html";
        return;
    }

    const users = JSON.parse(localStorage.getItem("storage")) || [];
    activeUser = users.find(user => user.username === sessionUsername);

    if (activeUser) {
        document.getElementById("username").textContent = activeUser.username;
        document.getElementById("account-number-header").textContent = activeUser.accountNumber;
        document.getElementById("account-number").textContent = activeUser.accountNumber;
        updateBalanceDisplay();
    } else {
        console.error("Usuario activo no encontrado en el almacenamiento.");
        window.location.href = "../index.html";
    }
});


function validarNPE(npe) {
    const constraints = {
        npe: {
            presence: { allowEmpty: false, message: "es requerido" },
            format: {
                pattern: /^\d{28}$/,
                message: "debe tener 28 dígitos numéricos"
            }
        }
    };

    const validation = validate({ npe }, constraints);
    return validation === undefined;
}

function updateBalanceDisplay() {
    document.getElementById("saldo").textContent = activeUser.totalBalance.toFixed(2);
}

function finalizarTransaccion(tipo) {
    let monto, categoria;

    if (tipo === 'deposito') {
        monto = parseFloat(document.getElementById("montoDeposito").value);
        categoria = document.getElementById("categoriaDeposito").value;
        if (categoria === "") {
            Swal.fire("Selecciona una categoría de depósito.", "", "error");
            return;
        }
        realizarDeposito(monto, categoria);
        LimpiarCamposDeposito();
    } else if (tipo === 'retiro') {
        monto = parseFloat(document.getElementById("montoRetiro").value);
        categoria = document.getElementById("categoriaRetiro").value;
        if (categoria === "") {
            Swal.fire("Selecciona una categoría de retiro.", "", "error");
            return;
        }
        realizarRetiro(monto, categoria);
        LimpiarCamposRetiro();
    } else if (tipo === 'servicios') {
        monto = parseFloat(document.getElementById("montoServicio").value);
        categoria = document.getElementById("servicio").value;
        const npe = document.getElementById("NPE").value;

        // Validación del NPE
        if (!validarNPE(npe)) {
            Swal.fire("El NPE debe tener 28 dígitos numéricos.", "", "error");
            return;
        }

        if (categoria === "") {
            Swal.fire("Selecciona un servicio.", "", "error");
            return;
        }

        // Confirmación antes de realizar el pago del servicio
        Swal.fire({
            title: "¿Estás seguro?",
            text: "¿Confirmas que deseas realizar el pago del servicio?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Sí, confirmar",
            cancelButtonText: "Cancelar",
        }).then((result) => {
            if (result.isConfirmed) {
                realizarPagoServicio(monto, categoria);
                LimpiarCamposServicio();
            }
        });
    }
}

function realizarDeposito(monto, categoria) {
    if (isNaN(monto) || monto <= 0) {
        Swal.fire("Ingresa un monto válido.", "", "error");
        return;
    }

    // Confirmación del depósito
    Swal.fire({
        title: "¿Estás seguro?",
        text: "¿Confirmas que deseas realizar el depósito?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Sí, confirmar",
        cancelButtonText: "Cancelar",
    }).then((result) => {
        if (result.isConfirmed) {
            // Realizar el depósito
            activeUser.totalBalance += monto;
            const transaction = { amount: monto, category: categoria, date: new Date().toISOString() };
            activeUser.incomes.push(transaction);
            saveUserData();
            updateBalanceDisplay();

            // Mensaje de éxito
            Swal.fire({
                title: "Depósito exitoso",
                text: "Tu depósito se ha realizado correctamente.",
                icon: "success",
                showCancelButton: true,
                confirmButtonText: "Imprimir recibo",
                cancelButtonText: "Salir",
            }).then((result) => {
                if (result.isConfirmed) {
                    generarReciboPDF(transaction, "Depósito");
                }
                // Cerrar modal de depósito
                const depositoModal = document.getElementById("modalDeposito");
                const modal = bootstrap.Modal.getInstance(depositoModal);
                modal.hide();
            });
        }
    });
}

function realizarRetiro(monto, categoria) {
    if (isNaN(monto) || monto <= 0) {
        Swal.fire("Ingresa un monto válido.", "", "error");
        return;
    }

    if (activeUser.totalBalance < monto) {
        Swal.fire("Fondos insuficientes.", "", "error");
        return;
    }

    // Confirmación del retiro
    Swal.fire({
        title: "¿Estás seguro?",
        text: "¿Confirmas que deseas realizar el retiro?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Sí, confirmar",
        cancelButtonText: "Cancelar",
    }).then((result) => {
        if (result.isConfirmed) {
            // Realizar el retiro
            activeUser.totalBalance -= monto;
            const transaction = { amount: monto, category: categoria, date: new Date().toISOString() };
            activeUser.expenses.push(transaction);
            saveUserData();
            updateBalanceDisplay();

            // Mensaje de éxito
            Swal.fire({
                title: "Retiro exitoso",
                text: "Tu retiro se ha realizado correctamente.",
                icon: "success",
                showCancelButton: true,
                confirmButtonText: "Imprimir recibo",
                cancelButtonText: "Salir",
            }).then((result) => {
                if (result.isConfirmed) {
                    generarReciboPDF(transaction, "Retiro");
                }
                // Cerrar modal de retiro
                const retiroModal = document.getElementById("modalRetiro");
                const modal = bootstrap.Modal.getInstance(retiroModal);
                modal.hide();
            });
        }
    });
}


function realizarPagoServicio(monto, servicio) {
    if (isNaN(monto) || monto <= 0) {
        Swal.fire("Ingresa un monto válido.", "", "error");
        return;
    }

    if (activeUser.totalBalance < monto) {
        Swal.fire("Fondos insuficientes.", "", "error");
        return;
    }

    // Realizar el pago de servicio
    activeUser.totalBalance -= monto;
    const transaction = {
        amount: monto,
        category: servicio,
        date: new Date().toISOString(),
        type: "Pago de Servicio"
    };
    activeUser.expenses.push(transaction);
    saveUserData();
    updateBalanceDisplay();

    // Mensaje de éxito con opción para imprimir recibo
    Swal.fire({
        title: "Pago de servicio exitoso",
        text: "Tu pago se ha realizado correctamente.",
        icon: "success",
        showCancelButton: true,
        confirmButtonText: "Imprimir recibo",
        cancelButtonText: "Salir",
    }).then((result) => {
        if (result.isConfirmed) {
            generarReciboPDF(transaction, "Pago de Servicio");
        }
        const servicioModal = document.getElementById("modalServicios");
        const modal = bootstrap.Modal.getInstance(servicioModal);
        modal.hide();
    });
}

function generarReciboPDF(transaction, tipo) {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    const fecha = new Date(transaction.date).toLocaleString();
    const monto = transaction.amount.toFixed(2);
    const categoria = capitalizeFirstLetter(transaction.category);

    // Título centrado y en negrita
    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.text(`Recibo de ${tipo} - Pokemon Bank`, doc.internal.pageSize.width / 2, 20, { align: "center" });

    // Subtítulo
    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    doc.text(`Fecha: ${fecha}`, 10, 40);

    // Línea decorativa debajo del título y la fecha
    doc.setDrawColor(0, 0, 0); // Negro
    doc.setLineWidth(0.5);
    doc.line(10, 30, 200, 30); // Línea debajo del título
    doc.line(10, 45, 200, 45); // Línea debajo de la fecha

    doc.setFontSize(14);
    doc.text("Detalles de la Transacción:", 10, 55);

    // Información de la transacción
    doc.setFontSize(12);
    doc.text(`Categoría: ${categoria}`, 10, 65);
    doc.text(`Monto: $${monto}`, 10, 75);
    doc.text(`Saldo Total: $${activeUser.totalBalance.toFixed(2)}`, 10, 85);

    doc.line(10, 90, 200, 90);

    // Guardar el PDF
    doc.save(`Recibo_${tipo}_${fecha}.pdf`);
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
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

//Funciones para impiar campos al cerrar los modal
document.getElementById("modalServicios").addEventListener("hidden.bs.modal", function () {
    LimpiarCamposServicio();
});

document.getElementById("modalDeposito").addEventListener("hidden.bs.modal", function () {
    LimpiarCamposDeposito();
});

document.getElementById("modalRetiro").addEventListener("hidden.bs.modal", function () {
    LimpiarCamposRetiro();
});


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

function logoutAndRedirect() {
    logout();
    location.href = "../index.html";
}
