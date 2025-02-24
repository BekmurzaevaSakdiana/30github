// "use client";
// import { useEffect, useState } from "react";
// import { BrandUtils } from "@/requests/brandsReq";
// import axiosInstance from "@/app/axios/axios";
// import { useSearchParams } from "next/navigation";
// import { useRouter } from "next/navigation";

// interface FilterCatalogProps {
//   params: {
//     id: string;
//   };
//   searchParams: any;
//   name?: string;
// }

// const FilterCatalog = ({ params, searchParams, name }: FilterCatalogProps) => {
//   const [allBrands, setAllBrands] = useState<{
//     results: { name: string }[];
//   } | null>(null);
//   const[miniVersion,setIsMiniVersion]=useState<boolean>(false)
//   const [loading, setLoading] = useState<boolean>(true);
//   const [subCategory, setSubCategory] = useState<string[]>([]);
//   const [priceFrom, setPriceFrom] = useState<string>("");
//   const [priceTo, setPriceTo] = useState<string>("");
//   const search = useSearchParams();
//   const router = useRouter();



//   useEffect(() => {
//     const fetchBrands = async () => {
//       try {
//         const brands = await BrandUtils.getBrandsByCategory(params.id);
//         setAllBrands(brands);
//       } catch (error) {
//         console.error("Ошибка при загрузке брендов", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (params.id) {
//       fetchBrands();
//     }
//   }, [params.id]);

//   useEffect(() => {
//     const fetchSubCategories = async () => {
//       try {
//         const { data } = await axiosInstance.get(
//           `/subcategory/?category=${params.id}`
//         );
//         setSubCategory(data.results);
//       } catch (error) {
//         console.error("Ошибка при загрузке", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchSubCategories();
//   }, [params.id]);

//   useEffect(() => {
//     if (searchParams) {
//       const filters = new URLSearchParams(searchParams);
//       setPriceFrom(filters.get("price_from") ?? "");
//       setPriceTo(filters.get("price_to") ?? "");
//     }
//   }, [searchParams]);

//   const handlePriceChange = (type: "from" | "to", value: string) => {
//     if (type === "from") {
//       setPriceFrom(value);
//     } else {
//       setPriceTo(value);
//     }

//     const current = new URLSearchParams(Array.from(search.entries()));

//     if (value) {
//       current.set(`price_${type}`, value);
//     } else {
//       current.delete(`price_${type}`);
//     }

//     router.push(`?${current.toString()}`, { scroll: false });
//   };

//   const updateSearchParams = (
//     key: string,
//     value: string,
//     isMultiSelect = false
//   ) => {
//     const current = new URLSearchParams(Array.from(search.entries()));

//     if (isMultiSelect) {
//       const values = current.getAll(key);
//       if (values.includes(value)) {
//         current.delete(key);
//         values
//           .filter((v) => v !== value)
//           .forEach((v) => current.append(key, v));
//       } else {
//         current.append(key, value);
//       }
//     } else {
//       current.set(key, value);
//     }

//     router.push(`?${current.toString()}`, { scroll: false });
//   };

//     const handleSearch = () => {
//     const current = new URLSearchParams();

//     if (priceFrom) current.set("price_from", priceFrom);
//     if (priceTo) current.set("price_to", priceTo);
//     subCategory.forEach((subcategory) => {
//       console.log(subcategory);
      
//         current.append("subcategory", subcategory?.id);
//     });  

//     router.push(`?${current.toString()}`, { scroll: false });
//   };

//   const clearFilters = () => {
//     const current = new URLSearchParams(search.toString()); // Копируем текущие параметры
  
//     // Сбрасываем все фильтры, кроме "name"
//     for (const key of current.keys()) {
//       if (key !== "name") {
//         current.delete(key);
//       }
//     }
  
//     router.push(`?${current.toString()}`, { scroll: false });
  
//     setPriceFrom("");
//     setPriceTo("");
//   };


//   const toggleMobileFilter = () => {
//     setIsMiniVersion(!miniVersion);
//   };
  

//   return (
//     <div className="catalogItems mt-10">
//         <div className="aside__products">
//           <aside className="max-w-60 w-full border-r-2 max-xl:border-none max-xl:max-w-32">
//             <div className="aside-title flex items-center gap-4">
//               <h2 className="font-bold text-4xl">Фильтр</h2>
//               <button
//                 className="underline text-sm"
//                 type="button"
//                 onClick={handleSearch}
//               >
//                 Поиск
//               </button>

//               <img
//                 className="w-6 hidden max-lg:block"
//                 src="/svg/down.png"
//                 alt=""
//               />
//             </div>

