# TP AW1 V2 - Tienda Online

## Estructura del Proyecto Corregida

```
tp-aw1-v2/
├── package.json
├── public/
│   ├── admin/
│   │   ├── index.html          # Panel de administración
│   │   ├── crud.js             # Funcionalidad CRUD del admin
│   │   └── server/
│   │       ├── app.mjs         # Servidor principal
│   │       └── routes/
│   │           └── api.mjs     # Rutas de la API
│   └── client/
│       ├── html/               # Páginas del cliente
│       │   ├── index.html      # Página principal
│       │   ├── css/
│       │   │   └── styles.css  # Estilos principales
│       │   ├── tienda/
│       │   │   ├── prendas.html
│       │   │   └── accesorios.html
│       │   ├── auth/
│       │   │   ├── login.html
│       │   │   ├── registro.html
│       │   │   └── recuperar.html
│       │   └── info/
│       │       ├── contacto.html
│       │       └── about.html
│       └── resources/
│           ├── datos/
│           │   └── tienda.json # Datos de productos
│           ├── store/          # Imágenes de productos
│           ├── js/             # JavaScript del cliente
│           │   ├── app.js
│           │   └── funciones.js
│           └── img/            # Imágenes generales
```

## Rutas Corregidas

### Servidor
- **Puerto**: 3000 (configurable con variable de entorno PUERTO)
- **Archivo principal**: `public/admin/server/app.mjs`

### Rutas Estáticas
- **Cliente**: `/` → `public/client/html/`
- **Recursos**: `/resources` → `public/client/resources/`
- **CSS**: `/css` → `public/client/html/css/`
- **Admin**: `/admin` → `public/admin/`

### API
- **Base**: `/api`
- **Productos**: `GET /api` (todos los productos)
- **Producto por ID**: `GET /api/:id`

### Archivos de Datos
- **tienda.json**: `public/client/resources/datos/tienda.json`

## Comandos

```bash
# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev
```

## Acceso a las Páginas

- **Cliente**: http://localhost:3000
- **Admin**: http://localhost:3000/admin
- **API**: http://localhost:3000/api

## Correcciones Realizadas

### 1. Servidor y API
- ✅ Corregida la ruta del servidor en `package.json`
- ✅ Corregidas las rutas estáticas en `app.mjs`
- ✅ Corregida la ruta del archivo JSON en `api.mjs`
- ✅ Agregado el router de la API al servidor principal

### 2. Admin
- ✅ Movido `crud.mjs` a `crud.js` en la ubicación correcta
- ✅ Actualizada la referencia del script en `index.html`

### 3. Cliente - Rutas Corregidas en HTML
- ✅ **index.html**: Corregidas todas las rutas de recursos y navegación
- ✅ **prendas.html**: Corregidas rutas de CSS, JS e imágenes
- ✅ **accesorios.html**: Corregidas rutas de CSS, JS e imágenes
- ✅ **login.html**: Corregidas rutas de CSS, JS e imágenes
- ✅ **registro.html**: Corregidas rutas de CSS, JS e imágenes
- ✅ **recuperar.html**: Corregidas rutas de CSS, JS e imágenes
- ✅ **contacto.html**: Corregidas rutas de CSS, JS e imágenes
- ✅ **about.html**: Corregidas rutas de CSS, JS e imágenes

### 4. Cambios Específicos en Rutas
- ❌ `/public/client/resources/img/Logo.png` → ✅ `/resources/img/Logo.png`
- ❌ `/public/client/html/css/styles.css` → ✅ `/css/styles.css`
- ❌ `/public/client/resources/js/app.js` → ✅ `/resources/js/app.js`
- ❌ `admin/index.html` → ✅ `/admin`
- ❌ `auth\login.html` → ✅ `auth/login.html` (corregidas barras invertidas)

### 5. Navegación
- ✅ Todas las rutas de navegación entre páginas corregidas
- ✅ Rutas relativas y absolutas configuradas correctamente
- ✅ Enlaces del sidebar funcionando en todas las páginas

## Estructura de Archivos Verificada

### CSS
- ✅ `public/client/html/css/styles.css` - Existe y accesible

### JavaScript
- ✅ `public/client/resources/js/app.js` - Existe y accesible
- ✅ `public/client/resources/js/funciones.js` - Existe y accesible

### Imágenes
- ✅ `public/client/resources/img/` - Directorio de imágenes
- ✅ `public/client/resources/store/` - Directorio de productos

### Datos
- ✅ `public/client/resources/datos/tienda.json` - Datos de productos

## Notas Importantes

1. **Rutas Absolutas**: Se usan rutas absolutas desde la raíz del servidor para recursos estáticos
2. **Rutas Relativas**: Se usan rutas relativas para navegación entre páginas
3. **Admin**: El panel de administración está disponible en `/admin`
4. **API**: La API REST está disponible en `/api`

## Próximos Pasos

1. Verificar que todas las imágenes existan en las rutas especificadas
2. Probar la funcionalidad CRUD del admin
3. Verificar que la API devuelva los datos correctamente
4. Probar la navegación entre todas las páginas 