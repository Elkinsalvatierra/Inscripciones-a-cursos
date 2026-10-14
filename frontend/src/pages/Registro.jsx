import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import FormularioInscripcion from "../components/FormularioInscripcion.jsx";
import TarjetaCategoria from "../components/TarjetaCategoria.jsx";
import Mensaje from "../components/Mensaje.jsx";
import { CATEGORIAS } from "../data/categorias.js";
import { crearInscripcion } from "../services/api.js";

// Página /registro: muestra el formulario del curso elegido y envía los datos a la API
function Registro() {
  const [enviando, setEnviando] = useState(false);
  const [mensaje, setMensaje] = useState(null);

  // La cartilla del curso abre esta página con la URL /registro?categoria=Idiomas&curso=Francés
  const [parametros] = useSearchParams();
  const categoria = CATEGORIAS.find((item) => item.nombre === parametros.get("categoria"));
  const curso = categoria?.cursos.find((item) => item.nombre === parametros.get("curso"));

  async function registrar(inscripcion) {
    setEnviando(true);
    setMensaje(null);

    try {
      await crearInscripcion(inscripcion);
      setMensaje({ tipo: "exito", texto: "Inscripción registrada correctamente." });
      return true;
    } catch (error) {
      setMensaje({ tipo: "error", texto: error.message });
      return false;
    } finally {
      setEnviando(false);
    }
  }

  // Sin un curso válido en la URL, primero se pide elegir una categoría
  if (!categoria || !curso) {
    return (
      <section>
        <div className="titulo-pagina">
          <h1>Elige un curso</h1>
          <p>Selecciona una categoría y luego el curso en el que quieres inscribirte.</p>
        </div>
        <div className="grilla">
          {CATEGORIAS.map((item) => (
            <TarjetaCategoria key={item.nombre} categoria={item} />
          ))}
        </div>
      </section>
    );
  }

  return (
    <section>
      <Link to={`/categoria/${encodeURIComponent(categoria.nombre)}`} className="volver-enlace">
        ← Cursos de {categoria.nombre}
      </Link>

      <div className="titulo-pagina">
        <h1>Nueva inscripción</h1>
        <p>Completa tus datos para inscribirte. Todos los campos son obligatorios.</p>
      </div>

      <div className="registro-columnas">
        <div>
          {mensaje && (
            <Mensaje tipo={mensaje.tipo}>
              {mensaje.texto} {mensaje.tipo === "exito" && <Link to="/lista">Ver la lista</Link>}
            </Mensaje>
          )}

          {/* key reinicia el formulario si se cambia de curso */}
          <FormularioInscripcion
            key={`${categoria.nombre}-${curso.nombre}`}
            categoria={categoria}
            curso={curso}
            onEnviar={registrar}
            enviando={enviando}
          />
        </div>

        <aside className="tarjeta-destacada registro-ayuda">
          <span className="sello">Antes de enviar</span>
          <h2>Ten en cuenta</h2>
          <ul>
            <li>Usa un email válido, por ejemplo ana@gmail.com.</li>
            <li>La fecha de inicio no puede ser anterior a hoy.</li>
            <li>El curso y su descripción ya están elegidos; si te equivocaste usa "Cambiar curso".</li>
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
