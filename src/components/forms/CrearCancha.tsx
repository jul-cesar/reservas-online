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
import { Textarea } from "../ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { crearCancha } from "../../api/Canchas/canchas";
import { ReactNode, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { AlertDialogHeader } from "../ui/alert-dialog";

const CrearCancha = ({ children }: { children?: ReactNode }) => {
  const [open, setOpen] = useState(false);

  const formSchema = z.object({
    Nombre: z.string().min(2).max(50),
    ImgURL: z.string().url(),
    Descripcion: z.string().min(4).max(80),
    TipoSuperficie: z.string(),
    Disponibilidad: z.string(),
    Precio: z
      .string()
      .transform((val) => Number(val))
      .refine((val) => !isNaN(val), {
        message: "Debe ser un número",
      }),
    Direccion: z.string().min(4),
    HoraApertura: z.string().min(3),
    HoraCierre: z.string().min(4),
    CapacidadMaxima: z
      .string()
      .transform((val) => Number(val))
      .refine((val) => !isNaN(val), {
        message: "Debe ser un número",
      }),
    Dimensiones: z.string().min(4),
    Contacto: z.string().min(4),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
  });

  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (data: z.infer<typeof formSchema>) => {
      await crearCancha({
        Nombre: data.Nombre,
        Descripcion: data.Descripcion,
        CapacidadMaxima: data.CapacidadMaxima,
        Contacto: data.Contacto,
        Dimensiones: data.Dimensiones,
        Direccion: data.Direccion,
        Disponibilidad: data.Disponibilidad,
        HoraApertura: data.HoraApertura,
        HoraCierre: data.HoraCierre,
        ImgURL: data.ImgURL,
        Precio: data.Precio,
        TipoSuperficie: data.TipoSuperficie,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["canchas"] });
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);

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
          <DialogTitle>Crear cancha</DialogTitle>
        </AlertDialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
            <FormField
              control={form.control}
              name="Nombre"
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
              name="ImgURL"
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
              name="Descripcion"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descripcion</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="TipoSuperficie"
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
                      <SelectItem value="sintetica">Sintetica</SelectItem>
                      <SelectItem value="cesped">Cesped</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="Disponibilidad"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Disponibilidad</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona la disponibilidad" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Disponible">Disponible</SelectItem>
                      <SelectItem value="NoDisponible">
                        No Disponible
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="Precio"
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
              name="Direccion"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Direccion</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="HoraApertura"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Hora apertura</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="HoraCierre"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Hora cierre</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="CapacidadMaxima"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Capacidad maxima</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="Dimensiones"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Dimensiones</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="Contacto"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contacto</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Editar</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CrearCancha;
