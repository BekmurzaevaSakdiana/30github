"use client";
// import { RootState } from "@reduxjs/toolkit/query";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCategory } from "../../store/slice/categorySlice";
import { AppDispatch } from "../../store";

const BurgerMenu = ({ onClose }: { onClose: () => void }) => {
  const dispatch = useDispatch<AppDispatch>();

  const isLogined = useSelector((state: any) => !state?.login?.data);
  const { categories, loading, error } = useSelector(
    (state: RootState) => state.categorySlice
  );

  useEffect(() => {
    dispatch(getCategory());
  }, [dispatch]);

  const [isActiveSmth, setisActiveSmth] = useState(false);

  return (
    <div className="menu-items xl:hidden absolute top-20 right-12 max-[650px]:top-0  max-sm:right-0 z-50 w-full h-full bg-black bg-opacity-50 transition-all duration-500 sm:w-[350px] sm:h-auto sm:bg-transparent">
      <div className="w-[100%]  border px-9 py-12 bg-bgPink transition-all duration-500 sm:rounded-lg">
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
            <Link href="/" className="text-maHalfBlack font-medium text-base">
              На главное
            </Link>
            <hr className="w-full" />

            <Link
              href={isLogined ? "/loginAuth" : "/userPage"}
              className="text-maHalfBlack font-medium text-base"
            >
              Аккаунт
            </Link>
            <hr className="w-full" />
            <Link
              href="/cart"
              className="text-maHalfBlack font-medium text-base"
            >
              Корзина
            </Link>
            <hr className="w-full" />
            <li className="text-maHalfBlack cursor-pointer w-full font-medium text-base">
              <div
                className="w-full pb-2"
                onClick={() => setisActiveSmth((p) => !p)}
              >
                Каталог
              </div>
              <hr className="w-full mb-2" />
              <div
                className={`pl-4 flex flex-col gap-2  ${
                  !isActiveSmth ? "h-0" : "max-h-36"
                } overflow-y-auto transition`}
              >
                {categories?.results?.map((category) => (
                  <li key={category.id}>
                    <Link
                      href={`/catalog/${category.id}?name=${category.name}`}
                      className="cursor-pointer text-white font-medium text-lg hover:text-maHalfBlack transition-all duration-200 linear"
                    >
                      {category.name}
                    </Link>
                    <hr className="max-w-full w-full text-black" />
                  </li>
                ))}
              </div>
            </li>

            <Link
              href="/brands"
              className="text-maHalfBlack font-medium text-base"
            >
              Бренды
            </Link>
            <hr className="w-full" />
            <Link
              href="/popular"
              className="text-maHalfBlack font-medium text-base"
            >
              Популярное
            </Link>
            <hr className="w-full" />
            <Link
              href="/stock"
              className="text-maHalfBlack font-medium text-base"
            >
              Акции
            </Link>
            <hr className="w-full" />
            <Link
              href="/contacts"
              className="text-maHalfBlack font-medium text-base"
            >
              Контакты
            </Link>
            <hr className="w-full" />
            <Link
              href="/delivery"
              className="text-maHalfBlack font-medium text-base"
            >
              Доставка и оплата
            </Link>
            <hr className="w-full" />
            <Link
              href="/help"
              className="text-maHalfBlack font-medium text-base"
            >
              Помощь
            </Link>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default BurgerMenu;