//             <form className="max-xl:hidden">
//               <div className="typeof">
//                 <p className="font-bold text-lg mt-8">{name}</p>

//                 <div className="checkbox flex flex-col gap-3 mt-3">
//                   {loading ? (
//                     <p>Загрузка...</p>
//                   ) : subCategory.length > 0 ? (
//                     subCategory.map((item, index) => (
//                       <div
//                         key={index}
//                         className="checkbox flex items-center gap-3 mt-3"
//                       >
//                         <input
//                           type="checkbox"
//                           checked={
//                             search.get("subcategory") === String(item.id)
//                           }
//                           onChange={() =>
//                             updateSearchParams(
//                               "subcategory",
//                               String(item.id),
//                               false
//                             )
//                           }
//                           className="px-4"
//                         />
//                         <label>
//                           <p className="text-sm font-normal">{item.name}</p>
//                         </label>
//                       </div>
//                     ))
//                   ) : (
//                     <p>Нет доступных подкатегорий</p>
//                   )}
//                 </div>

//                 <div className="line mt-6 border-b-2 w-[240px]"></div>
//               </div>

//               <div className="price flex flex-col gap-3">
//                 <p className="font-bold text-lg mt-8">Цена</p>
//                 <div className="from max-w-7">
//                   <input
//                     className="outline-none border border-gray-300 rounded-md px-2"
//                     type="text"
//                     placeholder="от"
//                     value={priceFrom}
//                     onChange={(e) => handlePriceChange("from", e.target.value)}
//                   />
//                 </div>

//                 <div className="to max-w-7">
//                   <input
//                     className="outline-none border border-gray-300 rounded-md px-2"
//                     type="text"
//                     placeholder="до"
//                     value={priceTo}
//                     onChange={(e) => handlePriceChange("to", e.target.value)}
//                   />
//                 </div>

//                 <div className="line mt-6 border-b-2 w-[240px]"></div>
//               </div>

//               <div className="brands">
//                 <p className="font-bold text-lg mt-8">Бренд</p>
//                 {loading ? (
//                   <p>Загрузка...</p>
//                 ) : allBrands &&
//                   allBrands.results &&
//                   allBrands.results.length > 0 ? (
//                   allBrands.results.map((brand, index) => (
//                     <div
//                       key={index}
//                       className="checkbox flex items-center gap-3 mt-3"
//                     >
//                       <input
//                         type="checkbox"
//                         checked={search.getAll("brand").includes(brand.name)}
//                         onChange={() =>
//                           updateSearchParams("brand", brand.name, true)
//                         }
//                         className="px-4"
//                       />
//                       <label>
//                         <p className="text-sm font-normal">{brand.name}</p>
//                       </label>
//                     </div>
//                   ))
//                 ) : (
//                   <p>Нет доступных брендов</p>
//                 )}
//               </div>
//             </form>

//             <button
//               onClick={clearFilters}
//               className="mt-12 text-black hover:text-red-600 max-xl:hidden"
//             >
//               Очистить
//             </button>
//           </aside>
//         </div>
//     </div>
//   );
// };

// export default FilterCatalog;

"use client";
import { useEffect, useState } from "react";
import { BrandUtils } from "@/requests/brandsReq";
import axiosInstance from "@/app/axios/axios";
import { useSearchParams, useRouter } from "next/navigation";

interface FilterCatalogProps {
  params: {
    id: string;
  };
  searchParams: any;
  name?: string;
}

const FilterCatalog = ({ params, searchParams, name }: FilterCatalogProps) => {
  const [allBrands, setAllBrands] = useState<{ results: { name: string }[] } | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [subCategory, setSubCategory] = useState<string[]>([]);
  const [priceFrom, setPriceFrom] = useState<string>("");
  const [priceTo, setPriceTo] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const search = useSearchParams();
  const router = useRouter();

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
        const { data } = await axiosInstance.get(`/subcategory/?category=${params.id}`);
        setSubCategory(data.results);
      } catch (error) {
        console.error("Ошибка при загрузке", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSubCategories();
  }, [params.id]);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div className="catalogItems mt-10">
      <button className="px-4 py-2 bg-blue-500 text-white rounded" onClick={toggleModal}>
        Открыть фильтры
      </button>
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-lg max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">Фильтры</h2>
            <button className="absolute top-2 right-2 text-gray-500" onClick={toggleModal}>✖</button>
            <div className="mt-4">
              <p className="font-bold">Категории</p>
              {loading ? (
                <p>Загрузка...</p>
              ) : (
                subCategory.map((item, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <input type="checkbox" id={String(item.id)} className="mr-2" />
                    <label htmlFor={String(item.id)}>{item}</label>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterCatalog;

