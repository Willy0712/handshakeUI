import axios from "axios";
import { SignUpValues, LoginValues } from "../Constants/InterfacesSignUpLogin";

const API_URL = "https://localhost:7298/api/v1/";

const createUser = (data: SignUpValues) => {
  return axios.post(API_URL + "account", data);
};

const login = (data: LoginValues) => {
  return axios.post(API_URL + "login", data).then((response) => {
    // console.log(response.data);
    if (response.data) {
      localStorage.setItem("user", JSON.stringify(response.data));
    }

    return response.data;
  });
};

const logout = () => {
  localStorage.removeItem("user");
  return axios.get("https://localhost:7298/logout").then((response) => {
    return response.data;
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
};
export default AxiosService;
