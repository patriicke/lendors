import api from "../api";

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
