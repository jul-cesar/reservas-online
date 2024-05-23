import { Route, Routes, useLocation, Navigate } from "react-router-dom";
import "./App.css";
import SectionTop from "./components/SectionTop";
import Inicio from "./Pages/Inicio";
import Reservas from "./Pages/Reservas";
import Login from "./Pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import NoAdmin from "./Pages/NoAdmin";
import Suministros from "./Pages/Suministros";

function App() {
  const location = useLocation();
  const hideSectionTopPaths = ["/", "/404", "/noadmin"];

  return (
    <div className="h-max mx-auto">
      {!hideSectionTopPaths.includes(location.pathname) && <SectionTop />}
      <Routes>
        <Route path="/" element={<Login />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/canchas" element={<Inicio />} />
          <Route path="/reservas" element={<Reservas />} />
          <Route path="/suministros" element={<Suministros />} />{" "}
        </Route>
        <Route path="/noadmin" element={<NoAdmin />} />
        <Route
          path="/404"
          element={<p className="text-center text-lg">Ruta no existente 404</p>}
        />
        <Route path="*" element={<Navigate to="/404" />} />
      </Routes>
    </div>
  );
}

export default App;
