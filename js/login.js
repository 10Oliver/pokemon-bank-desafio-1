document.getElementById("login-btn").addEventListener("click", (event) => {
    event.preventDefault();

    const username = document.getElementById("username-input");

    const password = document.getElementById("password-input");

    const users = loadusers();

    const userFound = users.find((user) => user.username == username.value);


    if (!userFound) {
        alert("El usuario no existe");
        return;
    }

    // User exists flow

    if (userFound.password != password.value) {
        alert("Contraseña invalida");
        return;
    }

    // Session completed
    loadSession(username.value);

    location.href = "views/home.html";
});

document.addEventListener("DOMContentLoaded", () => {
    // Check if already exist active session
    const activeSession = localStorage.getItem("active-session");

    if (activeSession) {
        location.href = "views/home.html";
    }
})