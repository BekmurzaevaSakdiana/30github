import Card from "@/components/Card";
import FilterCatalog from "@/components/FilterCatalog";
import GoBack from "@/components/goBack";
import MainTitle from "@/components/ui/MainTitle";
import { ProductsUtils } from "@/requests/productsReq";
import { InitialObject } from "@/types/modules";
import { useSearchParams } from "next/navigation";
import React from "react";

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

export default async function Page({ params, searchParams }: InitialObject) {
  const search = searchParams.name;
  let products: BaseResponseI<Brand[]> | null = null;
  products = await ProductsUtils.getCategoryProducts(searchParams);
  const productList = products?.results ?? [];

  return (
    <section className="catalog-items mb-80 ">
      <div className="main-title bg-gradient relative">
        <div className="arrowLeft absolute left-12 top-4 max-[420px]:left-10 cursor-pointer">
          <GoBack href="/" />
        </div>
        <MainTitle text={searchParams?.name}/>
      </div>

      <div className="container px-0 ">
        <div className="filterCatalog__products px-14 flex items-baseline justify-between gap-12 max-xl:flex-col  max-xl:gap-20 max-xl:px-14">
          <FilterCatalog
            params={params}
            searchParams={searchParams}
            name={searchParams?.name}
          />

          <div className="twoSection__products w-full max-lg:flex-col">
            <div className="products2 flex-grow mt-20 max-w-4xl w-full max-lg:max-3xl">
              <div className="productsItems">
                <div className="products-title flex items-center gap-8 max-lg:flex-col max-xl:items-start">
                  <h2 className="font-bold text-4xl">Товары</h2>
                </div>
                <div className="cards w-full grid grid-cols-3 gap-8 mt-9 lg:overflow-hidden lg:grid-cols-3 max-lg:flex max-lg:gap-4 max-lg:overflow-x-auto max-lg:grid-cols-none">
                  {products?.results?.map((product) => (
                    <div className="cardWords w-full ss" key={product.id}>
                      <Card
                        id={product.id}
                        images={product.images}
                        title={product.name}
                        subtitle={product.subtitle}
                        description={product.description}
                        discount={product.discount_price}
                      />
                    </div>
                  ))}
                </div>
              </div>
              <div className="pagination flex items-center gap-4 mt-24 justify-center">
                <div className="left">
                  <img src="/svg/left.png" alt="" />
                </div>
                <div className="value flex items-center gap-5"></div>
                <div className="right">
                  <img src="/svg/right.png" alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
