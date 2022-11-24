import React, { useContext, useEffect, useState } from "react";
import { Slide } from "react-awesome-reveal";
import FooterComponent from "../../components/footer/FooterComponent";
import { CommonContext } from "../../context";
import { CarObject } from "../../types/carTypes";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { IUser } from "../../types/userTypes";
const GalleryPage: React.FC = () => {
  const navigate = useNavigate();
  const { setCurrentLink } = useContext(CommonContext);
  const [currentCars, setCurrentCars] = useState<number>(1);
  const { userSlice, carsSlice } = useSelector((state: any) => state);
  const user: IUser = userSlice.user;
  const { cars, allCars } = carsSlice;
  useEffect(() => {
    setCurrentLink(1);
    document.title = "Gallery | Lendors";
  }, []);
  return (
    <div className={`h-[calc(100vh_-_5rem)] w-full mt-5`}>
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
          {(user.role == "admin" ? [...allCars] : [...cars])?.map(
            (car: CarObject, index: number) => {
              return (
                <div
                  className='w-96  h-[513px] rounded relative overflow-hidden shadow-lg cursor-pointer'
                  key={index}
                  onClick={() => navigate(`/car/${car.id}`)}
                >
                  <img
                    className='w-full h-64'
                    src={car.imageUrl}
                    alt='Sunset in the mountains'
                  />
                  <div className='px-6 py-4'>
                    <div className='font-bold text-xl mb-2'>{car.name}</div>
                    <p className='text-gray-700 text-base'>{car.description}</p>
                  </div>
                  <div className='inline-flex -space-x-px absolute bottom-6 px-2 gap-3'>
                    <button className='p-2 ml-0 leading-tight text-gray-500 bg-white rounded-l-lg border border-gray-200 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white duration-75 flex gap-1'>
                      {new Intl.NumberFormat("es-us").format(Number(car.price))}
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
              );
            }
          )}
        </div>
        <div className='w-full py-5 flex items-center justify-center '>
          <div className='inline-flex -space-x-px'>
            <button
              className='p-3 ml-0 leading-tight text-gray-500 bg-white rounded-l-lg border border-gray-200 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white duration-75'
              onClick={() => {
                currentCars == 1
                  ? setCurrentCars(cars.length)
                  : setCurrentCars((cur) => cur - 1);
              }}
            >
              Previous
            </button>
            <button
              className='p-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-200 hover:bg-red-600 hover:text-white dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white duration-75'
              onClick={() => {
                currentCars == cars.length
                  ? setCurrentCars(1)
                  : setCurrentCars((cur) => cur + 1);
              }}
            >
              Next
            </button>
          </div>
        </div>
        <FooterComponent />
      </section>
    </div>
  );
};

export default GalleryPage;
