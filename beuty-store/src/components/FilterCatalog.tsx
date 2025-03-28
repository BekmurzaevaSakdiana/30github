"use client";
import axiosInstance from "@/app/axios/axios";
import { BrandUtils } from "@/requests/brandsReq";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface FilterCatalogProps {
  params: {
    id: string;
  };
  searchParams: Record<string, string>;
  name?: string;
}

interface SubCategory {
  id: string;
  name: string;
}

const FilterCatalog = ({ params, name, searchParams }: FilterCatalogProps) => {
  const [allBrands, setAllBrands] = useState<{
    results: { name: string }[];
  } | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [sub_category, setSub_category] = useState<SubCategory[]>([]);
  const [priceFrom, setPriceFrom] = useState<string>();
  const [priceTo, setPriceTo] = useState<string>();
  const search = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const brands = await BrandUtils.getBrandsByCategory(params.id);
        setAllBrands(brands);
      } catch (error: any) {
        console.error("Ошибка", error);
      } finally {
        setLoading(false);
      }
    };
    if (params.id) {
      fetchBrands();
    }
  }, [params.id]);

  useEffect(() => {
    const fetchSub_categories = async () => {
      try {
        const { data } = await axiosInstance.get(
          `/subcategory/?category=${params.id}`
        );
        setSub_category(data.results);
      } catch (error: any) {
        console.error("Ошибка");
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchSub_categories();
    }
  }, [params.id]);

  return (
    <div className="catalogItems mt-10">
      <div className="aside__products">
        <aside
          style={{ boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)" }}
          className="max-w-60 w-full max-xl:border-none max-xl:max-w-32 px-12 py-12 rounded-xl"
        >
          <div className="aside-title flex items-center gap-4">
            <h2 className="font-bold text-4xl max-md:bg-maBlue max-md:px-4 max-md:py-1 max-md:text-white">
              Фильтр
            </h2>
          </div>

          <form className="max-md:hidden">
            <div className="typeof">
              <div className="checkbox flex flex-col gap-3 mt-3">
                <p>{name}</p>
              </div>

              <div className="checkbox flex flex-col ">
              <p className="font-bold text-lg mt-8">Подкатегории</p>
                <div className="allItemS  flex flex-col max-h-24 overflow-y-auto  custom-scroll">
                {loading ? (
                  <div className="flex items-center justify-center">
                    <img className="w-12 h-12" src="/img/loading.gif" alt="" />
                  </div>
                ) : sub_category.length > 0 ? (
                  sub_category.map((item, index) => (
                   <div className="allItems">
                     <div
                      key={index}
                      className="checkbox flex items-center gap-3 mt-3"
                    >
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" className="px-4" />
                        <p className="text-sm font-normal">{item.name}</p>
                      </label>
                    </div>

                   </div>
                    
                  ))
                ) : (
                  <p>Нет доступных подкатегорий</p>
                )}
                </div>
              
              </div>
            </div>

            <div className="price flex flex-col gap-3">
              <p className="font-bold text-lg mt-8">Цена</p>
              <input
                type="text"
                placeholder="от"
                className="outline-none border border-gray-300 rounded-md px-2"
              />
              <input
                type="text"
                placeholder="до"
                className="outline-none border border-gray-300 rounded-md px-2"
              />
            </div>

            <div className="brands">
              <p className="font-bold text-lg mt-8">Бренды</p>

              <div className="allItemS flex flex-col max-h-24 overflow-y-auto  custom-scroll">
                {loading ? (
                  <div className="flex items-center justify-center">
                    <img className="w-12 h-12" src="/img/loading.gif" alt="" />
                  </div>
                ) : allBrands &&
                  allBrands.results &&
                  allBrands.results.length > 0 ? (
                  allBrands.results.map((brand, index) => (
                    <div className="allItems">
                      <div
                        key={index}
                        className="checkbox flex items-center gap-3 mt-3"
                      >
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input type="checkbox" className="px-4" />
                          <p className="text-sm font-normal">{brand.name}</p>
                        </label>
                      </div>

                      
                    </div>
                  ))
                ) : (
                  <p>Нет доступных брендов</p>
                )}
              </div>
            </div>
          </form>

          <div className="btn flex items-center justify-center">
            <button className=" mt-12 text-center text-lg font-medium underline">
              Очистить
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default FilterCatalog;
