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
import { logout } from "../../redux/slices/userSlice";

const NavbarComponent: React.FC = () => {
  const navigate = useNavigate();
  const userSlice = useSelector((state: IState) => state.userSlice);
  const user: IUser = userSlice.user;
  const dispatch = useDispatch();
  const { currentLink, setCurrentLink } = useContext(CommonContext);
  const { setLoginPage } = useContext(CommonContext);
  const [searchElement, setSearchElement] = useState<boolean>(false);
  const [menuDropComponent, setMenuDropComponent] = useState<boolean>(false);
  const DROP_ELEMENT: any = useRef(null);
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
      icon: faCartShopping,
      show: userSlice.isLoggedIn
    },
    {
      icon: faUser,
      show: userSlice.isLoggedIn
    },
    {
      icon: faBarsStaggered,
      show: true
    }
  ];
  return (
    <div className="bg-blueish-2 h-20 w-full flex px-4 lg:px-20 2xl:px-60 items-center justify-between relative">
      <div className="flex items-center justify-center gap-3">
        <img src={Logo} alt="Logo" className="w-10 rounded-full bg-white " />
        <h1 className="text-white font-bold text-2xl">Lendors</h1>
      </div>
      <div className="hidden items-center justify-center gap-8 lg:flex">
        {links.map((link, index) => (
          <Link
            to={link.href}
            key={index}
            className={`${
              currentLink == index ? "text-redish" : "text-white"
            } hover:text-redish duration-500`}
            onClick={() => setCurrentLink(index)}
          >
            {link.title}
          </Link>
        ))}
      </div>
      <div className="text-lg flex gap-8 items-center relative">
        {icons.map(({ icon, show }, index) => {
          return (
            <FontAwesomeIcon
              icon={icon}
              className={`text-white hover:text-redish cursor-pointer duration-500 ${
                !show && "hidden"
              }`}
              key={index}
              onClick={() => {
                index == 0 && setSearchElement((cur) => !cur);
                index == 3 && setMenuDropComponent(true);
              }}
            />
          );
        })}

        <button
          className={`text-white text-sm bg-redish hover:bg-red-500 p-[6px] px-2 rounded-sm flex items-center justify-center font-normal ${
            userSlice.isLoggedIn ? "hidden" : ""
          }`}
          onClick={() => setLoginPage(true)}
        >
          LOGIN
        </button>
        {userSlice.isLoggedIn && menuDropComponent && (
          <div
            className="absolute h-[8.5em] w-[10em] bg-white top-[1.8em] z-10 -right-1 rounded-md"
            ref={DROP_ELEMENT}
          >
            <div className="py-1" role="none">
              <a
                className="text-gray-700 block px-4 py-2 text-sm"
                role="menuitem"
                tabIndex={-1}
                id="menu-item-0"
              >
                Account settings
              </a>
              <a
                className="text-gray-700 block px-4 py-2 text-sm"
                role="menuitem"
                tabIndex={-1}
                id="menu-item-1"
              >
                Support
              </a>
              <a
                className="text-gray-700 block px-4 py-2 text-sm"
                role="menuitem"
                tabIndex={1}
                id="menu-item-2"
              >
                License
              </a>
              <button
                className="text-gray-700 block w-full px-4 py-2 text-left text-sm"
                role="menuitem"
                tabIndex={-1}
                id="menu-item-3"
                onClick={() => {
                  dispatch(logout());
                }}
              >
                Sign out
              </button>
            </div>
          </div>
        )}
      </div>
      <div
        className={`absolute bg-black h-20 z-10 top-full w-full left-0 ${
          searchElement ? "translate-x-0" : "-translate-x-[100%]"
        } w-full opacity-70 flex px-4 lg:px-20 2xl:px-60 items-center justify-between duration-150 ease-in-out`}
      >
        <input
          type="text"
          className="w-[98%] outline-none bg-inherit text-white text-lg"
          placeholder="Type here"
        />
        <FontAwesomeIcon
          icon={faSearch}
          className={`text-white hover:text-redish cursor-pointer duration-500 text-lg`}
        />
      </div>
    </div>
  );
};

export default NavbarComponent;
