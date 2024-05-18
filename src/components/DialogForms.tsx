import { ReactNode } from "react";
import { AlertDialogHeader } from "./ui/alert-dialog";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "./ui/dialog";

const DialogForms = ({ children }: { children: ReactNode }) => {
  return (
    <Dialog>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-screen-lg">
        <AlertDialogHeader>
          <DialogTitle>Administra tus teams</DialogTitle>
        </AlertDialogHeader>
      </DialogContent>
    </Dialog>
  );
};
export default DialogForms;
