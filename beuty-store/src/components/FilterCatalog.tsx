"use client";
import { useState } from "react";

interface FilterCatalogProps {
  params: {
    id: string;
  };
  searchParams: Record<string, string>;
  name?: string;
}

const FilterCatalog = ({ params, name, searchParams }: FilterCatalogProps) => {
  return (
    <div className="catalogItems mt-10">
      <div className="aside__products">
        <aside className="max-w-60 w-full border-r-2 max-xl:border-none max-xl:max-w-32">
          <div className="aside-title flex items-center gap-4">
            <h2 className="font-bold text-4xl max-md:bg-maBlue max-md:px-4 max-md:py-1 max-md:text-white">
              Фильтр
            </h2>
          </div>

          <form className="max-md:hidden">
            <div className="typeof">
              <p className="font-bold text-lg mt-8">Категория</p>
              <div className="checkbox flex flex-col gap-3 mt-3">
                <p>Загрузка...</p>
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
          </form>
        </aside>
      </div>
    </div>
  );
};

export default FilterCatalog;
