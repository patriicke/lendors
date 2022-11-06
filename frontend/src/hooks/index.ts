import api from "../api";

//Signup hook

export const useSignup = async (
  user: {
    id: string;
    names: string;
    email: string;
    address: string;
    confirmPassword: string;
    password: string;
    telephone: string;
  },
  setError: any,
  login: any,
  dispatch: any
) => {
  try {
    const request = await api.post("/user/new", user);
    const response = await request.data;
    console.log(response);
  } catch (error: any) {
    // setError(error.response.data);
    console.log(error);
  }
};
