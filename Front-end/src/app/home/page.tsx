"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import esg from "../../assets/esgProfisional.jpeg";
import prom from "../../assets/promissora.jpg";
import loira from "../../assets/loriraDe_rosa.jpg";
import medico from "../../assets/medicoFerramenta.jpg";
import loira2 from "../../assets/loiraDiferenciada.jpg";
import lei from "../../assets/retrato_profissional_de_advogado.jpg";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import Link from "next/link";

const products = [
  {
    id: 1,
    name: "Marta Machado",
    price: 199.99,
    image: esg,
  },
  {
    id: 2,
    name: "Carlos Jeans",
    price: 59.99,
    image: lei,
  },
  {
    id: 3,
    name: "João Sneakers",
    price: 89.99,
    image: medico,
  },
  {
    id: 4,
    name: "Paula Nunes",
    price: 24.99,
    image: loira,
  },
  {
    id: 5,
    name: "Louissa Hoodie",
    price: 49.99,
    image: prom,
  },
  {
    id: 6,
    name: "Amanda Backpack",
    price: 79.99,
    image: loira2,
  },
];

export default function ProductCatalog() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("name");

  const filteredAndSortedProducts = products
    .filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortOrder === "price-asc") return a.price - b.price;
      if (sortOrder === "price-desc") return b.price - a.price;
      return a.name.localeCompare(b.name);
    });

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Profissionais disponíveis</h1>

      <div className="flex flex-col sm:flex-row justify-between items-center mb-8 space-y-4 sm:space-y-0 sm:space-x-4">
        <Input
          type="search"
          placeholder="Buscar profissional..."
          className="max-w-sm"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Select value={sortOrder} onValueChange={setSortOrder}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Ordenar por" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="name">Nome</SelectItem>
            <SelectItem value="price-asc">Preços mais baixos</SelectItem>
            <SelectItem value="price-desc">Preços mais altos</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAndSortedProducts.map((product) => (
          <Card key={product.id}>
            <Link href={`/detailsProduct/${product.id}`} passHref>
              <CardHeader>
                {/* Link para a página de detalhes do produto com base no ID */}
                <Image
                  src={product.image}
                  alt={product.name}
                  width={200}
                  height={200}
                  priority={true}
                  className="w-full h-48 object-cover cursor-pointer"
                />
              </CardHeader>
              <CardContent>
                <CardTitle className="cursor-pointer">{product.name}</CardTitle>
                <p className="text-2xl font-bold mt-2">
                  R${product.price.toFixed(2)}
                </p>
              </CardContent>
            </Link>
          </Card>
        ))}
      </div>
    </div>
  );
}
