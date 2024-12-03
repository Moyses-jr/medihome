"use client";

import { useState } from "react";
import Image from "next/image";
import { Star, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import products from "@/app/home/listProduct";
import api from "@/services/api";
import { useRouter } from "next/navigation";
import { ClientModel } from "@/domain/Client/types";

const reviews = [
  {
    id: 1,
    author: "John D.",
    rating: 5,
    comment: "Topper o serviço.",
    date: "2023-05-15",
  },
  {
    id: 2,
    author: "Sarah M.",
    rating: 4,
    comment: "O valor é um pouco auto, mas recomendo.",
    date: "2023-05-10",
  },
  {
    id: 3,
    author: "Mike R.",
    rating: 5,
    comment: "Muito bom.",
    date: "2023-05-05",
  },
];

export default function ProductDetails({
  params,
}: {
  params: { idProfesional: string };
}) {
  const [user, setUser] = useState<ClientModel>();
  const { idProfesional } = params;
  const product = products.find(
    (product) => product.id === Number(idProfesional)
  );
  const router = useRouter();

  if (!product) {
    return (
      <div className="flex justify-center items-start h-screen">
        <p>Produto não encontrado.</p>;
      </div>
    );
  }

  const handlerBuy = async () => {
    const idUser = localStorage.getItem("idUser");

    try {
      const { data: userData } = await api.get<ClientModel>(
        `/Client/u/${idUser}`
      );

      setUser(userData);
    } catch (error: any) {
      if (error.status === 404) {
        router.push("/registerClient");
      } else {
        console.log("Erro:", error.response.data);
      }
      return;
    }

    if (user) {
      try {
        const { data: userData } = await api.post(
          `professional/${idProfesional}/clients/${user.idClient}`
        );
      } catch (error: any) {
        console.log("Erro:", error.response.data);
      }
    }
  };

  return (
    <div className="sm:ml-14 container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div className="aspect-square relative overflow-hidden rounded-lg h-3/5">
            <Image
              src={product.image}
              alt={product.name}
              layout="fill"
              objectFit="cover"
              className="w-full h-full object-center"
            />
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="aspect-square relative overflow-hidden rounded-lg">
              <Image
                src={product.image}
                alt={`${product.name} detalhes`}
                layout="fill"
                objectFit="cover"
                className="w-full h-full object-center"
              />
            </div>
          </div>
        </div>
        <div className="space-y-6">
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <div className="flex items-center space-x-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-5 h-5 ${
                    i < Math.floor(product.rating)
                      ? "text-yellow-400 fill-current"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-gray-600">
              ({product.reviewCount} avaliações)
            </span>
          </div>
          <p className="text-3xl font-bold">${product.price.toFixed(2)}</p>
          <p className="text-gray-600">{product.description}</p>
          <div className="flex items-center space-x-4">
            <Button className="flex-1" onClick={handlerBuy}>
              <ShoppingCart className="mr-2 h-4 w-4" /> Contratar
            </Button>
          </div>
        </div>
      </div>

      <Tabs defaultValue="details" className="mt-12">
        <TabsList>
          <TabsTrigger value="details">
            Detalhes do profissional {idProfesional}
          </TabsTrigger>
          <TabsTrigger value="reviews">Avaliações</TabsTrigger>
        </TabsList>
        <TabsContent value="details">
          <Card>
            <CardHeader>
              <CardTitle>Sobre o mim</CardTitle>
            </CardHeader>
            <CardContent>{product.about}</CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="reviews">
          <Card>
            <CardHeader>
              <CardTitle>Avaliações dos Clientes</CardTitle>
              <CardDescription>Veja o opiniões sobre o serviço</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {reviews.map((review) => (
                  <div
                    key={review.id}
                    className="border-b pb-4 last:border-b-0"
                  >
                    <div className="flex items-center space-x-4">
                      <Avatar>
                        <AvatarFallback>{review.author[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold">{review.author}</p>
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < review.rating
                                  ? "text-yellow-400 fill-current"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <span className="text-sm text-gray-500 ml-auto">
                        {review.date}
                      </span>
                    </div>
                    <p className="mt-2 text-gray-600">{review.comment}</p>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                Carregar mais avaliações
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
