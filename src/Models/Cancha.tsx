export interface Cancha {
  IDCancha?: number;
  Nombre: string;
  Descripcion: string;
  ImgURL?: string;
  createdAt?: Date
  TipoSuperficie: string;
  Disponibilidad: string;
  Precio: number;
  HoraApertura: string;
  HoraCierre: string;
  CapacidadMaxima: number;
  Dimensiones: string;
  Direccion: string;
  Contacto: string;
}
