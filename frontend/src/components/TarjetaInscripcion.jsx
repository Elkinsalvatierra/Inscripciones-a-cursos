// Tarjeta reutilizable que muestra los datos de una inscripción
function TarjetaInscripcion({ inscripcion }) {
  const { id, nombre, email, descripcion, fecha, categoria, curso } = inscripcion;

  return (
    <article className="tarjeta">
      <div className="tarjeta-encabezado">
        <h3>{curso}</h3>
        <span className="etiqueta">{categoria}</span>
      </div>
      <p className="tarjeta-descripcion">{descripcion}</p>
      <dl className="tarjeta-datos">
        <dt>Participante</dt>
        <dd>{nombre}</dd>
        <dt>Email</dt>
        <dd>{email}</dd>
        <dt>Fecha de inicio</dt>
        <dd>{fecha}</dd>
      </dl>
      <small className="tarjeta-id">ID #{id}</small>
    </article>
  );
}

export default TarjetaInscripcion;
