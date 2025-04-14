import React from "react";
import Card from "@/components/Card";
import GoBack from "@/components/goBack";
import { ProductsUtils } from "@/requests/productsReq";
import MainTitle from "@/components/ui/MainTitle";
import { BaseResponseI, CardData } from "@/types/modules";
import Pagination from "@/components/Pagination";
import { BrandUtils } from "@/requests/brandsReq";

interface PageProps {
  searchParams: { name?: string; page?: string };
  params: { id: number };
}

export default async function Page({ searchParams, params }: PageProps) {
  const brandsId = await BrandUtils.getBrandById(params.id);
    const brandName = brandsId?.name ?? "Категория не найдена";
    
    const page = Number(
      typeof searchParams?.page === "string" ? searchParams.page : "1"
    );
  
  const limit = 9;
  const offset = (page - 1) * limit;

  let productsByBrands: BaseResponseI<CardData[]> | null | undefined = null;
  productsByBrands = await ProductsUtils.getProductByBrand(
    params.id,
    limit,
    offset
  );

  const showPagination =
    productsByBrands?.count && productsByBrands.count >= limit;

  return (
    <section className="contacts-section">
      <div className="main-title bg-gradient relative">
        <div className="arrowLeft absolute left-12 top-4 max-[420px]:left-10 cursor-pointer">
          <GoBack />
        </div>
        <MainTitle text={brandName ?? "Продукты"} />
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
        {showPagination && (
          <Pagination
            next={productsByBrands?.next}
            back={productsByBrands?.previous}
            limit={limit}
          />
        )}
      </div>
    </section>
  );
}
