import { AnyAsyncThunk } from "@reduxjs/toolkit/dist/matchers";
import { useEffect, useState } from "react";
import api from "../api";
import {
  removeCar,
  resetCars,
  updateAllCars,
  updateCar,
  updateCars
} from "../redux/slices/carsSlice";
import { resetRequests, updateRequest } from "../redux/slices/requestsSlice";
import {
  resetUserRequests,
  updateUserRequests
} from "../redux/slices/userRequestsSlice";
import { resetUser } from "../redux/slices/userSlice";
import { resetUsers } from "../redux/slices/usersSlice";

//Login hook

export const useLogin = async (
  user: { email: string; password: string },
  setError: any,
  login: any,
  dispatch: any,
  setLoginPage: any,
  setLoading: any
) => {
  try {
    setLoading(true);
    const request = await api.post("/user/login", user);
    const response = request.data;
    dispatch(login({ ...response.user, token: response.token }));
    setLoginPage(false);
  } catch (error: any) {
    setError(`${error.response.data.message}`);
    console.log(error.message);
  } finally {
    setLoading(false);
  }
};

//Signup hook

export const useSignup = async (
  user: {
    email: string;
    confirmPassword: string;
    telephone: string;
    address: string;
    password: string;
    names: string;
  },
  setError: any,
  dispatch: any,
  login: any,
  setLoginPage: any,
  setLoading: any
) => {
  try {
    setLoading(true);
    const request = await api.post("/user/new", user);
    const response = await request.data;
    dispatch(login({ ...response.user, token: response.token }));
    setLoginPage(false);
  } catch (error: any) {
    setError(`${error.response.data.message}`);
    console.log(error);
  } finally {
    setLoading(false);
  }
};

// Get users

export const getUsers = async (
  token: string,
  setUsers: Function,
  dispatch: any,
  updateUsers: any
) => {
  try {
    const request = await api.get("/user/all", {
      headers: {
        authorization: token
      }
    });
    const response = request.data;
    setUsers(response.users);
    dispatch(updateUsers(response.users));
  } catch (error) {
    console.log(error);
  }
};

// Delete your account

export const deleteUser = async () => {
  try {
    const request = await api.delete("/user/delete");
  } catch (error) {
    console.log(error);
  }
};

//Delete user bg admin

export const deleteUserByAdmin = async (
  token: string,
  userId: string,
  toast: any,
  setLoading: Function
) => {
  try {
    setLoading(true);
    await api.delete(`/user/delete/${userId}`, {
      headers: {
        authorization: token
      }
    });
    toast.success("User Deleted Successfully");
  } catch (error) {
    console.log(error);
    toast.error("User Deleted Successfully");
  } finally {
    setLoading(true);
  }
};

//Get cars

export const getCars = async (dispatch: any) => {
  try {
    const request = await api.get("/car/all");
    const cars = request.data.cars;
    dispatch(updateAllCars(cars));
    const filteredCars = cars.filter((car: any) => {
      return !car.isBooked;
    });
    dispatch(updateCars(cars));
  } catch (error) {
    console.log(error);
  }
};

export const getCarsAdmin = async (dispatch: any) => {
  try {
    const request = await api.get("/car/all");
    const response = request.data;
    dispatch(updateCars(response.cars));
  } catch (error) {
    console.log(error);
  }
};
//Add car

export const addCar = async (
  token: string,
  name: string,
  price: string,
  brand: string,
  currency: string,
  imageUrl: string,
  description: string,
  toast: any,
  dispatch: any,
  addCar: any
) => {
  try {
    const request = await api.post(
      "/car/new",
      {
        name,
        price,
        brand,
        currency,
        imageUrl,
        description
      },
      {
        headers: {
          authorization: token
        }
      }
    );
    const response = request.data;
    dispatch(addCar(response.car));
    toast.success(`${name} was added successfully`);
    return true;
  } catch (error) {
    toast.error(`An error occurred while adding ${name}`);
    console.log(error);
    return false;
  }
};

export const uploadImage = async (image: any) => {
  const data = new FormData();
  data.append("file", image);
  data.append("upload_preset", "chatpresetimages");
  try {
    let res = await fetch(
      "https://api.cloudinary.com/v1_1/dkpaiyjv5/image/upload",
      {
        method: "post",
        body: data
      }
    );
    const urlData = await res.json();
    return urlData.secure_url;
  } catch (error) {
    console.log(error);
  }
};

