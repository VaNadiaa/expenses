import React, { useState } from "react";
import { useDispatch } from "react-redux";
import "../../fontello/css/fontello.css";
import { categoryAdded, NUMBER_OF_SYMBOLS } from "./categoriesSlice";

export const NewCategory = () => {
  const [nameNewCategory, setNameNewCategory] = useState("");
  const [addCategory, setAddCategory] = useState(false);
  const dispatch = useDispatch();

  const addNewCategory = () => {
    event.preventDefault();
    setAddCategory(true);
    if (
      nameNewCategory.trim() &&
      nameNewCategory.trim().length <= NUMBER_OF_SYMBOLS
    ) {
      dispatch(categoryAdded(nameNewCategory));
      setNameNewCategory("");
      setAddCategory(false);
    }
  };

  return (
    <div className="col-span-1">
      <h2 className="text-2xl md:text-4xl font-extrabold text-black mb-2">
        Новая категория
      </h2>
      <p className="text-lg md:text-2xl font-normal mb-3">
        Введите название новой категории.
      </p>
      <form className="max-w-2xl mb-3">
        <div className="grid grid-cols-3">
          <input
            title="Введите название новой категории."
            className={`col-span-3 text-lg py-3 px-4 mr-4 rounded-lg border-2 ${
              nameNewCategory.trim().length >= NUMBER_OF_SYMBOLS ||
              (addCategory && !nameNewCategory.trim()) ||
              nameNewCategory.trim().length >= NUMBER_OF_SYMBOLS
                ? "border-red-500"
                : nameNewCategory.trim() &&
                  nameNewCategory.trim().length <= NUMBER_OF_SYMBOLS
                ? "border-green-500 mb-3"
                : "border-my-color-blue mb-3"
            }  focus:outline-none focus:shadow-md focus:shadow-indigo-500/50`}
            value={nameNewCategory}
            placeholder="Новая категория"
            onChange={(event) => setNameNewCategory(event.target.value)}
            onKeyDown={(event) => {
              if (event.keyCode === 13) {
                event.preventDefault();
                addNewCategory();
              }
            }}
          />
          <p
            className={`${
              (addCategory && !nameNewCategory.trim()) ||
              nameNewCategory.trim().length >= NUMBER_OF_SYMBOLS
                ? "col-span-2 text-red-500 mb-2"
                : "hidden"
            }`}
          >
            Макс. количество символов 20.
          </p>
          <button
            type="button"
            onClick={addNewCategory}
            className="col-span-2 bg-my-color-purple font-semibold text-xl text-white rounded-full py-3 px-6 hover:bg-my-color-blue"
          >
            Добавить
          </button>
        </div>
      </form>
    </div>
  );
};
