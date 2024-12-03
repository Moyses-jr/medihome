"use server";

import { signIn } from "@/auth";
import { LoginProps } from "@/domain/User/types";

const SignIn = async (loginData: LoginProps) => {
  try {
    const response = await signIn("credentials", loginData);
    if (response) {
      console.log("Login bem-sucedido:", response);
    } else {
      console.error("Erro no login:", response);
    }
  } catch (err) {
    console.error("Erro ao tentar logar:", err);
  }
};

export { SignIn };
