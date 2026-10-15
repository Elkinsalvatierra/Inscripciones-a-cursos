const express = require("express");
const cors = require("cors");
const fs = require("node:fs/promises");
const path = require("node:path");

const app = express();
const PORT = process.env.PORT || 3000;

const ARCHIVO_DATOS = path.join(__dirname, "data", "registros.json");
// Carpeta con el frontend compilado (npm run build dentro de frontend)
const FRONTEND = path.join(__dirname, "../frontend/dist");

app.use(cors());
app.use(express.json());
app.use(express.static(FRONTEND));

// ---------- Validaciones ----------

// Validar que una fecha exista y tenga formato AAAA-MM-DD
function validarFecha(fecha) {
  if (typeof fecha !== "string") {
    return false;
  }

  if (!/^\d{4}-\d{2}-\d{2}$/.test(fecha)) {
    return false;
  }

  const [anio, mes, dia] = fecha.split("-").map(Number);

  const fechaComprobada = new Date(0);
  fechaComprobada.setUTCHours(0, 0, 0, 0);
  fechaComprobada.setUTCFullYear(anio, mes - 1, dia);

  return (
    fechaComprobada.getUTCFullYear() === anio &&
    fechaComprobada.getUTCMonth() === mes - 1 &&
    fechaComprobada.getUTCDate() === dia
  );
}

// Fecha de hoy en formato AAAA-MM-DD (hora local del servidor)
function fechaHoy() {
  const hoy = new Date();
  hoy.setMinutes(hoy.getMinutes() - hoy.getTimezoneOffset());
  return hoy.toISOString().slice(0, 10);
}

// Validar una cédula ecuatoriana: 10 dígitos, provincia 01-24 y dígito verificador (módulo 10)
function validarCedula(cedula) {
  if (typeof cedula !== "string" || !/^\d{10}$/.test(cedula)) {
    return false;
  }

  const provincia = Number(cedula.slice(0, 2));

  if (provincia < 1 || provincia > 24 || Number(cedula[2]) > 5) {
    return false;
  }

  let suma = 0;

  for (let i = 0; i < 9; i++) {
    let valor = Number(cedula[i]) * (i % 2 === 0 ? 2 : 1);

    if (valor > 9) {
      valor -= 9;
    }

    suma += valor;
  }

  return (10 - (suma % 10)) % 10 === Number(cedula[9]);
}

// Validar un teléfono de 10 dígitos que empiece con 0
function validarTelefono(telefono) {
  return typeof telefono === "string" && /^0\d{9}$/.test(telefono);
}

// ---------- Lectura y escritura del archivo JSON ----------

// Leer los registros almacenados
async function leerRegistros() {
  try {
    const contenido = await fs.readFile(ARCHIVO_DATOS, "utf8");
    const registros = JSON.parse(contenido);

    if (!Array.isArray(registros)) {
      throw new Error("El archivo JSON debe contener una lista.");
    }

    return registros;
  } catch (error) {
    // Si el archivo no existe, se crea con una lista vacía
    if (error.code === "ENOENT") {
      await fs.mkdir(path.dirname(ARCHIVO_DATOS), {
        recursive: true,
      });

      await fs.writeFile(ARCHIVO_DATOS, "[]", "utf8");
      return [];
    }

    throw error;
  }
}

// Guardar los registros en el archivo JSON
async function guardarRegistros(registros) {
  await fs.writeFile(
    ARCHIVO_DATOS,
    JSON.stringify(registros, null, 2),
    "utf8"
  );
}

// ---------- Rutas de la API ----------

// GET: consultar todas las inscripciones
app.get("/registros", async (req, res) => {
  try {
    const registros = await leerRegistros();

    res.status(200).json(registros);
  } catch (error) {
    console.error("Error al leer registros:", error);

    res.status(500).json({
      error: "No se pudieron consultar las inscripciones.",
    });
  }
});

// POST: registrar una nueva inscripción
// Se procesan los POST uno por uno para evitar IDs repetidos
let colaRegistros = Promise.resolve();

