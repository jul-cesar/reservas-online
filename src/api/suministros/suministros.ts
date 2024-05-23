import { Suministro } from "../../Models/Suministros";

export const getSuministros = async () => {
  try {
    const response = await fetch(
      "https://reserva-canchas-three.vercel.app/suministro"
    );
    const data = await response.json();
    return data
  } catch (error) {
    console.error(error);
  }
};


export const crearSuministro = async (info: Partial<Suministro>) => {
  try {
    const response = await fetch("https://reserva-canchas-three.vercel.app/suministro", {method:"post",  headers: { "Content-Type": "application/json" }, body: JSON.stringify(info)});
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const eliminarCancha = async (id: number) => {
  try {
    const response = await fetch(
      `https://reserva-canchas-three.vercel.app/cancha/${id}`,
      { method: "delete" }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};
