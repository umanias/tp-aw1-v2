const categoriaSelect = document.getElementById('categoriaSelect');
const tablaProductosBody = document.getElementById('tablaProductosBody');
const accionSelect = document.getElementById('accionSelect');
const formAccion = document.getElementById('formAccion');
const btnEjecutarAccion = document.getElementById('btnEjecutarAccion');

let tiendaDatos = null;  // Aquí cargamos el JSON
let categoriaActual = categoriaSelect.value;
let accionActual = accionSelect.value;

// Carga inicial del JSON
async function cargarDatos() {
  try {
    // Como fetch no puede escribir en archivo local sin backend, 
    // para demo usamos fetch y guardamos en localStorage para persistencia
    const resp = await fetch('/resources/datos/tienda.json');
    tiendaDatos = await resp.json();

    // Si hay datos en localStorage (para demo), los usamos
    const local = localStorage.getItem('tiendaDatos');
    if (local) tiendaDatos = JSON.parse(local);

    mostrarTabla();
  } catch (e) {
    console.error("Error cargando JSON:", e);
    tiendaDatos = { accesorios: [], prendas: [] };
  }
}

// Guardar datos en localStorage para demo
function guardarDatos() {
  localStorage.setItem('tiendaDatos', JSON.stringify(tiendaDatos));
}

// Mostrar tabla según categoría seleccionada
function mostrarTabla() {
  tablaProductosBody.innerHTML = '';
  const lista = tiendaDatos[categoriaActual];
  if (!lista) return;
  for (const item of lista) {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${item.id}</td>
      <td>${item.nombre}</td>
      <td>$${item.precio}</td>
    `;
    tablaProductosBody.appendChild(tr);
  }
}

// Cambia los inputs del formulario según la acción
function actualizarFormulario() {
  formAccion.innerHTML = '';
  if (accionActual === 'eliminar') {
    // Solo pide ID
    formAccion.innerHTML = `
      <label for="inputId">ID:</label>
      <input type="number" id="inputId" name="id" required min="1" />
    `;
  } else if (accionActual === 'agregar' || accionActual === 'editar') {
    // ID para editar, pero para agregar no se pide (se auto incrementa)
    if (accionActual === 'editar') {
      formAccion.innerHTML += `
        <label for="inputId">ID:</label>
        <input type="number" id="inputId" name="id" required min="1" />
      `;
    }
    formAccion.innerHTML += `
      <label for="inputNombre">Nombre:</label>
      <input type="text" id="inputNombre" name="nombre" required />
      <label for="inputPrecio">Precio:</label>
      <input type="number" id="inputPrecio" name="precio" required min="0" step="0.01" />
      <label for="inputImagen">Imagen (URL o nombre archivo):</label>
      <input type="text" id="inputImagen" name="imagen" required />
    `;
  }
}

// Funciones CRUD

function getNuevoId(categoria) {
  const lista = tiendaDatos[categoria];
  if (lista.length === 0) return 1;
  return Math.max(...lista.map(i => i.id)) + 1;
}

function agregarProducto(categoria, nombre, precio, imagen) {
  const nuevoId = getNuevoId(categoria);
  tiendaDatos[categoria].push({ id: nuevoId, nombre, precio: parseFloat(precio), imagen });
  guardarDatos();
  mostrarTabla();
}

function editarProducto(categoria, id, nombre, precio, imagen) {
  const lista = tiendaDatos[categoria];
  const index = lista.findIndex(i => i.id === id);
  if (index === -1) {
    alert('No se encontró el producto con ese ID');
    return;
  }
  lista[index] = { id, nombre, precio: parseFloat(precio), imagen };
  guardarDatos();
  mostrarTabla();
}

function eliminarProducto(categoria, id) {
  const lista = tiendaDatos[categoria];
  const index = lista.findIndex(i => i.id === id);
  if (index === -1) {
    alert('No se encontró el producto con ese ID');
    return;
  }
  lista.splice(index, 1);
  guardarDatos();
  mostrarTabla();
}

// Eventos

categoriaSelect.addEventListener('change', () => {
  categoriaActual = categoriaSelect.value;
  mostrarTabla();
});

accionSelect.addEventListener('change', () => {
  accionActual = accionSelect.value;
  actualizarFormulario();
});

// Ejecutar acción al hacer click en el botón
btnEjecutarAccion.addEventListener('click', e => {
  e.preventDefault();
  const formData = new FormData(formAccion);

  if (accionActual === 'agregar') {
    const nombre = formData.get('nombre').trim();
    const precio = formData.get('precio');
    const imagen = formData.get('imagen').trim();
    if (!nombre || !precio || !imagen) {
      alert('Completa todos los campos');
      return;
    }
    agregarProducto(categoriaActual, nombre, precio, imagen);
    formAccion.reset();
  } else if (accionActual === 'editar') {
    const id = parseInt(formData.get('id'));
    const nombre = formData.get('nombre').trim();
    const precio = formData.get('precio');
    const imagen = formData.get('imagen').trim();
    if (!id || !nombre || !precio || !imagen) {
      alert('Completa todos los campos');
      return;
    }
    editarProducto(categoriaActual, id, nombre, precio, imagen);
    formAccion.reset();
  } else if (accionActual === 'eliminar') {
    const id = parseInt(formData.get('id'));
    if (!id) {
      alert('Completa el campo ID');
      return;
    }
    if (confirm(`¿Eliminar producto con ID ${id}?`)) {
      eliminarProducto(categoriaActual, id);
      formAccion.reset();
    }
  }
});

// Inicialización
cargarDatos().then(() => {
  actualizarFormulario();
  mostrarTabla();
}); 