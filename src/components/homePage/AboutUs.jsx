import React from "react";
import imgStatistics from "../../img/content_aboutStatistics.png";
import imgForm from "../../img/content_aboutForm.png";
import imgCategory from "../../img/content_aboutCategory.png";
import AboutUsBlock from "./AboutUsBlock";

export const AboutUs = () => {
  return (
    <div className="mb-7">
      <h2 className="text-3xl md:text-5xl font-extrabold text-black mb-2 md:mb-5">
        О работе нашего сервиса
      </h2>
      <div className="grid md:grid-row-2 lg:grid-row-3 justify-items-center gap-5">
        <AboutUsBlock
          src={imgCategory}
          title="Добавляйте собственные категории"
          subtitles={[
            "Самостоятельно добавляйте необходимые категории трат.",
            "Присваивайте категории уникальное и понятное название.",
            "Редактируйте ее название, если оно больше не актуально.",
            "Удаляйте категорию, если больше не нуждаетесь в ней.",
          ]}
        />
        <AboutUsBlock
          src={imgForm}
          title="Вносите данные о тратах"
          subtitles={[
            "Определите, к какой общей категории относится трата (продукты, транспорт, развлечения и т.д.).",
            "Заполните форму для добавления новой покупки, указав название, цену и категорию.",
          ]}
        />
        <AboutUsBlock
          src={imgStatistics}
          title="Просматривайте статистику"
          subtitles={[
            "Следите за Вашими расходами.",
            "Просматривайте статистику Ваших растрат за нужную дату либо промежуток времени, который вас интересует.",
          ]}
        />
      </div>
    </div>
  );
};
