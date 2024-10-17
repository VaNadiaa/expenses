import React from "react";
import { Link } from "react-router-dom";

export default function Main({ img, title, subtitleTop, subtitleBottom, to }) {
  return (
    <>
      <div className="flex items-center mb-10 md:pt-0">
        <div>
          <h1 className="text-4xl md:text-6xl font-black text-black mb-4">
            {title}
          </h1>
          <p className="text-lg sm:text-xl mb-2 md:mb-6">{subtitleTop}</p>
          <p className="text-lg sm:text-xl mb-8 md:hidden">{subtitleBottom}</p>
          <Link
            to={to}
            className="bg-my-color-purple font-semibold text-xl text-white rounded-full py-4 px-9 hover:bg-my-color-blue"
          >
            Начать
          </Link>
        </div>
        <img
          src={img}
          width={600}
          className="hidden md:w-[28rem] md:block lg:w-[35rem]"
          alt="Здесь должен быть мужчина с копилкой в руках:)"
        />
      </div>
      {/* Стрелка вниз */}
      <div className="hidden md:flex mb-9 justify-center items-center m-auto text-xl text-my-color-purple border-none border-my-color-blue rounded-full shadow-xl animate-bounce w-12 h-12">
        <div className="icon-down"></div>
      </div>
    </>
  );
}
