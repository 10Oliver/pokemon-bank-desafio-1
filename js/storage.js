/**
 * Global data
 */
var activeSession = "";


/**
 * Functions
 */

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
    if (session) {
        activeSession = session;
    }
})