import { Link, useParams } from "react-router-dom";
import TarjetaCurso from "../components/TarjetaCurso.jsx";
import Mensaje from "../components/Mensaje.jsx";
import { CATEGORIAS } from "../data/categorias.js";

// Página /categoria/:nombre: muestra los cursos de una categoría
function Categoria() {
  // useParams lee la parte variable de la ruta, por ejemplo "Negocios"
  const { nombre } = useParams();
  const categoria = CATEGORIAS.find((item) => item.nombre === nombre);

  if (!categoria) {
    return (
      <section>
        <Mensaje tipo="error">La categoría "{nombre}" no existe.</Mensaje>
        <Link to="/">← Volver al inicio</Link>
      </section>
    );
  }

  return (
    <section>
      <Link to="/" className="volver-enlace">
        ← Todas las categorías
      </Link>

      <div className="titulo-pagina">
        <h1>Cursos de {categoria.nombre}</h1>
        <p>{categoria.descripcion} Elige un curso y completa tu inscripción.</p>
      </div>

      <div className="grilla">
        {categoria.cursos.map((curso) => (
          <TarjetaCurso key={curso.nombre} curso={curso} categoria={categoria} />
        ))}
      </div>
    </section>
  );
}

export default Categoria;
