"use client";
import Input from "@/components/ui/Input";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../../store";
import { verifyCode } from "../../../../../store/slice/verifySlice";
import { useRouter } from "next/navigation";

const VerifyPage: React.FC = () => {
  const [code, setCode] = useState<string>("");
  const dispatch = useDispatch<AppDispatch>();
  const { isLoading, isVerified, error } = useSelector(
    (state: RootState) => state.verifySlice
  );
  const router = useRouter();

  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault();
    await dispatch(verifyCode(code));
  };

  useEffect(() => {
    if (isVerified) {
      router.push("/UserPage");
    }
  }, [isVerified, router]);

  const getErrorMessage = (error: any) => {
    if (typeof error === "string") {
      return error;
    }
    if (error && typeof error === "object") {
      return error?.message || "Ошибка при верификации";
    }
    return "Неизвестная ошибка";
  };

  return (
    <section className="bg-white min-h-screen mt-24">
      <div className="container">
        <div className="confirmCode__items  ">
          <h2 className="text-3xl font-semibold text-center mb-6">
            Введите код подтверждения
          </h2>

          <form onSubmit={handleVerifyCode}>
            <div className="input__btn flex items-center justify-center flex-col">
              <Input
                className="w-2/4"
                type="text"
                placeholder="Введите код из письма"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                error={error ? "Неверный код" : ""}
              />

              <button
                type="submit"
                className="mt-5 py-2 w-2/4  text-white bg-buttonPink rounded-lg hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-300"
                disabled={isLoading}
              >
                {isLoading ? "Проверка..." : "Подтвердить"}
              </button>
            </div>
          </form>
        </div>

        {isVerified && (
          <p className="text-green-500 text-center mt-4">
            Код успешно подтвержден!
          </p>
        )}
        {error && (
          <p className="text-red-500 text-center mt-4">
            {getErrorMessage(error)}
          </p>
        )}
      </div>
    </section>
  );
};

export default VerifyPage;
