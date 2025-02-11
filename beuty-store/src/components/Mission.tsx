'use client'
import Link from "next/link";
import React from "react";


const Mission = () => {
  return (
    <section className="mission mt-44">
      <div className="container ">
        <div className="mission-section__items flex items-center justify-between">
          <div className="left-side__text max-w-lg flex items-start gap-24 flex-col max-2xl:p-0 max-2xl:max-w-2xl">
            <div className="mission">
              <h2 className="font-bold text-2xl text-anyBlack2 max-md:text-xl">Миссия</h2>
              
              <p className="font-normal text-lg max-md:text-base max-sm:text-sm text-maHalfBlack mt-5">
                Делится своим зарядом и позитивом и предоставлять качественный
                продукт для красоты и уверенности, тем самым делая наших
                клиентов счастливее!
              </p>
            </div>

            <div className="target">
              <h2 className="font-bold text-2xl text-anyBlack2 max-md:text-xl">Цель</h2>

              <p className="font-normal text-lg max-md:text-base max-sm:text-sm text-maHalfBlack mt-5">
                Привить культуру правильного и качественного ухода для
                поддержания красоты и молодости. Стать лидером среди аналогичных
                магазинов за счет высокого сервиса и отношения в формате
                “Счастлив клиент -счастливы мы!” Всегда следовать тенденциям
                моды и расширять ассортимент только качественным продуктом Стать
                идеальным и доступным магазином для большинства девушек и
                женщин!
              </p>
            </div>
          </div>

          <div className="right-side__imgs w-full relative max-xl:hidden">
            <div className="blur1 absolute top-[-400px] right-12 z-10">
              <img className="max-w-96 w-full" src="/img/blur1.png" alt="" />
            </div>

            <div className="blur2 absolute top-[-300px] right-[-80px] z-10 max-xl:hidden">
              <img className="max-w-xl w-full" src="/img/blur2.png" alt="" />
            </div>

            <div className="blur2 absolute top-[-100px] right-[-10px] z-10 max-xl:hidden">
              <img className="max-w-xl w-full" src="/img/blur3.png" alt="" />
            </div>
          </div>
        </div>

        <div className="bottom__button mt-20 ">
          <div className="bottom__button-items flex items-center justify-between text-center max-xl:flex-col max-xl:gap-10 ">
            <div className="title">
              <p className="max-w-3xl text-start text-anyBlack2 font-bold text-3xl max-md:text-2xl max-sm:text-base">
                Будь в курсе всех событий!
              </p>

              <p className="  text-anyBlack2 font-bold text-3xl max-md:text-start max-md:text-2xl max-sm:text-base ">
                Подпишись на нас в
                <span className="ml-2 font-kaushan">Instagram</span>
              </p>
            </div>

            <div className='button__mission'>
              <Link href="https://www.instagram.com/its_smoothie_/?next=%2Fbluegodzi%2Ftagged%2F&locale=%E5%9C%A8%E7%BA%BF%E5%AE%9A%E5%88%B6%E5%A1%94%E5%90%89%E5%85%8B%E6%96%AF%E5%9D%A6TEF%E8%AF%81%E4%B9%A6%E8%81%94%E7%B3%BB%7B%E5%A8%81%E4%BF%A1%2BTG%2F%E9%A3%9E%E6%9C%BA%3A%40buth2788%7DsjwNH%3F%3F%3F%3F%3F%3F%D1%A7%3F%3F%C6%BESwQuO" className="uppercase font-normal text-3xl bg-anyBlue px-16 py-5 max-md:text-2xl max-sm:text-xl text-white rounded-lg max-md:px-14 max-md:py-4 max-sm:px-6 max-sm:py-3">
                ПОДПИСАТЬСЯ
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Mission;
