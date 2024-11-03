/**
 * Global data
 */

const globalExpenses = [];
const globalIncomes = [];


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


}