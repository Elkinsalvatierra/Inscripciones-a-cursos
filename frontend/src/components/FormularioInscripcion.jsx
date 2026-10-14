import { useState } from "react";

const CATEGORIAS = ["Tecnología", "Idiomas", "Arte y diseño", "Negocios", "Salud", "Otros"];

const VALORES_INICIALES = {
  nombre: "",
  email: "",
  curso: "",
  categoria: "",
  fecha: "",
  descripcion: "",
};

// Fecha de hoy en formato AAAA-MM-DD (hora local)
function hoy() {
  const fecha = new Date();
  fecha.setMinutes(fecha.getMinutes() - fecha.getTimezoneOffset());
  return fecha.toISOString().slice(0, 10);
}

// Revisa cada campo y devuelve un objeto con los mensajes de error
function validar(valores) {
  const errores = {};

  if (!valores.nombre.trim()) errores.nombre = "El nombre es obligatorio.";

  if (!valores.email.trim()) {
    errores.email = "El email es obligatorio.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valores.email.trim())) {
    errores.email = "Escribe un email válido, por ejemplo ana@gmail.com.";
  }

  if (!valores.curso.trim()) errores.curso = "El curso es obligatorio.";
  if (!valores.categoria) errores.categoria = "Selecciona una categoría.";

  if (!valores.fecha) {
    errores.fecha = "La fecha es obligatoria.";
  } else if (valores.fecha < hoy()) {
    // Regla del tema: no se puede inscribir a un curso con fecha pasada
    errores.fecha = "La fecha de inicio no puede ser anterior a hoy.";
  }

  if (!valores.descripcion.trim()) {
    errores.descripcion = "La descripción es obligatoria.";
  } else if (valores.descripcion.trim().length < 10) {
    errores.descripcion = "La descripción debe tener al menos 10 caracteres.";
  }

  return errores;
}

// Formulario reutilizable. Recibe la función onEnviar que hace el POST
function FormularioInscripcion({ onEnviar, enviando }) {
  const [valores, setValores] = useState(VALORES_INICIALES);
  const [errores, setErrores] = useState({});

  // Actualiza el estado cuando el usuario escribe en cualquier campo
  function manejarCambio(evento) {
    const { name, value } = evento.target;
    setValores({ ...valores, [name]: value });
    setErrores({ ...errores, [name]: undefined });
  }

  async function manejarEnvio(evento) {
    evento.preventDefault();

    const nuevosErrores = validar(valores);
    setErrores(nuevosErrores);

    // Si hay errores no se envía nada al servidor
    if (Object.keys(nuevosErrores).length > 0) return;

    const exito = await onEnviar({
      nombre: valores.nombre.trim(),
      email: valores.email.trim(),
      curso: valores.curso.trim(),
      categoria: valores.categoria,
      fecha: valores.fecha,
      descripcion: valores.descripcion.trim(),
    });

    if (exito) setValores(VALORES_INICIALES);
  }

  return (
    <form className="formulario" onSubmit={manejarEnvio} noValidate>
      <Campo etiqueta="Nombre del participante" error={errores.nombre}>
        <input name="nombre" value={valores.nombre} onChange={manejarCambio} placeholder="Ana Martínez" />
      </Campo>

      <Campo etiqueta="Email" error={errores.email}>
        <input name="email" type="email" value={valores.email} onChange={manejarCambio} placeholder="ana@gmail.com" />
      </Campo>

      <Campo etiqueta="Curso" error={errores.curso}>
        <input name="curso" value={valores.curso} onChange={manejarCambio} placeholder="SQL Server" />
      </Campo>

      <Campo etiqueta="Categoría" error={errores.categoria}>
        <select name="categoria" value={valores.categoria} onChange={manejarCambio}>
          <option value="">-- Selecciona --</option>
          {CATEGORIAS.map((categoria) => (
            <option key={categoria} value={categoria}>
              {categoria}
            </option>
          ))}
        </select>
      </Campo>

      <Campo etiqueta="Fecha de inicio" error={errores.fecha}>
        <input name="fecha" type="date" min={hoy()} value={valores.fecha} onChange={manejarCambio} />
      </Campo>

      <Campo etiqueta="Descripción" error={errores.descripcion}>
        <textarea
          name="descripcion"
          rows="4"
          value={valores.descripcion}
          onChange={manejarCambio}
          placeholder="Motivo de la inscripción o comentarios"
        />
      </Campo>

      <button type="submit" className="boton" disabled={enviando}>
        {enviando ? "Enviando..." : "Registrar inscripción"}
      </button>
    </form>
  );
}

// Envoltorio de cada campo: etiqueta + control + mensaje de error
function Campo({ etiqueta, error, children }) {
  return (
    <label className={error ? "campo campo-error" : "campo"}>
      <span>{etiqueta}</span>
      {children}
      {error && <small className="texto-error">{error}</small>}
    </label>
  );
}

export default FormularioInscripcion;
