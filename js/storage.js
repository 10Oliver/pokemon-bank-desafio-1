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
    return {...rest};
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

    // Add missing fields
    userObject.totalBalance = 0;
    userObject.incomes = [];
    userObject.expenses = [];
    userObject.accountNumber = accountNumber();

    let storage = JSON.parse(localStorage.getItem("storage"));

    if (!storage) {
        storage = [];
    }

    storage.push(userObject);

    localStorage.setItem("storage", JSON.stringify(storage));
}

const saveExpense = (expenseObject) => {

    const users = JSON.parse(localStorage.getItem("storage"));

    const userIndex = users.findIndex((user) => user.username == activeSession);

    users[userIndex].expenses.push(expenseObject);

    // Save transaction
    localStorage.setItem("storage", JSON.stringify(users))
}

const saveIncomes = (incomesObject) => {

    const users = JSON.parse(localStorage.getItem("storage"));

    const userIndex = users.findIndex((user) => user.username == activeSession);

    users[userIndex].incomes.push(incomesObject);

    // Save transaction
    localStorage.setItem("storage", JSON.stringify(users));
}


const accountNumber = () => {
    let numeroCuenta = '';
    for (let i = 0; i < 20; i++) {
        // Genera un dígito aleatorio entre 0 y 9 y lo añade al número de cuenta
        numeroCuenta += Math.floor(Math.random() * 10);
    }
    return numeroCuenta;
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