'use client'
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";
import FisrtSection from "./FisrtSection";

export default function App() {
  return (
    <>
      <Swiper
        pagination={{
          dynamicBullets: true,
        }}
        loop={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        modules={[Pagination, Autoplay]}
        className="mySwiper"
      >
        <SwiperSlide>
          <FisrtSection
            title="Красота и здоровье"
            description="Лучшие средства для ухода за кожей и волосами!"
            imageSrc="/img/swiperElems.png"
            altText="Beauty Products"
          />
        </SwiperSlide>
        
        <SwiperSlide>
          <FisrtSection
            title="Макияж"
            description="Все для вашего идеального макияжа, включая тушь и помады."
          imageSrc="/img/swiperElems.png"
            altText="Makeup Products"
          />
        </SwiperSlide>
      
        <SwiperSlide>
          <FisrtSection
            title="Косметика"
            description="Натуральные кремы, масла и маски для лица и тела."
           imageSrc="/img/swiperElems.png"
            altText="Cosmetics"
          />
        </SwiperSlide>
      </Swiper>
    </>
  );
}
