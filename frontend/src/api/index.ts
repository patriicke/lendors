import axios from "axios";

const BACKEND_URL: string = "https://lendor.onrender.com";

const api = axios.create({
  baseURL: BACKEND_URL
});

export default api;

// https://lendors-api.herokuapp.com/
