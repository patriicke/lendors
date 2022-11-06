import React, { useContext, useState } from "react";
import {
  faBarsStaggered,
  faCartShopping,
  faSearch,
  faUser
} from "@fortawesome/free-solid-svg-icons";
import type { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useNavigate } from "react-router-dom";
import Logo from "/favicon.png";
import { useSelector } from "react-redux";
import { IState } from "../../types/selectorTypes";
import { IUser } from "../../types/userTypes";
import { CommonContext } from "../../context";
const NavbarComponent = () => {
  const user: IUser = useSelector((state: IState) => state.userSlice);
  const { currentLink, setCurrentLink } = useContext(CommonContext);
  const navigate = useNavigate();
  const { setLoginPage } = useContext(CommonContext);
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
      icon: faSearch,
      show: true
    },
    {
      icon: faCartShopping,
      show: user.isLoggedIn
    },
    {
      icon: faUser,
      show: user.isLoggedIn
    },
    {
      icon: faBarsStaggered,
      show: true
    }
  ];
  return (
    <div className="bg-blueish-2 h-20 w-full flex px-4 lg:px-20 2xl:px-60 items-center justify-between">
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
      <div className="text-lg flex gap-8 items-center">
        {icons.map(({ icon, show }, index) => {
          return (
            <FontAwesomeIcon
              icon={icon}
              className={`text-white hover:text-redish cursor-pointer duration-500 ${
                !show && "hidden"
              }`}
              key={index}
            />
          );
        })}
        <button
          className={`text-white text-sm bg-redish hover:bg-red-500 p-[6px] px-2 rounded-sm flex items-center justify-center font-normal ${
            user.isLoggedIn ? "hidden" : ""
          }`}
          onClick={() => setLoginPage(true)}
        >
          LOGIN
        </button>
      </div>
    </div>
  );
};

export default NavbarComponent;
