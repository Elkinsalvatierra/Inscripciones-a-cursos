import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import TarjetaInscripcion from "../components/TarjetaInscripcion.jsx";
import Mensaje from "../components/Mensaje.jsx";
import { obtenerInscripciones } from "../services/api.js";

// Página /lista: consulta las inscripciones con GET y las muestra en tarjetas
function Lista() {
  const [inscripciones, setInscripciones] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

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

  return (
    <section>
      <div className="lista-encabezado">
        <h1>Inscripciones registradas</h1>
        <div className="acciones">
          <button type="button" className="boton boton-secundario" onClick={cargar} disabled={cargando}>
            Actualizar
          </button>
          <Link to="/registro" className="boton">
            Nueva inscripción
          </Link>
        </div>
      </div>

      {cargando && <Mensaje tipo="carga">Cargando inscripciones...</Mensaje>}

      {!cargando && error && <Mensaje tipo="error">{error}</Mensaje>}

      {!cargando && !error && inscripciones.length === 0 && (
        <Mensaje tipo="info">
          Todavía no hay inscripciones. <Link to="/registro">Registra la primera</Link>.
        </Mensaje>
      )}

      {!cargando && !error && inscripciones.length > 0 && (
        <div className="grilla">
          {inscripciones.map((inscripcion) => (
            <TarjetaInscripcion key={inscripcion.id} inscripcion={inscripcion} />
          ))}
        </div>
      )}
    </section>
  );
}

export default Lista;
