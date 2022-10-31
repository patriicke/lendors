import { faLocation, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import Bg_2 from "/assets/bg/bg_02.jpg";
import Icon_1 from "/icons/icon_01.png";
const HomePageComponent: React.FC = () => {
  const [amount, setAmount] = useState<number>(1500000);
  return (
    <div className="h-[calc(100vh_-_5rem)] min-h-[calc(100vh_-_5rem)] w-full relative">
      <div className="h-[70rem] max-h-[80%] w-full absolute top-0 -z-50">
        <img
          src={Bg_2}
          alt="Lamborghini"
          className="h-full w-full object-cover"
          draggable={false}
        />
      </div>
      <div className="w-full h-[75%] flex items-center  justify-center gap-10 z-20 flex-col bg-slate-800 bg-opacity-40">
        <div className="flex flex-col items-center w-full gap-8">
          <h1 className="font-bold text-5xl w-[30%] text-center capitalize text-white">
            {"Lamborghini Aventador LP700-4".toUpperCase()}
          </h1>
          <p className="text-white text-xl">
            6.6L V8 32V DDI OHV Turbo Diesel, 5-Speed Automatic, Fuel Type:
            Diesel, Color: Black
          </p>
          <button className="bg-redish text-white flex items-center justify-center gap-3 px-14 py-4 mt-7 rounded-md font-bold text-xl hover:bg-red-800 duration-300">
            <span>BOOK NOW</span>
            <img src={Icon_1} alt="arrow" />
          </button>
        </div>
        <div className="flex items-center justify-center gap-5 mt-[12rem]">
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
      <section className="h-40 w-4/5 bg-blueish m-auto z-40 px-5 flex items-center gap-8 justify-center rounded-md shadow-md">
        <div className="flex flex-col gap-2 w-[15em]">
          <h1 className="text-white text-lg font-bold">Pick Up Location</h1>
          <div className="h-14 p-2 bg-white rounded-md flex justify-between items-center">
            <input
              type="text"
              placeholder="City, State or Airport Code"
              className="h-full px-3 outline-none"
            />
            <FontAwesomeIcon
              icon={faLocationDot}
              className="text-black text-lg"
            />
          </div>
        </div>
        <div className="flex flex-col gap-2 w-[15em]">
          <h1 className="text-white text-lg font-bold">Pick Up Date</h1>
          <div className="h-14 p-2 bg-white rounded-md flex justify-between items-center">
            <input
              type="date"
              placeholder="City, State or Airport Code"
              className="h-full px-3 outline-none w-full"
            />
          </div>
        </div>
        <div className="flex flex-col gap-2 w-[16em] justify-between">
          <h1 className="text-white text-lg font-bold">Minimun Price</h1>
          <input
            type="range"
            placeholder="City, State or Airport Code"
            className="h-full outline-none bg-gray-200 w-full"
            min={800000}
            max={45000000}
            step={100000}
            value={amount}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setAmount(Number(e.target.value));
            }}
          />
          <div className="text-white flex justify-between">
            <h1>{new Intl.NumberFormat("en-us").format(amount)} RWF</h1> -
            <h1>45,000,000 RWF</h1>
          </div>
        </div>
        <button className="bg-redish text-white flex items-center justify-center gap-3 px-14 py-4 mt-7 rounded-md font-bold text-xl hover:bg-red-800 duration-300">
          <span>FIND A CAR</span>
          <img src={Icon_1} alt="arrow" />
        </button>
      </section>
      <section className="h-[10em] w-full"></section>
      <section className="w-full h-20 flex flex-col items-center  gap-5">
        <div className="w-full flex items-center  justify-center gap-3 ">
          <div className="h-2 w-16 bg-redish"></div>
          <h1 className="font-bold text-4xl text-center">Featured Vehicles</h1>
          <div className="h-2 w-16 bg-redish"></div>
        </div>
        <p className="text-xl"> These are one of the best vehicles. Be the first to go with.</p>
      </section>
    </div>
  );
};

export default HomePageComponent;
