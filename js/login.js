document.getElementById("login-btn").addEventListener("click", () => {
    const username = document.getElementById("username-input");

    const password = document.getElementById("password-input");

    const users = loadusers();

    const userFound = users.find((user) => user.username == username.value);

    // #region Missing fields validation
    if (!username.value) {
        username.classList.remove("border-dark");
        username.classList.add("red-border");
    } else {
        username.classList.add("border-dark");
        username.classList.remove("red-border");
    }

    if (!password.value) {
        password.classList.remove("border-dark");
        password.classList.add("red-border");
    } else {
        password.classList.add("border-dark");
        password.classList.remove("red-border");
    }

    if (!username.value || !password.value) {
        showAlert("Debes de completar todo los campos", "info");
        return;
    }

    // #endregion

    if (!userFound) {
        showAlert("Usuario o contraseña incorrectos", "error");
        return;
    }

    // User exists flow
    if (userFound.password != password.value) {
        showAlert("Usuario o contraseña incorrectos", "error");
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
