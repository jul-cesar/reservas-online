import { useQuery } from "@tanstack/react-query";
import { getCanchas } from "../api/Canchas/canchas";
import { Cancha } from "../Models/Cancha";
import Card from "../components/Card";
import { Loader2 } from "lucide-react";

const Inicio = () => {
  const { data, isLoading } = useQuery<Cancha[]>({
    queryKey: ["canchas"],
    queryFn: async (): Promise<Cancha[]> => {
      const result = await getCanchas();
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
    <div className="flex gap-4  flex-wrap sm:justify-center  justify-center m-4">
      {data?.map((cancha) => (
        <Card key={cancha.IDCancha} cancha={cancha} />
      ))}
    </div>
  );
};
export default Inicio;
