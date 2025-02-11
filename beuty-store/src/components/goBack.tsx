"use client";
import React from "react";
import { useRouter } from "next/navigation";

export default function GoBack() {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <div
      onClick={handleBack}
     
    >
      <img src="/svg/left.png" alt="Back" />
    </div>
  );
}
