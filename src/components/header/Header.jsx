import React, { useEffect, useState } from "react";
import BurgerBtn from "./BurgerBtn";
import HeaderBtn from "./HeaderBtn";

export default function Header() {
  const [isNavOpen, setIsNavOpen] = useState(false);

  useEffect(() => {
    // Функция для блокировки прокрутки
    const toggleBodyOverflow = () => {
      if (isNavOpen) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "auto";
      }
    };
    toggleBodyOverflow();
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isNavOpen]);

  return (
    <>
      {/* Блок фона */}
      <div
        className={
          isNavOpen
            ? "absolute top-0 left-0 h-full w-full backdrop-blur bg-black/80 animate-[wiggle_0.5s_ease_1]"
            : "hidden"
        }
      >
        {/* Мобильное меню */}
        <section
          className={
            isNavOpen
              ? "flex flex-col z-50 mt-[5rem] pl-10 animate-[wiggle_1s_ease_1] text-white"
              : "hidden"
          }
        >
          <BurgerBtn to="/" name="Главная"></BurgerBtn>
          <BurgerBtn to="/expense" name="Расходы"></BurgerBtn>
          <BurgerBtn to="/category" name="Категории"></BurgerBtn>
          <BurgerBtn to="/statistics" name="Статистика"></BurgerBtn>
        </section>
      </div>
      {/* Кнопка бургер */}
      <button
        className="space-y-2 mb-5 md:hidden"
        onClick={() => setIsNavOpen((prev) => !prev)}
      >
        <span className="block h-0.5 w-8 animate-pulse bg-my-color-purple"></span>
        <span className="block h-0.5 w-8 animate-pulse bg-my-color-purple"></span>
        <span className="block h-0.5 w-8 animate-pulse bg-my-color-purple"></span>
      </button>
      {/* Меню для больших экранов */}
      <section className="hidden md:block">
        <div className=" grid grid-cols-5 lg:grid-cols-8 justify-items-center items-center mb-10">
          <HeaderBtn to="/" name="Главная" isFirst></HeaderBtn>
          <HeaderBtn to="/expense" name="Расходы"></HeaderBtn>
          <HeaderBtn to="/category" name="Категории"></HeaderBtn>
          <HeaderBtn to="/statistics" name="Статистика"></HeaderBtn>
        </div>
      </section>
    </>
  );
}
