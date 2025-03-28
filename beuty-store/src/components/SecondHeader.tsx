"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import ModalCatalog from "./ModalCatalog";
import { usePathname } from "next/navigation";

const SecondHeader = () => {
  const [openModalCatalog, setOpenModalCatalog] = useState(false);
  const pathname = usePathname();

  const handleCatalogModal = () => {
    setOpenModalCatalog((prev) => !prev);
  };

  const getLinkClass = (
    path: string) => {
    return pathname === path
      ? "text-black font-bold text-lg cursor-pointer"
      : "text-maHalfBlack text-md font-medium cursor-pointer";
  };

  return (
    <nav
      className="secondHeader max-xl:hidden shadow-lg"
      style={{
        background: "linear-gradient(90.12deg, #FFBEC0 0.69%, #FF96BC 81.58%)",
      }}
    >
      <div className="container">
        <div className="headerItems py-7 flex relative">
          <nav className="flex w-full">
            <ul className="flex items-center w-full justify-between">
              <Link href="/" className={getLinkClass("/")}>
                Главное
              </Link>
              <li
                onClick={handleCatalogModal}
                className="catalog-trigger text-maHalfBlack text-md font-medium active:text-black cursor-pointer"
              >
                Каталог
              </li>
              <Link href="/brands" className={getLinkClass("/brands")}>
                Бренды
              </Link>
              <Link href="/popular" className={getLinkClass("/popular")}>
                Популярное
              </Link>
              <Link href="/discounts" className={getLinkClass("/discounts")}>
                Акции
              </Link>
              <Link href="/contacts" className={getLinkClass("/contacts")}>
                Контакты
              </Link>
              <Link href="/delivery" className={getLinkClass("/delivery")}>
                Доставка и оплата
              </Link>
              <Link href="/help" className={getLinkClass("/help")}>
                Помощь
              </Link>
            </ul>
          </nav>
        </div>
      </div>

      {openModalCatalog && (
        <ModalCatalog setOpenModalCatalog={setOpenModalCatalog} />
      )}
    </nav>
  );
};

export default SecondHeader;
