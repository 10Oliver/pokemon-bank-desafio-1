//storage.js
/**
 * Global data
 */
var activeSession = "";


/**
 * Functions
 */

const logout = () => {
    activeSession = "";
    localStorage.removeItem("active-session");
}

const getUserInfo = () => {
    const storage = JSON.parse(localStorage.getItem("storage"));
    const { password, incomes, expenses, ...rest } = storage.find((user) => user.username == activeSession);
    return { ...rest };
}


const loadSession = (username) => {

    // Set active session
    localStorage.setItem("active-session", username);

    activeSession = username;
}

const loadusers = () => {
    return JSON.parse(localStorage.getItem("storage"));
}

const registerUser = (userObject) => {
    userObject.totalBalance = 0;
    userObject.incomes = [];
    userObject.expenses = [];
    userObject.accountNumber = accountNumber();

    let storage = JSON.parse(localStorage.getItem("storage")) || [];
    storage.push(userObject);

    localStorage.setItem("storage", JSON.stringify(storage));
}

// Función para guardar ingresos (depósitos)
const saveIncomes = (incomeObject) => {
    const users = JSON.parse(localStorage.getItem("storage")) || [];
    const userIndex = users.findIndex((user) => user.username === activeUser.username);

    if (userIndex !== -1) {
        incomeObject.date = transactionDate();
        users[userIndex].incomes.push(incomeObject);

        users[userIndex].totalBalance += incomeObject.amount;

        localStorage.setItem("storage", JSON.stringify(users));
        activeUser = users[userIndex];
    }
};

// Función para guardar gastos (retiros)
const saveExpense = (expenseObject) => {
    const users = JSON.parse(localStorage.getItem("storage")) || [];
    const userIndex = users.findIndex((user) => user.username === activeUser.username);

    if (userIndex !== -1) {
        expenseObject.date = transactionDate();
        users[userIndex].expenses.push(expenseObject);

        users[userIndex].totalBalance -= expenseObject.amount;

        localStorage.setItem("storage", JSON.stringify(users));
        activeUser = users[userIndex];
    }
};

// Función para guardar pagos de servicio
const saveServicePayment = (servicePaymentObject) => {
    const users = JSON.parse(localStorage.getItem("storage")) || [];
    const userIndex = users.findIndex((user) => user.username === activeUser.username);

    if (userIndex !== -1) {
        servicePaymentObject.date = transactionDate();
        users[userIndex].expenses.push(servicePaymentObject);

        users[userIndex].totalBalance -= servicePaymentObject.amount;

        localStorage.setItem("storage", JSON.stringify(users));
        activeUser = users[userIndex];
    }
};

// Función de fecha para asignar la fecha en formato ISO
const transactionDate = () => {
    return new Date().toISOString();
};


const accountNumber = () => {
    let accountNumber = '';
    for (let i = 0; i < 20; i++) {
        // Genera un dígito aleatorio entre 0 y 9 y lo añade al número de cuenta
        accountNumber += Math.floor(Math.random() * 10);
    }
    return accountNumber;
}


/**
 * Getters
 */

const getIncomes = () => {
    if (activeSession) {
        const storage = JSON.parse(localStorage.getItem("storage"));

        const { incomes } = storage.find((user) => user.username == activeSession);

        return incomes;
    }

    return [];
}

const getExpenses = () => {
    if (activeSession) {
        const storage = JSON.parse(localStorage.getItem("storage"));

        const { expenses } = storage.find((user) => user.username == activeSession);

        return expenses;
    }

    return [];
}

const getBalance = () => {
    if (activeSession) {
        const storage = JSON.parse(localStorage.getItem("storage"));

        const { totalBalance } = storage.find((user) => user.username == activeSession);

        return totalBalance;
    }

    return 0;
}

function saveUserData() {
    const users = JSON.parse(localStorage.getItem("storage")) || [];
    const userIndex = users.findIndex(user => user.username === activeUser.username);

    if (userIndex !== -1) {
        users[userIndex] = activeUser;
        localStorage.setItem("storage", JSON.stringify(users));
    }
}

/**
 * Load active session
 */

document.addEventListener("DOMContentLoaded", () => {
    const session = localStorage.getItem("active-session");

    const isRegistrationPage = window.location.pathname.endsWith("/views/signup.html");
    const isLoginPage = window.location.pathname.endsWith("/index.html");

    if (!session && !isRegistrationPage && !isLoginPage) {
        location.href = "../index.html";
        return;
    }
    activeSession = session;
})