"use client";


const SearchInputHeader: React.FC = () => {
  


  return (
    <form
     
      className="search-burgerMenu max-sm:w-full flex items-center max-sm:justify-between gap-4"
    >
      <div className="search flex items-center justify-between gap-4 bg-gray-300 px-5 py-2 rounded-3xl max-sm:flex-1">
        <div className="input__mainHeader max-sm:max-w-2xl">
          <input
            className="w-full bg-transparent outline-none"
            type="text"
            placeholder="Что вы ищите?"
           
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
