// Imagen de Unsplash (uso libre) con tamaño reducido para que cargue rápido
const foto = (id) => `https://images.unsplash.com/photo-${id}?w=600&h=360&fit=crop&q=70`;

// Categorías con su color (arco de la tarjeta) y los cursos que ofrece cada una
export const CATEGORIAS = [
  {
    nombre: "Tecnología",
    color: "azul",
    descripcion: "Programación, bases de datos y desarrollo web.",
    cursos: [
      { nombre: "SQL Server", descripcion: "Diseña bases de datos y escribe consultas con T-SQL.", imagen: foto("1544383835-bda2bc66a55d") },
      { nombre: "Desarrollo web con React", descripcion: "Crea interfaces modernas con componentes, estado y rutas.", imagen: foto("1633356122544-f134324a6cee") },
      { nombre: "Node.js y Express", descripcion: "Construye APIs REST y servidores con JavaScript.", imagen: foto("1555066931-4365d14bab8c") },
      { nombre: "Python desde cero", descripcion: "Aprende lógica de programación con el lenguaje más usado.", imagen: foto("1526379095098-d400fd0bf935") },
    ],
  },
  {
    nombre: "Idiomas",
    color: "ambar",
    descripcion: "Inglés, portugués y otros idiomas.",
    cursos: [
      { nombre: "Inglés básico", descripcion: "Vocabulario y frases para comunicarte desde el primer día.", imagen: foto("1546410531-bb4caa6b424d") },
      { nombre: "Inglés intermedio", descripcion: "Mejora tu conversación, lectura y escritura.", imagen: foto("1434030216411-0b793f4b4173") },
      { nombre: "Portugués", descripcion: "Conversación básica y cultura brasileña.", imagen: foto("1483729558449-99ef09a8c325") },
      { nombre: "Francés", descripcion: "Pronunciación, gramática y expresiones cotidianas.", imagen: foto("1502602898657-3e91760cbb34") },
    ],
  },
  {
    nombre: "Arte y diseño",
    color: "rosa",
    descripcion: "Diseño gráfico, ilustración y fotografía.",
    cursos: [
      { nombre: "Diseño gráfico", descripcion: "Composición, tipografía y color para piezas visuales.", imagen: foto("1586717791821-3f44a563fa4c") },
      { nombre: "Ilustración digital", descripcion: "Dibuja y colorea con herramientas digitales.", imagen: foto("1561070791-2526d30994b5") },
      { nombre: "Fotografía", descripcion: "Domina la cámara, la luz y el encuadre.", imagen: foto("1516035069371-29a1b244cc32") },
      { nombre: "Diseño UX/UI", descripcion: "Diseña apps fáciles de usar y agradables a la vista.", imagen: foto("1512941937669-90a1b58e7e9c") },
    ],
  },
  {
    nombre: "Negocios",
    color: "verde",
    descripcion: "Emprendimiento, finanzas y marketing.",
    cursos: [
      { nombre: "Emprendimiento", descripcion: "Convierte una idea en un negocio viable.", imagen: foto("1559136555-9303baea8ebd") },
      { nombre: "Marketing digital", descripcion: "Redes sociales, publicidad y métricas.", imagen: foto("1460925895917-afdab827c52f") },
      { nombre: "Finanzas personales", descripcion: "Organiza tu presupuesto, ahorra e invierte mejor.", imagen: foto("1554224155-6726b3ff858f") },
      { nombre: "Excel para negocios", descripcion: "Fórmulas, tablas dinámicas y gráficos.", imagen: foto("1551288049-bebda4e38f71") },
    ],
  },
  {
    nombre: "Salud",
    color: "violeta",
    descripcion: "Primeros auxilios, nutrición y bienestar.",
    cursos: [
      { nombre: "Primeros auxilios", descripcion: "Actúa correctamente ante una emergencia.", imagen: foto("1603398938378-e54eab446dde") },
      { nombre: "Nutrición saludable", descripcion: "Aprende a comer mejor con hábitos simples.", imagen: foto("1490645935967-10de6ba17061") },
      { nombre: "Yoga y bienestar", descripcion: "Posturas y respiración para cuerpo y mente.", imagen: foto("1544367567-0f2fcb009e0b") },
      { nombre: "Salud mental", descripcion: "Herramientas para manejar el estrés y la ansiedad.", imagen: foto("1499209974431-9dddcece7f88") },
    ],
  },
];

// Se usa para registros antiguos cuya categoría ya no está en la lista
const CATEGORIA_GENERICA = { nombre: "", color: "gris", descripcion: "", cursos: [] };

// Devuelve los datos de una categoría por su nombre
export function buscarCategoria(nombre) {
  return CATEGORIAS.find((categoria) => categoria.nombre === nombre) || CATEGORIA_GENERICA;
}
