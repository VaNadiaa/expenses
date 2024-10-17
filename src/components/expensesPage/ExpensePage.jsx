import React, { useEffect, useState } from "react";
import "../../fontello/css/fontello.css";
import Header from "../header/Header";
import { ExpenseTable } from "../expensesPage/ExpenseTable";
import { NewProductForm } from "../expensesPage/NewProductForm";
import { Footer } from "../footer/Footer";
import { getDateNow } from "../expensesPage/productsSlice";

export const ExpensePage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Расходы | Учет расхода денег";
  }, []);

  const [nowDate, setNowDate] = useState(getDateNow);

  return (
    <div className="p-8 md:mx-10">
      <div className="max-w-4xl md:max-w-6xl m-auto">
        <Header />
        <div className="grid grid-cols lg:grid-cols-2 gap-5 mb-7">
          <div className="col-span-2">
            <h2 className="text-2xl md:text-4xl font-extrabold text-black md:mb-5">
              Расходы за{" "}
              <input
                className="text-xl lg:text-2xl w-36 md:w-40 font-normal mb-2"
                value={nowDate}
                onChange={(event) => setNowDate(event.target.value)}
                type="date"
              />
            </h2>
            <ExpenseTable nowDate={nowDate} />
            <NewProductForm nowDate={nowDate} />
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};
