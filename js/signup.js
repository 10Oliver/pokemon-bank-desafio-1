document.getElementById("register-btn").addEventListener("click", () => {
    const username = document.getElementById("username-input");
    const phone = document.getElementById("phone-input");

    const password = document.getElementById("password-input");
    const confirmPassword = document.getElementById("confirm-password-input");

    if (!username.value) {
        alert("El nombre de usuario es requerido");
        return;
    }

    if (!phone.value) {
        alert("El número de teléfono es requerido");
        return;
    }
    if (!password.value) {
        alert("La contraseña es requerida");
        return;
    }

    if (password.value != confirmPassword.value) {
        alert("La contraseñas no son iguales");
        return;
    }

    const payload = {
        username: username.value,
        phone: phone.value,
        password: password.value
    };

    registerUser(payload);

    alert("Usuario creado correctamente");
    location.href = "../index.html";
});

document.getElementById("show-password").addEventListener("click", () => {
    document.getElementById("hide-password").classList.remove("d-none");
    document.getElementById("show-password").classList.add("d-none");
    // Change input type
    document.getElementById("password-input").type = "text";
});

document.getElementById("hide-password").addEventListener("click", () => {
    document.getElementById("hide-password").classList.add("d-none");
    document.getElementById("show-password").classList.remove("d-none");
    // Change input type
    document.getElementById("password-input").type = "password";
});

document.getElementById("show-confirm-password").addEventListener("click", () => {
    document.getElementById("hide-confirm-password").classList.remove("d-none");
    document.getElementById("show-confirm-password").classList.add("d-none");
    // Change input type
    document.getElementById("confirm-password-input").type = "text";
});

document.getElementById("hide-confirm-password").addEventListener("click", () => {
    document.getElementById("hide-confirm-password").classList.add("d-none");
    document.getElementById("show-confirm-password").classList.remove("d-none");
    // Change input type
    document.getElementById("confirm-password-input").type = "password";
});

/**
 * Password security indicator
 */
document.getElementById("password-input").addEventListener("keyup", () => {
    let score = 4;
    let color = "#ff6b6b";
    const password = document.getElementById("password-input").value;

    if (password.length > 0) {
        const lengthScore = Math.min(password.length / 8, 1) * 20;
        score += lengthScore;
    }

    if (/[a-z]/.test(password)) {
        score += 19;
    }

    if (/[A-Z]/.test(password)) {
        score += 19;
    }

    if (/[0-9]/.test(password)) {
        score += 19;
    }

    if (/[^a-zA-Z0-9]/.test(password)) {
        score += 19;
    }

    if (score > 20 && score <= 40) {
        color = "#ff9e5d";
    }

    if (score > 40 && score <= 60) {
        color = "#ffc94d";
    }

    if (score > 60 && score <= 80) {
        color = "#ffeb3b";
    }

    if (score > 80 && score <= 99) {
        color = "#b6d94c";
    }

    if (score == 100) {
        color = "#10bd17"
    }

    const bar = document.getElementById("password-bar");
    bar.style.width = `${score}%`;
    bar.style.backgroundColor = color;
});

document.getElementById("password-input").addEventListener("focus", () => {
    const container = document.getElementById("password-bar-container");
    container.classList.add("visible")
})