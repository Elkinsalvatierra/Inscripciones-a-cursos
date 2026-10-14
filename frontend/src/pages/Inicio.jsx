import { Link } from "react-router-dom";

// Página de bienvenida con accesos al formulario y a la lista
function Inicio() {
  return (
    <section className="inicio">
      <h1>Bienvenido al sistema de inscripciones</h1>
      <p>
        Registra tu inscripción a un curso indicando el participante, el curso, la fecha de inicio
        y la categoría. Luego consulta todas las inscripciones guardadas.
      </p>
      <div className="acciones">
        <Link to="/registro" className="boton">
          Nueva inscripción
        </Link>
        <Link to="/lista" className="boton boton-secundario">
          Ver inscripciones
        </Link>
      </div>
    </section>
  );
}

export default Inicio;
