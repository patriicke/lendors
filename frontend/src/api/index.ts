import axios from "axios";

const BACKEND_URL: string = "http://localhost:5000";

const api = axios.create({
  baseURL: BACKEND_URL
});

export default api;

// https://lendors-api.herokuapp.com/
