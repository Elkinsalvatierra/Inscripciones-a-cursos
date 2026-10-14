import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import TarjetaInscripcion from "../components/TarjetaInscripcion.jsx";
import FiltroCategorias from "../components/FiltroCategorias.jsx";
import Mensaje from "../components/Mensaje.jsx";
import { obtenerInscripciones } from "../services/api.js";

// Página /lista: consulta las inscripciones con GET y las muestra en tarjetas
function Lista() {
  const [inscripciones, setInscripciones] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  // La categoría elegida se guarda en la URL, por ejemplo /lista?categoria=Idiomas
  const [parametros, setParametros] = useSearchParams();
  const categoria = parametros.get("categoria") || "";

  async function cargar() {
    setCargando(true);
    setError("");

    try {
      const datos = await obtenerInscripciones();
      setInscripciones(datos);
    } catch {
      setError("No se pudo conectar con el servidor. Verifica que el backend esté encendido.");
    } finally {
      setCargando(false);
    }
  }

  // Se ejecuta una vez al entrar a la página
  useEffect(() => {
    cargar();
  }, []);

  function cambiarCategoria(nueva) {
    setParametros(nueva ? { categoria: nueva } : {});
  }

  const visibles = categoria
    ? inscripciones.filter((inscripcion) => inscripcion.categoria === categoria)
    : inscripciones;

  return (
    <section>
      <div className="titulo-pagina titulo-con-acciones">
        <div>
          <h1>Inscripciones registradas</h1>
          <p>
            {cargando || error
              ? "Consulta las inscripciones guardadas en el servidor."
              : `${visibles.length} de ${inscripciones.length} inscripciones`}
          </p>
        </div>
        <div className="acciones">
          <button type="button" className="boton boton-borde" onClick={cargar} disabled={cargando}>
            Actualizar
          </button>
          <Link to="/registro" className="boton">
            Nueva inscripción
          </Link>
        </div>
      </div>

      <FiltroCategorias seleccionada={categoria} onCambiar={cambiarCategoria} />

      {cargando && <Mensaje tipo="carga">Cargando inscripciones...</Mensaje>}

      {!cargando && error && <Mensaje tipo="error">{error}</Mensaje>}

      {!cargando && !error && inscripciones.length === 0 && (
        <Mensaje tipo="info">
          Todavía no hay inscripciones. <Link to="/registro">Registra la primera</Link>.
        </Mensaje>
      )}

      {!cargando && !error && inscripciones.length > 0 && visibles.length === 0 && (
        <Mensaje tipo="info">No hay inscripciones en la categoría {categoria}.</Mensaje>
      )}

      {!cargando && !error && visibles.length > 0 && (
        <div className="grilla">
          {visibles.map((inscripcion) => (
            <TarjetaInscripcion key={inscripcion.id} inscripcion={inscripcion} />
          ))}
        </div>
      )}
    </section>
  );
}

export default Lista;
