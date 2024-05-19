import { Edit, Trash } from "lucide-react";
import { ReactNode } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

import EditarReserva from "./forms/EditarReserva";
import { Reserva } from "../Models/Reserva";

const DropdownOptionsReserva = ({
  children,
  reserva,
}: {
  children: ReactNode;
  reserva?: Reserva;
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="cursor-pointer">
        {children}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Opciones</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {/* <DropdownMenuItem>
          <User className="mr-2 h-4 w-4" />
          <Link to={"login"}>
            {" "}
            <span>Ver comentarios</span>
          </Link>
        </DropdownMenuItem> */}
          <div className="flex flex-col justify-center ">
            <>
              <div className="flex items-center  m-2 cursor-pointer h-full">
                <Trash className="mr-2 h-4 w-4" />
                <h1>Eliminar</h1>
              </div>
            </>
            <EditarReserva reserva={reserva}>
              <div className="flex items-center m-2 cursor-pointer h-full">
                <Edit className="mr-2 h-4 w-4" />
                <h1>Editar</h1>{" "}
              </div>
            </EditarReserva>
          </div>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
export default DropdownOptionsReserva;
