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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getUnaCanchas } from "../../api/Canchas/canchas";
import { Cancha } from "../../Models/Cancha";
import { ReactNode, useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { AlertDialogHeader } from "../ui/alert-dialog";
import { Loader2 } from "lucide-react";
import { editarReserva } from "../../api/Reservas/reservas";

const EditarReserva = ({
  cancha,
  children,
}: {
  cancha?: Cancha;
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
    FechaReserva: z.string().transform((val) => new Date(val)),
    HoraInicio: z.string(),
    HoraFinalizacion: z.string(),
    Duracion: z.number(),
    Estado: z.string(),
    MetodoPago: z.string(),
    MontoPagado: z
      .string()
      .transform((val) => Number(val))
      .refine((val) => !isNaN(val), {
        message: "Debe ser un número",
      }),
  });

  const { data: canchaData, isLoading } = useQuery<Cancha, Error>({
    queryKey: ["canchas", cancha?.IDCancha],
    queryFn: () => getUnaCanchas(cancha?.IDCancha ?? 0),
    enabled: !!open,
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
  });

  useEffect(() => {
    if (canchaData) {
      form.reset({});
    }
  }, [canchaData, form]);

  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (data: z.infer<typeof formSchema>) => {
      await editarReserva(cancha?.IDCancha ?? 0, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["canchas"] });
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    mutateAsync(values);
    if (!isPending) {
      setOpen(!open);
    }
  }

  return (
    <Dialog open={open} onOpenChange={(open) => setOpen(open)}>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent className="sm:max-h-[600px] w-5/6 max-h-[680px] overflow-auto">
        <AlertDialogHeader>
          <DialogTitle>Editar cancha</DialogTitle>
        </AlertDialogHeader>
        {!isLoading ? (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
              <FormField
                control={form.control}
                name="IDCancha"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="Duracion"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>URL de la imagen</FormLabel>
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
                    <FormLabel>Tipo superficie</FormLabel>
                    <Select
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
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="MetodoPago"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tipo superficie</FormLabel>
                    <Select
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
                        <SelectItem value="TarjetaCredito">
                          Tarjeta de credito
                        </SelectItem>
                        <SelectItem value="TarjetaDebito">
                          Tarjeta de debito
                        </SelectItem>
                        <SelectItem value="TransferenciaBancaria">
                          Transferencia bancaria
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="FechaReserva"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Disponibilidad</FormLabel>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="MontoPagado"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Precio</FormLabel>
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
                    <FormLabel>Direccion</FormLabel>
                    <FormControl></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="HoraInicio"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Hora apertura</FormLabel>
                    <FormControl></FormControl>
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
