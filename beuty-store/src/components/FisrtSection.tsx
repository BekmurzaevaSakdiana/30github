import React from "react";

interface FisrtSectionProps {
  title: string;
  description: string;
  imageSrc: string;
  altText: string;
}

const FisrtSection: React.FC<FisrtSectionProps>= ({ title, description, imageSrc, altText }) => {
  return (
    <section className="mt-14 mb-14 max-xl:px-12 ">
      <div className="section__SwiperItems max-xl:max-w-5xl overflow-hidden max-[541px]:rounded-xl ">
        <div className="container">
          <div className="left-right flex items-center justify-between max-lg:items-end max-[854px]:flex-col max-[854px]:items-center ">
            <div className="left max-[906px]:mb-4">
              <div className="logo">
                <img
                  className="mb-6 max-[412px]:mb-2 relative left-[-40px] w-full max-[969px]:left-[-20px] max-[868px]:static max-[510px]:mt-5"
                  src="/svg/logo2.svg"
                  alt="Logo"
                />
              </div>
              <h2 className="text-3xl font-semibold text-start mb-4 max-[877px]:text-2xl max-[510px]:hidden">
                {title} 
              </h2>

              <p className="max-[854px]:hidden text-lg text-gray-700 text-start mx-auto max-w-xl max-lg:text-md max-lg:max-w-lg max-[906px]:text-sm">
                {description} 
              </p>
            </div>

            <div className="right">
              <img
                className="max-[854px]:max-w-72 max-[444px]:max-w-60 max-[412px]:mb-1"
                src={imageSrc} 
                alt={altText}  
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FisrtSection;
