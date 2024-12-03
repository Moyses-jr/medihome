export interface ClientModel {
  idClient?: number;
  idUser?: number;

  firstName: string;
  lastName: string;
  password: string;
  password2: string;
  cpf: string;
  email: string;
  phoneNumber: string;

  isAdm?: boolean;
  isActive?: boolean;
  registerDate: string;
  registerBorn: string;
}

export interface requestProps {
  idUser?: number;
  email?: string;
  cpf: string;
  phoneNumber: string;
  firstName?: string;
  lastName?: string;
  registerBorn: Date | null;
  registerDate?: string;
}
