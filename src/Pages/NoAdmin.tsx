import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";

const NoAdmin = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4">
      <h1>No tienes los permisos suficientes para estar aqui.</h1>
      <Button>
        <Link to={"/"}>Iniciar en una cuenta admin</Link>
      </Button>
    </div>
  );
};
export default NoAdmin;
