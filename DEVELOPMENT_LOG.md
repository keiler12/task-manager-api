# Development Log

## 1. Descripción del desarrollo

Este documento registra el proceso de desarrollo de la prueba técnica para el cargo de Aprendiz / Practicante Backend Developer.

El proyecto consiste en una API REST para la gestión de usuarios y tareas, desarrollada utilizando Node.js, Express, TypeScript y PostgreSQL.

Durante el desarrollo se utilizó inteligencia artificial como herramienta de apoyo técnico para consultar conceptos, revisar alternativas de implementación, resolver problemas puntuales y acelerar algunas tareas de desarrollo.

Las propuestas obtenidas fueron revisadas, adaptadas al contexto del proyecto y verificadas mediante pruebas locales antes de considerarse terminadas.

---

## 2. Tecnologías utilizadas

* Node.js
* Express
* TypeScript
* PostgreSQL
* JWT
* bcrypt
* AJV
* Swagger / OpenAPI
* Git
* GitHub

---

## 3. Arquitectura implementada

El proyecto utiliza una arquitectura por capas con separación de responsabilidades:

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

La separación se realizó con los siguientes objetivos:

* Mantener las rutas enfocadas en la definición de los endpoints.
* Mantener los controllers enfocados en recibir solicitudes y construir respuestas.
* Centralizar la lógica de negocio en los services.
* Centralizar las consultas a PostgreSQL en persistence.
* Utilizar middlewares para autenticación, validación y errores.
* Mantener la configuración independiente del resto de la aplicación.

---

# 4. Uso de inteligencia artificial

La inteligencia artificial fue utilizada como herramienta de apoyo durante diferentes etapas del desarrollo.

El objetivo principal fue utilizarla como apoyo para:

* Consultar alternativas de implementación.
* Resolver dudas sobre Node.js, Express y TypeScript.
* Revisar estructuras de arquitectura.
* Apoyar la implementación de autenticación.
* Revisar consultas y separación de responsabilidades.
* Implementar validaciones.
* Revisar el manejo de errores.
* Documentar la API.
* Identificar elementos pendientes antes de la entrega.

La IA no fue utilizada como mecanismo de validación final. Cada funcionalidad incorporada fue ejecutada y comprobada localmente.

---

# 5. Prompts de apoyo utilizados

## 5.1 Arquitectura del proyecto

### Prompt

> Estoy desarrollando una API REST con Node.js, Express y TypeScript para un sistema de gestión de tareas. La prueba requiere una arquitectura separada en api/routes, controllers, services y persistence. Propón una estructura de carpetas clara y explica qué responsabilidad debería tener cada capa, evitando colocar lógica de negocio directamente en las rutas.

### Uso

Se utilizó como apoyo para definir la estructura inicial del proyecto.

### Resultado

Se estableció una arquitectura separada por responsabilidades utilizando:

* API / Routes
* Controllers
* Services
* Persistence
* Middlewares
* Schemas
* Config
* Errors

La estructura fue posteriormente adaptada al proyecto y a los requisitos específicos de la prueba.

---

## 5.2 Autenticación de usuarios

### Prompt

> Necesito implementar registro e inicio de sesión para una API Node.js + Express + TypeScript utilizando PostgreSQL. El registro debe almacenar la contraseña de forma segura mediante bcrypt y el login debe generar un JWT. Propón una implementación separando controller, service y repository, evitando devolver la contraseña en las respuestas.

### Uso

Se utilizó como apoyo para estructurar el proceso de autenticación.

### Resultado

Se implementaron:

* Registro de usuarios.
* Hash de contraseñas con bcrypt.
* Consulta de usuarios por correo.
* Comparación de contraseñas.
* Generación de JWT.
* Respuestas sin exponer la contraseña.

### Verificación

Se realizó un registro de prueba y posteriormente se verificó que la contraseña almacenada en PostgreSQL correspondiera a un hash y no a texto plano.

También se realizó un login exitoso utilizando las credenciales registradas.

---

## 5.3 Middleware de autenticación

### Prompt

> Diseña un middleware de autenticación para Express con TypeScript que lea el encabezado Authorization con el formato Bearer Token, valide el JWT utilizando una clave almacenada en variables de entorno y permita acceder a las rutas protegidas únicamente cuando el token sea válido. Incluye manejo de tokens ausentes, inválidos y expirados.

### Uso

Se utilizó para orientar la implementación del middleware de autenticación.

### Resultado

Se creó un middleware encargado de:

1. Obtener el encabezado `Authorization`.
2. Comprobar el formato `Bearer <token>`.
3. Obtener `JWT_SECRET` desde las variables de entorno.
4. Verificar el token.
5. Obtener la información del usuario.
6. Permitir el acceso a las rutas protegidas.

