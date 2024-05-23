import {
  useState,
  createContext,
  ReactNode,
  Dispatch,
  SetStateAction,
  useEffect,
} from "react";
import { User } from "../Models/User";
import { Auth } from "../Models/Auth";
import { toast } from "sonner";

type AuthContextType = {
  currentUser: User | null;
  setCurrentUser: Dispatch<SetStateAction<User | null>>;
  login: (credentials: Auth) => Promise<User | undefined>;
};

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext<AuthContextType>({
  currentUser: null,
  setCurrentUser: () => {},
  login: async () => undefined,
});

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const storedUser = localStorage.getItem("currentUser");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem("currentUser", JSON.stringify(currentUser));
    } else {
      localStorage.removeItem("currentUser");
    }
  }, [currentUser]);

  type ErrorType = {
    error: string;
  };

  const login = async (credentials: Auth): Promise<User | undefined> => {
    try {
      const response = await fetch(
        "https://reserva-canchas-three.vercel.app/auth/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(credentials),
        }
      );
      const data: User | ErrorType = await response.json();
      if (!("error" in data)) {
        setCurrentUser(data as User);
        window.location.href = "/canchas";
        return data as User;
      } else {
        throw new Error(data.error);
      }
    } catch (error: any) {
      console.error(error);
      toast.error("Credenciales no válidas");
    }
  };

  return (
    <AuthContext.Provider value={{ currentUser, setCurrentUser, login }}>
      {children}
    </AuthContext.Provider>
  );
};
