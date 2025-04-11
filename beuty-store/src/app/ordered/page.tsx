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
    <div className="">
      <MainTitle text="Заказанные товары" />

      <div className="container mx-auto">
        <div className="cartItems flex flex-col items-center">
          {loading ? (
            <div className="loadingSpinner w-full text-center mt-12">
              <h3 className="text-lg sm:text-xl text-gray-400 font-medium">
                Загрузка...
              </h3>
            </div>
          ) : data.length > 0 ? (
            data?.map((order) => (
              <React.Fragment key={order.id}>
                {order.items.map((item) => (
                  <div>
                    <div
                      key={item?.product?.id}
                      className="cartItem flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 w-full sm:w-[90%] md:w-[70%] max-w-[1000px] p-4 sm:p-6 bg-white shadow-lg rounded-lg gap-4"
                    >
                      <div className="leftImgProduct flex-shrink-0 w-full sm:w-[150px]">
                        <img
                          className="w-full h-auto rounded-lg object-cover"
                          src={
                            item.product?.images?.[0]?.image ||
                            "/img/card1.jpg"
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
                            {item.product?.price ?? "Цена не указана"}
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

                    <button></button>
                  </div>
                ))}
              </React.Fragment>
            ))
          ) : (
            <div className="emptyCart w-full text-center mt-12">
              <h3 className="text-lg sm:text-xl text-gray-400 font-medium">
                Пусто
              </h3>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
