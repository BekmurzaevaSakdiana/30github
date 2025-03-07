"use client";
import { useEffect, useState } from "react";
import { BrandUtils } from "@/requests/brandsReq";
import axiosInstance from "@/app/axios/axios";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import FilterCatalogModal from "./FilterCatalogModal";

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
  const [isFilterModalOpen, setFilterModalOpen] = useState(false);

  const [miniVersion, setIsMiniVersion] = useState<boolean>(false);

  const [loading, setLoading] = useState<boolean>(true);
  const [subCategory, setSubCategory] = useState<string[]>([]);
  const [priceFrom, setPriceFrom] = useState<string>("");
  const [priceTo, setPriceTo] = useState<string>("");
  const search = useSearchParams();
  const router = useRouter();

  const handleFilterModal = () => setFilterModalOpen((prev) => !prev);

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

    if (params.id) {
      fetchBrands();
    }
  }, [params.id]);

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

  useEffect(() => {
    if (searchParams) {
      const filters = new URLSearchParams(searchParams);
      setPriceFrom(filters.get("price_from") ?? "");
      setPriceTo(filters.get("price_to") ?? "");
    }
  }, [searchParams]);

  const handlePriceChange = (type: "from" | "to", value: string) => {
    if (type === "from") {
      setPriceFrom(value);
    } else {
      setPriceTo(value);
    }

    const current = new URLSearchParams(Array.from(search.entries()));

    if (value) {
      current.set(`price_${type}`, value);
    } else {
      current.delete(`price_${type}`);
    }

    router.push(`?${current.toString()}`, { scroll: false });
  };

  const updateSearchParams = (
    key: string,
    value: string,
    isMultiSelect = false
  ) => {
    const current = new URLSearchParams(Array.from(search.entries()));

    if (isMultiSelect) {
      const values = current.getAll(key);
      if (values.includes(value)) {
        current.delete(key);
        values
          .filter((v) => v !== value)
          .forEach((v) => current.append(key, v));
      } else {
        current.append(key, value);
      }
    } else {
      current.set(key, value);
    }

    router.push(`?${current.toString()}`, { scroll: false });
  };

  const handleSearch = () => {
    const current = new URLSearchParams();

    if (priceFrom) current.set("price_from", priceFrom);
    if (priceTo) current.set("price_to", priceTo);
    subCategory.forEach((subcategory) => {
      console.log(subcategory);

      current.append("subcategory", subcategory?.id);
    });

    router.push(`?${current.toString()}`, { scroll: false });
  };

  const clearFilters = () => {
    const current = new URLSearchParams(search.toString());

    for (const key of current.keys()) {
      if (key !== "name") {
        current.delete(key);
      }
    }

    router.push(`?${current.toString()}`, { scroll: false });

    setPriceFrom("");
    setPriceTo("");
  };

  const toggleMobileFilter = () => {
    setIsMiniVersion(!miniVersion);
  };

  return (
    <div className="catalogItems mt-10">
      <div className="aside__products">
        <aside className="max-w-60 w-full border-r-2 max-xl:border-none max-xl:max-w-32">
          <div className="aside-title flex items-center gap-4">
            <div className="">
              <h2 className="font-bold text-4xl max-md:bg-maBlue max-md:px-4 max-md:py-1 max-md:text-white ">
                Фильтр
              </h2>
              <button
                className="block md:hidden px-4 mt-2 hover:text-maBlue"
                onClick={handleFilterModal}
              >
                Открыть фильтр
              </button>
            </div>
            <button
              className="underline text-sm max-md:hidden"
              type="button"
              onClick={handleSearch}
            >
              Поиск
            </button>
          </div>

          <FilterCatalogModal
            subCategory={subCategory}
            priceFrom={priceFrom}
            setPriceFrom={setPriceFrom}
            priceTo={priceTo}
            setPriceTo={setPriceTo}
            isOpen={isFilterModalOpen}
            onClose={handleFilterModal}
            brands={allBrands?.results || []}
            clearFilters={clearFilters}
            params={params}
            updateSearchParams={updateSearchParams}
            searchParams={searchParams}
            handleSearch={handleSearch}
            
          />

          <form className="max-md:hidden">
            <div className="typeof">
              <p className="font-bold text-lg mt-8">{name}</p>

              <div className="checkbox flex flex-col gap-3 mt-3">
                {loading ? (
                  <p>Загрузка...</p>
                ) : subCategory.length > 0 ? (
                  subCategory.map((item, index) => (
                    <div
                      key={index}
                      className="checkbox flex items-center gap-3 mt-3"
                    >
                      <input
                        type="checkbox"
                        checked={search
                          .getAll("subcategory")
                          .includes(String(item.id))}
                        onChange={() =>
                          updateSearchParams(
                            "subcategory",
                            String(item.id),
                            true
                          )
                        }
                        className="px-4"
                      />
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

            <div className="price flex flex-col gap-3">
              <p className="font-bold text-lg mt-8">Цена</p>
              <div className="from max-w-7">
                <input
                  className="outline-none border border-gray-300 rounded-md px-2"
                  type="text"
                  placeholder="от"
                  value={priceFrom}
                  onChange={(e) => handlePriceChange("from", e.target.value)}
                />
              </div>

              <div className="to max-w-7">
                <input
                  className="outline-none border border-gray-300 rounded-md px-2"
                  type="text"
                  placeholder="до"
                  value={priceTo}
                  onChange={(e) => handlePriceChange("to", e.target.value)}
                />
              </div>

              <div className="line mt-6 border-b-2 w-[240px]"></div>
            </div>

            <div className="brands">
              <p className="font-bold text-lg mt-8">Бренд</p>
              {loading ? (
                <p>Загрузка...</p>
              ) : allBrands &&
                allBrands.results &&
                allBrands.results.length > 0 ? (
                allBrands.results.map((brand, index) => (
                  <div
                    key={index}
                    className="checkbox flex items-center gap-3 mt-3"
                  >
                    <input
                      type="checkbox"
                      checked={search.getAll("brand").includes(brand.name)}
                      onChange={() =>
                        updateSearchParams("brand", brand.name, true)
                      }
                      className="px-4"
                    />
                    <label>
                      <p className="text-sm font-normal">{brand.name}</p>
                    </label>
                  </div>
                ))
              ) : (
                <p>Нет доступных брендов</p>
              )}
            </div>
          </form>

          <button
            onClick={clearFilters}
            className="mt-12 text-black hover:text-red-600 max-xl:hidden"
          >
            Очистить
          </button>
        </aside>
      </div>
    </div>
  );
};

export default FilterCatalog;
