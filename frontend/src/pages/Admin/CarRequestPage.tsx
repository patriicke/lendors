import React, { useContext, useEffect } from "react";
import AdminNavbarComponent from "../../components/admin/AdminNavbarComponent";
import CarRequestComponent from "../../components/admin/CarRequestComponent";
import { CommonContext } from "../../context";

const CarRequestPage = () => {
  const { setCurrentAdminLink } = useContext(CommonContext);
  useEffect(() => {
    setCurrentAdminLink(3);
  }, []);
  return (
    <div>
      <AdminNavbarComponent />
      <CarRequestComponent />
    </div>
  );
};

export default CarRequestPage;
