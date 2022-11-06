import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useEffect, useState } from "react";
import Bg_2 from "/assets/bg/bg_02.jpg";
import Icon_1 from "/icons/icon_01.png";
import Img_1 from "/assets/img/img_01.jpg";
import { Fade, Slide } from "react-awesome-reveal";
import { CommonContext } from "../../context";
import { useSelector } from "react-redux";
import { IUser } from "../../types/userTypes";
import FooterComponent from "../footer/FooterComponent";
const HomePageComponent: React.FC = () => {
  const userSlice = useSelector((state: any) => state?.userSlice);
  const user: IUser = userSlice.user;
  const [amount, setAmount] = useState<number>(1500000);
  const categories: string[] = ["All", " Sedan", "Sports", "Luxury"];
  const [currentCategory, setCurrentCategory] = useState<number>(0);
  const { setLoginPage, setCurrentLink } = useContext(CommonContext);
  useEffect(() => {
    setCurrentLink(0);
  }, []);
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
        <Slide direction="up" cascade triggerOnce>
          <div className="flex flex-col items-center w-full gap-8 text-center">
            <h1 className="font-bold text-4xl  xl:text-5xl w-[50%] text-center capitalize text-white">
              {"Lamborghini Aventador LP700-4".toUpperCase()}
            </h1>
            <Fade
              cascade
              duration={20}
              triggerOnce
              className="text-white text-xl"
            >
              6.6L V8 32V DDI OHV Turbo Diesel, 5-Speed Automatic, Fuel Type:
              Diesel, Color: Black
            </Fade>
            <button
              className="bg-redish text-white flex items-center justify-center gap-3 px-14 py-4 mt-7 rounded-md font-bold text-xl hover:bg-red-800 duration-300"
              onClick={() => {
                !userSlice?.isLoggedIn ? setLoginPage(true) : null;
              }}
            >
              <span>BOOK NOW</span>
              <img src={Icon_1} alt="arrow" />
            </button>
          </div>
        </Slide>
      </div>
      <Slide direction="up" cascade triggerOnce>
        <section className="min-h-[5em] w-4/5 bg-blueish m-auto z-40 px-5 flex items-center gap-8 justify-center rounded-md shadow-md flex-wrap overflow-auto py-5">
          <div className="flex flex-col gap-2 w-[16em]">
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
          <div className="flex flex-col gap-2 w-[16em]">
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
          <button className="bg-redish text-white flex items-center justify-center gap-3 w-[13em] h-14 mt-7 rounded-md font-bold text-xl hover:bg-red-800 duration-300">
            <span>FIND A CAR</span>
            <img src={Icon_1} alt="arrow" />
          </button>
        </section>
      </Slide>
      <section className="h-[3em] w-full"></section>
      <Slide direction="up" cascade triggerOnce>
        <section className="w-full h-20 min-h-20 flex flex-col items-center  gap-5">
          <div className="w-full flex items-center  justify-center gap-3 ">
            <div className="h-2 w-16 bg-redish"></div>
            <h1 className="font-bold text-4xl text-center">
              Featured Vehicles
            </h1>
            <div className="h-2 w-16 bg-redish"></div>
          </div>
          <p className="text-xl p-1 text-center">
            These are one of the best vehicles. Be the first to go with.
          </p>
        </section>
      </Slide>
      <section className="h-[50em] py-8">
        <Slide direction="up" cascade triggerOnce>
          <div className="flex items-center justify-center gap-10">
            {categories.map((category, index) => (
              <button
                className={`text-xl font-bold ${
                  currentCategory == index && "text-redish"
                } hover:text-redish duration-500`}
                onClick={() => {
                  setCurrentCategory(index);
                }}
                key={index}
              >
                {category}
              </button>
            ))}
          </div>
        </Slide>
        <div className="w-full xl:w-[70%] m-auto py-4 flex flex-wrap gap-6 items-center justify-center  transition-all duration-300">
          {Array(9)
            .fill("")
            .map((text, index) => {
              return (
                <Slide direction="up" key={index} triggerOnce>
                  <div className="max-w-sm rounded overflow-hidden shadow-lg">
                    <img
                      className="w-full"
                      src={Img_1}
                      alt="Sunset in the mountains"
                    />
                    <div className="px-6 py-4">
                      <div className="font-bold text-xl mb-2">
                        The Coldest Sunset
                      </div>
                      <p className="text-gray-700 text-base">
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit. Voluptatibus quia, nulla! Maiores et perferendis
                        eaque, exercitationem praesentium nihil.
                      </p>
                    </div>
                    <div className="px-6 pt-4 pb-2">
                      <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                        #photography
                      </span>
                      <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                        #travel
                      </span>
                      <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                        #winter
                      </span>
                    </div>
                  </div>
                </Slide>
              );
            })}
        </div>
        <FooterComponent />
      </section>
    </div>
  );
};

export default HomePageComponent;
