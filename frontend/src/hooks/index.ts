import api from "../api";
import { CarObject } from "../types/carTypes";

//Login hook

export const useLogin = async (
  user: { email: string; password: string },
  setError: any,
  login: any,
  dispatch: any,
  setLoginPage: any
) => {
  try {
    const request = await api.post("/user/login", user);
    const response = request.data;
    dispatch(login({ ...response.user, token: response.token }));
    setLoginPage(false);
  } catch (error: any) {
    setError(`${error.response.data.message}`);
    console.log(error.message);
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
  setLoginPage: any
) => {
  try {
    const request = await api.post("/user/new", user);
    const response = await request.data;
    dispatch(login({ ...response.user, token: response.token }));
    setLoginPage(false);
  } catch (error: any) {
    setError(`${error.response.data.message}`);
    console.log(error);
  }
};

// Get users

export const getUsers = async (token: string, setUsers: Function) => {
  try {
    const request = await api.get("/user/all", {
      headers: {
        authorization: token
      }
    });
    const response = request.data;
    setUsers(response.users);
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

export const deleteUserByAdmin = async (token: string, userId: string) => {
  try {
    const request = await api.delete(`/user/delete/${userId}`, {
      headers: {
        authorization: token
      }
    });
    const response = request.data;
    console.log(response);
  } catch (error) {
    console.log(error);
  }
};

//Get cars

export const getCars = async (setCars: any) => {
  try {
    const request = await api.get("/car/all");
    const response = request.data;
    setCars(response.cars);
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
  description: string
) => {
  try {
    console.log(brand);
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
    console.log(request.data);
  } catch (error) {
    console.log(error);
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

export const deleteCar = async (token: string, carId: string, setCars: any) => {
  try {
    const request = await api.delete(`/car/delete/${carId}`, {
      headers: { authorization: token }
    });
    setCars((cars: any) => {
      return cars.filter((car: CarObject) => {
        return car.id != carId;
      });
    });
    const response = request.data;
  } catch (error) {
    console.log(error);
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

export const getRequest = async (token: string, setRequest: any) => {
  try {
    const request = await api.get("/request/all", {
      headers: {
        authorization: token
      }
    });
    const response = request.data;
    setRequest(response.requests);
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
