export function renderizadoPrendas(contenedor) {
    fetch('/resources/datos/tienda.json')
        .then((respuesta) => {
            const datosJson = respuesta.json();
            return datosJson;
        }).then((datosFinales) => {
            datosFinales.prendas.forEach(producto => {
                const prendaHTML = `
                    <article class="producto-card">
                        <img src="${producto.imagen}" alt="Prenda: ${producto.nombre}" class="producto-img">
                        <div class="producto-info">
                            <h3 class="producto-nombre">${producto.nombre}</h3>
                            <p class="producto-precio">Precio: $ ${producto.precio}</p>
                            <button class="btn-agregar">Añadir al Carrito</button>
                        </div>
                    </article>  
                `;
                contenedor.innerHTML += prendaHTML;
            });
        });
}

export function renderizadoAccesorios(contenedor) {
    fetch('/resources/datos/tienda.json')
        .then((respuesta) => respuesta.json())
        .then((datosFinales) => {
            datosFinales.accesorios.forEach(producto => {
                const accesorioHTML = `
                    <article class="producto-card">
                        <img src="${producto.imagen}" alt="Accesorio: ${producto.nombre}" class="producto-img">
                        <div class="producto-info">
                            <h3 class="producto-nombre">${producto.nombre}</h3>
                            <p class="producto-precio">Precio: $ ${producto.precio}</p>
                            <button class="btn-agregar">Añadir al Carrito</button>
                        </div>
                    </article>  
                `;
                contenedor.innerHTML += accesorioHTML;
            });
        });
}



export function setupDropdownMenu(userBtnId, menuId, arrowId) {
    const userProfileBtn = document.getElementById(userBtnId);
    const dropdownMenu = document.getElementById(menuId);
    const profileArrow = document.getElementById(arrowId);

    if (!userProfileBtn || !dropdownMenu || !profileArrow) return;

    userProfileBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        dropdownMenu.classList.toggle("show");
        profileArrow.classList.toggle("rotate");
    });

    document.addEventListener("click", () => {
        dropdownMenu.classList.remove("show");
        profileArrow.classList.remove("rotate");
    });
}

export function togglePasswordVisibility(inputId, buttonId) {
    const passwordInput = document.getElementById(inputId);
    const toggleButton = document.getElementById(buttonId);

    if (!passwordInput || !toggleButton) return;

    toggleButton.addEventListener('click', () => {
        const icon = toggleButton.querySelector('i');

        if (passwordInput.type === 'password') {
            passwordInput.type = 'text';
            icon.classList.remove('fa-eye');
            icon.classList.add('fa-eye-slash');
        } else {
            passwordInput.type = 'password';
            icon.classList.remove('fa-eye-slash');
            icon.classList.add('fa-eye');
        }
    });
}

export function marcarBotonActivo() {
    const botones = document.querySelectorAll('.sidebar-button');
    const currentPath = window.location.pathname;

    botones.forEach(boton => {
        const botonHref = boton.getAttribute('href');
        const botonUrl = new URL(botonHref, window.location.origin);
        const botonPath = botonUrl.pathname;

        if (botonPath === currentPath) {
            boton.classList.add('active');
        } else {
            boton.classList.remove('active');
        }
    });
}