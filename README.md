# Always Music v2

Always Music v2 es una aplicación de gestión de estudiantes desarrollada en Node.js que utiliza PostgreSQL para almacenar y manejar datos de estudiantes de una escuela de música. Esta versión mejora la gestión de errores y permite consultas parametrizadas para mayor seguridad y eficiencia.

## Tabla de Contenidos

1. [Descripción](#descripción)
2. [Instalación](#instalación)
3. [Configuración](#configuración)
4. [Uso](#uso)
5. [Características](#características)



## Descripción

Always Music v2 es una solución moderna para la gestión de estudiantes en una escuela de música. Permite realizar operaciones CRUD (Crear, Leer, Actualizar, Eliminar) sobre los registros de los estudiantes, con un enfoque en la seguridad y el manejo de errores.

## Instalación

Sigue estos pasos para instalar y ejecutar el proyecto localmente:

1. Clona el repositorio:
    ```bash
    git clone https://github.com/JuanaC24/always_music_v2.git
    cd always_music_v2
    ```

2. Instala las dependencias:
    ```bash
    npm install
    ```

3. Asegúrate de tener PostgreSQL instalado y configurado en tu sistema.

## Configuración

1. Crea un archivo `.env` en la raíz del proyecto con las siguientes variables de entorno:
    ```env
    DB_USER=nombre_de_usuario
    DB_PASSWORD=tu_contraseña
    DB_HOST=localhost
    DB_DATABASE=always_music
    DB_PORT=5432
    ```

2. Crea la base de datos y la tabla de estudiantes ejecutando los siguientes comandos en tu consola de PostgreSQL:
    ```sql
    CREATE DATABASE always_music;
    \c always_music

    CREATE TABLE estudiantes (
      id SERIAL PRIMARY KEY,
      nombre VARCHAR(100),
      rut VARCHAR(10) UNIQUE,
      curso VARCHAR(50),
      nivel VARCHAR(50)
    );
    ```

## Uso

Puedes utilizar la aplicación ejecutando los siguientes comandos en la terminal:

- **Agregar un nuevo estudiante:**
    ```bash
    node app.js add --nombre "Ana María" --rut "98765432-1" --curso "Violín" --nivel "Básico"
    ```

- **Consultar todos los estudiantes:**
    ```bash
    node app.js getAll
    ```

- **Consultar un estudiante por RUT:**
    ```bash
    node app.js get --rut "98765432-1"
    ```

- **Actualizar datos de un estudiante:**
    ```bash
    node app.js update --rut "98765432-1" --nombre "Ana María González" --curso "Violín" --nivel "Intermedio"
    ```

- **Eliminar un estudiante:**
    ```bash
    node app.js delete --rut "98765432-1"
    ```

## Características

- **Consultas Parametrizadas:** Todas las consultas a la base de datos utilizan parámetros para prevenir inyecciones SQL.
- **Manejo de Errores:** Los errores en las consultas se capturan y se imprimen en la consola para facilitar la depuración.
- **Operaciones CRUD Completas:** La aplicación permite agregar, obtener, actualizar y eliminar registros de estudiantes.
- **Seguridad Mejorada:** Uso de variables de entorno para almacenar credenciales de la base de datos.





