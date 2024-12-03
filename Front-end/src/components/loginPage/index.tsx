"use client";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { Checkbox } from "@/components/ui/checkbox";
import { loginSchemaYup } from "./loginSchemaYup";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { useLogin } from "@/context/loginContext";

interface LoginCredentials {
  email: string;
  password: string;
}

export function LoginPage() {
  const router = useRouter();
  const { toast } = useToast();
  const { login } = useLogin();

  const handleLogin = async (credentials: LoginCredentials) => {
    try {
      const idUser = await login(credentials);

      if (idUser) {
        router.push("/home");
        return;
      }
      toast({
        title: "Usuário ou senha incorretos.",
        variant: "destructive",
      });
    } catch (error: any) {
      console.error("Erro ao realizar login:", error.message);
      throw new Error(
        error.response?.data?.message || "Erro ao realizar login"
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Acesso
          </CardTitle>
          <CardDescription className="text-center">
            Inseria abaixo seu e-mail e senha
          </CardDescription>
        </CardHeader>
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validationSchema={loginSchemaYup}
          onSubmit={handleLogin}
        >
          {({ handleSubmit }) => (
            <Form onSubmit={handleSubmit}>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">E-mail</Label>
                    <Field
                      name="email"
                      type="email"
                      placeholder="Seu email"
                      as={Input}
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Senha</Label>
                    <Field
                      name="password"
                      type="password"
                      placeholder="Sua senha"
                      as={Input}
                    />
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="remember" />
                    <Label htmlFor="remember">Lembrar de mim</Label>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col space-y-4">
                <Button formMethod="POST" type="submit" className="w-full">
                  Entrar
                </Button>
                <div className="text-sm text-center space-y-2">
                  <Link
                    href="/forgot-password"
                    className="text-primary hover:underline"
                  >
                    Esqueceu a senha?
                  </Link>
                  <div>
                    Não tem conta?{" "}
                    <Link
                      href="/register"
                      className="text-primary hover:underline"
                    >
                      Cadastrar-se agora
                    </Link>
                  </div>
                </div>
              </CardFooter>
            </Form>
          )}
        </Formik>
      </Card>
    </div>
  );
}
