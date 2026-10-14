import { Link } from "react-router-dom";
import IconoCategoria from "./IconoCategoria.jsx";

// Tarjeta reutilizable de una categoría. Al hacer clic muestra sus cursos
function TarjetaCategoria({ categoria }) {
  return (
    <Link
      to={`/categoria/${encodeURIComponent(categoria.nombre)}`}
      className={`tarjeta tarjeta-compacta color-${categoria.color}`}
    >
      <div className="tarjeta-arco">
        <span className="arco" />
        <span className="avatar">
          <IconoCategoria categoria={categoria.nombre} tamano={22} />
        </span>
      </div>
      <div className="tarjeta-cuerpo">
        <h3>{categoria.nombre}</h3>
        <p className="tarjeta-descripcion">{categoria.descripcion}</p>
        <span className="tarjeta-conteo">{categoria.cursos.length} cursos</span>
      </div>
    </Link>
  );
}

export default TarjetaCategoria;
