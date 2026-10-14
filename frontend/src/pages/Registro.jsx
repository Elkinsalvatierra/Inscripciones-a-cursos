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
      <div className="titulo-pagina">
        <h1>Nueva inscripción</h1>
        <p>Completa tus datos y elige el curso. Todos los campos son obligatorios.</p>
      </div>

      <div className="registro-columnas">
        <div>
          {mensaje && (
            <Mensaje tipo={mensaje.tipo}>
              {mensaje.texto} {mensaje.tipo === "exito" && <Link to="/lista">Ver la lista</Link>}
            </Mensaje>
          )}

          <FormularioInscripcion onEnviar={registrar} enviando={enviando} />
        </div>

        <aside className="tarjeta-destacada registro-ayuda">
          <span className="sello">Antes de enviar</span>
          <h2>Ten en cuenta</h2>
          <ul>
            <li>Usa un email válido, por ejemplo ana@gmail.com.</li>
            <li>La fecha de inicio no puede ser anterior a hoy.</li>
            <li>La descripción debe tener al menos 10 caracteres.</li>
          </ul>
          <Link to="/lista" className="enlace-claro">
            Ver inscripciones →
          </Link>
        </aside>
      </div>
    </section>
  );
}

export default Registro;
