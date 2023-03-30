import axios from "axios";
import {
  SignUpValues,
  LoginValues,
  ForgotPasswordValues,
} from "../Constants/Interfaces";

const API_URL = "https://localhost:7298/api/v1/";

const headers = {
  "Access-Control-Allow-Origin": "*",
  "Content-Type": "application/json",
  withCredentials: true,
};

const createUser = (data: SignUpValues) => {
  return axios.post(API_URL + "account", data);
};

const forgotPassword = (data: ForgotPasswordValues) => {
  return axios.post(API_URL + "ForgotPassword", data);
};

const login = (data: LoginValues) => {
  return axios
    .post(API_URL + "authentication/login", data, headers)
    .then((response) => {
      if (response.data) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }
      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
  return axios
    .post(API_URL + "authentication/logout", null, headers)
    .then((response) => {
      console.log(response.data);
    });
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user") || "{}");
};

const AxiosService = {
  createUser,
  login,
  logout,
  getCurrentUser,
  forgotPassword,
};
export default AxiosService;
