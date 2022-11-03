import api from "../api";

//Login hook
export const userLogin = async (user: { email: string; password: string }) => {
  try {
    const request = await api.post("/login", user);
    const response = request.data;
    console.log(response);
  } catch (error: any) {
    console.log(error.message);
  }
};
