import Card from "@/components/Card";
import FilterCatalog from "@/components/FilterCatalog";
import GoBack from "@/components/goBack";
import Pagination from "@/components/Pagination";
import MainTitle from "@/components/ui/MainTitle";
import { CategoryUtils } from "@/requests/categoryReq";
import { ProductsUtils } from "@/requests/productsReq";
import React from "react";

type PageProps = {
  params: { id: string };
  searchParams?: { [key: string]: string | string[] | undefined };
};

const Page = async ({ params, searchParams }: PageProps) => {
  const categoriesId = await CategoryUtils.getCategoryById(params.id);
  const categoryName = categoriesId?.name ?? "Категория не найдена";

  const cleanSearchParams: Record<string, string> = Object.fromEntries(
    Object.entries(searchParams || {}).map(([key, value]) => [
      key,
      Array.isArray(value) ? value[0] : value ?? "",
    ])
  );

  const page = Number(searchParams?.page || 1);
  const limit = 4;
  const offset = (page - 1) * limit;
  const products = await ProductsUtils.getFilteredProducts(
    cleanSearchParams,
    limit,
    offset
  );

  const showPagination = products?.results?.length;

  return (
    <section className="catalog-items mb-80">
      <div className="main-title bg-gradient relative">
        <div className="arrowLeft absolute left-12 top-4 max-[420px]:left-10 cursor-pointer">
          <GoBack href="/" />
        </div>
      </div>

      <MainTitle text={categoryName} />

      <div className="container px-0">
        <div className="filterCatalog__products px-14 flex max-xl:items-center items-baseline justify-between gap-12 max-xl:flex-col max-xl:gap-20 max-xl:px-14">
          <FilterCatalog
            params={params}
            searchParams={cleanSearchParams}
            name={categoryName}
          />

          <div className="twoSection__products w-full max-lg:flex-col">
            <div className="products2 flex-grow mt-20 w-full max-lg:max-3xl">
              <div className="productsItems">
                <div className="products-title flex items-center gap-8 max-lg:flex-col max-xl:items-start">
                  <h2 className="font-bold text-4xl">Товары</h2>
                </div>

                <div className="cards w-full gap-2 grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] mt-9 lg:overflow-hidden max-lg:overflow-x-auto">
                  {products?.results?.length ? (
                    products.results.map((product) => (
                      <div key={product.id}>
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
                    ))
                  ) : (
                    <div className="flex items-center justify-center">
                      <p className="text-center font-bold text-2xl mt-24 text-gray-400">
                        Товары не найдены
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {showPagination && (
                <Pagination
                  next={products?.next}
                  back={products?.previous}
                  limit={limit}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Page;