### Verificación

Se probaron solicitudes:

* Sin token.
* Con token válido.
* Con token inválido.

Los endpoints protegidos solamente permitieron el acceso cuando la autenticación era válida.

---

## 5.4 CRUD de tareas

### Prompt

> Necesito implementar el CRUD de tareas para una API REST con PostgreSQL. Cada tarea debe pertenecer al usuario autenticado mediante user_id. Las operaciones de consulta, actualización y eliminación deben verificar que la tarea pertenezca al usuario que realiza la solicitud. Propón cómo separar repository, service y controller para mantener las responsabilidades independientes.

### Uso

Se utilizó como apoyo para estructurar la gestión de tareas.

### Resultado

Se implementaron:

* Crear tarea.
* Obtener tareas del usuario.
* Obtener tarea por ID.
* Actualizar tarea.
* Eliminar tarea.

La relación entre usuarios y tareas se implementó mediante `user_id`.

### Decisión

Además de verificar el usuario desde la aplicación, las consultas SQL de las operaciones sobre tareas incluyen el `user_id`.

Por ejemplo, las operaciones sobre una tarea utilizan una condición equivalente a:

```sql
WHERE id = $1
AND user_id = $2
```

Esto evita que un usuario autenticado pueda acceder o modificar directamente una tarea perteneciente a otro usuario.

### Verificación

Se probaron las operaciones CRUD utilizando un usuario autenticado.

---

## 5.5 Validaciones con AJV

### Prompt

> Quiero implementar validación de solicitudes en una API Express utilizando AJV y JSON Schema. Necesito validar registro, login y creación/actualización de tareas, incluyendo formato de correo electrónico, longitud de campos y valores permitidos para el estado de una tarea. La validación debe ejecutarse mediante un middleware antes de llegar al controller.

### Uso

Se utilizó para definir una estrategia de validación mediante JSON Schema.

### Resultado

Se implementaron schemas para:

* Registro.
* Login.
* Creación de tareas.
* Actualización de tareas.

Se validan elementos como:

* Campos obligatorios.
* Longitud de los campos.
* Formato de correo.
* Formato de fecha.
* Estados permitidos.

Los estados disponibles son:

```text
pendiente
en curso
completada
```

### Verificación

Se enviaron solicitudes con información inválida y se verificó que la API respondiera con código HTTP `400`.

---

## 5.6 Manejo centralizado de errores

### Prompt

> Propón una estrategia sencilla de manejo centralizado de errores para una API Express con TypeScript. Necesito poder generar errores con diferentes códigos HTTP, por ejemplo 400, 401, 404 y 409, y devolver respuestas JSON consistentes desde un middleware global.

### Uso

Se utilizó para diseñar una estrategia común para el manejo de errores.

### Resultado

Se creó la clase:

```text
AppError
```

y el middleware:

```text
error.middleware.ts
```

Esto permite generar errores personalizados con su respectivo código HTTP y procesarlos desde un único punto.

### Verificación

Se probaron casos como:

* Datos inválidos.
* Credenciales inválidas.
* Correo ya registrado.
* Tarea inexistente.
* ID de tarea inválido.

---

## 5.7 Documentación Swagger

### Prompt

> Necesito documentar una API REST desarrollada con Express y TypeScript utilizando Swagger/OpenAPI. Los endpoints son POST /auth/register, POST /auth/login, POST /tasks, GET /tasks, GET /tasks/:id, PUT /tasks/:id y DELETE /tasks/:id. Las rutas de tareas requieren autenticación Bearer JWT. Propón las anotaciones JSDoc necesarias para que Swagger documente correctamente estos endpoints.

### Uso

Se utilizó para orientar la documentación de los endpoints.

### Resultado

Se incorporaron anotaciones JSDoc en las rutas y se configuró Swagger/OpenAPI.

La documentación quedó disponible mediante:

```text
http://localhost:3000/api-docs
```

### Verificación

Se inició el servidor y se verificó que Swagger UI cargara correctamente y mostrara los endpoints de autenticación y tareas.

---

## 5.8 Revisión antes de la entrega

### Prompt

> Revisa los requisitos de una prueba técnica para un Backend Developer con Node.js, Express, TypeScript y PostgreSQL. A partir de una API que ya tiene autenticación, CRUD, validaciones, manejo de errores y Swagger, crea una lista de comprobación de los elementos que deberían revisarse antes de subir el proyecto a GitHub y entregarlo.

### Uso

Se utilizó para identificar elementos pendientes antes de la etapa final.

