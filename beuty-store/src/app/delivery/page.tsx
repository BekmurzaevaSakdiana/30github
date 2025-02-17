import MainTitle from "@/components/ui/MainTitle";
import React from "react";

const DeliveryItems = () => {
  return (
    <section className=" ">
    <MainTitle text="Доставка и оплата"/>
      
      {/* Информация о доставке */}
      <div className="container px-4">
        <div className="deliveryInfo flex flex-col items-center gap-8">
          
          {/* Способы доставки */}
          <div className="methodSection w-full">
            <h2 className="text-2xl font-semibold text-center mb-4">Способы доставки</h2>
            <ul className="flex flex-col gap-4">
              <li className="flex items-center gap-4">
                <img src="/img/delivery-icon1.svg" alt="Курьер" className="w-10 h-10" />
                <p className="text-lg">Курьерская доставка по Алматы и другим городам Казахстана.</p>
              </li>
              <li className="flex items-center gap-4">
                <img src="/img/delivery-icon2.svg" alt="Почта" className="w-10 h-10" />
                <p className="text-lg">Доставка через почту — доступна для всех регионов.</p>
              </li>
              <li className="flex items-center gap-4">
                <img src="/img/delivery-icon3.svg" alt="Самовывоз" className="w-10 h-10" />
                <p className="text-lg">Самовывоз из нашего магазина в Алматы.</p>
              </li>
            </ul>
          </div>

          {/* Стоимость и время доставки */}
          <div className="priceTimeSection w-full">
            <h2 className="text-2xl font-semibold text-center mb-4">Стоимость и время доставки</h2>
            <ul className="flex flex-col gap-4">
              <li className="flex justify-between">
                <span className="text-lg">Курьерская доставка по Алматы</span>
                <span className="font-bold">1 000 тг</span>
              </li>
              <li className="flex justify-between">
                <span className="text-lg">Доставка по Казахстану (Почта)</span>
                <span className="font-bold">от 1 500 тг</span>
              </li>
              <li className="flex justify-between">
                <span className="text-lg">Самовывоз</span>
                <span className="font-bold">Бесплатно</span>
              </li>
            </ul>
            <p className="text-center mt-4 text-lg">Время доставки: 1-3 рабочих дня по Алматы, 3-7 рабочих дней по Казахстану.</p>
          </div>

          {/* Бесплатная доставка */}
          <div className="freeShipping w-full text-center mt-8">
            <h2 className="text-xl font-semibold">Бесплатная доставка</h2>
            <p className="text-lg">Бесплатная доставка при заказе от 10 000 тг!</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DeliveryItems;
