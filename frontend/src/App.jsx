import { Routes, Route } from "react-router-dom";
import Menu from "./components/Menu.jsx";
import Pie from "./components/Pie.jsx";
import Inicio from "./pages/Inicio.jsx";
import Categoria from "./pages/Categoria.jsx";
import Registro from "./pages/Registro.jsx";
import Lista from "./pages/Lista.jsx";
import NoEncontrado from "./pages/NoEncontrado.jsx";

// Define las rutas de la SPA: cada ruta muestra una página distinta
function App() {
  return (
    <>
      <Menu />
      <main className="contenedor">
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/categoria/:nombre" element={<Categoria />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/lista" element={<Lista />} />
          <Route path="*" element={<NoEncontrado />} />
        </Routes>
      </main>
      <Pie />
    </>
  );
}

export default App;
