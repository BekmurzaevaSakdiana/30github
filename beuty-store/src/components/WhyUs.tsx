"use client";
import Title from "./ui/Title";
import React from "react";

const WhyUs = () => {
  return (
    <section className="mt-28">
      <div className="container">
        <div className="title-cards">
          <div className="title">
            <h2 className="font-bold text-4xl text-maBlack max-md:text-2xl">Почему мы?</h2>
          </div>

          <div className="cards__ mt-11 flex items-center justify-between gap-10 max-xl:flex-col max-xl:items-start">
            <div className="card1__  flex items-center gap-10">
              <div className="card1__img">
                <img className="max-w-20" src="/svg/Money.svg" alt="" />
              </div>

              <div className="card1__text">
                <p className="font-normal text-lg text-maBlack max-w-24 max-xl:max-w-full">Доступные цены</p>
              </div>
            </div>

            <div className="card1__  flex items-center gap-10">
              <div className="card1__img">
                <img className="max-w-20" src="/svg/order.svg" alt="" />
              </div>

              <div className="card1__text">
                <p className="font-normal text-lg text-maBlack max-w-24 max-xl:max-w-full">Бесплатная доставка</p>
              </div>
            </div>


            <div className="card1__  flex items-center gap-10">
              <div className="card1__img">
                <img className="max-w-20" src="/svg/original.svg" alt="" />
              </div>

              <div className="card1__text">
                <p className="font-normal text-lg text-maBlack max-w-24 max-xl:max-w-full">Оригинальная продукция</p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyUs;
