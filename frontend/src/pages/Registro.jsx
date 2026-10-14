import { useState } from "react";
import { Link } from "react-router-dom";
import FormularioInscripcion from "../components/FormularioInscripcion.jsx";
import Mensaje from "../components/Mensaje.jsx";
import { crearInscripcion } from "../services/api.js";

// Página /registro: muestra el formulario y envía los datos a la API
function Registro() {
  const [enviando, setEnviando] = useState(false);
  const [mensaje, setMensaje] = useState(null);

  async function registrar(inscripcion) {
    setEnviando(true);
    setMensaje(null);

    try {
      const registro = await crearInscripcion(inscripcion);
      setMensaje({ tipo: "exito", texto: `Inscripción #${registro.id} registrada correctamente.` });
      return true;
    } catch (error) {
      setMensaje({ tipo: "error", texto: error.message });
      return false;
    } finally {
      setEnviando(false);
    }
  }

  return (
    <section>
      <h1>Nueva inscripción</h1>

      {mensaje && (
        <Mensaje tipo={mensaje.tipo}>
          {mensaje.texto} {mensaje.tipo === "exito" && <Link to="/lista">Ver la lista</Link>}
        </Mensaje>
      )}

      <FormularioInscripcion onEnviar={registrar} enviando={enviando} />

      <p className="volver">
        <Link to="/lista">Ir a la lista de inscripciones</Link>
      </p>
    </section>
  );
}

export default Registro;
