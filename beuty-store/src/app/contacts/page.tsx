import React from "react";

const ContactsItems = () => {
  return (
    <section className="contacts-section">
    <div className="main-title bg-gradient">
      <h1 className="py-16  font-bold text-5xl text-center font-montseratt">
        Контакты
      </h1>
    </div>
  
    <div className="container">
      
  
      <div className="contacts__socialMedia mt-12 flex items-baseline justify-between max-lg:flex-col max-lg:items-center max-lg:justify-center">
        <div className="allInfo mt-9 text-center max-lg:mb-10">
          <div className="phoneNumber">
            <p className="text-saShaGray font-normal text-3xl max-sm:text-2xl mb-3 max-[380px]:text-xl">
              Номер телефона:
            </p>
            <h2 className="font-bold text-4xl max-sm:text-3xl max-[380px]:text-2xl">
              +7 707 602 5959
            </h2>
          </div>
  
          <div className="geo mt-12">
            <p className="text-saShaGray font-normal text-3xl max-sm:text-2xl mb-3 max-[380px]:text-xl">
              Адрес:
            </p>
            <h2 className="font-bold text-4xl max-w-md max-sm:text-3xl max-sm:max-w-xs max-[380px]:text-2xl">
              г. Алматы, улица Макатаева 117
            </h2>
          </div>
        </div>
  
        <div className="socialMedia text-center max-lg:mt-8">
          <div className="social-item w-full">
            <div className="logo flex items-center justify-center gap-4">
              <img src="/svg/whatsUp.svg" alt="WhatsApp Logo" />
              <p className="font-normal text-3xl text-anyGray max-sm:text-2xl max-[380px]:text-xl">
                WhatsApp
              </p>
            </div>
            <div className="subTitle">
              <p className="text-anyGreen font-bold text-5xl max-sm:text-3xl max-[380px]:text-2xl">
                Написать
              </p>
              <hr className="w-full bg-anyGreen h-1 mt-2" />
            </div>
          </div>
  
          <div className="social-item mt-20 w-full">
            <div className="logo flex items-center justify-center gap-4">
              <img src="/svg/Instagram.svg" alt="Instagram Logo" />
              <p className="font-normal text-3xl max-sm:text-2xl text-anyGray max-[380px]:text-xl">
                Instagram
              </p>
            </div>
            <div className="subTitle">
              <p className="text-buttonPink font-bold text-5xl max-sm:text-3xl max-[380px]:text-2xl">
                Подписаться
              </p>
              <hr className="w-full bg-buttonPink h-1 mt-2" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  

  
  

  );
};

export default ContactsItems;
