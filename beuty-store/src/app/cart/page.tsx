import React from "react";

const CartItems = () => {
  return (
    <section className=" ">
      <h1 className="py-12  font-bold text-4xl text-center bg-gradient w-full mb-8">
        Корзина
      </h1>
      <div className="container ">
        <div className="cartItems flex flex-col items-center ">
          <div className="cartItem shadow-lg rounded-lg px-4 flex items-center w-[90%] justify-between mb-6 ">
            <div className="leftImgProduct ">
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
                Цена:{" "}
                <span className="font-bold text-buttonPink">4 200тг.</span>
              </p>
            </div>
            <div className="countProduct flex items-center gap-4">
              <button className="bg-gray-300 px-3 py-1 rounded-lg text-lg hover:bg-buttonPink hover:text-white transition">
                -
              </button>
              <p className="text-lg font-bold ">1</p>
              <button className="bg-gray-300 px-3 py-1 rounded-lg text-lg hover:bg-buttonPink hover:text-white transition">
                +
              </button>
            </div>
          </div>

          <div className="TOTAL w-full text-center mt-12 ">
            <h2 className="text-lg font-medium">
              ИТОГО <span className="text-buttonPink">: 123 123 123</span>{" "}
            </h2>
            <button className=" rounded-full bg-buttonPink text-white px-14 py-2 mt-4 hover:bg-buttonPinkDark transition">
              ЗАКАЗАТЬ
            </button>
          </div>

          <div className="emptyCart w-full text-center mt-12 hidden">
            <h3 className="text-xl font-medium">Ваша корзина пуста</h3>
            <p className="text-md">Добавьте товары, чтобы оформить заказ.</p>
            <button className="rounded-full bg-buttonPink text-white px-6 py-2 mt-4 hover:bg-buttonPinkDark transition">
              Перейти в каталог
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CartItems;
