import {
  faBarsStaggered,
  faCartShopping,
  faSearch,
  faUser
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "/favicon.png";
const NavbarComponent = () => {
  const [currentLink, setCurrentLink] = useState<number>(0);
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
  return (
    <div className="bg-blueish-2 h-20 w-full flex px-80 items-center justify-between">
      <div className="flex items-center justify-center gap-3">
        <img src={Logo} alt="Logo" className="w-10 rounded-full bg-white " />
        <h1 className="text-white font-bold text-2xl">Lendors</h1>
      </div>
      <div className="flex items-center justify-center gap-8">
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
      <div className="text-lg flex gap-8">
        <FontAwesomeIcon
          icon={faSearch}
          className={`text-white hover:text-redish cursor-pointer duration-500`}
        />
        <FontAwesomeIcon
          icon={faCartShopping}
          className={`text-white hover:text-redish cursor-pointer duration-500`}
        />
        <FontAwesomeIcon
          icon={faUser}
          className={`text-white hover:text-redish cursor-pointer duration-500`}
        />
        <FontAwesomeIcon
          icon={faBarsStaggered}
          className={`text-white hover:text-redish cursor-pointer duration500`}
        />
      </div>
    </div>
  );
};

export default NavbarComponent;
