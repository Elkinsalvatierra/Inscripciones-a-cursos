# Inscripciones-a-cursos
primero verificamos que tenemos node.js instalado si no esta instlado 
lo instalamos desde este enlace `https://nodejs.org/es/download`
yuna vbez instalada abrimos una terminal y ejecutamos `node -v` si esta isntalado si sale `v24.21.0` significa q node.js esta instalado, tambien verificamos que npm este disponible con el siguiente comando `npm -v` si sale 11.19.0 esta todo bien 

# Crear carpeta del backend
para crear la carpeta del backend vamos a usar los sgt comandos
`mkdir backend`: crea la carpeta del servidor

`cd backend`: este comando lo ejecutamos en otra terminal para entrar en la carpeta

`npm init -y`: este coamdno genera el archivo package.json dentro de la carpeta backend, donde se configura el proyecto y sus dependencias

# Instalar las dependencias del backend
dentro de la carpeta ejecutamos los siguiente comando 
`npm install express cors`: este comando sirve para crear las api y para permitir la comunicacion entre el fronted y el backend

`npm install --save-dev nodemon`: este comando reinicia automáticamente el servidor cuando detecta cambios en los archivos

# Estructura del backend
Inscripciones-a-cursos/
└── backend/
    ├── data/
    │   └── registros.json
    ├── server.js
    ├── package.json
    └── package-lock.json

# Configuracion en el package.json
en el package.json en la parte del scripts le cambiamos por 
`  "scripts": {`
  `"start": "node server.js",`
  `"dev": "nodemon server.js",`
  `"test": "node --test"`
`},`
Por qué hicimos cada cambio?
- start: para iniciar nuestro servidor con npm start.
- dev: para trabajar y que el servidor se reinicie automáticamente cuando modifiquemos server.js.
- test: para poder ejecutar pruebas automatizadas con el sistema de pruebas integrado de Node.js.

# Iniciar el servidor
para iniciar el servidor abrimos una nueva terminal y ponemos el comando `npm run dev` por que este comando?, porque a medida que vamos actualizando el `server.js` nodemon detecta los cambios y reinica automaticamente el servidor

# Comprobar funcionamiento de la API 
con el servidor encendido abrimos el navegador e ingresamos a `localhost:3000/registros` esta direccion corresponde a la ruta `GET/registros` su funcion es consultar las inscripciones que tenemos almacenadas en el archivo `registros.json` si todavia no existen registros el servidor solo se mostrara asi `[]`esto indica que la API responde correctamente y que la lista de inscripciones se encuentra vacía.

# Registrar inscripciones mediante POST
para registrar una nueva inscripcion utilizamos la ruta `POST/registro`, esta ruta recibe los datos del estudiante en formato JSON, verifica que sean validos y los guarda en el archivo `backend/data/registros.json` 
 ## Ejemplo de una inscripción
`{`
  `"nombre": "Ana Martinez",`
  `"email": "ana@gmail.com",`
  `"descripcion": "Inscripcion al curso de bases de datos",`
  `"fecha": "2026-10-14",`
  `"categoria": "Tecnologia",`
  `"curso": "SQL Server"`
`}`

Para probar esta ruta desde PowerShell, con el servidor encendido, ejecutamos:
`$datos = @{`
   `nombre = "Ana Martinez"`
   `email = "ana@gmail.com"`
   `descripcion = "Inscripcion al curso de bases de datos"`
   `fecha = "2026-10-14"`
   `categoria = "Tecnologia"`
   `curso = "SQL Server"`
`} | ConvertTo-Json`

`Invoke-RestMethod -Uri "http://localhost:3000/registros" -Method POST -ContentType "application/json" -Body $datos`

si los datos son correctos, el servidor responde con el codigo HTTP 201 y devuelve la inscripcion creada.

cada inscripcion recibre un identificador numerico unico, el servidor consulta los registros existentes, busca el ID numérico más alto y le suma uno.

# Validacion del backend
El servidor realiza las siguientes validaciones antes de guardar una inscripción:

-Comprueba que todos los campos obligatorios estén completos.

-Verifica que el correo electrónico tenga un formato válido.

-Comprueba que la fecha tenga el formato AAAA-MM-DD y exista en el calendario.

Si los datos son incorrectos, devuelve el código HTTP 400 con un mensaje de error.

# Registros
Las inscripciones se almacenan en el archivo `backend/data/registros.json.`, se comprobó que los datos permanecen guardados después de detener y volver a iniciar el servidor, esto permite conservar las inscripciones sin utilizar una base de datos externa.