import axios from "axios";
import { toast } from "react-toastify";

export const api = axios.create({
  baseURL: "https://dummyjson.com",
  timeout: 10000,
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error?.response?.data?.message ||
      error?.message ||
      "Something went wrong. Please try again.";
    if (!message) {
      toast.error("An unexpected error occurred.");
    } else {
      toast.error(message);
    }
    return Promise.reject(error);
  }
);
