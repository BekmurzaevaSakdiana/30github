"use client";
import { useEffect, useState } from "react";

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
  const [isInCart, setIsInCart] = useState(false);

  useEffect(() => {
    const existingCart = JSON.parse(localStorage.getItem("cart") || "[]");
    const alreadyInCart = existingCart.some(
      (item: any) => item.id === productId
    );
    setIsInCart(alreadyInCart);
  }, [productId]);

  const handleAddToCart = () => {
    if (isInCart) return;

    const item = {
      id: productId,
      name: productName,
      price: productPrice,
      images: productImages,
      quantity: 1, 
    };

    const existingCart = JSON.parse(localStorage.getItem("cart") || "[]");
    existingCart.push(item);
    localStorage.setItem("cart", JSON.stringify(existingCart));
    setIsInCart(true);
    alert("Товар добавлен в корзину!");
  };

  return (
    <div className="product-btn-container">
      <button
        className={`px-4 py-2 rounded-lg text-lg transition ${
          isInCart
            ? "bg-gray-400 cursor-not-allowed text-white"
            : "bg-buttonPink text-white hover:bg-pink-600"
        }`}
        onClick={handleAddToCart}
        disabled={isInCart}
      >
        {isInCart ? "Уже в корзине" : "Добавить в корзину"}
      </button>
    </div>
  );
};

export default ProductBtn;
