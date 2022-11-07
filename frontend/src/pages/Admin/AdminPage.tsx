import React from "react";
import AdminNavbarComponent from "../../components/admin/AdminNavbarComponent";
import AdminPageComponent from "../../components/admin/AdminPageComponent";

const AdminPage: React.FC = () => {
  return (
    <div>
      <AdminNavbarComponent />
      <AdminPageComponent />
    </div>
  );
};

export default AdminPage;
