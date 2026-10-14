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