### Resultado

Se identificaron como puntos pendientes:

* Limpieza del código.
* Revisión de validaciones.
* Revisión de seguridad.
* README.
* DEVELOPMENT_LOG.md.
* Pruebas finales.
* Revisión de `.gitignore`.
* GitHub.
* Entrega final.

---

# 6. Cambios aceptados y adaptados

Las propuestas obtenidas mediante IA no fueron incorporadas automáticamente.

Cada implementación fue revisada y adaptada de acuerdo con:

* La estructura real del proyecto.
* Los requisitos de la prueba.
* La configuración de PostgreSQL.
* Las convenciones utilizadas en el código.
* Las pruebas realizadas durante el desarrollo.

Entre los cambios aceptados y adaptados se encuentran:

### Arquitectura

Se mantuvo la separación de responsabilidades propuesta porque coincidía con la arquitectura solicitada por la prueba.

### Autenticación

Se utilizó bcrypt para el almacenamiento seguro de contraseñas y JWT para la autenticación.

### Persistencia

Se adaptaron las consultas propuestas para trabajar con PostgreSQL y los nombres de las tablas definidos en el proyecto.

### Validación

Se adaptaron los schemas a los nombres y restricciones definidos para las entidades de la aplicación.

### Errores

Se incorporó `AppError` y un middleware global para evitar respuestas de error repetidas en diferentes partes del proyecto.

### Swagger

Las anotaciones fueron adaptadas a las rutas y estructuras reales de la aplicación.

---

# 7. Propuestas modificadas o descartadas

Durante el desarrollo algunas propuestas necesitaron modificaciones antes de ser incorporadas.

Los principales motivos fueron:

* Diferencias con la estructura actual del proyecto.
* Necesidad de mantener la separación de capas.
* Compatibilidad con TypeScript.
* Adaptación a PostgreSQL.
* Cumplimiento específico de los requisitos de la prueba.
* Simplificación de implementaciones innecesariamente complejas.

Por ejemplo, las propuestas relacionadas con consultas de base de datos fueron adaptadas al esquema real de las tablas `users` y `tasks`.

También se eliminaron rutas utilizadas únicamente para pruebas antes de preparar la versión final.

---

# 8. Verificación del código

La verificación se realizó principalmente mediante ejecución local de la aplicación y pruebas HTTP.

## 8.1 Registro

Se verificó:

* Registro correcto de usuarios.
* Validación de los campos.
* Formato de correo.
* Longitud mínima de contraseña.
* Rechazo de correos previamente registrados.

## 8.2 Seguridad de contraseñas

Después de registrar un usuario se revisó la información almacenada en PostgreSQL.

Se comprobó que la contraseña no se almacenara directamente como texto plano, sino mediante un hash generado con bcrypt.

## 8.3 Login

Se verificó:

* Login con credenciales correctas.
* Rechazo de contraseña incorrecta.
* Rechazo de correo inexistente.
* Generación del JWT.

## 8.4 Autenticación

Se verificó:

* Solicitud sin token.
* Solicitud con token válido.
* Solicitud con token inválido.
* Protección de las rutas `/tasks`.

## 8.5 CRUD de tareas

Se probaron:

```text
POST /tasks
GET /tasks
GET /tasks/:id
PUT /tasks/:id
DELETE /tasks/:id
```

Se comprobó que las tareas quedaran asociadas al usuario autenticado.

## 8.6 Validación

Se probaron solicitudes con información inválida para verificar que la API rechazara los datos antes de ejecutar la lógica principal.

## 8.7 IDs inválidos

Se agregó una validación para evitar que valores que no correspondan a identificadores numéricos positivos sean tratados como IDs válidos.

## 8.8 Swagger

Se verificó:

```text
http://localhost:3000/api-docs
```

La interfaz de Swagger se cargó correctamente y permitió consultar la documentación de los endpoints.

## 8.9 TypeScript

Se ejecutó:

```bash
npx tsc --noEmit
```

La comprobación se realizó para detectar errores de tipado antes de continuar con la entrega.

---

# 9. Decisiones tomadas durante el desarrollo

## Decisión 1: PostgreSQL

Se decidió utilizar PostgreSQL como sistema de persistencia.

La prueba técnica establece PostgreSQL como opción preferente y el modelo de datos requiere una relación entre usuarios y tareas.

---

## Decisión 2: arquitectura por capas

Se decidió mantener separadas las responsabilidades entre:

```text
Routes
Controllers
Services
Persistence
```

Esto evita concentrar toda la lógica en las rutas y facilita el mantenimiento.

---

## Decisión 3: AJV

