import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Provider } from "react-redux";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import AuthComponent from "./components/auth/AuthComponent";
import NavbarComponent from "./components/navbar/NavbarComponent";
import { CommonContext } from "./context";
import NotFoundPage from "./pages/404/NotFoundPage";
import AboutPage from "./pages/About/AboutPage";
import AddCarPage from "./pages/Admin/AddCarPage";
import AdminPage from "./pages/Admin/AdminPage";
import AllCarsPage from "./pages/Admin/AllCarsPage";
import AllCustomersPage from "./pages/Admin/AllCustomersPage";
import CarRequestPage from "./pages/Admin/CarRequestPage";
import Requests from "./pages/Admin/Requests";
import ContactPage from "./pages/Contact/ContactPage";
import GalleryPage from "./pages/Gallery/GalleryPage";
import HomePage from "./pages/Home/HomePage";
import ReviewsPage from "./pages/Review/ReviewsPage";
import { IUser } from "./types/userTypes";

const App = () => {
  const [loginPage, setLoginPage] = useState<boolean>(false);
  const [currentLink, setCurrentLink] = useState<number>(0);
  const [currentAdminLink, setCurrentAdminLink] = useState<number>(0);
  const userSlice = useSelector((state: any) => state.userSlice);
  const user: IUser = userSlice.user;
  return (
    <CommonContext.Provider
      value={{
        setLoginPage,
        loginPage,
        currentLink,
        setCurrentLink,
        currentAdminLink,
        setCurrentAdminLink
      }}
    >
      <div
        className={`${
          loginPage && "blur-md select-none cursor-none pointer-events-none "
        } overflow-auto h-screen min-h-screen overflow-x-hidden`}
      >
        <Router>
          <NavbarComponent />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/review" element={<ReviewsPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            {userSlice.isLoggedIn && user.role == "admin" && (
              <>
                <Route path="/admin" element={<AdminPage />} />
                <Route path="/admin/cars" element={<AddCarPage />}></Route>
                <Route path="/admin/new/car" element={<AllCarsPage />}></Route>
                <Route
                  path="/admin/customers"
                  element={<AllCustomersPage />}
                ></Route>
                <Route
                  path="/admin/request/all"
                  element={<CarRequestPage />}
                ></Route>
              </>
            )}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Router>
      </div>
      <AuthComponent />
    </CommonContext.Provider>
  );
};

export default App;
