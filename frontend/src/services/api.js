// Dirección de la API. Se puede cambiar con la variable VITE_API_URL en un archivo .env
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

// GET /registros: obtiene todas las inscripciones
export async function obtenerInscripciones() {
  const respuesta = await fetch(`${API_URL}/registros`);

  if (!respuesta.ok) {
    throw new Error("No se pudieron cargar las inscripciones.");
  }

  return respuesta.json();
}

// POST /registros: envía una nueva inscripción al servidor
export async function crearInscripcion(inscripcion) {
  const respuesta = await fetch(`${API_URL}/registros`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(inscripcion),
  });

  const datos = await respuesta.json().catch(() => ({}));

  if (!respuesta.ok) {
    // El backend devuelve { error: "..." } cuando los datos son inválidos (400)
    throw new Error(datos.error || "No se pudo registrar la inscripción.");
  }

  return datos.registro;
}
