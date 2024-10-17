import React from "react";

export default function AboutUsBlock({ src, title, subtitles }) {
  return (
    <div className="flex flex-col lg:flex-row items-start lg:items-center">
      <div className="flex flex-col basis-1/2 mr-5">
        <h3 className="text-xl md:text-2xl text-black font-semibold mb-3">
          {title}
        </h3>
        <img src={src} alt="" />
      </div>

      <div className="flex flex-col basis-1/2">
        {subtitles.map((subtitle, index) => (
          <p
            key={index}
            className="text-lg md:text-xl lg:text-2xl font-normal mb-3"
          >
            <span className="icon-check text-my-color-purple"></span>
            {subtitle}
          </p>
        ))}
      </div>
    </div>
  );
}
