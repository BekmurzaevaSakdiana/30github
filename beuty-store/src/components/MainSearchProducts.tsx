"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import axiosInstance from "@/app/axios/axios";
import { CardData } from "../types/modules";
import Card from "@/components/Card";

const MainSearchProduct: React.FC = () => {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("search") || "";
  const [products, setProducts] = useState<CardData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!searchQuery) return; 
    setLoading(true);
    axiosInstance
      .get(`products/?search=${searchQuery}`)
      .then((response) => setProducts(response.data.results))
      .catch((err) => console.error("Error fetching products:", err))
      .finally(() => setLoading(false));
  }, [searchQuery]);

  if (!searchQuery) return null; 

  return (
    <section className="contacts-section">
      <div className="container">
        <div className="cards mt-16 flex items-center justify-around flex-wrap">
          {loading ? (
            <p>Loading...</p>
          ) : products.length ? (
            products.map((product) => (
              <Card
                key={product.id}
                id={product.id}
                images={product.images}
                title={product.name}
                subtitle={product.subtitle}
                description={product.description}
                price={product.price}
                discount={product.discount_price}
              />
            ))
          ) : (
            <p className="text-gray-500 text-xl mt-12 text-center">
              Нет товаров для этого поиска.
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default MainSearchProduct;
