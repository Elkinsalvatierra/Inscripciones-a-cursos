import { Link } from "react-router-dom";
import IconoCategoria from "../components/IconoCategoria.jsx";
import { CATEGORIAS } from "../data/categorias.js";

// Página de bienvenida: tarjeta destacada y accesos rápidos por categoría
function Inicio() {
  // Se muestran solo las tres primeras categorías como acceso rápido
  const destacadas = CATEGORIAS.slice(0, 3);

  return (
    <section>
      <div className="titulo-pagina">
        <h1>Explora cursos y registra tu inscripción</h1>
        <p>Elige una categoría, inscríbete en el curso que te interesa y consulta todas las inscripciones registradas.</p>
      </div>

      <div className="grilla">
        <article className="tarjeta-destacada">
          <span className="sello">Inscripciones abiertas</span>
          <h2>Aprende algo nuevo este ciclo</h2>
          <p>Completa el formulario en menos de un minuto.</p>
          <div className="acciones-columna">
            <Link to="/registro" className="boton boton-claro">
              Nueva inscripción
            </Link>
            <Link to="/lista" className="enlace-claro">
              Ver inscripciones →
            </Link>
          </div>
        </article>

        {destacadas.map((categoria) => (
          <Link
            key={categoria.nombre}
            to={`/lista?categoria=${encodeURIComponent(categoria.nombre)}`}
            className={`tarjeta tarjeta-enlace color-${categoria.color}`}
          >
            <div className="tarjeta-arco">
              <span className="arco" />
              <span className="avatar avatar-icono">
                <IconoCategoria categoria={categoria.nombre} tamano={28} />
              </span>
            </div>
            <div className="tarjeta-cuerpo">
              <h3>{categoria.nombre}</h3>
              <p className="tarjeta-descripcion">{categoria.descripcion}</p>
              <span className="enlace-azul">Ver inscripciones →</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default Inicio;
