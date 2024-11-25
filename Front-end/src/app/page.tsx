"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { loginSchemaYup } from "./loginSchemaYup";
import { useLogin } from "@/context/loginContext";

interface LoginProps {
  email: string;
  password: string;
}

export default function LoginPage() {
  const [isClient, setIsClient] = useState(false);
  const { login } = useLogin();
  const router = useRouter();

  const handleLogin = async (loginData: LoginProps) => {
    try {
      await login(loginData);
      router.push("/home");
    } catch (error: any) {
      console.error("Erro ao configurar a requisição:", error.message);
    }
  };

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    isClient && (
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
                  <Button type="submit" className="w-full">
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
    )
  );
}
