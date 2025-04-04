'use client';
import { useState } from "react";

interface ProductBtnProps {
  productId: number;
  productName: string;
  productPrice: number;
}

const ProductBtn = ({ productId, productName, productPrice }: ProductBtnProps) => {
  const [quantity, setQuantity] = useState(1);

  const increaseQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) setQuantity((prevQuantity) => prevQuantity - 1);
  };

  const handleAddToCart = () => {
    const item = {
      id: productId,
      name: productName,
      price: productPrice,
      quantity: quantity, 
    };

    const existingCart = JSON.parse(localStorage.getItem("cart") || "[]");
    
    const existingItemIndex = existingCart.findIndex((cartItem: any) => cartItem.id === productId);
    
    if (existingItemIndex >= 0) {
      existingCart[existingItemIndex].quantity += quantity;
    } else {
      existingCart.push(item);
    }
    
    localStorage.setItem("cart", JSON.stringify(existingCart));

    alert("Товар добавлен в корзину!");
  };

  return (
    <div className="product-btn-container flex flex-col items-start gap-4">
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

      <button
        className="bg-buttonPink text-white px-4 py-2 rounded-lg text-lg hover:bg-pink-600 transition"
        onClick={handleAddToCart}
      >
        Добавить в корзину
      </button>
    </div>
  );
};

export default ProductBtn;
