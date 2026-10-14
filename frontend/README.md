# Frontend - Inscripciones a cursos

SPA hecha con React + Vite y React Router.

## Comandos

```bash
cd frontend
npm install
npm run dev
```

La aplicación abre en `http://localhost:5173`. El backend debe estar encendido en `http://localhost:3000`
(se puede cambiar copiando `.env.example` a `.env` y editando `VITE_API_URL`).

## Rutas

| Ruta        | Página                                   |
| ----------- | ---------------------------------------- |
| `/`         | Bienvenida y navegación                  |
| `/registro` | Formulario de inscripción (POST)         |
| `/lista`    | Lista de inscripciones desde la API (GET) |

## Estructura

```
src/
├── main.jsx              # Monta la app dentro de BrowserRouter
├── App.jsx               # Define las rutas
├── App.css               # Estilos (adaptables a móvil)
├── services/api.js       # fetch GET y POST a /registros
├── components/
│   ├── Menu.jsx                  # Barra de navegación
│   ├── FormularioInscripcion.jsx # Estado del formulario y validaciones
│   ├── TarjetaInscripcion.jsx    # Muestra una inscripción
│   └── Mensaje.jsx               # Mensajes de éxito, error, carga e info
└── pages/
    ├── Inicio.jsx
    ├── Registro.jsx
    ├── Lista.jsx
    └── NoEncontrado.jsx
```
