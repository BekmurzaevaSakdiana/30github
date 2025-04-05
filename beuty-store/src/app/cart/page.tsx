"use client";
import MainTitle from "@/components/ui/MainTitle";
import { CardData } from "@/types/modules";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const CartItems = () => {
  const [dataProducts, setDataProducts] = useState<CardData[]>([]);

  useEffect(() => {
    const dataLocalStorage = localStorage.getItem("cart");
    if (dataLocalStorage) {
      const parsedData = JSON.parse(dataLocalStorage).map((item: CardData) => ({
        ...item,
        quantity: item.quantity || 1, 
      }));
      setDataProducts(parsedData);
    }
  }, []);

  const updateLocalStorage = (updatedProducts: CardData[]) => {
    localStorage.setItem("cart", JSON.stringify(updatedProducts));
    setDataProducts(updatedProducts);
  };

  const increaseQuantity = (productId: number) => {
    const updated = dataProducts.map((item) =>
      item.id === productId
        ? { ...item, quantity: (item.quantity || 1) + 1 }
        : item
    );
    updateLocalStorage(updated);
  };

  const decreaseQuantity = (productId: number) => {
    const updated = dataProducts
      .map((item) =>
        item.id === productId
          ? { ...item, quantity: (item.quantity || 1) - 1 }
          : item
      )
      .filter((item) => item.quantity > 0); 
    updateLocalStorage(updated);
  };

  const calculateTotalPrice = () => {
    return dataProducts.reduce(
      (total, item) => total + item.price * (item.quantity || 1),
      0
    );
  };

  return (
    <section className="">
      <MainTitle text="Корзина" />

      <div className="container mx-auto">
        <div className="cartItems flex flex-col items-center">
          {dataProducts.length > 0 ? (
            dataProducts.map((item) => (
              <div
                key={item.id}
                className="cartItem flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 w-full sm:w-[90%] md:w-[70%] max-w-[1000px] p-4 sm:p-6 bg-white shadow-lg rounded-lg gap-4"
              >
                <div className="leftImgProduct flex-shrink-0 w-full sm:w-[150px]">
                  {item.images?.[0] && (
                    <img
                      className="w-full h-auto rounded-lg object-cover"
                      src={item.images[0].image}
                      alt={item.name}
                    />
                  )}
                </div>

                <div className="productName__price flex flex-col gap-2 flex-1 w-full">
                  <h2 className="text-lg sm:text-xl font-semibold break-words">
                    {item.name}
                  </h2>
                  <p className="text-md sm:text-lg text-gray-700">
                    Цена:{" "}
                    <span className="font-bold text-buttonPink">
                      {item.price} тг.
                    </span>
                  </p>

                  <div className="flex items-center gap-3">
                    <p className="text-md sm:text-lg text-gray-700">
                      Кол-во:{" "}
                      <span className="font-bold text-buttonPink">
                        {item.quantity || 1}
                      </span>
                    </p>
                    <div className="flex gap-2">
                      <button
                        onClick={() => decreaseQuantity(item.id)}
                        className="bg-gray-200 hover:bg-gray-300 px-2 rounded"
                      >
                        –
                      </button>
                      <button
                        onClick={() => increaseQuantity(item.id)}
                        className="bg-gray-200 hover:bg-gray-300 px-2 rounded"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>

                <div className="cross self-start">
                  <img className="w-4 max-sm:hidden" src="/svg/cross.svg" alt="Удалить" />
                  <button className="sm:hidden bg-buttonPink text-white px-2 py-1 rounded-full">
                    Удалить
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="emptyCart w-full text-center mt-12">
              <h3 className="text-lg sm:text-xl font-medium">Ваша корзина пуста</h3>
              <p className="text-sm sm:text-md mb-6 sm:mb-12">
                Добавьте товары, чтобы оформить заказ.
              </p>
              <Link
                href={"/"}
                className="inline-block rounded-full bg-buttonPink text-white px-6 py-2 hover:bg-buttonPinkDark transition"
              >
                Перейти в каталог
              </Link>
            </div>
          )}

          {dataProducts.length > 0 && (
            <div className="TOTAL w-full text-center mt-8 sm:mt-12">
              <h2 className="text-md sm:text-lg font-medium">
                ИТОГО{" "}
                <span className="text-buttonPink">
                  : {calculateTotalPrice()} тг.
                </span>
              </h2>
              <button className="rounded-full bg-buttonPink text-white px-8 sm:px-14 py-2 mt-4 hover:bg-buttonPinkDark transition">
                ЗАКАЗАТЬ
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default CartItems;
