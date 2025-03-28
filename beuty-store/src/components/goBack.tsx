'use client'
import React from "react";
import { useRouter } from "next/navigation";

interface GoBackProps {
  href?: string;
}

export default function GoBack({ href }: GoBackProps) {
  const router = useRouter();

  const handleBack = () => {
    if (href) {
      router.push(href); 
    } else {
      router.back(); 
    }
  };

  return (
    <div onClick={handleBack} style={{ cursor: "pointer" }}>
      <img src="/svg/left.png" alt="Back" />
    </div>
  );
}

