# Modules used

## express

`express` es el framework más popular de nodejs para la creación de aplicaciones backend.

## express-handlebars

Este módulo es la integración del motor de plantillas `handlebars` en express. Otras opciones son `jade`, `pug`, `ejs`, `jinja`, etc.

## express-session

Administra las sesiones de nuestra app. Será necesario para autenticar a un usuario posteriormente.

## mysql

Es un módulo de npm para conectarnos a la base de datos MySQL. Este módulo NO ES LA BASE DE DATOS, tan solo sirve para conectarnos y hacer consultas.

## express-mysql-session

Este módulo almacenará las sesiones en la base de datos, en lugar del servidor. Esto es ideal cuando la aplicación esté en producción.

## morgan

Permite crear logs o mensajes, que se muestran por consola, sobre las peticiones que las aplicaciones cliente estan solicitando al servidor.

## bcryptjs

Este módulo lo usaremos para cifrar las contraseñas de los usuarios antes de guardarlos en la base de datos.

## passport

Es un módulo para autenticar, y manejar el proceso de login de un usuario en nuestra aplicación.

## passport-local

Es un complemento de `passport` para autenticar a los usuarios con nuestra propia base de datos.

## timeago.js

Convierte los timestamps o fechas de la base de datos, en un formato de: 2 minutes ago, 2 hours ago, etc.

## connect-flash

Lo usaremos para mostrar mensajes de error y exito cuando el usuario realice una operación.

## express-validator

Es un módulo para validar los datos que el usuario nos envia desde la aplicación cliente.
