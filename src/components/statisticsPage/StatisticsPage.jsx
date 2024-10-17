import React, { useEffect, useState } from "react";
import Header from "../header/Header";
import { Footer } from "../footer/Footer";
import { ExpensePieChart } from "./ExpensePieChart";
import { getDateFormat, getDateNow } from "../expensesPage/productsSlice";
import { useSelector } from "react-redux";

export const StatisticsPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Статистика | Учет расхода денег";
  }, []);

  const products = useSelector((state) => state.products);

  const [nowDate] = useState(getDateNow());
  const [firstDate, setFirstDate] = useState("");
  const [secondDate, setSecondDate] = useState("");

  const [showInput, setShowInput] = useState(false);
  const [showStatistics, setShowStatistics] = useState(false);
  const [errorMessages, setErrorMessages] = useState({ first: "", second: "" });

  const arrDatesKey = products.map((product) => Object.keys(product)[0]);

  const getDateRange = () => {
    return arrDatesKey.filter(
      (date) => date >= firstDate && date <= secondDate
    );
  };

  const statisticsDay = (event) => {
    event.preventDefault();
    setFirstDate(nowDate);
    setShowInput(false);
    clearErrors();
  };

  const statisticsRange = (event) => {
    event.preventDefault();
    setSecondDate(nowDate);
    setShowInput(true);
    clearErrors();
  };

  const clearErrors = () => {
    setErrorMessages({ first: "", second: "" });
  };

  const searchDate = () => {
    clearErrors();
    const dateRange = getDateRange();
    // Проверка для диапазона дат
    if (showInput) {
      if (!firstDate) {
        setErrorMessages((prev) => ({ ...prev, first: "Выберите дату." }));
      }
      if (!secondDate) {
        setErrorMessages((prev) => ({ ...prev, second: "Выберите дату." }));
      }
      if (firstDate && secondDate) {
        if (dateRange.length > 0) {
          setShowStatistics(true);
        } else {
          setErrorMessages((prev) => ({
            ...prev,
            first: "Нет данных в указанном диапазоне.",
          }));
        }
      }
    } else {
      // Проверка для одиночной даты
      if (!firstDate) {
        setErrorMessages((prev) => ({ ...prev, first: "Выберите дату." }));
      } else if (!arrDatesKey.includes(firstDate)) {
        setErrorMessages((prev) => ({ ...prev, first: "Дата не найдена." }));
      } else {
        setShowStatistics(true);
      }
    }
  };

  return (
    <div className="p-10 md:mx-10">
      <div className="sm:max-w-4xl md:max-w-6xl m-auto">
        <Header />
        <div id="main">
          <div className="grid grid-cols mb-3">
            <h2 className="text-2xl md:text-4xl font-extrabold text-black mb-2">
              Статистика
            </h2>
            <p className="col-span-3 text-lg md:text-2xl font-normal">
              Здесь Вы можете просматривать статистику ваших трат за нужную дату
              или промежуток времени.
            </p>
          </div>

          <form className="mb-5">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-2">
              <div>
                <input
                  type="date"
                  className={`w-full text-lg py-2 px-4 rounded-lg border-2 ${
                    errorMessages.first
                      ? "border-red-500"
                      : "border-my-color-blue"
                  } focus:outline-none focus:shadow-md`}
                  value={firstDate}
                  onChange={(event) => {
                    setFirstDate(event.target.value);
                    clearErrors();
                  }}
                />
                {errorMessages.first && (
                  <p className="text-red-500">{errorMessages.first}</p>
                )}
              </div>
              {showInput && (
                <div>
                  <input
                    type="date"
                    className={`w-full text-lg py-2 px-4 rounded-lg border-2 ${
                      errorMessages.second
                        ? "border-red-500"
                        : "border-my-color-blue"
                    } focus:outline-none focus:shadow-md`}
                    value={secondDate}
                    onChange={(event) => {
                      setSecondDate(event.target.value);
                      clearErrors();
                    }}
                  />
                  {errorMessages.second && (
                    <p className="text-red-500">{errorMessages.second}</p>
                  )}
                </div>
              )}
            </div>

            <div className="flex mb-5">
              <button
                onClick={statisticsDay}
                className=" text-my-color-purple underline mr-4 underline-offset-4 transition ease-out hover:scale-110"
              >
                День
              </button>
              <button
                onClick={statisticsRange}
                className="text-my-color-purple underline underline-offset-4 transition ease-out hover:scale-110"
              >
                Промежуток
              </button>
            </div>

            <button
              type="button"
              onClick={searchDate}
              className="bg-my-color-purple font-semibold text-xl min-w-[250px] text-white rounded-full py-4 hover:bg-my-color-blue"
            >
              Поиск
            </button>
          </form>

          {showStatistics && !showInput ? (
            <h2 className="text-xl sm:text-2xl font-normal">
              Расходы за{" "}
              <span className="font-bold">{getDateFormat(firstDate)}</span>
            </h2>
          ) : (
            showStatistics &&
            showInput && (
              <h2 className="text-xl sm:text-2xl font-normal">
                Расходы за промежуток с{" "}
                <span className="font-bold">{getDateFormat(firstDate)}</span> по{" "}
                <span className="font-bold">{getDateFormat(secondDate)}</span>
              </h2>
            )
          )}

          {showStatistics && (
            <ExpensePieChart
              firstDate={firstDate}
              secondDate={secondDate}
              getDateRange={getDateRange}
              showRange={showInput}
            />
          )}
        </div>
        <Footer />
      </div>
    </div>
  );
};
