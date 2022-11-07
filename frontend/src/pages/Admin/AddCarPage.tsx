import React, { useContext, useEffect } from "react";
import AddCarComponent from "../../components/admin/AddCarComponent";
import AdminNavbarComponent from "../../components/admin/AdminNavbarComponent";
import { CommonContext } from "../../context";

const AddCarPage: React.FC = () => {
  const { setCurrentAdminLink } = useContext(CommonContext);
  useEffect(() => {
    setCurrentAdminLink(2);
  }, []);
  return (
    <div>
      <AdminNavbarComponent />
      <AddCarComponent />
    </div>
  );
};

export default AddCarPage;
