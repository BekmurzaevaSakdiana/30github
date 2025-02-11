"use client";
import React, { useState } from "react";

const CouterBtn = () => {
  const [quantity, setQuantity] = useState(1);
  const handleIncrease = () => setQuantity((prev) => prev + 1);
  const handleDecrease = () => {
    if (quantity > 1) setQuantity((prev) => prev - 1);
  };
  return (
    <div className="countProduct flex items-center gap-4">
      <button
        className="bg-gray-300 px-3 py-1 rounded-lg text-lg hover:bg-buttonPink hover:text-white transition"
        onClick={handleDecrease}
      >
        -
      </button>
      <p className="text-lg font-bold">{quantity}</p>
      <button
        className="bg-gray-300 px-3 py-1 rounded-lg text-lg hover:bg-buttonPink hover:text-white transition"
        onClick={handleIncrease}
      >
        +
      </button>
    </div>
  );
};

export default CouterBtn;