export const formatDate = (date: Date): string => {
  return `${date.getFullYear()}-${date.getMonth() + 1}-${
    date.getDate().toString().length > 1 ? date.getDate() : "0" + date.getDate()
  }`;
};

export const deleteCar = async (
  token: string,
  carId: string,
  dispatch: any,
  toast: any
) => {
  try {
    await api.delete(`/car/delete/${carId}`, {
      headers: { authorization: token }
    });
    dispatch(removeCar(carId));
    toast.success("Car delete successfully");
    return true;
  } catch (error) {
    console.log(error);
    toast.error("An error occurred while deleting car");
  }
};

export interface useCarsObject {
  search: boolean;
  query?: string;
}
export const useCars = async ({ search, query }: useCarsObject) => {
  try {
    const request = await api.get(`/car/${search ? `search/` + query : "all"}`);
    const response = await request.data;
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export interface UseCarObject {
  carId: string | undefined;
}

export const useCar = async ({ carId }: UseCarObject) => {
  try {
    const request = await api.get(`/car/details/${carId}`);
    const response = await request.data;
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const useRequests = async (token: string, requestData: any) => {
  try {
    console.log(requestData);
    const request = await api.post(
      `/request/new`,
      { ...requestData },
      {
        headers: {
          authorization: token
        }
      }
    );
    const response = await request.data;
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const getRequest = async (
  token: string,
  setRequest: any,
  dispatch: any,
  updateRequests: any
) => {
  try {
    const request = await api.get("/request/all", {
      headers: {
        authorization: token
      }
    });
    const response = request.data;
    setRequest(response.requests);
    dispatch(updateRequests(response.requests));
  } catch (error) {
    console.log(error);
  }
};

export const getUserRequests = async (token: string, dispatch: any) => {
  try {
    const request = await api.get("/request/user/all", {
      headers: {
        authorization: token
      }
    });
    const response = request.data;
    dispatch(updateUserRequests(response.requests));
  } catch (error) {
    console.log(error);
  }
};

export const findCarDetails = (carId: any, cars: any) => {
  try {
    return cars.filter((car: any) => {
      return car.id == carId;
    })[0];
  } catch (error) {
    console.log(error);
  }
};

export const findUserDetails = (userId: any, users: any) => {
  try {
    return users.filter((car: any) => {
      return car.id == userId;
    })[0];
  } catch (error) {
    console.log(error);
  }
};

export const acceptRequest = async (
  token: string,
  requestId: string,
  dispatch: any,
  toast: any,
  setLoading: Function
) => {
  try {
    setLoading(true);
    const request = await api.get(`/request/grant/${requestId}`, {
      headers: {
        authorization: token
      }
    });
    dispatch(updateRequest(request.data.request));
    dispatch(updateCar(request.data.car));
    toast.success("Car request accepted successfully");
  } catch (error) {
    console.log(error);
    toast.error("An errod occurred while accepting car request");
  } finally {
    setLoading(false);
  }
};
export const rejectRequest = async (
  token: string,
  requestId: string,
  dispatch: any,
  toast: any,
  setLoading: Function
) => {
  try {
    setLoading(true);
    const request = await api.get(`/request/deny/${requestId}`, {
      headers: {
        authorization: token
      }
    });
    dispatch(updateRequest(request.data.request));
    dispatch(updateCar(request.data.car));
    toast.success("Car request denied successfully");
  } catch (error) {
    console.log(error);
    toast.error("An errod occurred while denying car request");
  } finally {
    setLoading(false);
  }
};

export const useScrollPosition = () => {
  const [scrollPosition, setScrollPostion] = useState<number>(0);
  useEffect(() => {
    const updatePosition = () => {
      setScrollPostion(window.pageYOffset);
    };
    document.addEventListener("scroll", updatePosition);
    return () => window.removeEventListener("scroll", updatePosition);
  }, []);
  return scrollPosition;
};

export const logout = (dispatch: Function) => {
  dispatch(resetUser());
  dispatch(resetUsers());
  dispatch(resetCars());
  dispatch(resetUserRequests());
  dispatch(resetRequests());
};
