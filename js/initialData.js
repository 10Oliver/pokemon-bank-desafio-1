const users = {
    username: "usuario",
    phone: "22455896",
    password: "12345678",
    totalBalance: 500,
    incomes: [],
    expenses: []
};

document.addEventListener("DOMContentLoaded", () => {

    // check if exists data
    const currentData = JSON.parse(localStorage.getItem("storage"));
    if (currentData) {
        // Check if user is already in list
        const included = currentData.find((user) => user.username === users.username);

        if (!included) {
            currentData.push(users);
        }

        localStorage.setItem("storage", JSON.stringify(currentData));
    } else {
        localStorage.setItem("storage", JSON.stringify([users]));
    }
});