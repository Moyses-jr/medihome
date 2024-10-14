import * as Yup from "yup";

const formSchemaa = Yup.object().shape({
  nome: Yup.string()
    .min(2, "O nome deve ter no mínimo 2 caracteres")
    .max(50, "O nome pode ter no máximo 50 caracteres")
    .required("Nome é obrigatório"),

  cpf: Yup.string()
    .length(11, "O CPF deve ter exatamente 11 dígitos")
    .matches(/^\d+$/, "O CPF deve conter apenas números")
    .required("CPF é obrigatório"),

  dataNascimento: Yup.date().required("Data de nascimento é obrigatória"),

  cnpj: Yup.string()
    .length(14, "O CNPJ deve ter exatamente 14 dígitos")
    .matches(/^\d+$/, "O CNPJ deve conter apenas números")
    .required("CNPJ é obrigatório"),

  registroConselho: Yup.string()
    .length(15, "O registro do conselho deve ter exatamente 15 caracteres")
    .required("Registro do conselho é obrigatório"),

  dataVencimentoRegistro: Yup.date().required(
    "Data de vencimento do registro é obrigatória"
  ),
});

export { formSchemaa };
