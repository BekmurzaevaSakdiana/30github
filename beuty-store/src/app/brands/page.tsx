import Link from "next/link";
import { BrandUtils } from "@/requests/brandsReq";
import SearchInput from "@/components/SearchInput";
import { InitialObject } from "@/types/modules";
import MainTitle from "@/components/ui/MainTitle";
import { BaseResponseI, Brand } from "@/types/modules";
import React from "react";
import Pagination from "@/components/Pagination";

const BrandsItems = async ({
  searchParams,
}: {
  searchParams: {
    page: string;
    name?: string;
  };
}) => {
  const search = searchParams.name || "";
  let brands: BaseResponseI<Brand[]> | null = null;

  const page = Number(
    typeof searchParams?.page === "string" ? searchParams.page : "1"
  );


  const limit = 20;
  const offset = (page - 1) * limit;

  brands = await BrandUtils.searchBrandsByName({ name: search }, limit, offset);
  const brandList = brands?.results ?? [];
  const showPagination = brands?.count && brands.count >= limit;

  return (
    <section className="contacts-section">
      <MainTitle text="Бренды" />

      <div className="container">
        <div className="brandsItems mt-16">
          <div className="title flex flex-col gap-12">
            <h2 className="font-bold text-3xl max-[500px]:hidden">
              Каталог брендов
            </h2>
            <SearchInput />
            <div className="productsByLetters">
              <div className="firstLetterProduct mt-16 mb-16">
                <div className="all-FirstLetter__products grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-[1145px]:justify-center max-[1145px]:gap-8">
                  {brandList.length > 0 ? (
                    brandList.map((brand: Brand) => (
                      <Link
                        href={`/brands/${brand.id}/?name=${brand.name}`}
                        key={brand.id}
                        className="firstItem overflow-hidden flex flex-col items-center bg-white shadow-lg rounded-xl p-6 gap-4 transition-transform hover:scale-105"
                      >
                        <div className="productLogo w-24 h-24 sm:w-32 sm:h-32 lg:w-40 lg:h-40 flex items-center justify-center overflow-hidden rounded-full bg-gray-100">
                          {brand.logo ? (
                            <img
                              src={brand.logo}
                              alt={brand.name}
                              className="object-cover w-full h-full"
                            />
                          ) : (
                            <span className="text-gray-400 text-sm">
                              Логотип отсутствует
                            </span>
                          )}
                        </div>
                        <div className="productInfo text-center">
                          <h2 className="font-bold text-lg sm:text-xl lg:text-2xl text-black">
                            {brand.name || "Без названия"}
                          </h2>
                        </div>
                      </Link>
                    ))
                  ) : (
                    <p className="text-gray-500 text-xl mt-12 text-center col-span-full">
                      Ничего не найдено.
                    </p>
                  )}
                </div>

                {showPagination && (
                  <Pagination
                    next={brands?.next}
                    back={brands?.previous}
                    limit={limit}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BrandsItems;
