import { Link, useLocation } from "react-router-dom";
import CrearCancha from "./forms/CrearCancha";
import { ReactNode } from "react";
const SectionTop = () => {
  const location = useLocation();
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
      href: "/facturas",
      name: "Facturas",
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
  };
  const currentPath = location.pathname.split("/").pop() ?? "";

  const CurrentForm =
    forms[currentPath] ||
    (() => (
      <a className="block px-4 py-2 mt-3 text-center text-white duration-150 font-medium bg-[#363a29] rounded-lg hover:bg-indigo-500 active:bg-indigo-700 sm:mt-0 md:text-sm">
        Crear {location.pathname.split("/").pop()}
      </a>
    ));

  return (
    <div className="mx-auto px-4 pt-4 md:px-8  bg-background sticky top-0">
      <div className="items-start justify-between md:flex">
        <div>
          <h3 className="text-gray-800 text-2xl font-bold">Reservas Online</h3>
        </div>
        <div className="items-center gap-x-3 mt-6 md:mt-0 sm:flex">
          <a className="flex items-center justify-center gap-x-2 px-4 py-2 text-center text-gray-700 duration-150 font-medium rounded-lg border hover:bg-gray-50 active:bg-gray-100 md:text-sm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-5 h-5 text-gray-500"
            >
              <path
                fillRule="evenodd"
                d="M2.628 1.601C5.028 1.206 7.49 1 10 1s4.973.206 7.372.601a.75.75 0 01.628.74v2.288a2.25 2.25 0 01-.659 1.59l-4.682 4.683a2.25 2.25 0 00-.659 1.59v3.037c0 .684-.31 1.33-.844 1.757l-1.937 1.55A.75.75 0 018 18.25v-5.757a2.25 2.25 0 00-.659-1.591L2.659 6.22A2.25 2.25 0 012 4.629V2.34a.75.75 0 01.628-.74z"
                clipRule="evenodd"
              />
            </svg>
            Filter
          </a>
          <CurrentForm>
            <a className="block px-4 py-2 mt-3 text-center text-white duration-150 font-medium bg-[#363a29] rounded-lg hover:bg-indigo-500 active:bg-indigo-700 sm:mt-0 md:text-sm">
              Crear {location.pathname.split("/").pop()}
            </a>
          </CurrentForm>
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
