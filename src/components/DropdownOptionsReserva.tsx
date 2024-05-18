import { Edit, Trash } from "lucide-react";
import { ReactNode } from "react";
import { Cancha } from "../Models/Cancha";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { DeleteDialog } from "./DeleteDialog";

import EditarCancha from "./forms/EditarCancha";

const DropdownOptionsReserva = ({
  children,
  cancha,
}: {
  children: ReactNode;
  cancha?: Cancha;
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
            <DeleteDialog cancha={cancha}>
              <div className="flex items-center  m-2 cursor-pointer h-full">
                <Trash className="mr-2 h-4 w-4" />
                <h1>Eliminar</h1>
              </div>
            </DeleteDialog>
            <EditarCancha cancha={cancha}>
              <div className="flex items-center m-2 cursor-pointer h-full">
                <Edit className="mr-2 h-4 w-4" />
                <h1>Editar</h1>{" "}
              </div>
            </EditarCancha>
          </div>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
export default DropdownOptionsReserva;
