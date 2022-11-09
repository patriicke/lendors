import axios from "axios";

const BACKEND_URL: string = "http://10.42.0.1:5000";

const api = axios.create({
  baseURL: BACKEND_URL
});

export default api;

// https://lendors-api.herokuapp.com/
