# Task Manager API

API REST desarrollada como prueba técnica para el cargo de Aprendiz - Practicante Backend Developer.

El proyecto permite registrar usuarios, iniciar sesión mediante JWT y gestionar tareas asociadas al usuario autenticado.

## Tecnologías

* Node.js
* Express
* TypeScript
* PostgreSQL
* JWT
* bcrypt
* AJV
* Swagger / OpenAPI
* Git / GitHub

## Arquitectura

El proyecto utiliza una arquitectura por capas para separar responsabilidades:

```text
src/
├── api/
│   ├── routes.ts
│   ├── auth.routes.ts
│   └── task.routes.ts
│
├── config/
│   ├── database.ts
│   └── swagger.ts
│
├── controllers/
│   ├── auth.controller.ts
│   └── task.controller.ts
│
├── errors/
│   └── AppError.ts
│
├── middlewares/
│   ├── auth.middleware.ts
│   ├── error.middleware.ts
│   └── validate.middleware.ts
│
├── persistence/
│   ├── user.repository.ts
│   └── task.repository.ts
│
├── schemas/
│   ├── auth.schema.ts
│   └── task.schema.ts
│
├── services/
│   ├── auth.service.ts
│   └── task.service.ts
│
├── app.ts
└── index.ts
```

### Responsabilidad de cada capa

* **api:** definición y organización de las rutas HTTP.
* **controllers:** reciben las solicitudes y construyen las respuestas.
* **services:** contienen la lógica de negocio.
* **persistence:** comunicación con PostgreSQL.
* **middlewares:** autenticación, validación y manejo de errores.
* **schemas:** reglas de validación de los datos recibidos.
* **config:** configuración de la aplicación, base de datos y Swagger.
* **errors:** errores personalizados de la aplicación.

## Requisitos

Antes de ejecutar el proyecto se necesita tener instalado:

* Node.js
* npm
* PostgreSQL

## Instalación

Clonar el repositorio:

```bash
git clone <URL_DEL_REPOSITORIO>
```

Entrar al proyecto:

```bash
cd Prueba-Tecnica
```

Instalar dependencias:

```bash
npm install
```

## Configuración de variables de entorno

Crear un archivo `.env` en la raíz del proyecto.

Ejemplo:

```env
PORT=3000

DB_HOST=localhost
DB_PORT=5432
DB_NAME=task_manager
DB_USER=postgres
DB_PASSWORD=

JWT_SECRET=
JWT_EXPIRES_IN=1h
```

Los valores sensibles, como la contraseña de PostgreSQL y el secreto JWT, no deben publicarse en el repositorio.

También se incluye `.env.example` como referencia de configuración.

## Base de datos

Crear una base de datos PostgreSQL llamada:

```text
task_manager
```

Crear las tablas `users` y `tasks` con la estructura definida para el proyecto.

La tabla `tasks` mantiene una relación con `users` mediante `user_id`.

Los estados permitidos para una tarea son:

```text
pendiente
en curso
completada
```

## Ejecución

Para ejecutar el proyecto en modo desarrollo:

```bash
npm run dev
```

La API estará disponible en:

```text
http://localhost:3000
```

Health check:

```text
GET /health
```

## Documentación Swagger

La documentación interactiva de la API está disponible en:

```text
http://localhost:3000/api-docs
```

Desde Swagger se pueden consultar y probar los endpoints disponibles.

Para los endpoints protegidos se debe utilizar un token JWT obtenido mediante `/auth/login`.

## Autenticación

### Registrar usuario

```http
POST /auth/register
```

Ejemplo:

```json
{
  "name": "Juan Pérez",
  "email": "juan@example.com",
  "password": "Password123"
}
```

La contraseña se almacena utilizando un hash generado mediante bcrypt.

### Iniciar sesión

```http
POST /auth/login
```

Ejemplo:

```json
{
  "email": "juan@example.com",
  "password": "Password123"
}
```

La respuesta contiene un token JWT.

Para acceder a los endpoints de tareas se debe enviar:

```http
Authorization: Bearer <TOKEN>
```

## Tareas

Todos los endpoints de tareas requieren autenticación.

### Crear tarea

```http
POST /tasks
```

### Obtener tareas del usuario

```http
GET /tasks
```

### Obtener una tarea

```http
GET /tasks/:id
```

### Actualizar una tarea

```http
PUT /tasks/:id
```

### Eliminar una tarea

```http
DELETE /tasks/:id
```

Ejemplo de tarea:

```json
{
  "titulo": "Desarrollar API",
  "descripcion": "Completar endpoints del proyecto",
  "fecha_vencimiento": "2026-10-10",
  "estado": "pendiente"
}
```

## Seguridad y validaciones

El proyecto implementa:

* Hash de contraseñas mediante bcrypt.
* Autenticación mediante JWT.
* Middleware para proteger los endpoints de tareas.
* Validación de datos mediante AJV.
* Validación del formato de correo electrónico.
* Validación de los estados permitidos.
* Validación de identificadores de tareas.
* Restricción de acceso a las tareas según el usuario autenticado.
* Variables sensibles mediante `.env`.
* Manejo centralizado de errores.

## Respuestas de error

Los errores de la aplicación utilizan respuestas JSON consistentes.

Ejemplo:

```json
{
  "message": "Tarea no encontrada"
}
```

Para datos de entrada inválidos:

```json
{
  "message": "Datos de entrada inválidos"
}
```

## Scripts

Ejecutar el servidor de desarrollo:

```bash
npm run dev
```

Verificar errores de TypeScript:

```bash
npx tsc --noEmit
```

## Autor

Prueba técnica desarrollada para el proceso de selección de Aprendiz - Practicante Backend Developer de Keiler Medina Herrera.
