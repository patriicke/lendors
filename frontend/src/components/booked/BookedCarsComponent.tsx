import React, { useContext, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { CommonContext } from "../../context";
import { findCarDetails, useScrollPosition } from "../../hooks";

const BookedCarsComponent: React.FC = () => {
  const { showCarts, setShowCarts } = useContext(CommonContext);
  const { userRequestsSlice, carsSlice } = useSelector((state: any) => state);
  const { requests } = userRequestsSlice;
  const { allCars } = carsSlice;
  const BOOK_ELEMENT: any = useRef(null);
  useEffect(() => {
    const clickEvent = () => {
      if (!BOOK_ELEMENT.current?.contains(event?.target)) setShowCarts(false);
    };
    document.addEventListener("mousedown", clickEvent);
    return () => document.removeEventListener("mousedown", clickEvent);
  }, [BOOK_ELEMENT]);
  return (
    <div
      className={`absolute ${
        showCarts ? "translate-y-0" : "-translate-y-[100vh]"
      } h-[calc(100vh_-_5rem)] w-[25em] max-w-[25em] bg-gray-500 top-20 right-[10px] duration-150 flex flex-col gap-4 overflow-auto p-2 z-40`}
      ref={BOOK_ELEMENT}
    >
      {!requests?.length ? (
        <div className="bg-white p-2 rounded-md font-semibold text-redish">
          You haven't yet made any car requests.
        </div>
      ) : (
        <>
          <div className="bg-white p-2 rounded-md font-semibold">
            {`You have made ${requests.length} ${
              requests.length < 1 ? "cars requests" : "car request"
            }.`}
          </div>
          {[...requests]
            .sort((a: any, b: any) => {
              return (
                (new Date(b?.createdAt) as any) -
                (new Date(a?.createdAt) as any)
              );
            })
            .map((request) => {
              return (
                <div className="flex justify-center" key={request?.id}>
                  <div className="rounded-lg shadow-lg bg-white max-w-sm">
                    <a
                      href="#!"
                      data-mdb-ripple="true"
                      data-mdb-ripple-color="light"
                    >
                      <img
                        className="rounded-t-lg"
                        src={findCarDetails(request?.carId, allCars)?.imageUrl}
                        alt={request?.name}
                      />
                    </a>
                    <div className="p-6">
                      <h5 className="text-gray-900 text-xl font-semibold mb-2 flex gap-2">
                        <span>
                          {findCarDetails(request?.carId, allCars)?.name}{" "}
                        </span>
                        <span className="opacity-60">
                          ({findCarDetails(request?.carId, allCars)?.brand})
                        </span>
                      </h5>
                      <h5 className="flex text-lg font-medium gap-2">
                        <span>PRICE:</span>
                        <span>
                          <span className="flex gap-1 font-semibold">
                            {findCarDetails(
                              request?.carId,
                              allCars
                            )?.currency.toUpperCase() == "USD" && "$"}
                            <span>
                              {new Intl.NumberFormat("es-us").format(
                                findCarDetails(request?.carId, allCars)?.price
                              )}
                            </span>
                            <span>
                              {findCarDetails(
                                request?.carId,
                                allCars
                              )?.currency.toUpperCase() != "USD" &&
                                findCarDetails(
                                  request?.carId,
                                  allCars
                                )?.currency?.toUpperCase()}
                            </span>
                          </span>
                        </span>
                      </h5>
                      <p className="text-gray-700 text-md mb-4">
                        {findCarDetails(request.carId, allCars)?.description}
                      </p>
                      <div className="flex gap-2 items-center font-semibold">
                        STATUS:
                        <button
                          type="button"
                          className={` inline-block px-3 py-2 text-white font-medium text-xs leading-tight uppercase rounded shadow-md  hover:shadow-lg  focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out ${
                            request.status == "pending"
                              ? "bg-gray-500"
                              : request.status == "denied"
                              ? "bg-redish"
                              : "bg-green-500"
                          }`}
                        >
                          {request.status}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
        </>
      )}
    </div>
  );
};

export default BookedCarsComponent;
