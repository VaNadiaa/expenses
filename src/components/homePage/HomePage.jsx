import React, { useEffect } from "react";
import img from "../../img/main_homePage.jpg";
import Header from "../header/Header";
import Main from "../main/Main";
import { AboutUs } from "./AboutUs";
import { Footer } from "../footer/Footer";

export default function HomePage() {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Учет расхода денег";
  }, []);

  return (
    <>
      <Header />
      <Main
        img={img}
        title="Учет расхода денег"
        subtitleTop="Если Вы устали запоминать, куда и сколько было потрачено Ваших денег, то этот сервис для Вас!"
        subtitleBottom="Здесь Вы сможете вести учет Ваших трат, выбирать категорию покупок из уже имеющихся или создавать их самим."
        to="expense"
      />
      <AboutUs />
      <Footer />
    </>
  );
}
