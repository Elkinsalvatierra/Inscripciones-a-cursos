import { Link } from "react-router-dom";

// Cartilla reutilizable de un curso: imagen, nombre, descripción breve y botón para inscribirse
function TarjetaCurso({ curso, categoria }) {
  // El formulario se abre con la categoría y el curso ya seleccionados
  const destino = `/registro?categoria=${encodeURIComponent(categoria.nombre)}&curso=${encodeURIComponent(curso.nombre)}`;

  return (
    <article className={`tarjeta tarjeta-curso color-${categoria.color}`}>
      <div className="curso-imagen">
        <img
          src={curso.imagen}
          alt={curso.nombre}
          loading="lazy"
          // Si la imagen no carga (sin internet) se oculta y queda el fondo de color
          onError={(evento) => (evento.currentTarget.style.display = "none")}
        />
      </div>
      <div className="tarjeta-cuerpo">
        <span className="tarjeta-categoria">{categoria.nombre}</span>
        <h3>{curso.nombre}</h3>
        <p className="tarjeta-descripcion">{curso.descripcion}</p>
        <Link to={destino} className="boton boton-ancho curso-boton">
          Inscribirme
        </Link>
      </div>
    </article>
  );
}

export default TarjetaCurso;
