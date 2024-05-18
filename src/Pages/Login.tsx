import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
import { useContext } from "react";
import { AuthContext } from "../context/auth";
import { Button } from "../components/ui/button";

const Login = () => {
  const formScheme = z.object({
    email: z.string().email(),
    password: z.string().min(3),
  });
  const { register, handleSubmit } = useForm<z.infer<typeof formScheme>>({
    resolver: zodResolver(formScheme),
  });

  const { login } = useContext(AuthContext);
  const { mutateAsync } = useMutation({
    mutationFn: async (data: z.infer<typeof formScheme>) => {
      await login({ email: data.email, password: data.password });
    },
    onError: () => {
      toast.error("Correo o contraseña incorrecta");
    },
  });

  const handleOnSubmit = (data: z.infer<typeof formScheme>) => {
    mutateAsync(data);
    console.log(data);
  };

  return (
    <main className="w-full h-screen flex flex-col items-center justify-center px-4">
      <div className="max-w-sm w-full text-gray-600">
        <div className="text-center">
          <div className="mt-5 space-y-2">
            <h3 className="text-gray-800 text-2xl font-bold sm:text-3xl">
              Ingresa a tu cuenta de administrador
            </h3>
          </div>
        </div>
        <form
          onSubmit={handleSubmit(handleOnSubmit)}
          className="mt-8 space-y-5"
        >
          <div>
            <label className="font-medium">Correo</label>
            <input
              {...register("email")}
              type="email"
              required
              className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
            />
          </div>
          <div>
            <label className="font-medium">Contraseña</label>
            <input
              {...register("password")}
              type="password"
              required
              className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
            />
          </div>
          <Button type="submit">Ingresar</Button>
        </form>
      </div>
    </main>
  );
};

export default Login;
