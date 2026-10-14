import { Link } from "react-router-dom";

// Se muestra cuando la ruta no existe
function NoEncontrado() {
  return (
    <section className="titulo-pagina centrado">
      <h1>Página no encontrada</h1>
      <p>La dirección que buscas no existe.</p>
      <Link to="/" className="boton">
        Volver al inicio
      </Link>
    </section>
  );
}

export default NoEncontrado;
