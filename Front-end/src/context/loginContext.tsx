import { createContext, useContext, useState, ReactNode } from "react";
import api from "@/services/api";
import { AuthContextData, LoginProps, User } from "@/domain/User/types";

const AuthContext = createContext<AuthContextData | undefined>(undefined);

export const LoginContext = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  async function login(loginData: LoginProps) {
    try {
      const response = await api.post<User>("/Users/Login", loginData);
      const { token, idUser } = response.data;

      if (token && idUser) {
        console.log(`entrou aqui`);
        localStorage.setItem("token", token);
        localStorage.setItem("idUser", idUser);

        setUser(response.data);
      }
      return idUser;
    } catch (error: any) {
      console.error("Erro ao autenticar:", error.message);
      return null;
    }
  }

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("idUser");
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
