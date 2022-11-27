import React, { useContext, useEffect, useRef, useState } from "react";
import {
  faBarsStaggered,
  faCartShopping,
  faSearch,
  faUser,
  faClose
} from "@fortawesome/free-solid-svg-icons";
import type { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useNavigate } from "react-router-dom";
import Logo from "/favicon.png";
import { useSelector } from "react-redux";
import { IState } from "../../types/selectorTypes";
import { IUser } from "../../types/userTypes";
import { CommonContext } from "../../context";
import { useDispatch } from "react-redux";
import { resetUsers } from "../../redux/slices/usersSlice";
import { resetRequests } from "../../redux/slices/requestsSlice";
import { resetCars } from "../../redux/slices/carsSlice";
import { CarObject } from "../../types/carTypes";
import { logout } from "../../hooks";

const NavbarComponent: React.FC = () => {
  const navigate = useNavigate();
  const { userSlice, carsSlice, userRequestsSlice } = useSelector(
    (state: IState) => state
  );
  const user: IUser = userSlice.user;
  const cars: CarObject[] = carsSlice.cars;
  const { requests } = userRequestsSlice;
  const dispatch = useDispatch();
  const { currentLink, setCurrentLink, setShowCarts, showCarts, setSignup } =
    useContext(CommonContext);
  const { setLoginPage } = useContext(CommonContext);
  const [searchElement, setSearchElement] = useState<boolean>(false);
  const [menuDropComponent, setMenuDropComponent] = useState<boolean>(false);
  const [foundCars, setFoundCars] = useState<CarObject[]>([]);
  const DROP_ELEMENT: any = useRef(null);
  const [searchText, setSearchText] = useState<string>("");
  useEffect(() => {
    setFoundCars(
      cars.filter((car: CarObject) => {
        return (
          car.name
            .toLocaleLowerCase()
            .includes(searchText.toLocaleLowerCase()) ||
          car.brand
            .toLocaleLowerCase()
            .includes(searchText.toLocaleLowerCase()) ||
          car.description
            .toLocaleLowerCase()
            .includes(searchText.toLocaleLowerCase())
        );
      })
    );
  }, [searchText]);
  useEffect(() => {
    const clickEvent = () => {
      if (!DROP_ELEMENT.current?.contains(event?.target))
        setMenuDropComponent(false);
    };
    document.addEventListener("mousedown", clickEvent);
    return () => document.removeEventListener("mousedown", clickEvent);
  }, [DROP_ELEMENT]);
  const links: {
    href: string;
    title: string;
  }[] = [
    {
      title: "Home",
      href: "/"
    },
    {
      title: "Our Cars",
      href: "/gallery"
    },
    {
      title: "Reviews",
      href: "/review"
    },
    {
      title: "About",
      href: "/about"
    },
    {
      title: "Contact Us",
      href: "/contact"
    },
    {
      title: "Admin",
      href: "/admin"
    }
  ];
  const icons: {
    icon: IconDefinition;
    show: boolean;
  }[] = [
    {
      icon: searchElement ? faClose : faSearch,
      show: true
    },
    {
      icon: showCarts ? faClose : faCartShopping,
      show: userSlice.isLoggedIn
    },
    {
      icon: faUser,
      show: userSlice.isLoggedIn
    },
    {
      icon: faBarsStaggered,
      show: userSlice.isLoggedIn
    }
  ];

  return (
    <div className='bg-blueish-2 h-20 w-full flex px-4 lg:px-20 2xl:px-60 items-center justify-between relative z-30'>
      <div className='flex items-center justify-center gap-3'>
        <img src={Logo} alt='Logo' className='w-10 rounded-full bg-white ' />
        <h1 className='text-white font-bold text-2xl'>Lendors</h1>
      </div>
      <div className='hidden items-center justify-center gap-8 lg:flex'>
        {links.map((link, index) => (
          <Link
            to={link.href}
            key={index}
            className={`${
              currentLink == index ? "text-redish" : "text-white"
            } hover:text-redish duration-500`}
            onClick={() => setCurrentLink(index)}
            hidden={index == 5 && user?.role != "admin"}
          >
            {link.title}
          </Link>
        ))}
      </div>
      <div className='text-lg flex gap-8 items-center relative'>
        {icons.map(({ icon, show }, index) => {
          return index == 2 ? (
            <Link to={"/account"} key={index}>
              <FontAwesomeIcon
                icon={icon}
                className={`text-white hover:text-redish cursor-pointer duration-500 ${
                  !show && "hidden"
                }`}
                key={index}
              />
            </Link>
          ) : (
            <div
              key={index}
              className={`relative cursor-pointer`}
              onClick={() => {
                index == 0 && setSearchElement((cur: boolean) => !cur);
                index == 1 && setShowCarts((cur: boolean) => !cur);
                index == 3 && setMenuDropComponent((cur: boolean) => !cur);
              }}
            >
              <FontAwesomeIcon
                icon={icon}
                className={`text-white hover:text-redish duration-500 ${
                  !show && "hidden"
                }`}
              />
              {requests.length > 0 && index == 1 && !showCarts && (
                <span className='text-white bg-redish absolute px-1.5 rounded-full -top-1.5 -right-2 text-sm'>
                  {requests.length}
                </span>
              )}
            </div>
          );
        })}

        <button
          className={`text-white text-sm bg-redish hover:bg-red-500 p-[6px] px-2 rounded-sm flex items-center justify-center font-normal ${
            userSlice.isLoggedIn ? "hidden" : ""
          }`}
          onClick={() => {
            setLoginPage(true);
            setSignup("login");
          }}
        >
          LOGIN
        </button>
        <button
          className={`text-white text-sm bg-redish hover:bg-red-500 p-[6px] px-2 rounded-sm flex items-center justify-center font-normal ${
            userSlice.isLoggedIn ? "hidden" : ""
          }`}
          onClick={() => {
            setLoginPage(true);
            setSignup("signup");
          }}
        >
          SIGNUP
        </button>
        {userSlice.isLoggedIn && menuDropComponent && (
          <div
            className='absolute h-[8.5em] w-[10em] bg-white top-[1.8em] z-40 -right-1 rounded-md'
            ref={DROP_ELEMENT}
          >
            <div className='py-1' role='none'>
              <Link
                to={"/account"}
                className='text-gray-700 block px-4 py-2 text-sm'
                role='menuitem'
                tabIndex={-1}
                id='menu-item-0'
                onClick={() => setMenuDropComponent(false)}
              >
                Account settings
              </Link>
              <a
                className='text-gray-700 block px-4 py-2 text-sm'
                role='menuitem'
                tabIndex={-1}
                id='menu-item-1'
              >
                Support
              </a>
              <a
                className='text-gray-700 block px-4 py-2 text-sm'
                role='menuitem'
                tabIndex={1}
                id='menu-item-2'
              >
                License
              </a>
              <button
                className='text-gray-700 block w-full px-4 py-2 text-left text-sm'
                role='menuitem'
                tabIndex={-1}
                id='menu-item-3'
                onClick={() => {
                  logout(dispatch);
                }}
              >
                Logout
              </button>
            </div>
          </div>
        )}
      </div>
      <form
        className={`absolute bg-black h-20 z-10 top-full w-full left-0 ${
          searchElement ? "translate-x-0" : "-translate-x-[100%]"
        } w-full opacity-80 flex px-4 lg:px-20 2xl:px-60 items-center justify-between duration-150 ease-in-out`}
      >
        <input
          type='text'
          className='w-[98%] outline-none bg-inherit text-white text-lg'
          placeholder='Enter car name'
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setSearchText(e.target.value);
          }}
          value={searchText}
        />
        <button type='submit'>
          <FontAwesomeIcon
            icon={faSearch}
            className={`text-white hover:text-redish cursor-pointer duration-500 text-lg`}
          />
        </button>
      </form>
      <div
        className={`absolute bg-black h-56 z-10 top-[calc(2_*_100%)] w-full left-0 ${
          searchElement && searchText.length
            ? "translate-x-0"
            : "-translate-x-[100%]"
        } w-full opacity-70 flex px-4 lg:px-20 2xl:px-60 duration-150 ease-in-out overflow-auto flex-col gap-2`}
      >
        {foundCars.length < 1 ? (
          <div className='py-3 text-lg text-red-500 font-semibold'>
            We don't have <span className='underline'> {searchText}</span>
          </div>
        ) : (
          <>
            {foundCars.map((foundCar: CarObject) => {
              return (
                <div
                  className='py-3 sm:py-4 cursor-pointer border-b-2'
                  key={foundCar.id}
                >
                  <div className='flex items-center space-x-4'>
                    <div className='flex-shrink-0'>
                      <img
                        className='w-16 h-16 rounded-full object-cover  '
                        src={foundCar.imageUrl}
                        alt='Neil image'
                      />
                    </div>
                    <div className='flex-1 min-w-0'>
                      <p className='text-lg font-medium text-gray-300 truncate dark:text-white'>
                        {foundCar.name}
                      </p>
                      <p className='text-md text-gray-200 truncate dark:text-gray-400'>
                        brand: {foundCar.brand}
                      </p>
                    </div>
                    <div className='inline-flex items-center text-base font-semibold text-white dark:text-white p-2'>
                      {foundCar.currency.toUpperCase() == "USD" && "$"}{" "}
                      {foundCar.price}{" "}
                      {foundCar.currency.toUpperCase() != "USD" &&
                        foundCar.currency}
                    </div>
                    <button
                      className='text-white px-5 py-2 bg-redish rounded-md'
                      onClick={() => {
                        setSearchText("");
                        setSearchElement(false);
                        navigate(`/car/${foundCar.id}`);
                      }}
                    >
                      VIEW DETAILS
                    </button>
                  </div>
                </div>
              );
            })}
          </>
        )}
      </div>
    </div>
  );
};

export default NavbarComponent;
