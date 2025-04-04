"use client";
import axiosInstance from "@/app/axios/axios";
import { BrandUtils } from "@/requests/brandsReq";
import { BaseResponseI, Brand } from "@/types/modules";
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
  const [allBrands, setAllBrands] = useState<BaseResponseI<Brand[]> | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [sub_category, setSub_category] = useState<SubCategory[]>([]);
  const [priceFrom, setPriceFrom] = useState<string>("");
  const [priceTo, setPriceTo] = useState<string>("");
  const search = useSearchParams();
  const router = useRouter();

  const checkId = (key: string, id: string) => search.getAll(key).includes(id);

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const brands = await BrandUtils.getBrandsByCategory(params.id);
        setAllBrands(brands as any);
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

  const updateSearchParams = (
    key: string,
    value: string,
    isMultiSelect = false
  ) => {
    const current = new URLSearchParams(search.toString());
    if (isMultiSelect) {
      let values = current.getAll(key);

      if (values.includes(value)) {
        values = values.filter((v) => v !== value);
      } else {
        values.push(value);
      }

      current.delete(key);
      values.forEach((v) => current.append(key, v));
    } else {
      if (current.get(key) === value) {
        current.delete(key);
      } else {
        current.set(key, value);
      }
    }

    console.log(current.toString());

    router.push(`?${current.toString()}`, { scroll: false });
  };

  const handlePriceChange = (type: "from" | "to", value: string) => {
    if (type === "from") {
      if (+value >= 0) {
        setPriceFrom(value);
      }
    } else {
      if (+value >= 0) {
        setPriceTo(value);
      }
    }

    const current = new URLSearchParams(search.toString());
    if (value) {
      current.set(`price_${type}`, value);
    } else {
      current.delete(`price_${type}`);
    }

    if (name) {
      current.set("name", name);
    }

    router.push(`?${current.toString()}`, { scroll: false });
  };

  const clearFilters = () => {
    router.replace(window.location.pathname);
    setPriceFrom("");
    setPriceTo("");
    setTimeout(() => {
      document
        .querySelectorAll<HTMLInputElement>(
          "input[type='checkbox'], input[type='radio']"
        )
        .forEach((input) => (input.checked = false));
    }, 0);
  };

  return (
    <div className="catalogItems mt-10 max-xl:w-full">
      <div className="aside__products">
        <aside
          style={{ boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)" }}
          className="w-full px-12 py-12 rounded-xl "
        >
          <div className="aside-title">
            <h2 className="font-bold text-4xl max-w-10 w-full max-xl:mx-auto max-md:mx-0">
              Фильтр
            </h2>
          </div>

          <form className="w-full">
            <div className=" max-xl:flex max-xl:justify-between max-xl:items-baseline max-xl:gap-8 flex-wrap">
              <div className="typeof ">
                <div className="checkbox max-xl:hidden flex flex-col gap-3 mt-3">
                  <p>{name}</p>
                </div>

                <div className="checkbox flex flex-col">
                  <p className="font-bold text-lg mt-8">Подкатегории</p>
                  <div className="allItemS  flex flex-col max-h-24 overflow-y-auto  custom-scroll">
                    {loading ? (
                      <div className="flex items-center justify-center">
                        <img
                          className="w-12 h-12"
                          src="/img/loading.gif"
                          alt=""
                        />
                      </div>
                    ) : sub_category.length > 0 ? (
                      sub_category.map((item, index) => (
                        <div className="allItems">
                          <div
                            key={index}
                            className="checkbox flex items-center gap-3 mt-3"
                          >
                            <label className="flex items-center gap-2 cursor-pointer">
                              <input
                                type="radio"
                                name="sub_categories"
                                className="px-4"
                                onChange={() =>
                                  updateSearchParams(
                                    "sub_categories",
                                    item.id,
                                    false
                                  )
                                }
                              />
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

              <div className="price flex flex-col gap-3 ">
                <p className="font-bold text-lg mt-8">Цена</p>
                <input
                  type="number"
                  placeholder="от"
                  className="outline-none border border-gray-300 rounded-md px-2"
                  value={priceFrom}
                  onChange={(e) => handlePriceChange("from", e.target.value)}
                />
                <input
                  type="number"
                  placeholder="до"
                  className="outline-none border border-gray-300 rounded-md px-2"
                  value={priceTo}
                  onChange={(e) => handlePriceChange("to", e.target.value)}
                />
              </div>

              <div className="brands ">
                <p className="font-bold text-lg mt-8">Бренды</p>

                <div className="allItemS flex flex-col max-h-24 overflow-y-auto  custom-scroll">
                  {loading ? (
                    <div className="flex items-center justify-center">
                      <img
                        className="w-12 h-12"
                        src="/img/loading.gif"
                        alt=""
                      />
                    </div>
                  ) : allBrands &&
                    allBrands.results &&
                    allBrands.results.length > 0 ? (
                    allBrands.results.map((brand, index) => (
                      <div className="allItems">
                        <div
                          key={brand.id}
                          className="checkbox flex items-center gap-3 mt-3"
                        >
                          <label className="flex items-center gap-2 cursor-pointer">
                            <input
                              key={brand.id}
                              type="checkbox"
                              className="px-4"
                              checked={checkId("brand", brand.id + "")}
                              onChange={() =>
                                updateSearchParams(
                                  "brand",
                                  String(brand?.id),
                                  true
                                )
                              }
                            />
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
            </div>
          </form>

          <div className="btn flex items-center justify-center">
            <button
              className=" mt-12 text-center text-lg font-medium underline"
              onClick={clearFilters}
            >
              Очистить
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default FilterCatalog;
