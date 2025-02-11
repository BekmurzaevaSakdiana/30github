'use client'
import React from "react";
import Link from "next/link";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

interface CardProps {
  images: { image: string }[];
  title: string;
  subtitle: string;
  description: string;
  id: number | string;
  price?: number;
  discount?: string;
}

const Card: React.FC<CardProps> = ({
  id,
  images,
  title,
  subtitle,
  description,
  price,
  discount,
}) => {
  return (
    <div
      className="cardItem w-[300px] block bg-white py-6 px-1 rounded-lg"
      style={{ boxShadow: "0px 0px 10px 0px #0000002B" }}
    >
      <div className="cardItem__top">
        <div className="cardItem__topImg">
          <Swiper
            pagination={{
              dynamicBullets: true,
            }}
            direction="horizontal"
            loop={true}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            modules={[Pagination, Autoplay]}
            className="mySwiper"
          >
            {images?.map((item, i) => (
              <SwiperSlide key={i}>
                <img
                  className="w-full aspect-video object-cover"
                  src={item.image}
                  alt={title}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <p className="font-normal text-maBlue text-xs text-center mt-2">
          {title}
        </p>
        <p className="font-normal text-xs text-center text-fiftyProcentBlack mt-1">
          {subtitle}
        </p>
      </div>

      <div className="cardItem__bottom">
        <h3 className="mt-1 font-semibold text-sm text-maHzBlack text-center w-64 mx-auto ">
          {description}
        </h3>
        <div className="price flex flex-col items-center mt-4">
          {discount ? (
            <>
              <div className="font-medium text-md text-gray-500 line-through">
                {price}
              </div>
              <div className="font-medium text-md text-buttonPink">
                {discount}
              </div>
            </>
          ) : (
            <div className="font-medium text-md">{price}</div>
          )}
        </div>
        <Link href={`/product/${id}`}>
          <p className="flex items-center justify-center mt-6">Подробнее</p>
        </Link>
      </div>
    </div>
  );
};

export default Card;
