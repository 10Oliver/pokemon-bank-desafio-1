const users = [
    {
        username: "usuario",
        phone: "22455896",
        password: "12345678",
        totalBalance: 500,
        incomes: [],
        expenses: []
    }
];

document.addEventListener("DOMContentLoaded", () => {
    const data = JSON.stringify(users);
    localStorage.setItem("storage", data);
});