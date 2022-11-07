import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { CommonContext } from "../../context";

const AdminNavbarComponent: React.FC = () => {
  const { currentAdminLink, setCurrentAdminLink, setCurrentLink } =
    useContext(CommonContext);
  const navs: {
    name: string;
    href: string;
  }[] = [
    { name: "All Customers", href: "/admin" },
    { name: "All Cars", href: "/admin/cars" },
    { name: "Add Car", href: "/admin/new/car" },
    { name: "Car Requests", href: "/admin/request/all" }
  ];
  useEffect(() => {
    setCurrentLink(5);
  }, []);
  return (
    <div className=" h-14 w-full mt-2 px-4 lg:px-12 flex items-center gap-3 text-md font-bold">
      {navs.map((link, index) => {
        return (
          <Link
            key={index}
            to={link.href}
            className={`${
              currentAdminLink == index ? "text-redish" : ""
            } hover:text-redish duration-300`}
            onClick={() => setCurrentAdminLink(index)}
          >
            {link.name}
          </Link>
        );
      })}
    </div>
  );
};

export default AdminNavbarComponent;
