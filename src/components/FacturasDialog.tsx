import { ReactNode } from "react";
import { Factura } from "../Models/Factura";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";

const FacturasDialog = ({
  children,
  facturas,
}: {
  children: ReactNode;
  facturas: Factura[];
}) => {
  return (
    <Dialog>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent className="p-4">
        <DialogTitle>Factura(s) para la reserva #{facturas.map((f)=>(f.IDReserva))}</DialogTitle>
        <div>
          {facturas.map((factura) => (
            <div className="border rounded-lg p-4 shadow-md mb-4">
              <h2 className="text-xl font-semibold mb-2">
                Factura #{factura.IDFactura}
              </h2>
              <p>
                <strong>Reserva:</strong> {factura.IDReserva}
              </p>
              <p>
                <strong>Monto Total:</strong> ${factura.MontoTotal}
              </p>
              <p>
                <strong>Fecha de Emisión:</strong>{" "}
              {new Date(factura.FechaEmision).toLocaleString()}
              </p>
              <p>
                <strong>Estado de Pago:</strong> {factura.EstadoPago}
              </p>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};
export default FacturasDialog;
