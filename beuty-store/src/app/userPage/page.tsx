"use client";
import { RootState } from "@reduxjs/toolkit/query";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../../store/slice/loginSlice";
import ModalConfirm from "@/components/ModalConfirm";

const UserPage = () => {
  const { data: userData } = useSelector((state: RootState) => state.login);
  const [openConfirmModal, setOpenConfirmModal] = useState(false);

  const handleConfirmModal = () => {
    setOpenConfirmModal((prev) => !prev);
  };

  return (
    <section className="min-h-screen ">
      <div className="main-title bg-gradient">
        <h1 className="py-16 t font-bold text-5xl text-center font-montseratt">
          Ваши данные
        </h1>
      </div>

      <div className="container mt-20 mx-auto p-5 bg-white shadow-lg rounded-lg max-w-4xl">
        <div className="space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-600">
                ИМЯ
              </label>
              <input
                type="text"
                className="mt-2 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300"
                placeholder={userData?.first_name || "ИМЯ"}
                readOnly
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600">
                EMAIL
              </label>
              <input
                type="email"
                className="mt-2 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300"
                placeholder={userData?.email || "EMAIL"}
                readOnly
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-600">
                ПАРОЛЬ
              </label>
              <input
                type="password"
                className="mt-2 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300"
                placeholder="••••••••"
                readOnly
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600">
                ТЕЛ НОМЕР
              </label>
              <input
                type="text"
                className="mt-2 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300"
                placeholder={userData?.phone || "ТЕЛ НОМЕР"}
                readOnly
              />
            </div>
          </div>

          <div>
            <p className="text-gray-600 text-center">
              Добро пожаловать на страницу вашего профиля! Это ваши данные
            </p>
          </div>
        </div>
      </div>

      <div onClick={handleConfirmModal} className="logout flex items-center justify-center mt-12 relative group w-20 mx-auto">
        <img
          src="/svg/logout.png"
          alt="Logout Icon"
          className="cursor-pointer"
        />
        <span className="absolute left-1/2 transform -translate-x-1/2 top-full mt-2 text-sm text-maBlue opacity-0 group-hover:opacity-100 transition-opacity">
          Выйти
        </span>
      </div>
      {
        openConfirmModal && <ModalConfirm  handleConfirmModal={handleConfirmModal}/>
      }
    </section>
  );
};

export default UserPage;
