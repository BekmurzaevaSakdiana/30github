'use client';
import { useState } from "react";

interface CouterBtnProps {
  productId: number;
  productName: string;
  productPrice: number;
}

const CouterBtn = ({ productId, productName, productPrice }: CouterBtnProps) => {
  const [quantity, setQuantity] = useState(1);

  const increaseQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) setQuantity((prevQuantity) => prevQuantity - 1);
  };

  return (
    <div className="countProduct flex items-center gap-4">
      <button
        className="bg-gray-300 px-3 py-1 rounded-lg text-lg hover:bg-buttonPink hover:text-white transition"
        onClick={decreaseQuantity}
      >
        -
      </button>
      <p className="text-lg font-bold">{quantity}</p>
      <button
        className="bg-gray-300 px-3 py-1 rounded-lg text-lg hover:bg-buttonPink hover:text-white transition"
        onClick={increaseQuantity}
      >
        +
      </button>
    </div>
  );
};

export default CouterBtn;
