import { Route, Routes } from "react-router-dom";
import "./App.css";
import SectionTop from "./components/SectionTop";
import Inicio from "./Pages/Inicio";
import Reservas from "./Pages/Reservas";
import Facturas from "./Pages/Facturas";
import Suplementos from "./Pages/Suplementos";

function App() {
  return (
    <div className="min-h-max mx-auto ">
      <SectionTop />
      <Routes>
        <Route path="/canchas" element={<Inicio />} />
      </Routes>
      <Routes>
        <Route path="/reservas" element={<Reservas />} />
      </Routes>
      <Routes>
        <Route path="/facturas" element={<Facturas />} />
      </Routes>
      <Routes>
        <Route path="/suplementos" element={<Suplementos />} />
      </Routes>
    </div>
  );
}

export default App;
