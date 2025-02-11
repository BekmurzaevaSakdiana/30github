"use client";
import React, { useState } from "react";

const HelpItems = () => {

  return (
    <section className="contacts-section">
      <div className="main-title bg-gradient">
        <h1 className="py-16 t font-bold text-5xl text-center font-montseratt">
          Помощь
        </h1>
      </div>

      <div className="container">
        <div className="helpCard__items mt-12 flex flex-col items-center gap-12">
          <div className="firstCard__items max-w-4xl w-full mx-auto  px-6 py-5 rounded-lg  bg-gray-200 shadow-xl flex flex-col items-center gap-5">
            <h2 className="text-2xl font-bold hover:text-buttonPink transition-all duration-700 ease-linear"> Как выбрать косметику?</h2>
            <p className="text-start font-normal text-md max-[600px]:text-sm ">
            В разделе Каталог вы найдете широкий выбор продуктов, которые
                можно фильтровать по различным категориям. Выберите интересующий
                вас продукт, и вы будете перенаправлены на страницу, где
                представлены различные виды и варианты этого товара. Здесь вы
                сможете подробно ознакомиться с характеристиками каждого
                продукта, сравнить цены и выбрать наиболее подходящий для себя
                вариант.
            </p>
          </div>

          <div className="firstCard__items max-w-4xl w-full mx-auto  px-6 py-5 rounded-lg  bg-gray-200 shadow-xl flex flex-col items-center gap-5">
            <h2 className="text-2xl font-bold hover:text-buttonPink transition-all duration-700 ease-linear">  Ознакомьтесь с процессом оформления заказа и получайте свою</h2>
            <p className="text-start font-normal text-md max-[600px]:text-sm ">
            В разделе Каталог вы найдете широкий выбор продуктов, которые
                можно фильтровать по различным категориям. Выберите интересующий
                вас продукт, и вы будете перенаправлены на страницу, где
                представлены различные виды и варианты этого товара. Здесь вы
                сможете подробно ознакомиться с характеристиками каждого
                продукта, сравнить цены и выбрать наиболее подходящий для себя
                вариант.
            </p>
          </div>

          <div className="firstCard__items max-w-4xl w-full mx-auto  px-6 py-5 rounded-lg  bg-gray-200 shadow-xl flex flex-col items-center gap-5">
            <h2 className="text-2xl font-bold hover:text-buttonPink transition-all duration-700 ease-linear">      Узнайте о доступных методах оплаты, чтобы выбрать наиболее удобный</h2>
            <p className="text-start font-normal text-md max-[600px]:text-sm ">
            В разделе Каталог вы найдете широкий выбор продуктов, которые
                можно фильтровать по различным категориям. Выберите интересующий
                вас продукт, и вы будете перенаправлены на страницу, где
                представлены различные виды и варианты этого товара. Здесь вы
                сможете подробно ознакомиться с характеристиками каждого
                продукта, сравнить цены и выбрать наиболее подходящий для себя
                вариант.
            </p>
          </div>



        </div>
      </div>
    </section>
  );
};

export default HelpItems;
