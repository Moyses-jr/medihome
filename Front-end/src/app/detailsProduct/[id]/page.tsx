"use client";

import { useState } from "react";
import Image from "next/image";
import { Star, Plus, Minus, ShoppingCart } from "lucide-react";
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const product = {
  id: 1,
  name: "Premium Wireless Headphones",
  price: 199.99,
  rating: 4.5,
  reviewCount: 128,
  description:
    "Experience crystal-clear audio with our premium wireless headphones. Featuring advanced noise-cancellation technology, comfortable over-ear design, and long-lasting battery life.",
  features: [
    "40mm dynamic drivers for superior sound quality",
    "Active Noise Cancellation (ANC) technology",
    "Up to 30 hours of battery life",
    "Bluetooth 5.0 for stable connectivity",
    "Comfortable memory foam ear cushions",
    "Built-in microphone for calls",
  ],
  images: [
    "/placeholder.svg?height=400&width=400",
    "/placeholder.svg?height=400&width=400",
    "/placeholder.svg?height=400&width=400",
  ],
};

// Mock review data
const reviews = [
  {
    id: 1,
    author: "John D.",
    rating: 5,
    comment:
      "Excellent sound quality and very comfortable for long listening sessions.",
    date: "2023-05-15",
  },
  {
    id: 2,
    author: "Sarah M.",
    rating: 4,
    comment: "Great headphones, but the app could use some improvements.",
    date: "2023-05-10",
  },
  {
    id: 3,
    author: "Mike R.",
    rating: 5,
    comment:
      "The noise cancellation is fantastic! Perfect for my daily commute.",
    date: "2023-05-05",
  },
];

interface ProdutoDetalhesProps {
  params: {
    id: string; // Tipando como string, já que o id da URL é uma string
  };
}

export default function ProductDetails({ params }: ProdutoDetalhesProps) {
  const { id } = params;
  const [quantity, setQuantity] = useState(1);

  const incrementQuantity = () => setQuantity((prev) => prev + 1);
  const decrementQuantity = () =>
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div className="aspect-square relative overflow-hidden rounded-lg">
            <Image
              src={product.images[0]}
              alt={product.name}
              layout="fill"
              objectFit="cover"
              className="w-full h-full object-center"
            />
          </div>
          <div className="grid grid-cols-3 gap-4">
            {product.images.slice(1).map((image, index) => (
              <div
                key={index}
                className="aspect-square relative overflow-hidden rounded-lg"
              >
                <Image
                  src={image}
                  alt={`${product.name} - Image ${index + 2}`}
                  layout="fill"
                  objectFit="cover"
                  className="w-full h-full object-center"
                />
              </div>
            ))}
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
              ({product.reviewCount} reviews)
            </span>
          </div>
          <p className="text-3xl font-bold">${product.price.toFixed(2)}</p>
          <p className="text-gray-600">{product.description}</p>
          <div className="flex items-center space-x-4">
            <div className="flex items-center border rounded-md">
              <Button variant="outline" size="icon" onClick={decrementQuantity}>
                <Minus className="h-4 w-4" />
              </Button>
              <span className="px-4">{quantity}</span>
              <Button variant="outline" size="icon" onClick={incrementQuantity}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <Button className="flex-1">
              <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
            </Button>
          </div>
        </div>
      </div>

      <Tabs defaultValue="details" className="mt-12">
        <TabsList>
          <TabsTrigger value="details">Product {id} Details</TabsTrigger>
          <TabsTrigger value="reviews">Reviews</TabsTrigger>
        </TabsList>
        <TabsContent value="details">
          <Card>
            <CardHeader>
              <CardTitle>Features</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5 space-y-2">
                {product.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="reviews">
          <Card>
            <CardHeader>
              <CardTitle>Customer Reviews</CardTitle>
              <CardDescription>
                Read what our customers are saying about this product
              </CardDescription>
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
                Load More Reviews
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
