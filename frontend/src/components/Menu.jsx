import { Link, NavLink } from "react-router-dom";

// Menú de navegación reutilizable. NavLink marca la ruta activa con la clase "activo"
function Menu() {
  const claseEnlace = ({ isActive }) => (isActive ? "enlace activo" : "enlace");

  return (
    <header className="menu">
      <div className="menu-interno">
        <Link to="/" className="marca">
          inscribe<span>.</span>
        </Link>
        <nav className="menu-enlaces">
          <NavLink to="/" end className={claseEnlace}>
            Inicio
          </NavLink>
          <NavLink to="/lista" className={claseEnlace}>
            Inscripciones
          </NavLink>
          {/* En celular reemplaza al botón "Inscribirme" */}
          <NavLink to="/registro" className={(estado) => `${claseEnlace(estado)} solo-movil`}>
            Registrar
          </NavLink>
        </nav>
        <Link to="/registro" className="boton boton-borde boton-chico solo-escritorio">
          Inscribirme
        </Link>
      </div>
    </header>
  );
}

export default Menu;
