import { CATEGORIAS } from "../data/categorias.js";

// Botones tipo "píldora" para filtrar por categoría. "" significa "Todas"
function FiltroCategorias({ seleccionada, onCambiar }) {
  const opciones = ["", ...CATEGORIAS.map((categoria) => categoria.nombre)];

  return (
    <div className="filtros" role="group" aria-label="Filtrar por categoría">
      {opciones.map((opcion) => (
        <button
          key={opcion || "todas"}
          type="button"
          className={seleccionada === opcion ? "pildora activa" : "pildora"}
          onClick={() => onCambiar(opcion)}
        >
          {opcion || "Todas"}
        </button>
      ))}
    </div>
  );
}

export default FiltroCategorias;
