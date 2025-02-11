"use client";
import React from "react";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../store/slice/loginSlice";
import { useRouter } from "next/navigation";
import { AuthActions } from "../../store/slice/authSlice";

interface ModalConfirmProps {
  handleConfirmModal: () => void;
}

const ModalConfirm: React.FC<ModalConfirmProps> = ({ handleConfirmModal }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogout = () => {
    dispatch(logoutUser());
    dispatch(AuthActions.logout());
    handleConfirmModal();
    router.push("/");
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-96 p-6">
        <div
          onClick={handleConfirmModal}
          className="cross flex items-center justify-end"
        >
          <img className="w-4" src="/svg/cross.svg" alt="" />
        </div>
        <h2 className="text-lg font-semibold text-center text-gray-800 mb-4">
          Вы точно хотите выйти?
        </h2>
        <div className="flex justify-center space-x-4 mt-12 gap-5">
          <button
            onClick={handleLogout}
            className="bg-buttonPink  text-white px-4 py-2 rounded-lg hover:bg-pink-600 transition"
          >
            Выйти
          </button>
          <button
            onClick={handleConfirmModal}
            className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-400 transition"
          >
            Отмена
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalConfirm;
