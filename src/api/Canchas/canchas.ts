export const getCanchas = async () => {
  try {
    const response = await fetch("https://reserva-canchas.vercel.app/cancha");
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
