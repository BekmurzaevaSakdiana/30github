import React from "react";

const OrderedItems = () => {
  return (
    <section className="">
      <h1 className="py-12  font-montseratt font-bold text-4xl text-center bg-gradient w-full mb-8">
        Мои заказы
      </h1>
      <div className="container">
        <div className="orderedItems flex flex-col items-center">
          <div className="orderedItem shadow-lg rounded-lg px-4 flex items-center w-[90%] justify-between mb-6">
            <div className="leftImgProduct">
              <img className="max-w-72 w-full" src="/img/card1.jpg" alt="" />
            </div>
            <div className="productName__price flex flex-col gap-4">
              <h2 className="text-lg">
                Название:{" "}
                <span className="font-medium text-buttonPink">
                  SOMANG COSMETICS ECO ALOE HAIR CONDITIONER
                </span>
              </h2>
              <p className="text-lg">
                Цена: {" "}
                <span className="font-bold text-buttonPink">4 200тг.</span>
              </p>
              <p className="text-lg">
                Статус: {" "}
                <span className="font-bold text-green-500">Доставлено</span>
              </p>
            </div>
          </div>

          <div className="TOTAL w-full text-center mt-12">
            <h2 className="text-lg font-medium">
              Общая сумма <span className="text-buttonPink">: 123 123 123</span>{" "}
            </h2>
          </div>

          <div className="emptyOrders w-full text-center mt-12 hidden">
            <h3 className="text-xl font-medium">У вас нет заказов</h3>
            <p className="text-md">Вы можете оформить заказ в каталоге.</p>
            <button className="rounded-full bg-buttonPink text-white px-6 py-2 mt-4 hover:bg-buttonPinkDark transition">
              Перейти в каталог
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OrderedItems;
