import {
  faBook,
  faSignOut,
  faUser,
  IconDefinition
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../../hooks";
import { IUser } from "../../types/userTypes";

export interface Link {
  linkTo: string;
  id: number;
  linkName: string | undefined;
  icon: IconDefinition;
}
const Sidebar: React.FC = () => {
  const [active, setActive] = useState<number>(1);
  const userSlice = useSelector((state: any) => state.userSlice);
  const user: IUser = userSlice.user;
  const dispatch = useDispatch();
  const links: Link[] = [
    {
      id: 1,
      linkTo: "/user",
      linkName: user.names,
      icon: faUser
    },
    {
      id: 2,
      linkTo: "/logout",
      linkName: "Logout",
      icon: faSignOut
    },
    {
      id: 3,
      linkTo: "/history",
      linkName: "Booking profiles",
      icon: faBook
    }
  ];

  return (
    <div className='w-full lg:w-3/12 bg-slate-200 rounded py-4 flex flex-col text-black'>
      <span className='text-2xl font-bold px-4 py-6'>Account Details: </span>
      <div className='flex flex-col'>
        {links.map((link: Link, index: number) => (
          <div
            onClick={() => {
              index === 1 && logout(dispatch);
              window.location.replace("/");
            }}
            key={index}
            className={`cursor-pointer py-2 px-4  flex items-start justify-start text-lg hover:text-redish w-full ${
              active === link.id
                ? "bg-white text-black"
                : "bg-inherit text-black"
            }`}
          >
            <span className='w-1/12'>
              <FontAwesomeIcon icon={link.icon} />
            </span>
            <span className='px-2'>{link.linkName}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
