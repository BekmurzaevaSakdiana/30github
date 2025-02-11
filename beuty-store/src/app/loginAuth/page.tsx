"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { getProfile, loginUser } from "../../../store/slice/loginSlice";
import { RootState, AppDispatch } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import Input from "../../components/ui/Input";

const LoginAuth = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch<AppDispatch>();
  const { isLoading, error, isLoggedIn } = useSelector(
    (state: RootState) => state.login
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await dispatch(loginUser({ login: email, password }));
    await dispatch(getProfile());
  };

  useEffect(() => {
    if (isLoggedIn) {
      const timer = setTimeout(() => {
        router.push("/userPage");
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isLoggedIn, router]);

  const getError = (key: string) => {
    if (error) return error[key] ?? "";
    return "";
  };

  return (
    <section className="bg-white min-h-screen flex items-start justify-center pt-16 relative">
      {isLoading && (
        <div className="fixed inset-0 bg-gray-700 bg-opacity-50 z-50 flex items-center justify-center">
          <img src="/img/loading.gif" alt="Loading" className="w-20 h-20" />
        </div>
      )}

      <div className="container max-w-md p-8 rounded-lg">
        <h2 className="text-4xl font-semibold text-center text-gray-800 mb-6">
          Вход
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="text"
            placeholder="EMAIL"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
         
          <Input
            type="password"
            placeholder="ПАРОЛЬ"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2 mt-4 text-white bg-buttonPink rounded-lg hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-300"
          >
            Войти
          </button>
        </form>

        {error && (
          <p className="text-red-500 text-center mt-2">
            Login or password invalid.
          </p>
        )}

        <p className="text-center mt-4 text-gray-600">
          У вас нет аккаунта?{" "}
          <Link
            href="/loginAuth/auth"
            className="text-pink-500 hover:underline cursor-pointer"
          >
            Зарегистрируйтесь!
          </Link>
        </p>
      </div>

      {isLoggedIn && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 z-50 flex flex-col items-center justify-center">
          <img
            src="/img/success.gif"
            alt="Success"
            className="w-32 h-32 mb-4"
          />
          <p className="text-white text-xl">Успешный вход!</p>
        </div>
      )}
    </section>
  );
};

export default LoginAuth;
