import React from "react";

const FilterCatalogModal = () => {
  return (
    <div
      className={`fixed inset-0 bg-white z-50 p-4 transition-transform transform ${
        isMobileFilterOpen ? "translate-x-0" : "-translate-x-full"
      } lg:relative lg:translate-x-0 lg:w-60 border-r-2 lg:border-none shadow-lg lg:shadow-none overflow-y-auto`}
    >
      <button
        className="block lg:hidden text-red-500 mb-4"
        onClick={toggleMobileFilter}
      >
        Закрыть
      </button>
      <h2 className="font-bold text-2xl mb-4">Фильтр</h2>
      <button className="underline text-sm" type="button">
        Поиск
      </button>
      <div className="mt-4">
        <h3 className="font-semibold">Подкатегории</h3>
        <ul>
          {subCategory.map((sub) => (
            <li key={sub.name} className="text-gray-700 text-sm">
              {sub.name}
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-4">
        <h3 className="font-semibold">Цена</h3>
        <div className="flex gap-2">
          <input
            type="number"
            placeholder="От"
            value={priceFrom}
            onChange={(e) => setPriceFrom(e.target.value)}
            className="border rounded px-2 py-1 w-1/2"
          />
          <input
            type="number"
            placeholder="До"
            value={priceTo}
            onChange={(e) => setPriceTo(e.target.value)}
            className="border rounded px-2 py-1 w-1/2"
          />
        </div>
      </div>
    </div>
  );
};

export default FilterCatalogModal;
