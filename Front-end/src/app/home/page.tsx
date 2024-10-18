"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import esg from "../../assets/esgProfisional.jpeg";
import prom from "../../assets/promissora.jpg";
import loira from "../../assets/loriraDe_rosa.jpg";
import medico from "../../assets/medicoFerramenta.jpg";
import loira2 from "../../assets/loiraDiferenciada.jpg";
import lei from "../../assets/retrato_profissional_de_advogado.jpg";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useRouter } from "next/navigation";
import products from "./listProduct";

export default function ProductCatalog() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("name");

  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("auth");
    if (!isAuthenticated) {
      router.push("/");
    } else {
      setLoading(false);
    }
  }, [router]);

  if (loading) {
    return <p></p>;
  }
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
