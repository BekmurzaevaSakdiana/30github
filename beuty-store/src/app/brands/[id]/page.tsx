import React from "react";
import Card from "@/components/Card";
import GoBack from "@/components/goBack";
import { ProductsUtils } from "@/requests/productsReq";

interface PageProps {
  searchParams: { name?: string };
  params: { id: string };
}

export interface CardData {
  id: number;
  images: { image: string }[];
  name: string;
  subtitle: string;
  description: string;
  price: number;
  discount_price?: string;
}

export interface BaseResponseI<T> {
  count: number;
  next: null | string;
  previous: null | string;
  results: T;
}

export default async function Page({ searchParams, params }: PageProps) {
  let productsByBrands: BaseResponseI<CardData[]> | null = null;
    productsByBrands = await ProductsUtils.getProductByBrand(params.id); 
 
  return (
    <section className="contacts-section">
      <div className="main-title bg-gradient relative">
        <div className="arrowLeft absolute left-12 top-4 max-[420px]:left-10 cursor-pointer">
          <GoBack />
        </div>
        <h1 className="py-16 font-bold text-5xl text-center font-montseratt">
          {searchParams.name ?? "Hello"}
        </h1>
      </div>

      <div className="container mb-16">
        <div className="cards mt-16 flex items-center justify-around flex-wrap ">
          {productsByBrands?.results?.length ? (
            productsByBrands.results.map((product) => (
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
              Нет товаров для этого бренда.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
