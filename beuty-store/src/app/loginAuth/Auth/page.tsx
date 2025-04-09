"use client";
import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../store"; // Adjust paths as needed
import { registerUser } from "../../../../store/slice/authSlice";
import { useRouter } from "next/navigation";
import { getProfile } from "../../../../store/slice/loginSlice";
import Input from "../../../components/ui/Input";

interface AuthProps {}

const Auth: React.FC<AuthProps> = () => {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [first_name, setFirstName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const dispatch: AppDispatch = useDispatch();
  const { isLoading, isRegistered, error } = useSelector(
    (state: RootState) => state.auth
  );

  const handleRegister = async (): Promise<void> => {
    if (password !== confirmPassword) {
      alert("Пароли не совпадают!");
      return;
    }
    await dispatch(registerUser({ email, password, first_name, phone }));
    await dispatch(getProfile());
  };

  useEffect(() => {
    if (isRegistered) {
      router.push("/loginAuth/auth/verify");
    }
  }, [isRegistered, router]);

  const getError = (key: string) => {
    if (error) return error[key] ?? "";
  };

  return (
    <section className="bg-white min-h-screen flex items-start justify-center pt-16 relative">
      {isLoading && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 z-50 flex items-center justify-center">
          <img src="/img/loading.gif" alt="Loading" className="w-20 h-20" />
        </div>
      )}

      <div className="back absolute left-20">
        <button
          onClick={() => router.back()}
          className="flex items-center justify-start gap-2 text-gray-700 hover:text-gray-900 transition duration-200"
        >
          <img src="/svg/left.png" alt="Назад" className="w-6 h-6" />
          <span className="text-lg font-medium">Назад</span>
        </button>
      </div>

      <div className="container max-w-md p-8 rounded-lg">
        <h2 className="text-4xl font-semibold text-center text-gray-800 mb-6">
          Регистрация
        </h2>

        <form
          className="space-y-4"
          onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            handleRegister();
          }}
        >
          <Input
            type="text"
            placeholder="EMAIL"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={getError("email")}
          />

          <Input
            type="text"
            placeholder="ИМЯ"
            value={first_name}
            onChange={(e) => setFirstName(e.target.value)}
            error={getError("first_name")}
          />

          <Input
            type="text"
            placeholder="ТЕЛЕФОН"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            error={getError("phone")}
          />

          <Input
            type="password"
            placeholder="ПАРОЛЬ"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={getError("password")}
          />

          <Input
            type="password" 
            placeholder="ПОВТОРИТЕ ПАРОЛЬ"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            error={password !== confirmPassword ? "Пароли не совпадают" : ""}
          />

          <button
            type="submit"
            className="mt-24 w-full py-2 text-white bg-buttonPink rounded-lg hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-300"
            disabled={isLoading}
          >
            {isLoading ? "Регистрация..." : "Зарегистрироваться"}
          </button>
        </form>

        {isRegistered && (
          <div className="fixed inset-0 bg-gray-800 bg-opacity-75 z-50 flex flex-col items-center justify-center">
            <img
              src="/img/success.gif"
              alt="Success"
              className="w-32 h-32 mb-4"
            />
            <p className="text-white text-xl">Успешная регистрация!</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Auth;
