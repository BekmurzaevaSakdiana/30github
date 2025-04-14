"use client";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import axiosInstance from "@/app/axios/axios";
import { CardData } from "@/types/modules";

interface ToOrderModalProps {
  handleModal: () => void;
  items: CardData[];
}

const ToOrderModal: React.FC<ToOrderModalProps> = ({
  handleModal,
  items,
  clearCart,
}: any) => {
  const { data } = useSelector((state: RootState) => state.login);

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    phone: "",
    address: "",
  });

  const [products, setProducts] = useState([]);

  useEffect(() => {
    const localProducts = localStorage.getItem("cart");
    if (localProducts) {
      const parsed = JSON.parse(localProducts).map((item: any) => ({
        id: item.id,
        name: item.name,
        quantity: item.quantity || 1,
        price: item.price,
      }));
      setProducts(parsed);
    }
  }, []);

  const handlePostProductsList = async (e: any) => {
    e.preventDefault();
    try {
      const formattedItems = items.map((item: any) => ({
        product:item.id,
        quantity: item.quantity || 1,
      })) 
  
      const payload = {
        ...formData,
        items: formattedItems,
        status: "в ожидании",
      };
  
      const response = await axiosInstance.post('orders/', payload);
      console.log("Order created:", response.data);
  
      localStorage.removeItem("cart");
      clearCart();
      handleModal();
    } catch (error: any) {
      console.error("Error", error.response?.data || error.message);
    }
  };
  
  useEffect(() => {
    if (data) {
      setFormData((prev) => ({
        ...prev,
        first_name: data.first_name || "",
        last_name: data.last_name || "",
        phone: data.phone || "",
        address: data.address || "",
      }));
    }
  }, [data]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 px-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6">
        <div className="title__cross flex items-start justify-between">
          <h2 className="text-xl font-semibold mb-4 text-center">
            Оформление заказа
          </h2>
          <div onClick={handleModal}>
            <img className="w-4" src="/svg/cross.svg" alt="Закрыть" />
          </div>
        </div>
        <form onSubmit={handlePostProductsList} className="space-y-4">
          <input
            type="text"
            name="first_name"
            placeholder="Имя"
            value={formData.first_name}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          />

          <input
            type="text"
            name="last_name"
            placeholder="Фамилия"
            value={formData.last_name}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          />

          <input
            type="text"
            name="phone"
            placeholder="Номер телефона"
            value={formData.phone}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          />

          <input
            type="text"
            name="address"
            placeholder="Адрес"
            value={formData.address}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          />

          <button
            type="submit"
            className="w-full bg-maBlue text-white py-2 rounded-lg"
          >
            Заказать
          </button>
        </form>
      </div>
    </div>
  );
};

export default ToOrderModal;
