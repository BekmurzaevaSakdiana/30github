'use client'
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

interface ProductSliderProps {
  images: { image: string }[];
  title: string;
}

const ProductSlider = ({ images, title }: ProductSliderProps) => {
  return (
    <div className="leftImgProduct w-full lg:w-1/2">
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
        className="mySwiper"
        modules={[Pagination, Autoplay]}
      >
        {images.map((item, i) => (
          <SwiperSlide key={i}>
            <img
              className="w-full aspect-square object-cover rounded-lg"
              src={item.image}
              alt={title}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ProductSlider;
