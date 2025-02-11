"use client";
import React, { useEffect, useState } from "react";
import BurgerMenu from "./BurgerMenu";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@reduxjs/toolkit/query";
import { getProfile, setLoggedIn } from "../../store/slice/loginSlice";
import { useParams, usePathname, useRouter } from "next/navigation";

const TheHeader = () => {
  const [openBurgerModal, setOpenBurgerModal] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const pathname = usePathname();
  const { isLoggedIn, username, data } = useSelector(
    (state: RootState) => state.login
  );

  useEffect(() => {
    if (!pathname.includes("/loginAuth")) {
      dispatch(getProfile() as any);
    }
  }, [dispatch]);

  const handleBurgerModal = () => {
    setOpenBurgerModal((prev) => !prev);
  };

  const handleProfileClick = () => {
    if (isLoggedIn) {
      router.push("/userPage");
    } else {
      router.push("/loginAuth");
    }
  };

  return (
    <header
      className="firstHeader bg-gray1 w-full relative max-[640px]:pb-10"
      style={{ boxShadow: "0px 4px 16px 0px #0000000F" }}
    >
      <div className="container">
        <div className="header-items flex items-center justify-between  w-full max-xl:px-2 max-md:justify-start ">
          <div className="logo-search flex max-xl:w-full items-center max-sm:flex-col max-xl:justify-between ">
            <div className="logo relative left-[-20px]">
              <img className="w-64" src="/svg/logo2.svg" alt="" />
            </div>

            <div className="search-burgerMenu max-sm:w-full flex items-center max-sm:justify-between gap-4">
              <div className="search flex items-center gap-4 bg-gray-300  px-5 py-2 rounded-3xl  max-sm:flex-1">
                <img src="/svg/searchIcon.svg" alt="" />
                <div className="input__mainHeader max-sm:max-w-2xl">
                  <input
                    className=" w-full bg-transparent outline-none "
                    type="search"
                    placeholder="Что вы ищите?"
                  />
                </div>
              </div>

              <div
                onClick={handleBurgerModal}
                className="menu hidden max-xl:block "
              >
                <img
                  className="w-10 max-md:min-w-10"
                  src="/svg/menu.png"
                  alt=""
                />
              </div>
            </div>
          </div>

          <div className="info max-xl:hidden">
            <div className="login__cart flex items-center gap-12 ">
              <button
                onClick={handleProfileClick}
                className="username flex items-center gap-2 text-sm font-medium text-gray-700"
              >
                <img src="/svg/iconUser.svg" alt="" />
                {isLoggedIn ? (
                  data?.first_name
                ) : (
                  <div className="login-title ">
                    <p className="text__header font-light text-xs  text-maBlack text-start">
                      Войти
                    </p>
                    <h3 className="title__header font-normal text-xs">
                      Нет аккаунта?
                    </h3>
                  </div>
                )}
              </button>

              <Link href="/Cart" className="cart flex items-center gap-2">
                <div className="cart bg-maBlue w-9 h-9 rounded-full flex items-center justify-center">
                  <img
                    className="w-7 h-6 mt-1"
                    src="/svg/cart.png"
                    alt="Cart Icon"
                  />
                </div>

                <div className="cart-title">
                  <p className="text__header text__header font-light text-xs text-maBlack">
                    Моя корзина
                  </p>
                  <h3 className="title__header font-normal text-xs">
                    общая сумма
                  </h3>
                </div>
              </Link>

              <div className="cart flex items-center gap-2">
                <img src="/svg/iconCart.svg" alt="" />

                <div className="cart-title">
                  <p className="text__header text__header font-light text-xs text-maBlack">
                    Мои товары
                  </p>
                  <h3 className="title__header font-normal text-xs">
                    заказаные товары
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {openBurgerModal && <BurgerMenu onClose={() => setOpenBurgerModal(false)} />}
    </header>
  );
};

export default TheHeader;
