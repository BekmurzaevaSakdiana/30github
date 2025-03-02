// "use client";


// const SearchInputHeader: React.FC = () => {
  


//   return (
//     <form
     
//       className="search-burgerMenu max-sm:w-full flex items-center max-sm:justify-between gap-4"
//     >
//       <div className="search flex items-center justify-between gap-4 bg-gray-300 px-5 py-2 rounded-3xl max-sm:flex-1">
//         <div className="input__mainHeader max-sm:max-w-2xl">
//           <input
//             className="w-full bg-transparent outline-none"
//             type="text"
//             placeholder="Что вы ищите?"
           
//           />
//         </div>

//         <button type="submit">
//           <img src="/svg/searchIcon.svg" alt="search icon" />
//         </button>
//       </div>
//     </form>
//   );
// };

// export default SearchInputHeader;



"use client";

import { useState } from "react";
import axiosInstance from "@/app/axios/axios";

const SearchInputHeader: React.FC = () => {
  const [query, setQuery] = useState("");

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return; // Проверка на пустую строку

    try {
      const searchParams = { search: query }; // Формируем параметры
      const products = await getCategoryProducts(searchParams);

      if (products?.data.length) {
        console.log("Найденные товары:", products.data);
      } else {
        console.log("Ничего не найдено");
      }
    } catch (error) {
      console.error("Ошибка поиска:", error);
    }
  };

  return (
    <form onSubmit={handleSearch} className="search-burgerMenu max-sm:w-full flex items-center max-sm:justify-between gap-4">
      <div className="search flex items-center justify-between gap-4 bg-gray-300 px-5 py-2 rounded-3xl max-sm:flex-1">
        <div className="input__mainHeader max-sm:max-w-2xl">
          <input
            className="w-full bg-transparent outline-none"
            type="text"
            placeholder="Что вы ищите?"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <button type="submit">
          <img src="/svg/searchIcon.svg" alt="search icon" />
        </button>
      </div>
    </form>
  );
};


const getCategoryProducts = async (searchParams: any) => {
  try {
    const queryParams = new URLSearchParams(searchParams).toString();
    const response = await axiosInstance.get(`/products/?${queryParams}`);
    return response.data;
  } catch (error) {
    console.error("Ошибка получения данных:", error);
    return null;
  }
};

export default SearchInputHeader;