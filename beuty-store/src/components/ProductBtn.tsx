"use client";
import { useEffect } from "react";

interface ProductBtnProps {
  productId: number;
  productName: string;
  productPrice: number;
  productImages: { image: string }[];
}

const ProductBtn = ({
  productId,
  productName,
  productPrice,
  productImages,
}: ProductBtnProps) => {
  
  const handleAddToCart = () => {
    const item = {
      id: productId,
      name: productName,
      price: productPrice,
      images: productImages,
    };

    const existingCart = JSON.parse(localStorage.getItem("cart") || "[]");

    const alreadyInCart = existingCart.some(
      (cartItem: any) => cartItem.id === productId
    );

    if (!alreadyInCart) {
      existingCart.push(item);
      localStorage.setItem("cart", JSON.stringify(existingCart));
      alert("Товар добавлен в корзину!");
    } else {
      alert("Этот товар уже в корзине.");
    }
  };

  return (
    <div className="product-btn-container">
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
