import React from "react";
import Bg_2 from "/assets/bg_02.jpg";
import Icon_1 from "/assets/icon_01.png";
const HomePageComponent: React.FC = () => {
  return (
    <div className="h-[calc(100vh_-_5rem)] w-full relative">
      <div className="h-[70rem] max-h-[90%] w-full absolute top-0 -z-50">
        <img
          src={Bg_2}
          alt="Lamborghini"
          className="h-full w-full object-cover"
          draggable={false}
        />
      </div>
      <div className="w-full h-[90%] flex items-center justify-between py-40 z-20 flex-col bg-slate-800 bg-opacity-40">
        <div className="flex flex-col items-center w-full gap-6">
          <h1 className="font-bold text-5xl w-[30%] text-center capitalize text-white">
            {"Lamborghini Aventador LP700-4".toUpperCase()}
          </h1>
          <p className="text-white text-xl">
            6.6L V8 32V DDI OHV Turbo Diesel, 5-Speed Automatic, Fuel Type:
            Diesel, Color: Black
          </p>
          <button className="bg-redish text-white flex items-center justify-center gap-3 px-20 py-4 mt-7 rounded-md font-bold text-xl">
            <span>BOOK NOW</span>
            <img src={Icon_1} alt="arrow" />
          </button>
        </div>
        <div className="flex items-center justify-center gap-5">
          {Array(3)
            .fill("")
            .map((text, index) => (
              <button
                className={`w-24 h-4 bg-redish ${
                  index == 0 ? "bg-opacity-80" : "bg-opacity-40"
                }`}
                key={index}
              ></button>
            ))}
        </div>
      </div>
    </div>
  );
};

export default HomePageComponent;
