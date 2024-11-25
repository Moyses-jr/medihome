"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { validationSchema } from "./schemaYup";
import api from "@/services/api";

interface registerProps {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  password2: string;
}

interface requestProps {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  id: number;
  isActive: boolean;
}

export default function Register() {
  const [isClient, setIsClient] = useState(false);
  const Router = useRouter();

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleSubmit = async (values: registerProps) => {
    const { password2, ...rest } = values;

    const data: requestProps = {
      id: 0,
      ...rest,
      isActive: true,
    };

    try {
      const response = await api.post("/Users", data);
      console.log("Resposta do servidor:", response.data);
      Router.push("/");
    } catch (error: any) {
      if (error.response) {
        console.error("Erro no servidor:", error.response.data);
        console.error("Código de status:", error.response.status);
      } else if (error.request) {
        console.error("Nenhuma resposta recebida:", error.request);
      } else {
        console.error("Erro ao configurar a requisição:", error.message);
      }
    }
  };

  return (
    isClient && (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">
              Cadastro
            </CardTitle>
            <CardDescription className="text-center">
              Para se cadastrar inseria as informações solicitadas abaixo
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Formik
              initialValues={{
                email: "",
                firstName: "",
                lastName: "",
                password: "",
                password2: "",
              }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ handleSubmit }) => (
                <Form onSubmit={handleSubmit}>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">E-mail</Label>
                      <Field
                        name="email"
                        type="email"
                        placeholder="moyifrs@example.com"
                        as={Input}
                      />
                      <ErrorMessage
                        name="email"
                        component="div"
                        className="text-red-500 text-sm"
                      />
                    </div>
                    <div className="flex space-x-2">
                      <div className="flex-1 mr-1 ">
                        <Label htmlFor="name">Nome</Label>
                        <Field
                          name="firstName"
                          type="text"
                          placeholder="Nome aqui"
                          as={Input}
                        />
                        <ErrorMessage
                          name="firstName"
                          component="div"
                          className="text-red-500 text-sm"
                        />
                      </div>
                      <div className="flex-1">
                        <Label htmlFor="name">Sobrenome</Label>
                        <Field
                          name="lastName"
                          type="text"
                          placeholder="Sobrenome aqui"
                          as={Input}
                        />
                        <ErrorMessage
                          name="lastName"
                          component="div"
                          className="text-red-500 text-sm"
                        />
                      </div>
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
                    <div className="space-y-2">
                      <Label htmlFor="password2">Confirmar senha</Label>
                      <Field
                        name="password2"
                        type="password"
                        placeholder="Confirme sua senha"
                        as={Input}
                      />
                      <ErrorMessage
                        name="password2"
                        component="div"
                        className="text-red-500 text-sm"
                      />
                    </div>
                  </div>
                  <CardFooter className="flex flex-col space-y-4 my-10">
                    <Button type="submit" className="w-full">
                      Cadastrar
                    </Button>
                  </CardFooter>
                </Form>
              )}
            </Formik>
          </CardContent>
        </Card>
      </div>
    )
  );
}
