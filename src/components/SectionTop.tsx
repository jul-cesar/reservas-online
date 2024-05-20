import { Link, useLocation, useNavigate } from "react-router-dom";
import CrearCancha from "./forms/CrearCancha";
import { ReactNode } from "react";
import { Button } from "./ui/button";
import CrearSuministro from "./forms/CrearSuministro";
const SectionTop = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const navigation = [
    {
      href: "/canchas",
      name: "Canchas",
    },
    {
      href: "/reservas",
      name: "Reservas",
    },
    {
      href: "/suplementos",
      name: "Suplementos",
    },
    // {
    //   href: "javascript:void(0)",
    //   name: "plans",
    // },
  ];

  interface Forms {
    [key: string]: React.ComponentType<{ children?: ReactNode }>;
  }

  const forms: Forms = {
    canchas: CrearCancha,
    suplementos: CrearSuministro,
  };
  const currentPath = location.pathname.split("/").pop() ?? "";

  const CurrentForm =
    forms[currentPath] ||
    (() => <Button className="m-2">Crear {location.pathname.split("/").pop()}</Button>);

  return (
    <div className="mx-auto px-4 pt-4 md:px-8  bg-background sticky top-0">
      <div className=" justify-between md:flex">
        <div>
          <h3 className="text-gray-800 text-2xl font-bold">Reservas Online</h3>
        </div>
        <div className="items-center gap-3 mt-6 md:mt-0 sm:flex ">
          <CurrentForm>
            <Button className="m-2">Crear {location.pathname.split("/").pop()}</Button>
          </CurrentForm>
          <Button
            className="bg-violet-500"
            onClick={() => {
              localStorage.removeItem("currentUser");
              navigate("/");
            }}
          >
            Cerrar sesion
          </Button>
        </div>
      </div>
      <div className="mt-6 md:mt-4">
        <ul className="w-full border-b flex items-center gap-x-3 overflow-x-auto">
          {navigation.map((item, idx) => (
            // Replace [idx == 0] with [window.location.pathname == item.path] or create your own logic
            <li
              key={idx}
              className={`py-2 border-b-2 ${
                window.location.pathname === item.href
                  ? "border-[#363a29] text-[#363a29]"
                  : "border-white text-gray-500"
              }`}
            >
              <Link
                to={item.href}
                className="py-2.5 px-4 rounded-lg duration-150 text-sm hover:text-[#363a29] hover:bg-gray-50 active:bg-gray-100 font-medium"
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SectionTop;
