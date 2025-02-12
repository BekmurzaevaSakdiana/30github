"use client";
import { useEffect, useState } from "react";
import Range from "./Range";
import { BrandUtils } from "@/requests/brandsReq";
import axiosInstance from "@/app/axios/axios";

interface FilterCatalogProps {
  params: {
    id: string;
  };
  searchParams: any;
  name?: string;
}

const FilterCatalog = ({ params, searchParams, name }: FilterCatalogProps) => {
  const [allBrands, setAllBrands] = useState<{
    results: { name: string }[];
  } | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [subCategory, setSubCategory] = useState<string[]>([]);

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const brands = await BrandUtils.getBrandsByCategory(params.id);
        setAllBrands(brands);
      } catch (error) {
        console.error("Ошибка при загрузке брендов", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBrands();
  }, []);
  console.log(allBrands);

  useEffect(() => {
    const fetchSubCategories = async () => {
      try {
        const { data } = await axiosInstance.get(
          `/subcategory/?category=${params.id}`
        );
        setSubCategory(data.results);
      } catch (error) {
        console.error("Ошибка при загрузке", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSubCategories();
  }, [params.id]);
  console.log(subCategory);

  return (
    <div className="catalogItems mt-10">
      <div className="container">
        <div className="aside__products">
          <aside className="max-w-60 w-full border-r-2 max-xl:border-none max-xl:max-w-32">
            <div className="aside-title flex items-center gap-4">
              <h2 className="font-bold text-4xl">Фильтр</h2>
              <button className="underline text-sm" type="submit">
                Поиск
              </button>
              <img
                className="w-6 hidden max-lg:block"
                src="/svg/down.png"
                alt=""
              />
            </div>

            <form className="max-xl:hidden">
              <div className="typeof">
                <p className="font-bold text-lg mt-8">{name}</p>

                <div className="checkbox flex flex-col  gap-3 mt-3">
                  {loading ? (
                    <p>Загрузка...</p>
                  ) : subCategory.length > 0 ? (
                    subCategory.map((item, index) => (
                      <div
                        key={index}
                        className="checkbox flex items-center gap-3 mt-3"
                      >
                        <input className="px-4" type="checkbox" />
                        <label>
                          <p className="text-sm font-normal">{item.name}</p>
                        </label>
                      </div>
                    ))
                  ) : (
                    <p>Нет доступных подкатегорий</p>
                  )}

                 
                </div>
                <div className="line mt-6 border-b-2 w-[240px]"></div>
              </div>

              <div className="price">
                <p className="font-bold text-lg mt-8">Цена</p>
                <Range />
                <div className="line mt-6 border-b-2 w-[240px]"></div>
              </div>

              <div className="brands">
                <p className="font-bold text-lg mt-8">Бренд</p>
                {loading ? (
                  <p>Загрузка...</p>
                ) : allBrands?.results.length > 0 ? (
                  allBrands?.results?.map((brand, index) => (
                    <div
                      key={index}
                      className="checkbox flex items-center gap-3 mt-3"
                    >
                      <input className="px-4" type="checkbox" name="brand" />
                      <label>
                        <p className="text-sm font-normal">{brand?.name}</p>
                      </label>
                    </div>
                  ))
                ) : (
                  <p>Нет доступных брендов</p>
                )}
              </div>
            </form>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default FilterCatalog;
