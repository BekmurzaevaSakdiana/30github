"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation"; // для получения параметров из URL
import axiosInstance from "@/app/axios/axios"; // импортируем axios для запроса
import { CardData } from "@/components/Cards"; 
import Card from "@/components/Card"; 

const MainSearchProduct: React.FC = () => {
  const searchParams = useSearchParams(); // получаем параметры из URL
  const searchQuery = searchParams.get("search") || ""; // получаем значение параметра search
  const [products, setProducts] = useState<CardData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const getProducts = async (query: string) => {
    if (!query) return; // если нет параметра поиска, не выполняем запрос
    setLoading(true);
    try {
      const response = await axiosInstance.get(`products/?search=${query}`);
      setProducts(response.data.results); // axios уже парсит JSON, используем response.data
    } catch (err) {
      console.error("Error fetching products:", err);
    } finally {
      setLoading(false);
    }
  };
  

  useEffect(() => {
    if (searchQuery) {
      getProducts(searchQuery); // делаем запрос при изменении search параметра
    }
  }, [searchQuery]);

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
