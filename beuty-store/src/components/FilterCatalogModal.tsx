import { Dispatch, SetStateAction } from "react";

interface FilterCatalogModalProps {
  subCategory: { id: string; name: string }[];
  priceFrom: string;
  setPriceFrom: Dispatch<SetStateAction<string>>;
  priceTo: string;
  setPriceTo: Dispatch<SetStateAction<string>>;
  isOpen: boolean;
  onClose: () => void;
  brands: { name: string }[];
  clearFilters: () => void;
  updateSearchParams: (key: string, value: string, isMultiSelect?: boolean) => void;
}

export default function FilterCatalogModal({
  subCategory,
  priceFrom,
  setPriceFrom,
  priceTo,
  setPriceTo,
  isOpen,
  onClose,
  brands,
  clearFilters,
  updateSearchParams,
}: FilterCatalogModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 max-w-full">
        <button className="text-red-500 float-right" onClick={onClose}>
          <img className="w-4 h-4" src="/svg/cross.svg" alt="" />
        </button>

        {/* Подкатегории */}
        <h3 className="font-semibold mt-6">Подкатегории</h3>
        <div className="flex items-start flex-col gap-4 mt-3 max-h-60 overflow-y-auto">
          {subCategory.map((sub) => (
            <div key={sub.id} className="text-gray-700 text-sm flex items-center gap-3">
              <input
                type="checkbox"
                id={`sub-${sub.id}`}
                onChange={() => updateSearchParams("subcategory", sub.id, true)}
              />
              <label htmlFor={`sub-${sub.id}`}>{sub.name}</label>
            </div>
          ))}
        </div>

        {/* Цена */}
        <div className="mt-6">
          <h3 className="font-semibold">Цена</h3>
          <div className="flex mt-3 gap-2">
            <input
              type="text"
              placeholder="От"
              value={priceFrom}
              onChange={(e) => setPriceFrom(e.target.value)}
              className="border outline-none rounded px-2 py-1 w-1/2"
            />
            <input
              type="text"
              placeholder="До"
              value={priceTo}
              onChange={(e) => setPriceTo(e.target.value)}
              className="border outline-none rounded px-2 py-1 w-1/2"
            />
          </div>
        </div>

        {/* Бренды */}
        <div className="mt-6 overflow-y-auto">
          <h3 className="font-semibold">Бренды</h3>
          <div className="flex items-start flex-col gap-4 mt-3 max-h-20 overflow-y-auto">
            {brands.map((brand) => (
              <div key={brand.name} className="text-gray-700 text-sm flex items-center gap-3">
                <input
                  type="checkbox"
                  id={`brand-${brand.name}`}
                  onChange={() => updateSearchParams("brand", brand.name, true)}
                />
                <label htmlFor={`brand-${brand.name}`}>{brand.name}</label>
              </div>
            ))}
          </div>
        </div>

        {/* Кнопка очистки */}
        <div className="flex items-center justify-center">
          <button
            onClick={clearFilters}
            className="mt-12 rounded-lg text-white px-3 py-1 bg-black hover:bg-red-600"
          >
            Очистить
          </button>
        </div>
      </div>
    </div>
  );
}

