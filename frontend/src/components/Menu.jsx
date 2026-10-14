import { NavLink } from "react-router-dom";

// Menú de navegación reutilizable. NavLink marca la ruta activa con la clase "activo"
function Menu() {
  const claseEnlace = ({ isActive }) => (isActive ? "enlace activo" : "enlace");

  return (
    <header className="menu">
      <NavLink to="/" className="marca">
        Inscripciones a cursos
      </NavLink>
      <nav className="menu-enlaces">
        <NavLink to="/" end className={claseEnlace}>
          Inicio
        </NavLink>
        <NavLink to="/registro" className={claseEnlace}>
          Registrar
        </NavLink>
        <NavLink to="/lista" className={claseEnlace}>
          Inscripciones
        </NavLink>
      </nav>
    </header>
  );
}

export default Menu;
