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

export default function LoginPage() {
  const [isClient, setIsClient] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = (e: any) => {
    e.preventDefault();

    if (email === "moi@gmail.com" && password === "123") {
      localStorage.setItem("auth", "true");
      router.push("/home");
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
          <form onSubmit={handleLogin}>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">E-mail</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="moyifrs@example.com"
                    required
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Senha</Label>
                  <Input
                    id="password"
                    type="password"
                    required
                    onChange={(e) => setPassword(e.target.value)}
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
          </form>
        </Card>
      </div>
    )
  );
}
