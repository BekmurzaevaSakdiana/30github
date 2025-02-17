import React from "react";

type MainTitleProps = {
  text: string;
};

const MainTitle: React.FC<MainTitleProps> = ({ text }) => {
  return (
    <div className="main-title bg-gradient">
      <h1 className="py-12  font-montseratt font-bold text-4xl text-center bg-gradient w-full mb-8">
        {text}
      </h1>
    </div>
  );
};

export default MainTitle;
