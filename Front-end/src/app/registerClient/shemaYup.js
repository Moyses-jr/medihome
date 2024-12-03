import * as Yup from "yup";

const validationClient = Yup.object().shape({
  cpf: Yup.string()
    .required("CPF é obrigatório.")
    .length(11, "O CPF deve conter exatamente 11 dígitos.")
    .matches(/^\d+$/, "O CPF deve conter apenas números."),

  phoneNumber: Yup.string()
    .required("Telefone é obrigatório.")
    .matches(/^\d+$/, "O número de telefone deve conter apenas números.")
    .min(10, "O número de telefone deve ter no mínimo 10 dígitos.")
    .max(11, "O número de telefone deve ter no máximo 11 dígitos."),

  registerBorn: Yup.date()
    .required("A data de nascimento é obrigatória.")
    .typeError("Data inválida.")
    .max(new Date(), "A data de nascimento não pode ser no futuro."),
});

export { validationClient };
