export const getSuministros = async () => {
  try {
    const response = await fetch(
      "https://reserva-canchas.vercel.app/suministro"
    );
    const data = await response.json();
    return data
  } catch (error) {
    console.error(error);
  }
};
