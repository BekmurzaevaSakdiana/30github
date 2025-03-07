"use client";
import React from "react";
import { useRouter } from "next/navigation";

interface GoBackProps {
  href?: string; // Необязательный пропс для кастомного URL
}

export default function GoBack({ href }: GoBackProps) {
  const router = useRouter();

  const handleBack = () => {
    if (href) {
      router.push(href); // Перенаправление на указанный URL
    } else {
      router.back(); // Возврат на предыдущую страницу
    }
  };

  return (
    <div onClick={handleBack} style={{ cursor: "pointer" }}>
      <img src="/svg/left.png" alt="Back" />
    </div>
  );
}
