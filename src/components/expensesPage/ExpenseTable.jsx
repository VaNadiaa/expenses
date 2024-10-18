import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, saveChanges } from "./productsSlice";
import "../../fontello/css/fontello.css";

export const ExpenseTable = ({ nowDate }) => {
  const [inputValuesName, setInputValuesName] = useState({});
  const [inputValuesPrice, setInputValuesPrice] = useState({});
  const [selectedCategory, setSelectedCategory] = useState("");
  const [activeProductId, setActiveProductId] = useState(null);
  const [activeListId, setActiveListId] = useState(null);

  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isBtnOpen, setIsBtnOpen] = useState(false);

  const products = useSelector((state) => state.products);
  const categories = useSelector((state) => state.categories);
  const dispatch = useDispatch();

  useEffect(() => {
    const initNameValues = {};
    const initPriceValues = {};
    products.forEach((product) => {
      const dateKey = Object.keys(product)[0];
      const arrProduct = product[dateKey];

      arrProduct.forEach((item) => {
        initNameValues[item.id] = item.name;
        initPriceValues[item.id] = item.price;
      });
    });
    setInputValuesName(initNameValues);
    setInputValuesPrice(initPriceValues);
  }, [products]);

  const categoryList = categories.map((category) => (
    <li
      onClick={() => {
        setSelectedCategory(category.name);
        setIsNavOpen(false);
      }}
      className="text-sm sm:text-lg break-words font-normal cursor-pointer py-1 hover:font-medium hover:text-black"
      key={category.id}
    >
      {category.name}
    </li>
  ));
  // регулярка для инпута с ценой
  const onChangePrice = (productId, event) => {
    const regex = /^\d+(\.\d{0,2})?$/;
    const value = event.target.value;
    if (value === "" || regex.test(value)) {
      setInputValuesPrice((prev) => ({
        ...prev,
        [productId]: value,
      }));
    }
  };

  const handleEditClick = (productId) => {
    //меняем значение стейта либо на id, который передаем, либо на null
    setActiveProductId(activeProductId === productId ? null : productId);

    const foundProduct = products.find((product) =>
      product[Object.keys(product)[0]].some((item) => item.id === productId)
    );

    if (foundProduct) {
      const dateKey = Object.keys(foundProduct)[0];
      const productDetails = foundProduct[dateKey].find(
        (item) => item.id === productId
      );

      if (productDetails) {
        setSelectedCategory(productDetails.category);
      }
    }
    setIsNavOpen(false);
  };

  const saveChangedProduct = (id) => {
    const name = inputValuesName[id];
    const price = inputValuesPrice[id];
    if (name.trim() && price.trim() && selectedCategory) {
      dispatch(saveChanges({ id, name, price, category: selectedCategory }));
      setActiveProductId(null);
    }
  };

  const showHiddenBtn = (productId) => {
    setActiveListId(activeListId === productId ? null : productId);
    if (!isBtnOpen) {
      setIsBtnOpen((prev) => !prev);
    }
  };

  const finalSum = () => {
    let result = 0;
    products.forEach((product) => {
      const dateKey = Object.keys(product)[0];

      if (dateKey === nowDate) {
        product[dateKey].forEach((item) => {
          result += +inputValuesPrice[item.id] || 0;
        });
      }
    });
    return result.toFixed(2);
  };

  const tableProducts = products.map((product) => {
    const dateKey = Object.keys(product)[0];
    return product[dateKey].map((item, index) => (
      <tr
        className={`text-center ${
          activeProductId === item.id ? "bg-my-color-light-purple" : "bg-white"
        } hover:bg-my-color-light-purple`}
        key={item.id}
      >
        {dateKey === nowDate && (
          <>
            {/* ячейка "№" */}
            <td className="truncate border-b border-gray-300 sm:text-lg py-2 hidden md:table-cell">
              {index + 1}
            </td>
            {/* ячейка "Категория" */}
            <td className="break-words border-b border-gray-300 text-sm sm:text-lg p-2">
              {activeProductId === item.id ? (
                <>
                  <button
                    className="break-words w-24 sm:w-44 text-sm sm:text-lg cursor-pointer mb-1 rounded-lg border-my-color-blue hover:shadow-md p-2"
                    onClick={() => setIsNavOpen((prev) => !prev)}
                  >
                    {selectedCategory || "Выбрать категорию"}
                    <span className="icon-down-open-mini"></span>
                  </button>
                  <div className="relative ">
                    <ul
                      className={
                        isNavOpen
                          ? "w-full z-100 rounded-lg absolute left-0 top-0 animate-[dropdown_1s_ease_1] backdrop-blur-sm bg-black/50 text-white"
                          : "hidden"
                      }
                    >
                      {categoryList}
                    </ul>
                  </div>
                </>
              ) : (
                <span>{item.category}</span>
              )}
            </td>
            {/* ячейка "Название" */}
            <td className="truncate border-b border-gray-300 text-sm sm:text-lg p-2">
              {activeProductId === item.id ? (
                <>
                  <input
                    className={`text-black text-center w-full md:w-40 rounded-lg border-2 outline-none ${
                      inputValuesName[item.id].trim().length === 0
                        ? "border-red-500"
                        : "border-my-color-blue"
                    } px-1`}
                    value={inputValuesName[item.id]}
                    onChange={(event) => {
                      setInputValuesName((prev) => ({
                        ...prev,
                        [item.id]: event.target.value,
                      }));
                    }}
                  />
                  <p
                    className={`${
                      inputValuesName[item.id].trim().length === 0
                        ? "text-red-500 text-xs sm:text-sm text-wrap"
                        : "hidden"
                    }`}
                  >
                    Введите название.
                  </p>
                </>
              ) : (
                <span>{item.name}</span>
              )}
            </td>
            {/* ячейка "Цена" */}
            <td className="truncate border-b border-gray-300 text-sm sm:text-lg p-2">
              {activeProductId === item.id ? (
                <>
                  <input
                    type="text"
                    className={`text-black text-center w-full md:w-40 rounded-lg border-2 outline-none ${
                      inputValuesPrice[item.id].trim().length === 0
                        ? "border-red-500"
                        : "border-my-color-blue"
                    } px-1`}
                    value={inputValuesPrice[item.id]}
                    onChange={(event) => onChangePrice(item.id, event)}
                  />
                  <p
                    className={`${
                      inputValuesPrice[item.id].trim().length === 0
                        ? "text-red-500 text-xs sm:text-sm text-wrap"
                        : "hidden"
                    }`}
                  >
                    Введите цену.
                  </p>
                </>
              ) : (
                <span>{item.price}</span>
              )}
            </td>
            {/* ячейка с кнопками */}
            <td className="border-b border-gray-300 text-base sm:text-lg p-2">
              <div>
                <button
                  className={`${
                    activeListId === item.id && isBtnOpen
                      ? "hidden"
                      : "icon-dot-3 transition ease-out hover:scale-125 hover:text-my-color-blue"
                  }`}
                  onClick={() => showHiddenBtn(item.id)}
                ></button>

                {activeListId === item.id && (
                  <div
                    className={
                      isBtnOpen ? "flex flex-row justify-center" : "hidden"
                    }
                  >
                    {activeProductId === item.id ? (
                      <button
                        className="icon-floppy mx-1 transition ease-out hover:scale-125 hover:text-my-color-blue"
                        onClick={() => saveChangedProduct(item.id)}
                      ></button>
                    ) : (
                      <button
                        className="icon-pencil transition ease-out hover:scale-125 hover:text-my-color-blue"
                        onClick={() => handleEditClick(item.id)}
                      ></button>
                    )}
                    <button
                      className="icon-trash mx-1 transition ease-out hover:scale-125 hover:text-my-color-blue"
                      onClick={() => dispatch(deleteProduct({ id: item.id }))}
                    ></button>
                  </div>
                )}
              </div>
            </td>
          </>
        )}
      </tr>
    ));
  });

  return (
    <table className="w-full border table-auto lg:table-fixed text-lg text-black mb-5 md:mb-10">
      <thead>
        <tr className="text-sm sm:text-xl border-b">
          <th className="hidden md:table-cell px-1"></th>
          <th className="font-semibold py-3 px-1">Категория</th>
          <th className="font-semibold py-3 px-1">Название</th>
          <th className="font-semibold py-3 px-1">Цена, руб</th>
          <th className="font-semibold py-3 px-1"></th>
        </tr>
      </thead>
      <tbody>{tableProducts}</tbody>
      <tfoot>
        <tr className="text-center font-semibold text-sm sm:text-xl">
          <td className="p-2">Итого:</td>
          <td></td>
          <td className="hidden md:table-cell"></td>
          <td>{finalSum()}</td>
          <td></td>
        </tr>
      </tfoot>
    </table>
  );
};
