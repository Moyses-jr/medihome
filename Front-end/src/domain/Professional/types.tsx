export interface ProfessionalModel {
  IdProfessional?: number;
  idUser?: number;
  cnpj: string;
  crm: string;
  expirationCRM: string;
  professionalType: string;
  phoneNumber: string;

  isActive?: boolean;
  registerDate: string;
  registerBorn: string;
}

export interface CreateProfeProps {
  idUser?: number;
  cnpj: string;
  crm: string;
  expirationCRM: Date | string | null;
  professionalType: string;
  phoneNumber: string;
  registerBorn: Date | string | null;
  registerDate?: Date | string | null;
  image: File | null;
}
