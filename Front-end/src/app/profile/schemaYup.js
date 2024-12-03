import * as Yup from "yup";

const profileValidation = Yup.object().shape({
  firstName: Yup.string().required("O primeiro nome é obrigatório."),
  lastName: Yup.string().required("O sobrenome é obrigatório."),
  password: Yup.string().min(6, "A senha deve ter no mínimo 6 caracteres."),
  // password2: Yup.string().when("password", {
  //   is: (value) => value && value.length > 0,
  //   then: Yup.string()
  //     .required("Confirme sua senha.")
  //     .oneOf([Yup.ref("password")], "As senhas não coincidem."),
  //   otherwise: Yup.string().notRequired(),
  // }),
  password2: Yup.string().oneOf(
    [Yup.ref("password"), null],
    "As senhas devem coincidir"
  ),
  email: Yup.string()
    .email("E-mail inválido")
    .required("O e-mail é obrigatório."),
});

export { profileValidation };
