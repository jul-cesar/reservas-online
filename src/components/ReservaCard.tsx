import { Reserva } from "../Models/Reserva";
import { Button } from "./ui/button";
import FacturasDialog from "./FacturasDialog";
import DropdownOptionsReserva from "./DropdownOptionsReserva";

const ReservaCard = ({ reserva }: { reserva: Reserva }) => {
  return (
    <div className="border rounded-lg p-4 shadow-md w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
      <div className="flex justify-between">
        <h2 className="text-xl font-semibold mb-2">
          Reserva #{reserva.IDReserva}
        </h2>
        <DropdownOptionsReserva>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 16 3"
          >
            <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
          </svg>
        </DropdownOptionsReserva>
      </div>

      <p>
        <strong>Cancha:</strong> {reserva.IDCancha}
      </p>
      <p>
        <strong>Usuario:</strong> {reserva.usuarios.Nombre}
      </p>

      <p>
        <strong>Fecha de Reserva:</strong>{" "}
        {new Date(reserva.FechaReserva).toLocaleString()}
      </p>
      <p>
        <strong>Hora:</strong> {reserva.HoraInicio} - {reserva.HoraFinalizacion}
      </p>
      <p>
        <strong>Duración:</strong> {reserva.Duracion} horas
      </p>
      <p>
        <strong>Estado:</strong> {reserva.Estado}
      </p>
      <p>
        <strong>Método de Pago:</strong> {reserva.MetodoPago}
      </p>
      <p>
        <strong>Monto Pagado:</strong> ${reserva.MontoPagado}
      </p>
      <strong>Suministros adicionales:</strong>
      {reserva.suministrosadicionales.map((s) => (
        <p>{s.TipoSuministro}</p>
      ))}
      <FacturasDialog facturas={reserva.facturas}>
        <Button className="m-4">Ver factura</Button>
      </FacturasDialog>
    </div>
  );
};

export default ReservaCard;
