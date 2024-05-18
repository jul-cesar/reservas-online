import { useContext } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { AuthContext } from "../context/auth";

const ProtectedRoute = () => {
  const location = useLocation();
  const { currentUser } = useContext(AuthContext);

  if (currentUser && currentUser.Rol !== "User") {
    return <Outlet />;
  }

  return <Navigate to="/noadmin" state={{ from: location }} replace />;
};

export default ProtectedRoute;
