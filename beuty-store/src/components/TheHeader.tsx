"use client";
import React, { useEffect, useState } from "react";
import BurgerMenu from "./BurgerMenu";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/index";
import { getProfile, setLoggedIn } from "../../store/slice/loginSlice";
import { useParams, usePathname, useRouter } from "next/navigation";
import SearchInputHeader from "./SearchInputHeader";

const TheHeader = () => {
  const [openBurgerModal, setOpenBurgerModal] = useState(false);
  const [cartNotEmpty, setCartNotEmpty] = useState<boolean>(false);

  const dispatch = useDispatch();
  const router = useRouter();
  const pathname = usePathname();
  const { isLoggedIn, data } = useSelector(
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



  useEffect(() => {
    const checkCart = () => {
      const cart = JSON.parse(localStorage.getItem("cart") || "[]");
      setCartNotEmpty(cart.length > 0);
    };
  
    checkCart();
  
    const intervalId = setInterval(checkCart, 500);
  
    return () => {
      clearInterval(intervalId);
    };
  }, []);
  

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
            <Link href={"/"} className="logo relative left-[-20px]">
              <img className="w-64" src="/svg/logo2.svg" alt="" />
            </Link>

            <div className="search-burgerMenu max-sm:w-full flex items-center max-sm:justify-between gap-4">
              <SearchInputHeader />

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

              <Link href="/cart" className="cart flex items-center gap-2">
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

              {cartNotEmpty && (
                <div className="cart-notification absolute  top-5 right-[347px] w-4 h-4 bg-red-500 rounded-full text-white text-xs flex items-center justify-center">
                  !
                </div>
              )}

              <Link href="/ordered" className="cart flex items-center gap-2">
                <img className="" src="/svg/iconCart.svg" alt="" />

                <div className="cart-title">
                  <p className="text__header text__header font-light text-xs text-maBlack">
                    Мои товары
                  </p>
                  <h3 className="title__header font-normal text-xs">
                    заказаные товары
                  </h3>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {openBurgerModal && (
        <BurgerMenu onClose={() => setOpenBurgerModal(false)} />
      )}
    </header>
  );
};

export default TheHeader;
