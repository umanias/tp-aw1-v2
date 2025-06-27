import {
    renderizadoPrendas,
    renderizadoAccesorios, 
    setupDropdownMenu, 
    togglePasswordVisibility,
    marcarBotonActivo
} from "./funciones.js";

const contenedorPrendas = document.getElementById('prendas-productos');
const contenedorAccesorios = document.getElementById('accesorios-productos');

if (contenedorPrendas) {
    renderizadoPrendas(contenedorPrendas);
}

if (contenedorAccesorios) {
    renderizadoAccesorios(contenedorAccesorios);
}

document.addEventListener("DOMContentLoaded", () => {
    marcarBotonActivo();
    setupDropdownMenu("userProfileBtn", "dropdownMenu", "profileArrow");
});

togglePasswordVisibility("password", "togglePassword");

document.addEventListener('DOMContentLoaded', function () {
    const togglePasswordButtons = document.querySelectorAll('.toggle-password-btn');

    if (togglePasswordButtons.length > 0) {
        togglePasswordButtons.forEach(button => {
            button.addEventListener('click', function () {
                const passwordField = this.previousElementSibling;

                if (passwordField && passwordField.type) {
                    const isPassword = passwordField.type === 'password';
                    passwordField.type = isPassword ? 'text' : 'password';

                    const icon = this.querySelector('i');
                    if (icon) {
                        if (isPassword) {
                            icon.classList.remove('fa-eye');
                            icon.classList.add('fa-eye-slash');
                        } else {
                            icon.classList.remove('fa-eye-slash');
                            icon.classList.add('fa-eye');
                        }
                    }
                }
            });
        });
    }
});