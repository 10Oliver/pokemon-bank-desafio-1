/**
 * Global data
 */
var activeSession = "";
var totalBalance = 0;


/**
 * Functions
 */

const saveUserSession = () => {


    const username = localStorage.getItem("active-session");

    if (username) {

        const storage = JSON.parse(localStorage.getItem("storage"));

        const userPosition = storage.findIndex((user) => user.username == username);

        const userData = storage[userPosition];

        userData["incomes"] = globalIncomes;
        userData["expenses"] = globalExpenses;

        // Remove session
        localStorage.removeItem("active-session");

        // Save session
        storage[userPosition] = userData;

        localStorage.setItem("storage", JSON.stringify(storage));
    }

}

const loadSession = (username) => {

    // Set active session
    localStorage.setItem("active-session", username);

    // Check if exists transactions
    const users = JSON.parse(localStorage.getItem("storage"));

    const userData = users.find((user) => user.username == username);

    if (userData?.incomes) {
        globalIncomes = globalIncomes.concat(userData.incomes);
    }

    if (userData?.expenses) {
        globalExpenses = globalExpenses.concat(userData.expenses);
    }

    totalBalance = userData.totalBalance;
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

    const storage = JSON.parse(localStorage.getItem("storage"));

    storage.push(userObject);

    localStorage.setItem("storage", JSON.stringify(storage));
}

const saveExpense = (expenseObject) => {

    const users = localStorage.getItem("storage");

    const userData = users.find((user) => user.username == activeSession);

    userData.expenses.push(expenseObject);
}

const saveIncomes = (incomesObject) => {

    const users = localStorage.getItem("storage");

    const userData = users.find((user) => user.username == activeSession);

    userData.incomes.push(incomesObject);
}


/**
 * Load transaction if exists active session
 */

document.addEventListener("DOMContentLoaded", () => {
    const activeSession = localStorage.getItem("active-session");

    if (activeSession) {

        const users = JSON.parse(localStorage.getItem("storage"));

        const userData = users.find((user) => user.username = activeSession);

        if (userData?.incomes) {
            globalIncomes = globalIncomes.concat(userData.incomes);
        }

        if (userData?.expenses) {
            globalExpenses = globalExpenses.concat(userData.expenses);
        }

        totalBalance = userData.totalBalance;
    }
})