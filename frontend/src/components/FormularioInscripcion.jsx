import { useState } from "react";
import { Link } from "react-router-dom";

const VALORES_INICIALES = {
  nombre: "",
  cedula: "",
  email: "",
  telefono: "",
  fecha: "",
};

// Campos que solo aceptan números
const SOLO_NUMEROS = ["cedula", "telefono"];

// Fecha de hoy en formato AAAA-MM-DD (hora local)
function hoy() {
  const fecha = new Date();
  fecha.setMinutes(fecha.getMinutes() - fecha.getTimezoneOffset());
  return fecha.toISOString().slice(0, 10);
}

// Valida una cédula ecuatoriana: 10 dígitos, provincia 01-24 y dígito verificador (módulo 10)
function cedulaValida(cedula) {
  if (!/^\d{10}$/.test(cedula)) return false;

  const provincia = Number(cedula.slice(0, 2));
  if (provincia < 1 || provincia > 24) return false;
  if (Number(cedula[2]) > 5) return false;

  let suma = 0;
  for (let i = 0; i < 9; i++) {
    // Las posiciones pares se multiplican por 2 y las impares por 1
    let valor = Number(cedula[i]) * (i % 2 === 0 ? 2 : 1);
    if (valor > 9) valor -= 9;
    suma += valor;
  }

  const verificador = (10 - (suma % 10)) % 10;
  return verificador === Number(cedula[9]);
}

// Revisa cada campo y devuelve un objeto con los mensajes de error
function validar(valores) {
  const errores = {};

  if (!valores.nombre.trim()) errores.nombre = "El nombre es obligatorio.";

  if (!valores.cedula) {
    errores.cedula = "La cédula es obligatoria.";
  } else if (!cedulaValida(valores.cedula)) {
    errores.cedula = "Escribe una cédula ecuatoriana válida de 10 dígitos.";
  }

  if (!valores.email.trim()) {
    errores.email = "El email es obligatorio.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valores.email.trim())) {
    errores.email = "Escribe un email válido, por ejemplo ana@gmail.com.";
  }

  if (!valores.telefono) {
    errores.telefono = "El teléfono es obligatorio.";
  } else if (!/^0\d{9}$/.test(valores.telefono)) {
    errores.telefono = "Debe tener 10 dígitos y empezar con 0, por ejemplo 0991234567.";
  }

  if (!valores.fecha) {
    errores.fecha = "La fecha es obligatoria.";
  } else if (valores.fecha < hoy()) {
    // Regla del tema: no se puede inscribir a un curso con fecha pasada
    errores.fecha = "La fecha de inicio no puede ser anterior a hoy.";
  }

  return errores;
}

// Formulario reutilizable. Recibe la categoría y el curso ya elegidos (no se pueden cambiar aquí)
// y la función onEnviar que hace el POST
function FormularioInscripcion({ categoria, curso, onEnviar, enviando }) {
  const [valores, setValores] = useState(VALORES_INICIALES);
  const [errores, setErrores] = useState({});

  // Actualiza el estado cuando el usuario escribe en cualquier campo
  function manejarCambio(evento) {
    const { name } = evento.target;
    let { value } = evento.target;

    // En cédula y teléfono se eliminan las letras y espacios
    if (SOLO_NUMEROS.includes(name)) value = value.replace(/\D/g, "");

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
      cedula: valores.cedula,
      email: valores.email.trim(),
      telefono: valores.telefono,
      curso: curso.nombre,
      categoria: categoria.nombre,
      fecha: valores.fecha,
      // La descripción no la escribe el usuario: se usa la del curso elegido
      descripcion: curso.descripcion,
    });

    if (exito) setValores(VALORES_INICIALES);
  }

  return (
    <form className="formulario" onSubmit={manejarEnvio} noValidate>
      {/* Curso elegido: solo se muestra, no se puede editar */}
      <div className={`curso-resumen color-${categoria.color}`}>
        <img src={curso.imagen} alt="" onError={(evento) => (evento.currentTarget.style.display = "none")} />
        <div>
          <span className="tarjeta-categoria">{categoria.nombre}</span>
          <strong>{curso.nombre}</strong>
          <small>{curso.descripcion}</small>
        </div>
        <Link to={`/categoria/${encodeURIComponent(categoria.nombre)}`} className="curso-cambiar">
          Cambiar curso
        </Link>
      </div>

      <Campo etiqueta="Nombre del participante" error={errores.nombre}>
        <input name="nombre" value={valores.nombre} onChange={manejarCambio} placeholder="Ana Martínez" />
      </Campo>

      <Campo etiqueta="Cédula" error={errores.cedula}>
        <input
          name="cedula"
          inputMode="numeric"
          maxLength={10}
          value={valores.cedula}
          onChange={manejarCambio}
          placeholder="0912345675"
        />
      </Campo>

      <Campo etiqueta="Email" error={errores.email}>
        <input name="email" type="email" value={valores.email} onChange={manejarCambio} placeholder="ana@gmail.com" />
      </Campo>

      <Campo etiqueta="Teléfono" error={errores.telefono}>
        <input
          name="telefono"
          type="tel"
          inputMode="numeric"
          maxLength={10}
          value={valores.telefono}
          onChange={manejarCambio}
          placeholder="0991234567"
        />
      </Campo>

      <Campo etiqueta="Fecha de inicio" error={errores.fecha}>
        <input name="fecha" type="date" min={hoy()} value={valores.fecha} onChange={manejarCambio} />
      </Campo>

      <button type="submit" className="boton boton-ancho" disabled={enviando}>
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
