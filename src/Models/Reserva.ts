import { Factura } from "./Factura";
import { Suministro } from "./Suministros";
import { User } from "./User";

export interface Reserva {
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
  suministrosadicionales: Suministro[];
  MontoPagado: number;
  usuarios: User;
  facturas: Factura[]
}