Se decidió utilizar AJV para implementar las validaciones mediante JSON Schema.

Esto permite mantener las reglas de validación separadas de los controllers.

---

## Decisión 4: Swagger

Se decidió utilizar Swagger/OpenAPI para documentar y probar los endpoints de la API.

---

## Decisión 5: pruebas incrementales

Se decidió probar cada funcionalidad después de implementarla antes de continuar con la siguiente etapa.

Esto permitió detectar errores de configuración y lógica durante el desarrollo en lugar de acumularlos para el final.

---

# 10. Problemas encontrados y soluciones

## Problema 1: ejecución de npm en PowerShell

Durante la configuración inicial se presentó una restricción de PowerShell que impedía ejecutar directamente determinados comandos de npm.

### Solución

Se utilizó:

```text
npm.cmd
```

para ejecutar los comandos de npm desde PowerShell.

---

## Problema 2: configuración de PostgreSQL

Fue necesario configurar correctamente la conexión entre la aplicación y PostgreSQL.

### Solución

Se creó una configuración mediante variables de entorno:

```env
DB_HOST
DB_PORT
DB_NAME
DB_USER
DB_PASSWORD
```

La conexión fue posteriormente verificada desde la aplicación.

---

## Problema 3: validación de solicitudes

Era necesario evitar que información inválida llegara directamente a los controllers.

### Solución

Se implementó un middleware utilizando AJV y JSON Schema.

---

## Problema 4: manejo de errores

Era necesario mantener respuestas de error consistentes.

### Solución

Se creó:

```text
AppError
```

junto con:

```text
error.middleware.ts
```

para centralizar el procesamiento de errores.

---

## Problema 5: documentación de la API

La prueba requiere documentación mediante Swagger.

### Solución

Se configuró Swagger/OpenAPI y se agregaron anotaciones JSDoc a los endpoints.

---

## Problema 6: validación de IDs

Los endpoints que reciben IDs podían recibir valores no válidos.

### Solución

Se agregó una comprobación para garantizar que el ID corresponda a un número entero positivo.

---

# 11. Seguridad

Durante el desarrollo se tuvieron en cuenta las siguientes medidas:

* Las contraseñas no se almacenan en texto plano.
* Se utiliza bcrypt para generar hashes.
* El JWT utiliza una clave almacenada mediante variables de entorno.
* El archivo `.env` se encuentra excluido mediante `.gitignore`.
* Las tareas se consultan asociándolas al usuario autenticado.
* Los endpoints de tareas requieren autenticación.
* Los datos recibidos son validados antes de procesarse.
* No se incluyen credenciales reales dentro del código fuente.

---

# 12. Criterios utilizados para aceptar propuestas de IA

Las propuestas fueron consideradas únicamente después de comprobar:

1. Compatibilidad con el proyecto.
2. Compatibilidad con TypeScript.
3. Compatibilidad con PostgreSQL.
4. Cumplimiento de los requisitos de la prueba.
5. Separación adecuada de responsabilidades.
6. Seguridad de la información.
7. Facilidad de mantenimiento.
8. Posibilidad de realizar pruebas locales.
9. Comprensión del funcionamiento de la implementación.

La prioridad fue comprender y verificar las soluciones antes de incorporarlas.

---

# 13. Resultado final

Al finalizar el desarrollo, la API cuenta con:

* Registro de usuarios.
* Inicio de sesión.
* Hash de contraseñas mediante bcrypt.
* Autenticación mediante JWT.
* Middleware de autenticación.
* CRUD completo de tareas.
* Asociación entre tareas y usuarios.
* Restricción de acceso por propietario.
* Validación de datos mediante AJV.
* Manejo centralizado de errores.
* PostgreSQL.
* Arquitectura por capas.
* Documentación Swagger/OpenAPI.
* Variables de entorno.
* `.env.example`.
* `.gitignore`.
* Historial de cambios mediante Git.
* Verificación mediante solicitudes HTTP.
* Verificación de compilación de TypeScript.

---

# 14. Conclusión

La inteligencia artificial fue utilizada como herramienta de apoyo técnico durante el desarrollo, principalmente para consultar alternativas, resolver problemas puntuales, revisar implementaciones y acelerar determinadas tareas.

Las propuestas obtenidas fueron evaluadas según los requisitos de la prueba y adaptadas al contexto del proyecto.

La implementación final fue verificada mediante pruebas locales, revisión de la base de datos, solicitudes HTTP y comprobación de TypeScript.

El objetivo del uso de IA fue complementar el proceso de desarrollo y facilitar la resolución de problemas, manteniendo la revisión, adaptación y validación de las soluciones como parte fundamental del proceso.
