"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

import { toast } from "@/hooks/use-toast";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { profileValidation } from "./schemaYup";
import api from "@/services/api";
import { Label } from "@/components/ui/label";
import { ClientModel } from "@/domain/Client/types";
import { useEffect, useState } from "react";

export default function ProfileChangePage() {
  const [initialValues, setInitialValues] = useState<ClientModel | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const idUser = localStorage.getItem("idUser");
      try {
        const response = await api.get(`/profile/${idUser}`);
        setInitialValues(response.data);
      } catch (error) {
        console.error("Erro ao buscar os dados do perfil:", error);
      }
    };
    fetchProfile();
  }, []);

  const handlerProfile = async (values: ClientModel) => {
    try {
      const { status } = await api.put("/api/profile", values); // Endpoint para atualizar os dados
      toast({
        title: "Perfil atualizado",
        description: "Seu perfil foi atualizado com sucesso.",
      });
    } catch (error) {
      console.error("Erro ao atualizar o perfil:", error);
      alert("Erro ao atualizar o perfil.");
    }
  };

  if (!initialValues)
    return (
      <div className="flex justify-center items-start h-screen">
        Carregando...
      </div>
    );

  return (
    <div className="sm:ml-14 container mx-auto px-4 py-8">
      <Formik
        initialValues={initialValues}
        validationSchema={profileValidation}
        onSubmit={handlerProfile}
      >
        {({ handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
            <Card>
              <CardHeader>
                <CardTitle>Dados da sua conta</CardTitle>
                <CardDescription>
                  Aqui você pode alterar e visualizar as informações da sua
                  conta
                  <Button className="ml-96" type="submit">
                    Salvar alterações
                  </Button>
                </CardDescription>
              </CardHeader>
              <CardContent className=" space-y-4">
                <div className="flex space-x-4">
                  <div className="flex-1">
                    <Label htmlFor="firstName">Primeiro Nome</Label>
                    <Field
                      name="firstName"
                      type="text"
                      placeholder="Digite seu primeiro nome"
                      as={Input}
                    />
                    <ErrorMessage
                      name="firstName"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>

                  <div className="flex-1">
                    <Label htmlFor="lastName">Sobrenome</Label>
                    <Field
                      name="lastName"
                      type="text"
                      placeholder="Digite seu sobrenome"
                      as={Input}
                    />
                    <ErrorMessage
                      name="lastName"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>
                </div>

                <div className="flex space-x-4">
                  <div className="flex-1">
                    <Label htmlFor="email">E-mail</Label>
                    <Field
                      name="email"
                      type="email"
                      placeholder="Digite seu e-mail"
                      as={Input}
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>

                  <div className="flex-1">
                    <Label htmlFor="cpf">CPF</Label>
                    <Field
                      name="cpf"
                      type="text"
                      placeholder="Digite seu CPF"
                      as={Input}
                    />
                    <ErrorMessage
                      name="cpf"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>
                </div>

                <div className="w-1/2">
                  <Label htmlFor="phoneNumber">Telefone</Label>
                  <Field
                    name="phoneNumber"
                    type="text"
                    placeholder="Digite seu telefone"
                    as={Input}
                  />
                  <ErrorMessage
                    name="phoneNumber"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>

                <div className="flex space-x-4">
                  <div className="flex-1">
                    <Label htmlFor="registerBorn">Data de Nascimento</Label>
                    <Field name="registerBorn" type="date" as={Input} />
                    <ErrorMessage
                      name="registerBorn"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>

                  <div className="flex-1">
                    <Label htmlFor="registerDate">Data de Registro</Label>
                    <Field
                      name="registerDate"
                      type="date"
                      as={Input}
                      disabled
                    />
                  </div>
                </div>
                <div className="flex-1">
                  <Label>Redefinir senha</Label>
                  <hr />
                </div>
                <div className="flex space-x-2">
                  <div className="flex-1">
                    <Label htmlFor="password">Nova senha</Label>
                    <Field
                      name="password"
                      type="password"
                      placeholder="Digite sua senha"
                      as={Input}
                    />
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>
                  <div className="flex-1">
                    <Label htmlFor="password2">Confirmar senha</Label>
                    <Field
                      name="password2"
                      type="password2"
                      placeholder="Digite novamentes"
                      as={Input}
                    />
                    <ErrorMessage
                      name="password2"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </Form>
        )}
      </Formik>
    </div>
  );
}
