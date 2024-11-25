import { createContext, useContext, useState, ReactNode } from "react";
import Cookies from "js-cookie";
import api from "@/services/api";

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

interface LoginProps {
  email: string;
  password: string;
}

interface AuthContextData {
  user: User | null;
  // eslint-disable-next-line no-unused-vars
  login: (loginData: LoginProps) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextData | undefined>(undefined);

export const LoginContext = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = async (loginData: LoginProps) => {
    try {
      const response = await api.post("/Users/Login", loginData);
      const { token, id, ...userData } = response.data;

      if (token && id) {
        console.log(`entrou aqui`);
        localStorage.setItem("token", token);

        setUser(userData);
      }
    } catch (error: any) {
      console.error("Erro ao autenticar:", error.message);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useLogin = (): AuthContextData => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
};
