import { Link } from "react-router-dom";

// Se muestra cuando la ruta no existe
function NoEncontrado() {
  return (
    <section className="inicio">
      <h1>Página no encontrada</h1>
      <Link to="/" className="boton">
        Volver al inicio
      </Link>
    </section>
  );
}

export default NoEncontrado;
