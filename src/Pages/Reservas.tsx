import { useQuery } from "@tanstack/react-query";

import { Loader2 } from "lucide-react";
import { useContext } from "react";
import { AuthContext } from "../context/auth";
import { Reserva } from "../Models/Reserva";
import { getReservas } from "../api/Reservas/reservas";
import ReservaCard from "../components/ReservaCard";

const Reservas = () => {
  const { currentUser } = useContext(AuthContext);
  console.log(currentUser);
  const { data, isLoading } = useQuery<Reserva[]>({
    queryKey: ["reservas"],
    queryFn: async (): Promise<Reserva[]> => {
      const result = await getReservas();
      if (!result) {
        throw new Error("Error trayendo las canchas");
      }
      return result;
    },
  });
  if (isLoading) {
    return (
      <div className="flex gap-4 min-h-dvh flex-wrap items-center justify-center m-4">
        <Loader2 className="animate-spin  size-14" />
      </div>
    );
  }
  return (
    <div className=" flex gap-4  flex-wrap sm:justify-center  justify-center m-4">
      {data?.map((reserva) => (
        <ReservaCard key={reserva.IDReserva} reserva={reserva} />
      ))}
    </div>
  );
};
export default Reservas;
