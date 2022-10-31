import React, { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "/logo.png";
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
    <div className="bg-blueish-2 h-20 w-full flex px-40 items-center justify-between">
      <div className="flex items-center justify-center gap-3">
        <img src={Logo} alt="Logo" className="w-10 rounded-full bg-white " />
        <h1 className="text-white font-bold text-2xl">Lendors</h1>
      </div>
      <div className="flex items-center justify-center gap-8">
        {links.map((link, index) => (
          <Link
            to={link.href}
            className={`${currentLink == index ? "text-redish" : "text-white"}`}
            onClick={() => setCurrentLink(index)}
          >
            {link.title}
          </Link>
        ))}
      </div>
      <div></div>
    </div>
  );
};

export default NavbarComponent;
