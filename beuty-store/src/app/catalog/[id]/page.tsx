import Card from "@/components/Card";
import FilterCatalog from "@/components/FilterCatalog";
import GoBack from "@/components/goBack";
import MainTitle from "@/components/ui/MainTitle";
import { ProductsUtils } from "@/requests/productsReq";
import { InitialObject } from "@/types/modules";
import React from "react";
import { BaseResponseI, CardData, Brand } from "@/types/modules";

export default async function Page({ params, searchParams }: InitialObject) {
  const search = params?.name;
  let products = await ProductsUtils.getCategoryProducts(searchParams);
  const productList = products?.results ?? [];
  console.log("Текущий searchParams:", searchParams);

  return (
    <section className="catalog-items mb-80 ">
      <div className="main-title bg-gradient relative">
        <div className="arrowLeft absolute left-12 top-4 max-[420px]:left-10 cursor-pointer">
          <GoBack href="/" />
        </div>
        <MainTitle text={search || "Название не задано"} />
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
                <div className="cards w-full flex items-center gap-2 flex-wrap mt-9 lg:overflow-hidden max-lg:overflow-x-auto ">
                  {products?.results?.map((product) => (
                    <div className="cardWords w-full ss" key={product.id}>
                      <Card
                        id={product.id}
                        images={product.images}
                        title={product.name}
                        subtitle={product.subtitle}
                        description={product.description}
                        price={product.price}
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
