import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../../fontello/css/fontello.css";
import {
  categoryDelete,
  saveChanges,
  NUMBER_OF_SYMBOLS,
} from "./categoriesSlice";

export const CategoryList = () => {
  const [inputValues, setInputValues] = useState({});
  const [activeCategoryId, setActiveCategoryId] = useState(null);
  const [activeListId, setActiveListId] = useState(null);
  const [isBtnOpen, setIsBtnOpen] = useState(false);

  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories);
  useEffect(() => {
    const initInputValue = {};
    categories.forEach((category) => {
      initInputValue[category.id] = category.name;
    });
    setInputValues(initInputValue);
  }, [categories]);

  const saveChangedCategory = (id) => {
    const name = inputValues[id];
    if (name.trim() && name.trim().length <= NUMBER_OF_SYMBOLS) {
      dispatch(saveChanges({ id, name: name }));
      setActiveCategoryId(null);
    }
  };

  const handleDeleteCategory = (categoryId) => {
    dispatch(categoryDelete(categoryId));
  };

  const handleCategoryClick = (categoryId) => {
    setActiveCategoryId(activeCategoryId === categoryId ? null : categoryId);
  };

  const showHiddenBtn = (categoryId) => {
    setActiveListId(activeListId === categoryId ? null : categoryId);
    if (!isBtnOpen) {
      setIsBtnOpen((prev) => !prev);
    }
  };

  const categoryList = categories.map((category) => (
    <li
      className="col-span-5 flex justify-between border-solid border-2 rounded-lg p-2 text-2xl font-bold"
      id={category.id}
      key={category.id}
    >
      {activeCategoryId === category.id ? (
        <div className="grid grid-cols-1">
          <input
            title="Введите название категории."
            className={`text-xl py-1 px-4 w-36 sm:w-60 rounded-lg border-2 ${
              inputValues[category.id].trim().length <= 0 ||
              inputValues[category.id].trim().length >= NUMBER_OF_SYMBOLS
                ? "border-red-500"
                : inputValues[category.id].trim() &&
                  inputValues[category.id].trim().length <= NUMBER_OF_SYMBOLS
                ? "border-green-500"
                : "border-my-color-blue"
            } 
          focus:outline-none focus:shadow-md focus:shadow-indigo-500/50`}
            value={inputValues[category.id] || ""}
            placeholder="Название"
            onChange={(event) =>
              setInputValues((prev) => ({
                ...prev,
                [category.id]: event.target.value,
              }))
            }
            onKeyDown={(event) => {
              if (event.keyCode === 13) {
                event.preventDefault();
                saveChangedCategory(category.id);
              }
            }}
          />
          <p
            className={`${
              inputValues[category.id].trim().length <= 0 ||
              inputValues[category.id].trim().length >= NUMBER_OF_SYMBOLS
                ? "text-red-500 text-sm font-normal"
                : "hidden"
            }`}
          >
            Макс. количество символов 20.
          </p>
        </div>
      ) : (
        <span className="truncate mx-2 w-3/4">{category.name}</span>
      )}
      <div>
        <button
          className={`${
            activeListId === category.id && isBtnOpen
              ? "hidden"
              : "icon-dot-3 transition ease-out hover:scale-125 hover:text-my-color-blue"
          }`}
          onClick={() => showHiddenBtn(category.id)}
        ></button>

        {activeListId === category.id && (
          <div className={isBtnOpen ? "flex flex-row" : "hidden"}>
            {activeCategoryId === category.id ? (
              <button
                onClick={() => saveChangedCategory(category.id)}
                className="icon-floppy transition ease-out hover:scale-125 hover:text-my-color-blue"
              ></button>
            ) : (
              <button
                onClick={() => handleCategoryClick(category.id)}
                className="icon-pencil transition ease-out hover:scale-125 hover:text-my-color-blue"
              ></button>
            )}
            <button
              onClick={() => handleDeleteCategory(category.id)}
              className="icon-trash transition ease-out hover:scale-125 hover:text-my-color-blue"
            ></button>
          </div>
        )}
      </div>
    </li>
  ));

  return (
    <div className="col-span-1">
      <h2 className="text-2xl md:text-4xl font-extrabold text-black mb-2">
        Ваши категории
      </h2>
      <p className="text-lg md:text-2xl font-normal mb-3">
        В этом разделе находятся Ваши категории. Просматривайте, редактируйте
        либо удаляйте их.
      </p>
      <ul className="grid gap-3 grid-cols-2 sm:grid-cols-6">{categoryList}</ul>
    </div>
  );
};
