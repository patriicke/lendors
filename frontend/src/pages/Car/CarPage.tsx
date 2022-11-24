import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as dateFns from "date-fns";
import { useCar, useRequests } from "../../hooks";
import { useSelector } from "react-redux";
import { IUser } from "../../types/userTypes";
import { toast } from "react-toastify";
import { CommonContext } from "../../context";

const CarPage: React.FC = () => {
  const { carId } = useParams();
  const userSlice = useSelector((state: any) => state?.userSlice);
  const user: IUser = userSlice.user;
  const { setCurrentLink } = useContext(CommonContext);
  const [car, setCar] = useState<any>({
    name: "Loading...",
    imageUrl: "",
    currency: "Loading...",
    price: "0",
    description: "Loading...",
    brand: "Loading..."
  });

  const [requestData, setRequestData] = useState({
    carId,
    startDate: dateFns.format(Date.now(), "MM-d-yyy"),
    endDate: dateFns.format(Date.now(), "MM-d-yyy"),
    days: 0
  });

  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const getCar = async () => {
    try {
      const request = await useCar({ carId });
      setCar(request.car);
    } catch (error) {
      console.log(error);
      setError(true);
    }
  };
  useEffect(() => {
    getCar();
  }, [carId]);
  useEffect(() => {
    document.title = `${car.name} | Lendors`;
  });
  const handleRequestCar = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      setLoading(true);
      await useRequests(`${user.token}`, requestData);
      toast.success("Car requested successfully");
      setCurrentLink(0)
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  const { isLoggedIn } = userSlice;

  return (
    <div className='w-screen flex flex-col items-center justify-between h-screen'>
      {!error ? (
        <div className='w-full md:w-10/12 py-12 flex flex-col px-2 md:px-12 shadow-2xl my-36 items-center'>
          <span className='text-2xl font-bold w-full text-start font-poppins'>
            {car.name}
          </span>
          <div className='w-full flex lg:flex-row flex-col items-start mt-24 justify-center'>
            <div className='w-full lg:w-1/2 flex flex-col items-center justify-center'>
              <img
                src={car.imageUrl}
                className='w-4/5 rounded-lg object-cover'
                alt=''
              />
            </div>
            <div className='font-poppins flex flex-col w-full lg:w-1/2'>
              <div className='text-lg flex items-start pl-16 justify-center w-full flex-col'>
                <span className='my-2'>
                  <span className='font-bold'>Name: </span>
                  {car.name}
                </span>
                <span className='my-2'>
                  <span className='font-bold'>Brand: </span>
                  {car.brand}
                </span>
                <span className='my-2'>
                  <span className='font-bold'>Price: </span>
                  {car.price} <span className='text-slate-400'>/day</span>
                </span>
                <span className='my-2'>
                  <span className='font-bold'>Currency: </span> {car.currency}
                </span>
                <span className='my-2'>
                  <span className='font-bold'>Description: </span>{" "}
                  {car.description}
                </span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className='w-full md:w-10/12 py-12 flex flex-col px-2 md:px-12 shadow-2xl my-36 items-center'>
          Car not found!!!
        </div>
      )}

      {!error && isLoggedIn ? (
        <div
          id='requestCar'
          className='w-full h-full md:w-10/12 py-12 flex flex-col px-2 md:px-12 shadow-2xl my-14 items-center justify-center'
        >
          <span className='text-2xl font-semibold w-full text-center font-poppins'>
            Request {car.name}
          </span>
          <form
            className='my-4 flex font-poppins flex-col w-6/12'
            onSubmit={handleRequestCar}
          >
            <div className='my-2 w-full flex  md:justify-between items-center md:flex-row flex-col '>
              <span>Start Date: </span>
              <div className='w-full md:w-7/12 flex'>
                <input
                  type={"date"}
                  className='w-full border-2 focus:outline-none border-redish p-3 rounded'
                  onChange={(e) =>
                    setRequestData({
                      ...requestData,
                      startDate: e.target.value
                    })
                  }
                  value={requestData.startDate}
                />
              </div>
            </div>

            <div className='my-2 w-full flex  md:justify-between items-center md:flex-row flex-col '>
              <span>End Date: </span>
              <div className='w-full md:w-7/12 flex'>
                <input
                  type={"date"}
                  className='w-full border-2 focus:outline-none border-redish p-3 rounded'
                  onChange={(e) =>
                    setRequestData({ ...requestData, endDate: e.target.value })
                  }
                  value={requestData.endDate}
                />
              </div>
            </div>
            <button
              type='submit'
              className={`px-6 py-3 rounded w-52 my-4 m-auto mt-8 ${
                loading ? "bg-slate-500" : "bg-redish"
              } text-white`}
            >
              {loading ? "LOADING" : "SEND REQUEST"}
            </button>
          </form>
        </div>
      ) : null}
    </div>
  );
};

export default CarPage;
