"use client";
import React from "react";
import { useDispatch,useSelector } from "react-redux";



const ToOrderModal = ({ handleModal }: any) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 px-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6">
        <div className="title__cross flex items-start justify-between">
          <h2 className="text-xl font-semibold mb-4 text-center">
            Оформление заказа
          </h2>
          <div onClick={handleModal} className="">
            <img className="w-4" src="/svg/cross.svg" alt="" />
          </div>
        </div>
        <form className="space-y-4">
          <div>
            <input
              type="text"
              name="first_name"
              placeholder="Имя"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <input
              type="text"
              name="last_name"
              placeholder="Фамилия"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <input
              type="text"
              name="phone_number"
              placeholder="Номер телефона"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <input
              type="text"
              name="address"
              placeholder="Адрес"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-maBlue text-white py-2 rounded-lg "
          >
            Заказать
          </button>
        </form>
      </div>
    </div>
  );
};

export default ToOrderModal;
