import { useQuery } from "@tanstack/react-query";
import { Suministro } from "../Models/Suministros";
import { getSuministros } from "../api/suministros/suministros";
import { Loader2 } from "lucide-react";

const Suplementos = () => {
  const { data, isLoading } = useQuery<Suministro[]>({
    queryKey: ["suministros"],
    queryFn: async (): Promise<Suministro[]> => {
      const result = await getSuministros();
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
      {data?.map((suministro) => (
        <div className="border rounded-lg p-4 shadow-md w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
          <h2>Suministro ID: {suministro.IDSuministro}</h2>
          <p>
            <strong>ID Reserva:</strong> {suministro.IDReserva}
          </p>
          <p>
            <strong>Tipo de Suministro:</strong> {suministro.TipoSuministro}
          </p>
          <p>
            <strong>Cantidad:</strong> {suministro.Cantidad}
          </p>
          <p>
            <strong>Costo Unitario:</strong> ${suministro.CostoUnitario}
          </p>
         
        </div>
      ))}
    </div>
  );
};
export default Suplementos;
