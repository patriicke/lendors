import React, { useEffect, useState } from "react";
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
import { getCars, getRequest, getUsers } from "./hooks";
import NotFoundPage from "./pages/404/NotFoundPage";
import AboutPage from "./pages/About/AboutPage";
import AddCarPage from "./pages/Admin/AddCarPage";
import AllCarsPage from "./pages/Admin/AllCarsPage";
import AllCustomersPage from "./pages/Admin/AllCustomersPage";
import CarRequestPage from "./pages/Admin/CarRequestPage";
import ContactPage from "./pages/Contact/ContactPage";
import GalleryPage from "./pages/Gallery/GalleryPage";
import HomePage from "./pages/Home/HomePage";
import ReviewsPage from "./pages/Review/ReviewsPage";
import UserPage from "./pages/User/User";
import CarPage from "./pages/Car/CarPage";
import { IUser } from "./types/userTypes";
import { useDispatch } from "react-redux";
import { updateUsers } from "./redux/slices/usersSlice";
import { updateCars } from "./redux/slices/carsSlice";
import { updateRequests } from "./redux/slices/requestsSlice";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
const App = () => {
  const dispatch = useDispatch();
  const [loginPage, setLoginPage] = useState<boolean>(false);
  const [currentLink, setCurrentLink] = useState<number>(0);
  const [currentAdminLink, setCurrentAdminLink] = useState<number>(0);
  const [users, setUsers] = useState<IUser[]>([]);
  const [cars, setCars] = useState<IUser[]>([]);
  const [requests, setRequests] = useState<IUser[]>([]);
  const userSlice = useSelector((state: any) => state.userSlice);
  const user: IUser = userSlice.user;
  useEffect(() => {
    getCars(setCars, dispatch, updateCars);
    if (user.role == "admin") {
      getUsers(`${user.token}`, setUsers, dispatch, updateUsers);
      getRequest(`${user.token}`, setRequests, dispatch, updateRequests);
    }
  }, [user]);
  return (
    <CommonContext.Provider
      value={{
        setLoginPage,
        loginPage,
        currentLink,
        setCurrentLink,
        currentAdminLink,
        setCurrentAdminLink,
        users,
        setUsers,
        cars,
        setCars,
        requests,
        setRequests
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
            <Route path="/car/:carId" element={<CarPage />} />
            <Route path="/review" element={<ReviewsPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route
              path="/account"
              element={
                userSlice.isLoggedIn ? <UserPage /> : <Navigate to={"/"} />
              }
            />
            {userSlice.isLoggedIn && user.role == "admin" && (
              <>
                <Route path="/admin" element={<AllCustomersPage />} />
                <Route path="/admin/cars" element={<AllCarsPage />}></Route>
                <Route path="/admin/new/car" element={<AddCarPage />}></Route>
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
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </CommonContext.Provider>
  );
};

export default App;
