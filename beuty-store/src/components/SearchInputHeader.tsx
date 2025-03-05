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

// "use client";

// import React, { useState } from "react";
// import { useSearchParams } from "next/navigation"; // импортируем useSearchParams
// import { CardData } from "@/components/Cards"; 

// interface SearchInputHeaderProps {
//   onSearch: (products: CardData[]) => void;
// }

// const SearchInputHeader: React.FC<SearchInputHeaderProps> = ({ onSearch }) => {
//   const [searchQuery, setSearchQuery] = useState<string>("");
//   const searchParams = useSearchParams(); // получаем параметры из URL
//   const [loading, setLoading] = useState<boolean>(false);

//   // Функция для обновления параметров поиска в URL
//   const updateSearchParams = (query: string) => {
//     const newParams = new URLSearchParams(searchParams.toString());
//     newParams.set("search", query); // обновляем параметр search
//     window.history.replaceState(null, "", `?${newParams.toString()}`); // обновляем URL без перезагрузки
//   };

//   const handleSearch = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (searchQuery) {
//       updateSearchParams(searchQuery); // обновляем параметры URL
//     }
//   };

//   return (
//     <form className="search-burgerMenu max-sm:w-full flex items-center max-sm:justify-between gap-4" onSubmit={handleSearch}>
//       <div className="search flex items-center justify-between gap-4 bg-gray-300 px-5 py-2 rounded-3xl max-sm:flex-1">
//         <div className="input__mainHeader max-sm:max-w-2xl">
//           <input
//             className="w-full bg-transparent outline-none"
//             type="text"
//             placeholder="Что вы ищите?"
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
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

import React, { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { CardData } from "@/components/Cards";

interface SearchInputHeaderProps {
  onSearch: (products: CardData[]) => void;
}

const SearchInputHeader: React.FC<SearchInputHeaderProps> = ({ onSearch }) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState<string>(searchParams.get("search") || "");

  useEffect(() => {
    setSearchQuery(searchParams.get("search") || "");
  }, [searchParams]);

  const updateSearchParams = (query: string) => {
    const newParams = new URLSearchParams(searchParams.toString());
    if (query) {
      newParams.set("search", query);
    } else {
      newParams.delete("search");
    }
    router.replace(`?${newParams.toString()}`, { scroll: false });
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    updateSearchParams(searchQuery);
  };

  return (
    <form
      className="search-burgerMenu max-sm:w-full flex items-center max-sm:justify-between gap-4"
      onSubmit={handleSearch}
    >
      <div className="search flex items-center justify-between gap-4 bg-gray-300 px-5 py-2 rounded-3xl max-sm:flex-1">
        <div className="input__mainHeader max-sm:max-w-2xl">
          <input
            className="w-full bg-transparent outline-none"
            type="text"
            placeholder="Что вы ищите?"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <button type="submit">
          <img src="/svg/searchIcon.svg" alt="search icon" />
        </button>
      </div>
    </form>
  );
};

export default SearchInputHeader;