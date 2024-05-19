import { Factura } from "../../Models/Factura";
import { Reserva } from "../../Models/Reserva";
import { User } from "../../Models/User";

export const getReservas = async (): Promise<Reserva[] | undefined> => {
  try {
    const response = await fetch("https://reserva-canchas.vercel.app/reserva");
    const data: Reserva[] = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

interface ReservaX {
  IDReserva: number;
  IDUsuario: number;
  IDCancha: number;
  FechaCreacion: Date;
  FechaReserva: Date;
  HoraInicio: string;
  HoraFinalizacion: string;
  Duracion: number;
  Estado: string;
  MetodoPago: string;
  suministrosadicionales: number[];
  MontoPagado: number;
  usuarios: User;
  facturas: Factura[]
}


export const editarReserva = async (id: number, info: Partial<ReservaX>) => {
  try {
    const response = await fetch(
      `https://reserva-canchas.vercel.app/reserva/${id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(info),
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const getUnaReserva = async (
  id: number
): Promise<Reserva | undefined> => {
  try {
    const response = await fetch(
      `https://reserva-canchas.vercel.app/reserva/una/${id}`
    );
    const data: Reserva = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};
