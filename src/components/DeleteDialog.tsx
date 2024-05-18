import { ReactNode, useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { eliminarCancha } from "../api/Canchas/canchas";
import { Cancha } from "../Models/Cancha";

export function DeleteDialog({
  children,
  cancha,
}: {
  children: ReactNode;
  cancha?: Cancha;
}) {

  const queryClient = useQueryClient();
  const { mutateAsync } = useMutation({
    mutationFn: async () => {
      await eliminarCancha(cancha?.IDCancha ?? 0);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["canchas"] });
    },
  });
  return (
    <AlertDialog >
      <AlertDialogTrigger>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Estas seguro?</AlertDialogTitle>
          <AlertDialogDescription>
            Eliminar esta cancha tambien eliminara todas sus reservas y facturas
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            onClick={async () => {
              await mutateAsync();
            }}
          >
            Eliminar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
