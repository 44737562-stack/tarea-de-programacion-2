# Sistema de gestión de biblioteca

Aplicación full stack para administrar libros y sus autores, géneros, sagas y estantes. El backend usa Express, TypeORM y SQLite; el frontend usa React.

## Requisitos

- Node.js 20.17 o superior
- npm

## Preparar el backend

```bash
cd tarea-backend
npm install
cp .env.example .env
```

Editá `tarea-backend/.env` y reemplazá `SECRETO_JWT` y `CLAVE_ADMIN` por valores propios. La clave del administrador debe tener al menos ocho caracteres.

Creá el usuario administrador inicial y luego iniciá la API:

```bash
npm run seed
npm run dev
```

La API estará disponible en `http://localhost:3000`. La base de datos SQLite y los logs se crean automáticamente dentro de `tarea-backend/`.

## Preparar el frontend

En otra terminal:

```bash
cd tarea-frontend
npm install
cp .env.example .env
npm run dev
```

Abrí `http://localhost:5173` e iniciá sesión con el correo y la clave definidos en `tarea-backend/.env`. Si la API se ejecuta en otra dirección, actualizá `VITE_API_URL` en `tarea-frontend/.env` y `ORIGEN_FRONTEND` en `tarea-backend/.env`.

## Funcionalidades

- Inicio y cierre de sesión con token JWT.
- Alta, consulta, edición y eliminación de libros, autores, géneros, sagas y estantes.
- Filtros combinables de libros por género, autor y año.
- Detalle de libro con información de su ubicación y relaciones.
- Visualización de eventos y solicitudes registrados por el backend.

## Probar la API con Postman

1. Iniciá el backend con `cd tarea-backend && npm run dev`.
2. En Postman, importá `postman/Biblioteca API.postman_collection.json` y `postman/Biblioteca Local.postman_environment.json`.
3. Seleccioná el entorno **Biblioteca - Local**. Actualizá `correoAdministrador` y `claveAdministrador` con los valores de `tarea-backend/.env`.
4. Abrí el menú de la colección, elegí **Run** y ejecutá los requests en el orden en que aparecen.

La colección prueba el login, las rutas protegidas, el CRUD de libros y catálogos, las relaciones, filtros combinados y eventos. Guarda el token JWT y los identificadores creados automáticamente. Cada ejecución crea registros de prueba nuevos y elimina el libro al final; los registros de autor, género, saga y estante permanecen en la base de datos.
