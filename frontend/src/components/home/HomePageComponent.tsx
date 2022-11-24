import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useEffect, useState } from "react";
import Bg_2 from "/assets/bg/bg_02.jpg";
import Icon_1 from "/icons/icon_01.png";
import { Fade, Slide } from "react-awesome-reveal";
import { CommonContext } from "../../context";
import { useSelector } from "react-redux";
import FooterComponent from "../footer/FooterComponent";
import { CarObject } from "../../types/carTypes";
import { useNavigate } from "react-router-dom";
import { IUser } from "../../types/userTypes";
const HomePageComponent: React.FC = () => {
  const navigate = useNavigate();
  const [amount, setAmount] = useState<number>(1500000);
  const { setLoginPage, setCurrentLink } = useContext(CommonContext);
  const { userSlice, carsSlice } = useSelector((state: any) => state);
  const { cars, allCars } = carsSlice;
  const user: IUser = userSlice.user;
  useEffect(() => {
    setCurrentLink(0);
    document.title = "Lendors";
  }, []);
  return (
    <div className='h-[calc(100vh_-_5rem)] min-h-[calc(100vh_-_5rem)] w-full relative'>
      <div className='h-[70rem] max-h-[80%] w-full absolute top-0 -z-50'>
        <img
          src={Bg_2}
          alt='Lamborghini'
          className='h-full w-full object-cover'
          draggable={false}
        />
      </div>
      <div className='w-full h-[75%] flex items-center  justify-center gap-10 z-20 flex-col bg-slate-800 bg-opacity-40'>
        <Slide direction='up' cascade triggerOnce>
          <div className='flex flex-col items-center w-full gap-8 text-center'>
            <h1 className='font-bold text-4xl  xl:text-5xl w-[50%] text-center capitalize text-white'>
              {"Lamborghini Aventador LP700-4".toUpperCase()}
            </h1>
            <Fade
              cascade
              duration={20}
              triggerOnce
              className='text-white text-xl'
            >
              6.6L V8 32V DDI OHV Turbo Diesel, 5-Speed Automatic, Fuel Type:
              Diesel, Color: Black
            </Fade>
            <button
              className='bg-redish text-white flex items-center justify-center gap-3 px-14 py-4 mt-7 rounded-md font-bold text-xl hover:bg-red-800 duration-300'
              onClick={() => {
                !userSlice?.isLoggedIn
                  ? setLoginPage(true)
                  : navigate("/gallery");
              }}
            >
              <span>BOOK NOW</span>
              <img src={Icon_1} alt='arrow' />
            </button>
          </div>
        </Slide>
      </div>
      <Slide direction='up' cascade triggerOnce>
        <section className='min-h-[5em] w-4/5 bg-blueish m-auto z-40 px-5 flex items-center gap-8 justify-center rounded-md shadow-md flex-wrap overflow-auto py-5'>
          <div className='flex flex-col gap-2 w-[16em]'>
            <h1 className='text-white text-lg font-bold'>Pick Up Location</h1>
            <div className='h-14 p-2 bg-white rounded-md flex justify-between items-center'>
              <input
                type='text'
                placeholder='City, State or Airport Code'
                className='h-full px-3 outline-none'
              />
              <FontAwesomeIcon
                icon={faLocationDot}
                className='text-black text-lg'
              />
            </div>
          </div>
          <div className='flex flex-col gap-2 w-[16em]'>
            <h1 className='text-white text-lg font-bold'>Pick Up Date</h1>
            <div className='h-14 p-2 bg-white rounded-md flex justify-between items-center'>
              <input
                type='date'
                placeholder='City, State or Airport Code'
                className='h-full px-3 outline-none w-full'
              />
            </div>
          </div>
          <div className='flex flex-col gap-2 w-[16em] justify-between'>
            <h1 className='text-white text-lg font-bold'>Minimun Price</h1>
            <input
              type='range'
              placeholder='City, State or Airport Code'
              className='h-full outline-none bg-gray-200 w-full'
              min={800000}
              max={20000000}
              step={100000}
              value={amount}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setAmount(Number(e.target.value));
              }}
            />
            <div className='text-white flex justify-between'>
              <h1>{new Intl.NumberFormat("en-us").format(amount)} RWF</h1> -
              <h1>20,000,000 RWF</h1>
            </div>
          </div>
          <button
            className='bg-redish text-white flex items-center justify-center gap-3 w-[13em] h-14 mt-7 rounded-md font-bold text-xl hover:bg-red-800 duration-300'
            onClick={() => navigate("/gallery")}
          >
            <span>FIND A CAR</span>
            <img src={Icon_1} alt='arrow' />
          </button>
        </section>
      </Slide>
      <section className='h-[3em] w-full'></section>
      <Slide direction='up' cascade triggerOnce>
        <section className='w-full h-20 min-h-20 flex flex-col items-center  gap-5'>
          <div className='w-full flex items-center  justify-center gap-3 '>
            <div className='h-2 w-16 bg-redish'></div>
            <h1 className='font-bold text-4xl text-center'>
              Featured Vehicles
            </h1>
            <div className='h-2 w-16 bg-redish'></div>
          </div>
          <p className='text-xl p-1 text-center'>
            These are one of the best vehicles. Be the first to go with.
          </p>
        </section>
      </Slide>
      <section className='h-[50em] py-8'>
        <div className='w-full xl:w-[70%] m-auto py-4 flex flex-wrap gap-6 items-center justify-center  transition-all duration-300'>
          {(user.role == "admin" ? [...allCars] : [...cars])
            ?.sort((a: any, b: any) => {
              return (
                (new Date(b?.createdAt) as any) -
                (new Date(a?.createdAt) as any)
              );
            })
            .splice(0, 6)
            .map((car: CarObject, index: number) => {
              return (
                <Slide direction='up' key={index} triggerOnce>
                  <div
                    className='w-96  h-[520px] rounded relative overflow-hidden shadow-lg cursor-pointer'
                    onClick={() => navigate(`/car/${car.id}`)}
                  >
                    <img
                      className='w-full h-64'
                      src={car.imageUrl}
                      alt='Sunset in the mountains'
                    />
                    <div className='px-6 py-4'>
                      <div className='font-bold text-xl mb-2'>{car.name}</div>
                      <p className='text-gray-700 text-base'>
                        {car.description}
                      </p>
                    </div>
                    <div className='inline-flex -space-x-px absolute bottom-6 px-2 gap-3'>
                      <button className='p-2 ml-0 leading-tight text-gray-500 bg-white rounded-l-lg border border-gray-200 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white duration-75 flex gap-1'>
                        {new Intl.NumberFormat("es-us").format(
                          Number(car.price)
                        )}
                        <span className='font-bold'>
                          {car.currency.toUpperCase()}
                        </span>
                      </button>
                      <button className='p-2 leading-tight text-white bg-redish rounded-r-lg border border-gray-200 hover:bg-red-600 hover:text-white dark:bg-dispatch dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white duration-75'>
                        View Details
                      </button>
                      {user.role == "admin" && car.isBooked && (
                        <button className='p-2 leading-tight text-white bg-blue-500 rounded-r-lg border border-gray-200 hover:bg-blue-600 hover:text-white dark:bg-dispatch dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white duration-75'>
                          BOOKED
                        </button>
                      )}
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
