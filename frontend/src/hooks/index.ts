import { AxiosError } from "axios";
import api from "../api";

//Login hook
export const useLogin = async (user: { email: string; password: string }) => {
  try {
    const request = await api.post("/login", user);
    const response = request.data;
    console.log(response);
  } catch (error: any) {
    console.log(error.message);
  }
};

//Signup hook

export const useSignup = async (
  user: {
    email: string;
    confirmPassword: string;
    password: string;
    fullname: string;
  },
  setError: any
) => {
  try {
    const request = await api.post("/signup", user);
    const response = await request.data;
    console.log(response);
  } catch (error: any) {
    setError(error.response.data);
    console.log(error);
  }
};
