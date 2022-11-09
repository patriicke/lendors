import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Sidebar from "./Siderbar";
import { IUser } from "../../types/userTypes";

const UserComponent = () => {
  const userSlice = useSelector((state: any) => state.userSlice);
  const user: IUser = userSlice.user;
  useEffect(() => {
    document.title = `${user.names} | Lendors`;
    user ? null : window.location.replace("/");
  }, []);
  return (
    <div className="w-full flex flex-col">
      <div
        className="w-full h-44 font-bold text-white text-2xl flex items-center justify-center  relative"
        style={{
          backgroundImage:
            "url('https://html.merku.love/rotors/assets/images/breadcrumb/bg_10.jpg')"
        }}
      >
        <div className="w-full absolute top-0 left-0 h-full flex items-center justify-center bg-gradient-to-t from-black via-transparent to-transparent z-20">
          <span className="absolute bottom-8 font-bold text-2xl left-auto z-10">
            My Account
          </span>
        </div>
      </div>
      <div className="w-full bg-slate-200 px-24 h-16 text-slate-500 flex items-center">
        <Link to="/account" className="hover:underline">
          Home / Account
        </Link>
      </div>
      <div className="py-12 px-16 flex w-full flex-col lg:flex-row lg:w-10/12 m-auto mt-16">
        <Sidebar />
        <div className="flex w-full lg:w-6/12 pl-8 flex-col items-start justify-start">
          <span className="text-3xl font-bold my-3">Account: </span>
          <div className="my-1 text-lg w-full flex justify-between">
            <span className="w-1/3">Name: </span>
            <span className="font-bold w-2/3">{user.names}</span>
          </div>
          <div className="my-1 text-lg w-full flex justify-between">
            <span className="w-1/3">E-mail: </span>
            <span className="font-bold w-2/3">{user.email}</span>
          </div>
          <div className="my-1 text-lg w-full flex justify-between">
            <span className="w-1/3">Telephone: </span>
            <span className="font-bold w-2/3">{user.telephone}</span>
          </div>
          <div className="my-1 text-lg w-full flex justify-between">
            <span className="w-1/3">Address: </span>
            <span className="font-bold w-2/3">{user.address}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserComponent;