app.post("/registros", (req, res) => {
  const procesarRegistro = async () => {
    try {
      const {
        nombre,
        email,
        descripcion,
        fecha,
        categoria,
        curso,
        cedula,
        telefono,
      } = req.body || {};

      // Validar campos obligatorios
      if (
        typeof nombre !== "string" ||
        !nombre.trim() ||
        typeof email !== "string" ||
        !email.trim() ||
        typeof descripcion !== "string" ||
        !descripcion.trim() ||
        typeof categoria !== "string" ||
        !categoria.trim() ||
        typeof curso !== "string" ||
        !curso.trim() ||
        !fecha ||
        !cedula ||
        !telefono
      ) {
        return res.status(400).json({
          error: "Todos los campos son obligatorios.",
        });
      }

      // Validar correo electrónico
      const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        email.trim()
      );

      if (!emailValido) {
        return res.status(400).json({
          error: "El correo electrónico no tiene un formato válido.",
        });
      }

      // Validar fecha
      if (!validarFecha(fecha)) {
        return res.status(400).json({
          error: "La fecha debe ser válida y tener el formato AAAA-MM-DD.",
        });
      }

      // No se puede inscribir a un curso con fecha de inicio pasada
      if (fecha < fechaHoy()) {
        return res.status(400).json({
          error: "La fecha de inicio no puede ser anterior a hoy.",
        });
      }

      // Validar cédula
      if (!validarCedula(cedula)) {
        return res.status(400).json({
          error: "La cédula debe ser una cédula ecuatoriana válida de 10 dígitos.",
        });
      }

      // Validar teléfono
      if (!validarTelefono(telefono)) {
        return res.status(400).json({
          error: "El teléfono debe tener 10 dígitos y empezar con 0.",
        });
      }

      const registros = await leerRegistros();

      // Obtener el siguiente ID numérico: el mayor ID existente + 1
      const siguienteId =
        registros.reduce((maximo, registro) => {
          const id = registro.id;

          return typeof id === "number" &&
            Number.isSafeInteger(id) &&
            id > maximo
            ? id
            : maximo;
        }, 0) + 1;

      if (!Number.isSafeInteger(siguienteId)) {
        throw new Error("No se puede generar otro ID numérico.");
      }

      // Crear la inscripción
      const nuevoRegistro = {
        id: siguienteId,
        nombre: nombre.trim(),
        email: email.trim(),
        descripcion: descripcion.trim(),
        fecha,
        categoria: categoria.trim(),
        curso: curso.trim(),
        cedula,
        telefono,
      };

      registros.push(nuevoRegistro);

      // Guardar en registros.json sin perder los anteriores
      await guardarRegistros(registros);

      res.status(201).json({
        mensaje: "Inscripción registrada correctamente.",
        registro: nuevoRegistro,
      });
    } catch (error) {
      console.error("Error al guardar registro:", error);

      res.status(500).json({
        error: "No se pudo guardar la inscripción.",
      });
    }
  };

  colaRegistros = colaRegistros.then(procesarRegistro, procesarRegistro);
});

// ---------- Frontend ----------

// Cualquier otra ruta (/, /lista, /registro...) devuelve la app de React
app.get("/{*ruta}", (req, res, next) => {
  if (req.path.startsWith("/registros")) {
    return next();
  }

  res.sendFile(path.join(FRONTEND, "index.html"), (error) => {
    if (error) {
      next(error);
    }
  });
});

// ---------- Manejo de errores ----------

app.use((error, req, res, next) => {
  // Si el cuerpo de la petición no es un JSON válido, responder 400 en JSON
  if (error.type === "entity.parse.failed") {
    return res.status(400).json({
      error: "El cuerpo de la petición no es un JSON válido.",
    });
  }

  console.error("Error del servidor:", error);

  if (req.path.startsWith("/registros")) {
    return res.status(500).json({
      error: "Error interno del servidor.",
    });
  }

  res.status(500).send("No se pudo cargar la aplicación.");
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor iniciado en http://localhost:${PORT}`);
});
