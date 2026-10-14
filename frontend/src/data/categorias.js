// Categorías de cursos. El color se usa en el arco de cada tarjeta y en los filtros
export const CATEGORIAS = [
  { nombre: "Tecnología", color: "azul", descripcion: "Programación, bases de datos y desarrollo web." },
  { nombre: "Idiomas", color: "ambar", descripcion: "Inglés, portugués y otros idiomas." },
  { nombre: "Arte y diseño", color: "rosa", descripcion: "Diseño gráfico, ilustración y fotografía." },
  { nombre: "Negocios", color: "verde", descripcion: "Emprendimiento, finanzas y marketing." },
  { nombre: "Salud", color: "violeta", descripcion: "Primeros auxilios, nutrición y bienestar." },
  { nombre: "Otros", color: "gris", descripcion: "Cursos de otras áreas." },
];

// Devuelve los datos de una categoría por su nombre (o "Otros" si no existe)
export function buscarCategoria(nombre) {
  return CATEGORIAS.find((categoria) => categoria.nombre === nombre) || CATEGORIAS[CATEGORIAS.length - 1];
}
