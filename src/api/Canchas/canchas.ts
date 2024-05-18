import { Cancha } from "../../Models/Cancha";

export const getCanchas = async () => {
  try {
    const response = await fetch("https://reserva-canchas.vercel.app/cancha");
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const crearCancha = async (info: Cancha) => {
  try {
    const response = await fetch("https://reserva-canchas.vercel.app/cancha", {method:"post",  headers: { "Content-Type": "application/json" }, body: JSON.stringify(info)});
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};
export const eliminarCancha = async (id: number) => {
  try {
    const response = await fetch(
      `https://reserva-canchas.vercel.app/cancha/${id}`,
      { method: "delete" }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const editarCancha = async (id: number, info: Partial<Cancha>) => {
  try {
    const response = await fetch(
      `https://reserva-canchas.vercel.app/cancha/${id}`,
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

export const getUnaCanchas = async (id: number) => {
  try {
    const response = await fetch(`https://reserva-canchas.vercel.app/cancha/${id}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

