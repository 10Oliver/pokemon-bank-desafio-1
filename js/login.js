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

document.getElementById("show-password").addEventListener("click", () => {
    document.getElementById("show-confirm-password").classList.remove("d-none");
    document.getElementById("show-password").classList.add("d-none");
    // Change input type
    document.getElementById("password-input").type = "text";
});

document.getElementById("show-confirm-password").addEventListener("click", () => {
    document.getElementById("show-password").classList.remove("d-none");
    document.getElementById("show-confirm-password").classList.add("d-none");

    document.getElementById("password-input").type = "password";
});

document.addEventListener("DOMContentLoaded", () => {
    // Check if already exist active session
    const activeSession = localStorage.getItem("active-session");

    if (activeSession) {
        location.href = "views/home.html";
    }

    // Set greeting
    const date = new Date();
    const time = date.getHours();

    const greeting = document.getElementById("greeting-text");

    if (time < 12) {
        greeting.textContent = "Buenos días";
    }
    if (time > 12 && time < 18) {
        greeting.textContent = "Buenas tardes";
    }
    if (time > 18) {
        greeting.textContent = "Buenas noches";
    }
});
