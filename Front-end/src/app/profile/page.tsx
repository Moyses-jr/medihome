"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { format } from "date-fns";
// import { Calendar as CalendarIcon } from "lucide-react";
import { FaCalendarDays } from "react-icons/fa6";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { toast } from "@/hooks/use-toast";
import { Formik } from "formik";
import { formSchemaa } from "./schemaYup";

interface registerProps {
  name: string;
  email: string;
  password: string;
  password2: string;
}

const formSchema = z.object({
  nome: z.string().min(2).max(50),
  cpf: z.string().length(11).regex(/^\d+$/, "CPF apenas número."),
  dataNascimento: z.date(),
  cnpj: z.string().length(14).regex(/^\d+$/, "CNPJ apenas número."),
  registroConselho: z.string().length(15),
  dataVencimentoRegistro: z.date(),
  celnumber: z
    .string()
    .length(11)
    .regex(/^\d+$/, "O número de celular não exite."),
  typePro: z
    .string()
    .length(1)
    .regex(/^\d+$/, "O tipo de profissional deve ser definido"),
});

export default function ProfileChangePage() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nome: "",
      cpf: "",
      cnpj: "",
      registroConselho: "",
      dataVencimentoRegistro: undefined,
      celnumber: "",
      typePro: "",
    },
  });

  const handlerSubmit = (values: any) => {
    console.log(values);
    toast({
      title: "Perfil atualizado",
      description: "Seu perfil foi atualizado com sucesso.",
    });
  };

  return (
    <div className="container mx-auto px-4 py-8 ">
      <Formik
        initialValues={{
          email: "",
          name: "",
          password: "",
          password2: "",
        }}
        validationSchema={formSchemaa}
        onSubmit={handlerSubmit}
      >
        <Form {...form}>
          <Card>
            <CardHeader>
              <CardTitle>Dados da sua conta</CardTitle>
              <CardDescription>
                Aqui você pode alterar e visualizar as informações da sua conta
                <Button className="ml-96" type="submit">
                  Salvar alterações
                </Button>
              </CardDescription>
            </CardHeader>
            <div className="flex">
              <CardContent className="w-1/2">
                <FormField
                  control={form.control}
                  name="nome"
                  render={({ field }) => (
                    <FormItem className="pb-3">
                      <FormLabel>Nome</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="cpf"
                  render={({ field }) => (
                    <FormItem className="pb-3">
                      <FormLabel>CPF</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="dataNascimento"
                  render={({ field }) => (
                    <FormItem className="flex flex-col pb-3">
                      <FormLabel>Data Nascimento</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-[240px] pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value && format(field.value, "MM/dd/yyyy")}
                              <FaCalendarDays className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) =>
                              date > new Date() || date < new Date("1900-01-01")
                            }
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="cnpj"
                  render={({ field }) => (
                    <FormItem className="pb-3">
                      <FormLabel>CNPJ</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>{" "}
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
              <CardContent className="w-1/2">
                <FormField
                  control={form.control}
                  name="registroConselho"
                  render={({ field }) => (
                    <FormItem className="pb-3">
                      <FormLabel>Registro do Conselho</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="dataVencimentoRegistro"
                  render={({ field }) => (
                    <FormItem className="flex flex-col pb-3">
                      <FormLabel>Data de vencimento registro</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-[240px] pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value && format(field.value, "MM/dd/yyyy")}
                              <FaCalendarDays className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) => date < new Date()}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="celnumber"
                  render={({ field }) => (
                    <FormItem className="pb-3">
                      <FormLabel>Número do celular</FormLabel>
                      <FormControl>
                        <Input placeholder="996894848" {...field} />
                      </FormControl>{" "}
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="typePro"
                  render={({ field }) => (
                    <FormItem className="pb-3">
                      <FormLabel>Tipo de profissional</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </div>
          </Card>
        </Form>
      </Formik>
    </div>
  );
}
