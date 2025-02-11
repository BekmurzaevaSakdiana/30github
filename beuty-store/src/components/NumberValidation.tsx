"use client";
import React, { ChangeEvent, useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const NumberValidation = () => {
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [valid, setValid] = useState<boolean>(true);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const input = event.target.value;
    setPhoneNumber(input);
    setValid(validatePhoneNumber(input));
  };

  const validatePhoneNumber = (phoneNumber: string) => {
    const phoneNumberPattern = /^\d{10}$/;
    return phoneNumberPattern.test(phoneNumber);
  };

  return (
    <div className="w-full px-4 py-2">
      <PhoneInput
      className="border-none"
        country={"kg"}
        value={phoneNumber}
        onChange={handleChange}
        inputProps={{
          required: true,
        }}
      />
      {!valid && <span className="text-red-600 text-sm">напиши правильно</span>}
    </div>
  );
};

export default NumberValidation;
