export interface LoginResponse {
  id: number;
  token: string;
  firstName: string;
  lastName: string;
  email: string;
}

export interface User {
  idUser: string;
  firstName: string;
  lastName: string;
  email: string;
  token: string;
}

export interface LoginProps {
  email: string;
  password: string;
}

export interface AuthContextData {
  user: User | null;
  // eslint-disable-next-line no-unused-vars
  login: (loginData: LoginProps) => Promise<string | null>;
  logout: () => void;
}
