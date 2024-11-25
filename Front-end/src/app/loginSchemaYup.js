import * as Yup from "yup"; // Importa Yup para as validações

const loginSchemaYup = Yup.object().shape({
  email: Yup.string().email("E-mail inválido").required("E-mail é obrigatório"),
  password: Yup.string()
    .min(6, "A senha deve ter pelo menos 6 caracteres")
    .required("Senha é obrigatória"),
});

export { loginSchemaYup };
