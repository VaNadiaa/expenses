import React, { useEffect } from "react";
import "../../fontello/css/fontello.css";
import Header from "../header/Header";
import { NewCategory } from "./NewCategory";
import { CategoryList } from "./CategoryList";
import { Footer } from "../footer/Footer";

export const CategoryPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Категории | Учет расхода денег";
  }, []);

  return (
    <div className="p-10 md:mx-10">
      <div className="sm:max-w-4xl md:max-w-6xl m-auto">
        <Header />
        <div className="grid grid-cols lg:grid-cols-2 gap-5 mb-7">
          <NewCategory />
          <CategoryList />
        </div>
        <Footer />
      </div>
    </div>
  );
};
