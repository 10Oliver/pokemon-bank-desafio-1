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