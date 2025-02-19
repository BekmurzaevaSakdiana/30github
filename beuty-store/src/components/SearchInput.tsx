"use client";
import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";

const SearchInput: React.FC = () => {
  const [inputValue, setInputValue] = useState("");
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const query = searchParams.get("q") || "";
    setInputValue(query);
  }, [searchParams]);

  const handleSearch = () => {
    router.push(`/brands?name=${inputValue}`); 
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSearch();
      }}
      
      className="search-burgerMenu max-sm:w-full flex items-center max-sm:justify-between gap-4"
    >
      <div className="search flex items-center gap-4 bg-gray-300 px-5 py-2 rounded-3xl max-sm:flex-1">
        <img src="/svg/searchIcon.svg" alt="search icon" />
        <div className="input__mainHeader max-sm:max-w-2xl">
          <input
            className="w-full bg-transparent outline-none"
            type="text"
            placeholder="Что вы ищите?"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
        </div>
      </div>
      <button className="underline" type="submit">
        Поиск
      </button>
    </form>
  );
};

export default SearchInput;
