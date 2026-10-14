// Trazos SVG de cada categoría (formato de 24x24)
const TRAZOS = {
  Tecnología: "M8 9l-3 3 3 3m8-6l3 3-3 3M14 5l-4 14",
  Idiomas: "M4 5h9M8.5 3v2m2.5 0c-.8 4-3.4 7.3-7 9m2.5-5c1 2 2.8 3.8 5 5M13 21l4-9 4 9m-6.8-3h5.6",
  "Arte y diseño": "M15 5l4 4M4 20l4.5-1L19.5 8a2.8 2.8 0 00-4-4L4.5 15 4 20z",
  Negocios: "M4 19h16M7 16v-5m5 5V7m5 9v-3",
  Salud: "M12 20s-7-4.4-7-10a4 4 0 017-2.7A4 4 0 0119 10c0 5.6-7 10-7 10z",
  Otros: "M5 4h11a3 3 0 013 3v13H8a3 3 0 01-3-3V4zm0 13a3 3 0 013-3h11",
};

// Ícono reutilizable de una categoría
function IconoCategoria({ categoria, tamano = 18 }) {
  const trazo = TRAZOS[categoria] || TRAZOS.Otros;

  return (
    <svg width={tamano} height={tamano} viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={trazo} />
    </svg>
  );
}

export default IconoCategoria;
