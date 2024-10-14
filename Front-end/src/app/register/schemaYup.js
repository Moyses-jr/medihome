import * as Yup from "yup"; // Importa Yup para as validações

const validationSchema = Yup.object().shape({
  email: Yup.string().email("E-mail inválido").required("E-mail é obrigatório"),
  name: Yup.string()
    .min(3, "Nome precisa ter pelo menos 3 caracteres")
    .required("Nome é obrigatório"),
  password: Yup.string()
    .min(6, "A senha deve ter pelo menos 6 caracteres")
    .required("Senha é obrigatória"),
  password2: Yup.string()
    .oneOf([Yup.ref("password"), null], "As senhas devem coincidir")
    .required("Confirmação de senha é obrigatória"),
});

export { validationSchema };
