import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray1 mt-28 py-24">
      <div className="container">
        <div className="footer-items flex items-end justify-between">
          <div className="footer-items__left flex items-start gap-6 flex-col ">
            <div className="logo relative left-[-20px]">
            <img className="w-64" src="/svg/logo2.svg" alt="" />
            </div>

            <div className="contacts">
              <h3 className="font-bold text-3xl max-md:text-2xl">Контакты</h3>
              <p className="font-medium text-xl text-anyBlack mt-6 max-md:text-base">
                +7 707 602 5959
              </p>
            </div>

            <div className="address">
              <h3 className="font-bold text-3xl max-md:text-2xl">Адрес</h3>
              <p className="font-medium text-xl text-anyBlack mt-6 max-md:text-base ">
                г. Алматы, улица Макатаева 117
              </p>
            </div>
          </div>

          <div className="footer-items__right max-md:hidden">
            <nav>
              <ul className="flex items-start  gap-5 flex-col">
                <Link href={"/catalog"} className="font-medium text-xl text-maHalfBlack">Каталог</Link>
                <Link href={"/delivery"} className="font-medium text-xl text-maHalfBlack">Доставка и оплата</Link>
                <Link href={"/popular"} className="font-medium text-xl text-maHalfBlack">Популярные</Link>
                <Link href={"/brands"} className="font-medium text-xl text-maHalfBlack">Бренды</Link>
                <Link href={"/discounts"} className="font-medium text-xl text-maHalfBlack">Акции</Link>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
