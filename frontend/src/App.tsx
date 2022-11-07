import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Provider } from "react-redux";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import AuthComponent from "./components/auth/AuthComponent";
import NavbarComponent from "./components/navbar/NavbarComponent";
import { CommonContext } from "./context";
import NotFoundPage from "./pages/404/NotFoundPage";
import AboutPage from "./pages/About/AboutPage";
import AdminPage from "./pages/Admin/AdminPage";
import ContactPage from "./pages/Contact/ContactPage";
import GalleryPage from "./pages/Gallery/GalleryPage";
import HomePage from "./pages/Home/HomePage";
import ReviewsPage from "./pages/Review/ReviewsPage";
import { store, persistor } from "./redux/store";
import { IUser } from "./types/userTypes";

const App = () => {
  const [loginPage, setLoginPage] = useState(false);
  const [currentLink, setCurrentLink] = useState(0);
  const userSlice = useSelector((state: any) => state.userSlice);
  const user: IUser = userSlice.user;
  return (
    <CommonContext.Provider
      value={{ setLoginPage, loginPage, currentLink, setCurrentLink }}
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
            <Route
              path="/admin"
              element={
                userSlice.isLoggedIn && user.role == "admin" ? (
                  <AdminPage />
                ) : (
                  <Navigate to={"/"} />
                )
              }
            />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Router>
      </div>
      <AuthComponent />
    </CommonContext.Provider>
  );
};

export default App;
