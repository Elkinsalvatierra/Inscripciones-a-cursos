import IconoCategoria from "./IconoCategoria.jsx";
import { buscarCategoria } from "../data/categorias.js";

// Iniciales del participante, por ejemplo "Ana Martínez" -> "AM"
function iniciales(nombre) {
  return nombre
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((palabra) => palabra[0].toUpperCase())
    .join("");
}

// Convierte "2026-11-02" en "2 nov 2026"
function formatearFecha(fecha) {
  return new Date(`${fecha}T00:00:00`).toLocaleDateString("es", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

// Tarjeta reutilizable que muestra los datos de una inscripción
function TarjetaInscripcion({ inscripcion }) {
  const { id, nombre, email, descripcion, fecha, categoria, curso } = inscripcion;
  const { color } = buscarCategoria(categoria);

  return (
    <article className={`tarjeta color-${color}`}>
      <div className="tarjeta-arco">
        <span className="arco" />
        <span className="insignia" title={categoria}>
          <IconoCategoria categoria={categoria} />
        </span>
        <span className="avatar">{iniciales(nombre)}</span>
      </div>

      <div className="tarjeta-cuerpo">
        <span className="tarjeta-categoria">{categoria}</span>
        <h3>{curso}</h3>
        <p className="tarjeta-descripcion">{descripcion}</p>
        <p className="tarjeta-participante">
          <strong>Participante:</strong> {nombre}
        </p>
      </div>

      <dl className="tarjeta-pie">
        <div>
          <dt>Email</dt>
          <dd>{email}</dd>
        </div>
        <div>
          <dt>Inicio</dt>
          <dd>{formatearFecha(fecha)}</dd>
        </div>
        <div>
          <dt>ID</dt>
          <dd>#{id}</dd>
        </div>
      </dl>
    </article>
  );
}

export default TarjetaInscripcion;
