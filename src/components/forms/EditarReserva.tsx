import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  Select as UISelect,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ReactNode, useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { AlertDialogHeader } from "../ui/alert-dialog";
import { CalendarIcon, Loader2 } from "lucide-react";
import { editarReserva, getUnaReserva } from "../../api/Reservas/reservas";
import { Reserva } from "../../Models/Reserva";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { cn } from "../../lib/utils";
import { Calendar } from "../ui/calendar";
import { format } from "date-fns";
import { getCanchas } from "../../api/Canchas/canchas";
import { Cancha } from "../../Models/Cancha";
import { Suministro } from "../../Models/Suministros";
import { getSuministros } from "../../api/suministros/suministros";
import Select from "react-select";

const EditarReserva = ({
  reserva,
  children,
}: {
  reserva?: Reserva;
  children: ReactNode;
}) => {
  const [open, setOpen] = useState(false);

  const formSchema = z.object({
    IDCancha: z
      .string()
      .transform((val) => Number(val))
      .refine((val) => !isNaN(val), {
        message: "Debe ser un número",
      }),
    FechaReserva: z.date().transform((val) => new Date(val)),
    HoraInicio: z.string(),
    HoraFinalizacion: z.string(),
    Duracion: z
      .string()
      .transform((val) => Number(val))
      .refine((val) => !isNaN(val), {
        message: "Debe ser un número",
      }),
    Estado: z.string(),
    MetodoPago: z.string(),
    MontoPagado: z
      .string()
      .transform((val) => Number(val))
      .refine((val) => !isNaN(val), {
        message: "Debe ser un número",
      }),
    suministrosadicionales: z.array(z.number()),
  });

  const { data: reservaData, isLoading } = useQuery<Reserva>({
    queryKey: ["reservas"],
    queryFn: async (): Promise<Reserva> => {
      const data = await getUnaReserva(reserva?.IDReserva ?? 0);
      if (!data) {
        throw new Error("error");
      }
      return data;
    },
    enabled: !!open,
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      IDCancha: 0,
      FechaReserva: new Date(),
      HoraInicio: "",
      HoraFinalizacion: "",
      Duracion: 0,
      Estado: "",
      MetodoPago: "",
      MontoPagado: 0,
      suministrosadicionales: [],
    },
    mode: "onChange",
  });

  useEffect(() => {
    if (reservaData) {
      form.reset({
        Duracion: reservaData.Duracion,
        Estado: reservaData.Estado,
        FechaReserva: reservaData.FechaReserva,
        HoraFinalizacion: reservaData.HoraFinalizacion,
        HoraInicio: reservaData.HoraInicio,
        MetodoPago: reservaData.MetodoPago,
        MontoPagado: reservaData.MontoPagado,
      });
    }
  }, [reservaData, form]);

  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (data: z.infer<typeof formSchema>) => {
      console.log(data);
      await editarReserva(reserva?.IDReserva ?? 0, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reservas"] });
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    mutateAsync(values);
    if (!isPending) {
      setOpen(!open);
    }
  }
  const { data: canchas } = useQuery<Cancha[]>({
    queryKey: ["canchas"],
    queryFn: async (): Promise<Cancha[]> => {
      const result = await getCanchas();
      if (!result) {
        throw new Error("Error trayendo las canchas");
      }
      return result;
    },
  });

  const { data: suministros } = useQuery<Suministro[]>({
    queryKey: ["suministros"],
    queryFn: async (): Promise<Suministro[]> => {
      const result = await getSuministros();
      if (!result) {
        throw new Error("Error trayendo las canchas");
      }
      return result;
    },
  });

  const options =
    suministros?.map((s) => ({
      label: s.TipoSuministro,
      value: s.IDSuministro,
    })) || [];

  return (
    <Dialog>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent className="sm:max-h-[600px] w-5/6 max-h-[680px] overflow-auto">
        <AlertDialogHeader>
          <DialogTitle>Editar Reserva</DialogTitle>
        </AlertDialogHeader>
        {!isLoading ? (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
              <FormField
                control={form.control}
                name="IDCancha"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cancha</FormLabel>
                    <UISelect onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecciona un tipo de superficie" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {canchas?.map((m) => (
                          <SelectItem
                            key={m?.IDCancha}
                            value={m?.IDCancha?.toString() ?? ""}
                          >
                            {m.Nombre}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </UISelect>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="Duracion"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Duracion</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="Estado"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Estado</FormLabel>
                    <UISelect
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecciona un tipo de superficie" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Confirmada">Confirmada</SelectItem>
                        <SelectItem value="Pendiente">Pendiente</SelectItem>
                      </SelectContent>
                    </UISelect>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="MetodoPago"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Metodo pago</FormLabel>
                    <UISelect
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecciona un tipo de superficie" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Efectivo">Efectivo</SelectItem>
                        <SelectItem value="TarjetaDeCredito">
                          Tarjeta de credito
                        </SelectItem>
                        <SelectItem value="TarjetaDeDebito">
                          Tarjeta de debito
                        </SelectItem>
                        <SelectItem value="TransferenciaBancaria">
                          Transferencia bancaria
                        </SelectItem>
                      </SelectContent>
                    </UISelect>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="FechaReserva"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Fecha reserva</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-[240px] pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Selecciona una fecha</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="MontoPagado"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Monto pagado</FormLabel>
                    <FormControl>
                      <Input {...field} type="number" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="HoraFinalizacion"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Hora finalizacion</FormLabel>
                    <FormControl>
                      <Input type="time" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="HoraInicio"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Hora inicio</FormLabel>
                    <FormControl>
                      <Input type="time" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="suministrosadicionales"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Suministros adicionales</FormLabel>
                    <FormControl>
                      <Select
                        isMulti
                        onChange={(selected) => {
                          field.onChange(
                            selected.map((option) => Number(option.value))
                          );
                        }}
                        options={options}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Editar</Button>
            </form>
          </Form>
        ) : (
          <Loader2 className="animate-spin" />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default EditarReserva;
