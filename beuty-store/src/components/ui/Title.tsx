import React from "react";

type TitleProps = {
  text: string;
};

const Title: React.FC<TitleProps> = ({ text }) => {
  return (
    <div className="mb-16">
        <div className="title__items flex justify-between w-full items-baseline">
          <h2 className=" max-md:mt-12 font-bold text-4xl text-maBlack max-md:text-2xl ">{text}</h2>
          <p className=" max-sm:hidden flex-grow border-b-2 mx-4" style={{background: 'linear-gradient(90deg, #E8E8E8 23.39%, rgba(196, 196, 196, 0) 96.01%'}}></p>
        </div>
    </div>
  );
};

export default Title;
