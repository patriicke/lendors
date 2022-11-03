import axios from "axios";

const BACKEND_URL: string = "http://localhost:5000";

const instance = axios.create({
  baseURL: BACKEND_URL
});

export default instance;
