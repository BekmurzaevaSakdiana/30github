"use client";  
import React from "react";
import { Provider } from "react-redux";
import TheHeader from "./TheHeader";
import SecondHeader from "./SecondHeader";
import Footer from "./Footer";
import { store } from "../../store";

const ClientProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider store={store}>
      <TheHeader />
      <SecondHeader />
      {children}
      <Footer />
    </Provider>
  );
};

export default ClientProvider;
