/**
 * Global data
 */

var globalExpenses = [];
var globalIncomes = [];


/**
 * Functions
 */

const saveUserSession = () => {  
    

    const username = localStorage.getItem("active-user");

    if (username) {
        
        const storage = JSON.parse(localStorage.getItem("storage"));
        
        const userPosition = storage.indexOf(username);

        const userData = storage[userPosition];

        userData["incomes"] = globalIncomes;
        userData["expenses"] = globalExpenses;

        // Remove session
        localStorage.removeItem("active-user")
    }
    
}

const loadSession = (username) => {

    // Set active session
    localStorage.setItem("active-session", username);

    // Check if exists transactions
    const userData = JSON.parse(localStorage.getItem(username));

    if (userData?.incomes) {
        globalIncomes = globalIncomes.concat(userData.incomes);
    }

    if (userData?.expenses) {
        globalExpenses = globalExpenses.concat(userData.expenses);
    }

}