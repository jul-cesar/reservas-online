import { Reserva } from "../../Models/Reserva";

export const getReservas = async (): Promise<Reserva[] | undefined> => {
  try {
    const response = await fetch("https://reserva-canchas.vercel.app/reserva");
    const data: Reserva[] = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const editarReserva= async (id: number, info: Partial<Reserva>) => {
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