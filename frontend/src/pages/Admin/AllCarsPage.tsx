import React, { useContext, useEffect } from "react";
import AdminNavbarComponent from "../../components/admin/AdminNavbarComponent";
import AllCarsComponent from "../../components/admin/AllCarsComponent";
import { CommonContext } from "../../context";

const AllCarsPage = () => {
  const { setCurrentAdminLink } = useContext(CommonContext);
  useEffect(() => {
    setCurrentAdminLink(1);
  }, []);
  return (
    <div>
      <AdminNavbarComponent />
      <AllCarsComponent />
    </div>
  );
};

export default AllCarsPage;
