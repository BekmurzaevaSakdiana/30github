"use client";
import MainTitle from "@/components/ui/MainTitle";
import React, { useEffect, useState } from "react";
import axiosInstance from "../axios/axios";

interface OrderItem {
  product: {
    id: number;
    name?: string;
    price: string;
    images?: { image: string }[] | null;
  };
  quantity: number;
  get_total_price: string;
}

interface Order {
  id: number;
  items: OrderItem[];
  status: string;
  ordered_at: string;
}

const Page = () => {
  const [data, setData] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const handleGetData = async () => {
      setLoading(true);
      try {
        const res = await axiosInstance.get("orders/");
        setData(res.data.results);
      } catch (error: any) {
        console.error("Ошибка при получении заказов", error);
      } finally {
        setLoading(false);
      }
    };

    handleGetData();
  }, []);

  return (
    <section>
      <MainTitle text="История заказов" />

      <div className="container mx-auto">
        <div className="cartItems flex flex-col items-center">
          {loading ? (
            <div className="loadingSpinner w-full text-center mt-12">
              <h3 className="text-lg sm:text-xl text-gray-400 font-medium">
                Загрузка...
              </h3>
            </div>
          ) : data.length > 0 ? (
            <div className="w-full max-h-[600px] overflow-y-auto custom-scroll">
              {data.map((order) => (
                <div key={order.id} className="w-full mb-8">
                  <div className="flex flex-col items-center justify-center mb-4 text-center">
                    <p className="text-sm text-gray-500 mb-1">
                      Номер заказа:{" "}
                      <span className="font-semibold text-black">
                        №{order.id}
                      </span>
                    </p>

                    <h2 className="font-bold text-lg sm:text-xl text-gray-700 mb-1">
                      Статус заказа:{" "}
                      <span className="text-buttonPink font-semibold">
                        {order.status}
                      </span>
                    </h2>

                    <p className="text-sm text-gray-500">
                      Дата заказа:{" "}
                      {new Date(order.ordered_at).toLocaleString("ru-RU", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>

                  {order.items.map((item) => (
                    <div
                      key={`${order.id}-${item.product?.id}`}
                      className="cartItem flex mx-auto flex-col sm:flex-row items-center justify-between mb-6 w-[90%] sm:w-[95%] md:w-[85%] lg:w-[90%] max-w-[900px] p-4 sm:p-6 bg-white shadow-lg rounded-lg gap-4"
                    >
                      <div className="leftImgProduct flex-shrink-0 w-full mx-auto sm:w-[150px]">
                        <img
                          className="w-full h-auto rounded-lg object-cover"
                          src={
                            item.product?.images?.[0]?.image || "/img/card1.jpg"
                          }
                          alt={item.product?.name ?? "Изображение товара"}
                        />
                      </div>

                      <div className="productName__price flex flex-col gap-2 flex-1 w-full">
                        <h2 className="text-lg sm:text-xl font-semibold break-words">
                          {item.product?.name ?? "Название товара не указано"}
                        </h2>
                        <p className="text-md sm:text-lg text-gray-700">
                          Цена:{" "}
                          <span className="font-bold text-buttonPink">
                            {item.product?.price ?? "Цена не указана"} тг.
                          </span>
                        </p>
                        <p className="text-md sm:text-lg text-gray-700">
                          Кол-во:{" "}
                          <span className="font-bold text-buttonPink">
                            {item.quantity}
                          </span>
                        </p>
                        <p className="text-md sm:text-lg text-gray-700">
                          Сумма:{" "}
                          <span className="font-bold text-buttonPink">
                            {item.get_total_price}
                          </span>
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          ) : (
            <div className="emptyCart w-full text-center mt-12">
              <h3 className="text-lg sm:text-xl text-gray-400 font-medium">
                У вас пока нет заказов
              </h3>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Page;
