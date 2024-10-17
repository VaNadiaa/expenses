import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { productAdded } from "./productsSlice";
import {
  categoryAdded,
  NUMBER_OF_SYMBOLS,
} from "../categoryPage/categoriesSlice";

export const NewProductForm = ({ nowDate }) => {
  const [categoryName, setCategoryName] = useState("Категории");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");

  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isCatOpen, setIsCatOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [addCategory, setAddCategory] = useState(false);

  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories);

  const addNewProduct = (event) => {
    event.preventDefault();
    setIsSubmitted(true);
    if (categoryName !== "Категории" && name.trim() && price.trim()) {
      dispatch(productAdded(categoryName, name, price, nowDate));
      setName("");
      setPrice("");
      setIsSubmitted(false);
    }
  };

  const addNewCategory = (event) => {
    event.preventDefault();
    setAddCategory(true);
    if (category.trim() && category.trim().length <= NUMBER_OF_SYMBOLS) {
      dispatch(categoryAdded(category));
      setCategoryName(category);
      setCategory("");
      setAddCategory(false);
    }
  };

  const categoryList = categories.map((category) => {
    return (
      <li
        onClick={() => {
          setCategoryName(category.name), setIsNavOpen((prev) => !prev);
        }}
        className="text-center text-xl break-words font-normal cursor-pointer py-1 hover:font-medium hover:text-black"
        key={category.id}
      >
        {category.name}
      </li>
    );
  });
  // регулярка для инпута с ценой
  const onChangePrice = (event) => {
    const regex = /^\d+(\.\d{0,2})?$/;
    if (event.target.value === "") {
      setPrice("");
    } else if (regex.test(event.target.value)) {
      setPrice(event.target.value);
    } else {
      setPrice(price);
    }
  };

  const navOpen = (event) => {
    event.preventDefault();
    setIsNavOpen((prev) => !prev);
  };

  return (
    <>
      <h2 className="text-2xl md:text-4xl font-extrabold text-black mb-2">
        Добавление расходов
      </h2>
      {categories.length === 0 ? (
        <p className="text-lg md:text-2xl font-normal mb-3">
          Добавьте новую категорию:
        </p>
      ) : (
        <p className="text-lg md:text-2xl font-normal mb-3">
          Выберите категорию из списка или добавьте новую:
        </p>
      )}
      <div className="flex lg:flex-row flex-col">
        <div className="order-last lg:order-first">
          {categories.length === 0 ? (
            // форма добавления новой категории
            <form onSubmit={addNewCategory}>
              <div className="grid sm:grid-cols-2 grid-cols-1 mb-3">
                <input
                  title="Введите название новой категории."
                  className={`text-lg py-2 px-4 sm:mr-4 rounded-lg border-2 ${
                    (isSubmitted && !category.trim()) ||
                    category.trim().length >= NUMBER_OF_SYMBOLS ||
                    (addCategory && !category.trim()) ||
                    category.trim().length >= NUMBER_OF_SYMBOLS
                      ? "border-red-500 mb-0"
                      : category.trim() &&
                        category.trim().length <= NUMBER_OF_SYMBOLS
                      ? "border-green-500 mb-3"
                      : "border-my-color-blue mb-3"
                  }  focus:outline-none focus:shadow-md focus:shadow-indigo-500/50`}
                  value={category}
                  placeholder="Новая категория"
                  onChange={(event) => setCategory(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.keyCode === 13) {
                      event.preventDefault();
                      addNewCategory(event);
                    }
                  }}
                />
                <p
                  className={`${
                    (isSubmitted && !category.trim()) ||
                    (addCategory && !category.trim()) ||
                    category.trim().length >= NUMBER_OF_SYMBOLS
                      ? "text-red-500 mb-3 sm:mb-0 sm:order-2"
                      : "hidden"
                  }`}
                >
                  Макс. количество символов 20.
                </p>
                <button
                  type="submit"
                  className="bg-my-color-purple font-semibold text-xl text-white rounded-full py-3 hover:bg-my-color-blue"
                >
                  Добавить
                </button>
              </div>
            </form>
          ) : (
            <>
              {/* выпадающий список */}
              <div className="flex items-center">
                <button
                  className={`break-words w-56 p-2 mr-5 text-lg cursor-pointer rounded-lg border-2 ${
                    isSubmitted && categoryName === "Категории"
                      ? "border-red-500"
                      : isSubmitted && categoryName !== "Категории"
                      ? "border-green-500"
                      : "border-my-color-blue"
                  } hover:shadow-xl`}
                  onClick={navOpen}
                >
                  {categoryName} <span className="icon-down-open-mini"></span>
                </button>
                <div className="flex-1 flex">
                  <button
                    className="size-8 icon-plus mr-5 p-0.5 text-xl rounded-full shadow-xl transition ease-out hover:scale-125"
                    onClick={() => setIsCatOpen((prev) => !prev)}
                  ></button>
                </div>
              </div>
              <p
                className={`${
                  isSubmitted && categoryName === "Категории"
                    ? "text-red-500"
                    : "hidden"
                }`}
              >
                Выберите категорию.
              </p>
            </>
          )}
        </div>
        <div>
          {isCatOpen && (
            <form onSubmit={addNewCategory}>
              <div className="grid sm:grid-cols-2 grid-cols-1 mb-3">
                <input
                  title="Введите название новой категории."
                  className={`text-lg py-2 px-4 sm:mr-4 mb-0 rounded-lg border-2 ${
                    addCategory && !category.trim()
                      ? "border-red-500 mb-0"
                      : category.trim()
                      ? "border-green-500 mb-3"
                      : "border-my-color-blue mb-3"
                  }  focus:outline-none focus:shadow-md focus:shadow-indigo-500/50`}
                  value={category}
                  placeholder="Новая категория"
                  onChange={(event) => setCategory(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.keyCode === 13) {
                      event.preventDefault();
                      addNewCategory(event);
                    }
                  }}
                />
                <p
                  className={`${
                    addCategory && !category.trim()
                      ? "text-red-500 mb-3 sm:mb-0 sm:order-2"
                      : "hidden"
                  }`}
                >
                  Введите название категории.
                </p>
                <button
                  type="submit"
                  className="bg-my-color-purple font-semibold text-xl text-white rounded-full py-3 hover:bg-my-color-blue"
                >
                  Добавить
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
      {/* выпадающий список */}
      <div className="relative">
        <ul
          className={
            isNavOpen
              ? "w-56 z-100 p-2 rounded-lg absolute left-0 top-0 animate-[dropdown_1s_ease_1] backdrop-blur-sm bg-black/50 text-white"
              : "hidden"
          }
        >
          {categoryList}
        </ul>
      </div>
      <p className="text-lg md:text-2xl font-normal my-3">
        Введите название и цену покупки:
      </p>
      {/* форма для добавления новой покупки */}
      <form onSubmit={addNewProduct}>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-1 sm:gap-4">
          <div className="grid grid-cols-1 mb-3 sm:mb-0">
            <input
              type="text"
              title="Введите название"
              className={`h-[50px] text-lg py-2 px-5 rounded-lg border-2 
            ${
              isSubmitted && !name.trim()
                ? "border-red-500"
                : isSubmitted && name.trim()
                ? "border-green-500"
                : "border-my-color-blue"
            } 
            focus:outline-none focus:shadow-md focus:shadow-indigo-500/50`}
              value={name}
              placeholder="Название"
              onChange={(e) => setName(e.target.value)}
              onKeyDown={(event) => {
                if (event.keyCode === 13) {
                  addNewProduct(event);
                }
              }}
            />
            <p
              className={`${
                isSubmitted && !name.trim()
                  ? "text-red-500 row-start-2"
                  : "hidden"
              }`}
            >
              Введите название.
            </p>
          </div>
          <div className="grid grid-cols-1 mb-3 sm:mb-0">
            <input
              type="text"
              title="Введите цену"
              id="2"
              className={`h-[50px] text-lg py-2 px-5 rounded-lg border-2
            ${
              isSubmitted && !price.trim()
                ? "border-red-500"
                : isSubmitted && price.trim()
                ? "border-green-500"
                : "border-my-color-blue"
            } 
            focus:outline-none focus:shadow-md focus:shadow-indigo-500/50`}
              value={price}
              placeholder="Цена, руб"
              onChange={onChangePrice}
              onKeyDown={(event) => {
                if (event.keyCode === 13) {
                  addNewProduct(event);
                }
              }}
            />
            <p
              className={`${
                isSubmitted && !price.trim() ? "text-red-500" : "hidden"
              }`}
            >
              Введите цену.
            </p>
          </div>
          <div className="grid grid-cols-1 mb-3 sm:mb-0">
            <button
              type="submit"
              onClick={() => setIsSubmitted(true)}
              className="bg-my-color-purple font-semibold text-xl text-white rounded-full py-4 px-10 hover:bg-my-color-blue h-[50px] flex items-center justify-center"
            >
              Добавить
            </button>
          </div>
        </div>
      </form>
    </>
  );
};
