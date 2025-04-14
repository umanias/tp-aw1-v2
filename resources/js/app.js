import { renderizadoPrendas, renderizadoAccesorios, setupDropdownMenu, togglePasswordVisibility } from "./funciones.js";

const contenedorPrendas = document.getElementById('prendas-productos');
const contenedorAccesorios = document.getElementById('accesorios-productos');

if(contenedorPrendas) {
    renderizadoPrendas(contenedorPrendas);
}

if(contenedorAccesorios) {
    renderizadoAccesorios(contenedorAccesorios);
}

document.addEventListener("DOMContentLoaded", () => {
    setupDropdownMenu("userProfileBtn", "dropdownMenu", "profileArrow");
});

togglePasswordVisibility("password", "togglePassword");

document.addEventListener('DOMContentLoaded', function() {
    // Funcionalidad para mostrar/ocultar contraseña
    const togglePasswordButtons = document.querySelectorAll('.toggle-password-btn');
    
    if (togglePasswordButtons.length > 0) {
        togglePasswordButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Encontrar el campo de contraseña asociado
                const passwordField = this.previousElementSibling;
                
                // Comprobar si es un campo de contraseña
                if (passwordField && passwordField.type) {
                    // Cambiar el tipo de campo
                    const isPassword = passwordField.type === 'password';
                    passwordField.type = isPassword ? 'text' : 'password';
                    
                    // Cambiar el icono
                    const icon = this.querySelector('i');
                    if (icon) {
                        if (isPassword) {
                            // Si era password, ahora mostramos un ojo tachado (contraseña visible)
                            icon.classList.remove('fa-eye');
                            icon.classList.add('fa-eye-slash');
                        } else {
                            // Si era texto, ahora mostramos un ojo normal (contraseña oculta)
                            icon.classList.remove('fa-eye-slash');
                            icon.classList.add('fa-eye');
                        }
                    }
                }
            });
        });
    }
});
