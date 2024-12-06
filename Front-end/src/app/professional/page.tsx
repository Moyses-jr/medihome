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
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { Formik, Form, Field, ErrorMessage } from "formik";
import api from "@/services/api";
import { useToast } from "@/hooks/use-toast";
import React, { useState } from "react";
import {
  CreateProfeProps,
  ProfessionalModel,
} from "@/domain/Professional/types";
import { format } from "date-fns";
import { Upload } from "lucide-react";
import Image from "next/image";

export default function Register() {
  const { toast } = useToast();
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [initialValues, setInitialValues] = useState<ProfessionalModel | null>(
    null
  );

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0] || null;
    setFile(selectedFile);

    if (selectedFile) {
      const preview = URL.createObjectURL(selectedFile);
      setPreviewUrl(preview);
    } else {
      setPreviewUrl(null);
    }
  };

  // const fetchProfile = useCallback(async () => {
  //   const idUser = localStorage.getItem("idUser");
  //   try {
  //     const response = await api.get(`/profile/${idUser}`);
  //     setInitialValues(response.data);
  //   } catch (error) {
  //     console.error("Erro ao buscar os dados do perfil:", error);
  //     toast({
  //       title: "Erro ao buscar os dados do perfil:",
  //       variant: "destructive",
  //     });
  //   }
  // }, [toast]);

  // useEffect(() => {
  //   fetchProfile();
  // }, [fetchProfile]);

  const handlerCreatePro = async (values: CreateProfeProps) => {
    setIsUploading(true);
    const idUser = localStorage.getItem("idUser") || "0";
    const data = new FormData();
    data.append("idUser", idUser);
    data.append("cnpj", "00.394.460/0058-87");
    data.append("crm", "123456");
    data.append("expirationCRM", "2030-10-12");
    data.append("professionalType", "M");
    data.append("phoneNumber", "054996894848");
    data.append("registerBorn", "1999-10-29");
    data.append("registerDate", format(new Date(), "yyyy-MM-dd"));

    // Adiciona a imagem ao FormData
    if (file) {
      data.append("image", file);
    }

    try {
      await api.post(`/professional`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // fetchProfile();

      toast({
        title: "Seu perfil foi atualizado com sucesso.",
      });
    } catch (error) {
      console.error("Erro ao atualizar o perfil:", error);
      toast({
        title: "Erro ao atualizar o perfil",
        variant: "destructive",
      });
    }

    setIsUploading(false);
  };

  // if (!initialValues)
  //   return (
  //     <div className="flex justify-center items-start h-screen">
  //       Carregando...
  //     </div>
  //   );

  return (
    <div className="sm:ml-14 container mx-auto px-4 py-8">
      <Formik
        initialValues={{
          cnpj: "",
          crm: "",
          expirationCRM: null,
          professionalType: "",
          phoneNumber: "",
          registerBorn: null,
          registerDate: format(new Date(), "yyyy-MM-dd"),
          image: null,
        }}
        onSubmit={handlerCreatePro}
      >
        {({ handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl font-bold">
                  Bem-vindo a equipe
                </CardTitle>
                <CardDescription>
                  Será um prazer ter você ao nosso lado. Só antes precisamos de
                  mais algumas informações suas para avaliar suas credenciais.
                  <Button
                    className="ml-28"
                    type="submit"
                    disabled={!file || isUploading}
                  >
                    {isUploading ? (
                      <>
                        <Upload className="mr-2 h-4 w-4 animate-spin" />
                        Salvando...
                      </>
                    ) : (
                      <>Cadastrar-se</>
                    )}
                  </Button>
                </CardDescription>
              </CardHeader>
              <CardContent className=" space-y-4">
                <div className="flex space-x-4">
                  <div className="flex-1">
                    <Label htmlFor="email">CNPJ</Label>
                    <Field
                      name="cnpj"
                      type="text"
                      placeholder="Digite seu CNPJ"
                      as={Input}
                    />
                    <ErrorMessage
                      name="cnpj"
                      component="div"
                      className="text-red-500 text-sm"
                    />
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
                </div>

                <div className="flex space-x-4">
                  <div className="flex-1">
                    <Label htmlFor="crm">CRM</Label>
                    <Field
                      name="crm"
                      type="text"
                      placeholder="Digite seu CRM"
                      as={Input}
                    />
                    <ErrorMessage
                      name="crm"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>
                  <div className="flex-1">
                    <Label htmlFor="expirationCRM">
                      Data de expiração do CRM
                    </Label>
                    <Field name="expirationCRM" type="date" as={Input} />
                    <ErrorMessage
                      name="expirationCRM"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>
                </div>

                <div className="flex space-x-4">
                  <div className="grid w-1/2 ">
                    <Label htmlFor="professionalType">
                      Tipo de Profissional
                    </Label>
                    <Field
                      name="professionalType"
                      as="select"
                      className="block w-full mt-1 border rounded-md p-2 text-sm"
                    >
                      <option value="">Selecione um tipo</option>
                      <option value="M">Médico</option>
                      <option value="E">Enfermeiro</option>
                      <option value="C">Cuidador</option>
                      <option value="T">Terapeuta</option>
                    </Field>
                    <ErrorMessage
                      name="professionalType"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>

                  <div className="grid w-1/2 items-center gap-1.5">
                    <Label htmlFor="image" className="text-lg font-medium">
                      Escolher foto do perfil
                    </Label>
                    <div className="flex items-center gap-4">
                      <Input
                        id="image"
                        type="file"
                        accept="image/*"
                        className="cursor-pointer"
                        onChange={handleFileChange}
                      />
                      {previewUrl && (
                        <div className="relative w-16 h-16 rounded-md overflow-hidden">
                          <Image
                            src={previewUrl}
                            alt="Preview"
                            className="object-cover w-full h-full"
                            width={100}
                            height={100}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex-1 w-1/2">
                  <Label htmlFor="registerBorn">Data de Nascimento</Label>
                  <Field name="registerBorn" type="date" as={Input} />
                  <ErrorMessage
                    name="registerBorn"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>

                <div className="flex-1 w-1/2">
                  <Label htmlFor="registerDate">Data de Registro</Label>
                  <Field name="registerDate" type="date" as={Input} disabled />
                </div>
              </CardContent>
            </Card>
          </Form>
        )}
      </Formik>
    </div>
  );
}
