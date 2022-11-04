import React, { useState } from "react";
import { Slide } from "react-awesome-reveal";
import FooterComponent from "../../components/footer/FooterComponent";
import NavbarComponent from "../../components/navbar/NavbarComponent";
import Img_1 from "/assets/img/img_01.jpg";
const GalleryPage: React.FC = () => {
  const categories: string[] = ["All", " Sedan", "Sports", "Luxury"];
  const [currentCars, setCurrentCars] = useState<number>(1);
  const cars: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const [currentCategory, setCurrentCategory] = useState<number>(0);
  return (
    <div className={`h-[calc(100vh_-_5rem)] w-full mt-5`}>
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
                  <div className="max-w-sm rounded overflow-hidden shadow-lg cursor-pointer">
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
          <div className="w-full py-5 flex items-center justify-center ">
            <div>
              <div className="inline-flex -space-x-px">
                <button className="p-3 ml-0 leading-tight text-gray-500 bg-white rounded-l-lg border border-gray-200 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white duration-75"
                onClick={()=> {
                  currentCars == 1 ? setCurrentCars(cars.length): setCurrentCars(cur=> cur - 1)
                }}
                >
                  Previous
                </button>
                {cars.map((car) => {
                  return (
                    <button
                      className={`p-3 px-4 leading-tight border border-gray-200 hover:bg-red-600 hover:text-white ${
                        car == currentCars
                          ? "bg-redish text-white "
                          : "text-gray-500 "
                      } hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white duration-75`}
                      key={car}
                      onClick={() => setCurrentCars(car)}
                    >
                      {car}
                    </button>
                  );
                })}

                <button className="p-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-200 hover:bg-red-600 hover:text-white dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white duration-75" onClick={()=> {
                  currentCars == cars.length ? setCurrentCars(1): setCurrentCars(cur=> cur +1)
                }}>
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
        <FooterComponent />
      </section>
    </div>
  );
};

export default GalleryPage;
