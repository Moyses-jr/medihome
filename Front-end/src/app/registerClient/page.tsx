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
import { useRouter } from "next/navigation";
import { Formik, Form, Field, ErrorMessage } from "formik";
import api from "@/services/api";
import { useLogin } from "@/context/loginContext";
import { useToast } from "@/hooks/use-toast";
import { validationClient } from "./shemaYup";
import { requestProps } from "@/domain/Client/types";

export default function Register() {
  const { logout } = useLogin();
  const { toast } = useToast();
  const router = useRouter();

  const handleSubmit = async (e: requestProps) => {
    let dataUser: requestProps = {
      registerDate: new Date().toISOString().split("T")[0],
      ...e,
    };
    try {
      const { data } = await api.get<requestProps>(
        `Users/${localStorage.getItem("idUser")}`
      );
      dataUser = { ...dataUser, ...data };
    } catch (error: any) {
      if (error.status === 404) {
        logout();
        router.push("/");
      } else {
        console.log(error.reponse);
        toast({
          title: "Erro ao buscar seu dados",
          variant: "destructive",
        });
        return;
      }
    }

    try {
      const { status } = await api.post(`Client`, { ...dataUser });
      if (status === 200) {
        toast({
          title: "Cadastro finalizado com sucesso",
        });
        router.back();
      }
    } catch (error: any) {
      console.log(error.reponse);
      toast({
        title: "Erro ao finalizar seu cadastro",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Finalizar Cadastro
          </CardTitle>
          <CardDescription className="text-center">
            Para contratar um professional é necessários mais algumas
            informações suas:
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Formik
            initialValues={{
              cpf: "",
              phoneNumber: "",
              firstName: "",
              lastName: "",
              registerBorn: null,
            }}
            onSubmit={handleSubmit}
            validationSchema={validationClient}
          >
            {({ handleSubmit }) => (
              <Form onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="Cpf">CPF</Label>
                    <Field
                      name="cpf"
                      type="text"
                      placeholder="Digite o CPF"
                      as={Input}
                    />
                    <ErrorMessage
                      name="cpf"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phoneNumber">Telefone</Label>
                    <Field
                      name="phoneNumber"
                      type="text"
                      placeholder="Digite o telefone"
                      as={Input}
                    />
                    <ErrorMessage
                      name="phoneNumber"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="registerBorn">Data de Nascimento</Label>
                    <Field name="registerBorn" type="date" as={Input} />
                    <ErrorMessage
                      name="registerBorn"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>
                </div>

                <CardFooter className="flex flex-col space-y-4 my-10">
                  <Button type="submit" className="w-full">
                    Finalizar
                  </Button>
                </CardFooter>
              </Form>
            )}
          </Formik>
        </CardContent>
      </Card>
    </div>
  );
}
