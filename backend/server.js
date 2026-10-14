
const express = require("express");
const cors = require("cors");
const fs = require("node:fs/promises");
const path = require("node:path");

const app = express();
const PORT = process.env.PORT || 3000;

const ARCHIVO_DATOS = path.join(__dirname, "data", "registros.json");
const FRONTEND = path.join(__dirname, "../frontend/dist");

app.use(cors());
app.use(express.json());
app.use(express.static(FRONTEND));

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

async function leerRegistros() {
  try {
    const contenido = await fs.readFile(ARCHIVO_DATOS, "utf8");
    const registros = JSON.parse(contenido);

    if (!Array.isArray(registros)) {
      throw new Error("El archivo JSON debe contener una lista.");
    }

    return registros;
  } catch (error) {
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

async function guardarRegistros(registros) {
  await fs.writeFile(
    ARCHIVO_DATOS,
    JSON.stringify(registros, null, 2),
    "utf8"
  );
}

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

let colaRegistros = Promise.resolve();

app.post("/registros", (req, res) => {
  const procesarRegistro = async () => {
    try {
      const { nombre, email, descripcion, fecha, categoria, curso } =
        req.body || {};

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
        !fecha
      ) {
        return res.status(400).json({
          error: "Todos los campos son obligatorios.",
        });
      }

      const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        email.trim()
      );

      if (!emailValido) {
        return res.status(400).json({
          error: "El correo electrónico no tiene un formato válido.",
        });
      }

      if (!validarFecha(fecha)) {
        return res.status(400).json({
          error: "La fecha debe ser válida y tener el formato AAAA-MM-DD.",
        });
      }

      const registros = await leerRegistros();

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

      const nuevoRegistro = {
        id: siguienteId,
        nombre: nombre.trim(),
        email: email.trim(),
        descripcion: descripcion.trim(),
        fecha,
        categoria: categoria.trim(),
        curso: curso.trim(),
      };

      registros.push(nuevoRegistro);

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

app.use((error, req, res, next) => {
  console.error("Error del servidor:", error);

  if (req.path.startsWith("/registros")) {
    return res.status(500).json({
      error: "Error interno del servidor.",
    });
  }

  res.status(500).send("No se pudo cargar la aplicación.");
});

app.listen(PORT, () => {
  console.log(`Servidor iniciado en http://localhost:${PORT}`);
});
