"use client";
import { CategoryUtils } from "@/requests/categoryReq";
import { Category } from "@/types/modules";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const BurgerMenu = ({ onClose }: { onClose: () => void }) => {
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state: RootState) => state.login);

  const [categories, setCategories] = useState<{
    count: number;
    results: Category[];
  } | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isActiveSmth, setIsActiveSmth] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      const data = await CategoryUtils.getCategory();
      if (data?.results && Array.isArray(data.results)) {
        setCategories(data);
      } else {
        setCategories({ count: 0, results: [] });
      }
      setLoading(false);
    };

    fetchCategories();
  }, []);

  return (
    <div className="menu-items xl:hidden absolute top-20 right-12 max-[650px]:top-0 max-sm:right-0 z-50 w-full h-full bg-black bg-opacity-50 transition-all duration-500 sm:w-[350px] sm:h-auto sm:bg-transparent">
      <div className="w-[100%] border px-9 py-12 bg-bgPink transition-all duration-500 sm:rounded-lg">
        <div className="cross mb-2 flex items-end justify-end">
          <img
            className="w-4 cursor-pointer"
            src="/svg/cross.svg"
            alt="Close Menu"
            onClick={onClose}
          />
        </div>
        <nav>
          <ul className="flex flex-col items-start text-start gap-3">
            <li onClick={onClose}>
              <Link href="/" className="text-maHalfBlack font-medium text-base">
                На главное
              </Link>
            </li>

            <li onClick={onClose}>
              <Link
                href={isLoggedIn ? "/userPage" : "/loginAuth"}
                className="text-maHalfBlack font-medium text-base"
              >
                Аккаунт
              </Link>
            </li>

            <li onClick={onClose}>
              <Link
                href="/cart"
                className="text-maHalfBlack font-medium text-base"
              >
                Корзина
              </Link>
            </li>
            <li className="text-maHalfBlack cursor-pointer w-full font-medium text-base">
              <div
                className="w-full pb-2 flex items-center justify-between"
                onClick={() => setIsActiveSmth((prev) => !prev)}
              >
                Каталог
                <img
                  className={`w-4 h-4 transform transition-transform duration-300 ${
                    isActiveSmth ? "rotate-90" : "-rotate-90"
                  }`}
                  src="/svg/left.png"
                  alt=""
                />{" "}
              </div>
              <div
                className={`pl-4 flex flex-col gap-2 ${
                  !isActiveSmth ? "h-0" : "max-h-36"
                } overflow-y-auto transition`}
              >
                {loading ? (
                  <p>Загрузка...</p>
                ) : categories?.results && categories.results.length > 0 ? (
                  categories.results.map((category) => (
                    <li onClick={onClose} key={category.id}>
                      <Link
                        href={`/catalog/${category.id}?name=${category.name}`}
                        className="cursor-pointer text-white font-medium text-lg hover:text-maHalfBlack transition-all duration-200 linear"
                      >
                        {category.name}
                      </Link>
                      <hr className="max-w-full w-full text-black" />
                    </li>
                  ))
                ) : (
                  <p>Категории не найдены</p>
                )}
              </div>
            </li>

            <li onClick={onClose}>
              <Link
                href="/brands"
                className="text-maHalfBlack font-medium text-base"
              >
                Бренды
              </Link>
            </li>

            <li onClick={onClose}>
              <Link
                href="/popular"
                className="text-maHalfBlack font-medium text-base"
              >
                Популярное
              </Link>
            </li>

            <li onClick={onClose}>
              <Link
                href="/stock"
                className="text-maHalfBlack font-medium text-base"
              >
                Акции
              </Link>
            </li>

            <li onClick={onClose}>
              <Link
                href="/contacts"
                className="text-maHalfBlack font-medium text-base"
              >
                Контакты
              </Link>
            </li>

            <li onClick={onClose}>
              <Link
                href="/delivery"
                className="text-maHalfBlack font-medium text-base"
              >
                Доставка и оплата
              </Link>
            </li>

            <li onClick={onClose}>
              <Link
                href="/help"
                className="text-maHalfBlack font-medium text-base"
              >
                Помощь
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default BurgerMenu;
