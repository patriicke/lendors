import React, { useContext, useEffect } from "react";
import AdminNavbarComponent from "../../components/admin/AdminNavbarComponent";
import AllCustomerComponent from "../../components/admin/AllCustomerComponent";
import { CommonContext } from "../../context";

const AllCustomersPage: React.FC = () => {
  const { setCurrentAdminLink } = useContext(CommonContext);
  useEffect(() => {
    setCurrentAdminLink(0);
  }, []);
  return (
    <div>
      <AdminNavbarComponent />
      <AllCustomerComponent />
    </div>
  );
};

export default AllCustomersPage;
