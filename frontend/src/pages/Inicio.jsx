import { Link } from "react-router-dom";
import TarjetaCategoria from "../components/TarjetaCategoria.jsx";
import { CATEGORIAS } from "../data/categorias.js";

// Página de bienvenida: tarjeta destacada y accesos rápidos por categoría
function Inicio() {
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

        {CATEGORIAS.map((categoria) => (
          <TarjetaCategoria key={categoria.nombre} categoria={categoria} />
        ))}
      </div>
    </section>
  );
}

export default Inicio;
