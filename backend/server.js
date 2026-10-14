
const express = require("express");
const cors = require("cors");
const fs = require("node:fs/promises");
const path = require("node:path");

const app = express();
const PORT = process.env.PORT || 3000;
const ARCHIVO_DATOS = path.join(__dirname, "data", "registros.json");

app.use(cors());
app.use(express.json());

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

app.get("/", (req, res) => {
  res.json({
    mensaje: "API de Inscripciones a cursos funcionando",
  });
});

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

app.post("/registros", async (req, res) => {
  try {
    const { nombre, email, descripcion, fecha, categoria, curso } =
      req.body;

    if (
      !nombre?.trim() ||
      !email?.trim() ||
      !descripcion?.trim() ||
      !fecha ||
      !categoria?.trim() ||
      !curso?.trim()
    ) {
      return res.status(400).json({
        error: "Todos los campos son obligatorios.",
      });
    }

    const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

    if (!emailValido) {
      return res.status(400).json({
        error: "El correo electrónico no tiene un formato válido.",
      });
    }

    if (Number.isNaN(Date.parse(fecha))) {
      return res.status(400).json({
        error: "La fecha no es válida.",
      });
    }

    const registros = await leerRegistros();

    const nuevoRegistro = {
      id: Date.now().toString(),
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
});

app.listen(PORT, () => {
  console.log(`Servidor iniciado en http://localhost:${PORT}`);
});
