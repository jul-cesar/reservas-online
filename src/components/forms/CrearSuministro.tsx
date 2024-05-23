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

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ReactNode, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { AlertDialogHeader } from "../ui/alert-dialog";
import { crearSuministro } from "../../api/suministros/suministros";

const CrearSuministro = ({ children }: { children?: ReactNode }) => {
  const [open, setOpen] = useState(false);

  const formSchema = z.object({
    TipoSuministro: z.string().min(2).max(50),
    Cantidad: z
      .string()
      .transform((val) => Number(val))
      .refine((val) => !isNaN(val), {
        message: "Debe ser un número",
      }),
    Costo: z
      .string()
      .transform((val) => Number(val))
      .refine((val) => !isNaN(val), {
        message: "Debe ser un número",
      }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
  });

  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (data: z.infer<typeof formSchema>) => {
      await crearSuministro({
        Cantidad: data.Cantidad,
        CostoUnitario: data.Costo,
        TipoSuministro: data.TipoSuministro,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["suministros"] });
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
              name="TipoSuministro"
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
              name="Costo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cantidad</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="Cantidad"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Costo</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit">Crear</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CrearSuministro;
