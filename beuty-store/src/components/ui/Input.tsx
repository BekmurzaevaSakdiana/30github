import React, { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  value: string;
  error?: string;
}

const Input: React.FC<InputProps> = ({
  className = '',
  error = "",
  ...attr
}) => {
  return (
    <>
      <input
        className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300 ${className}`}
        {...attr}
      />
      {error && <span className="text-red-600 text-sm">{error}</span>}
    </>
  );
};

export default Input;
