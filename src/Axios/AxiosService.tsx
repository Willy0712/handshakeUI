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

const checkCookies = () => {
  return axios.get(API_URL + "checkcookies", headers);
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

const sendTokenToBackend = async (provider: string, token: string) => {
  try {
    return await axios
      .post(
        API_URL + "authentication/sociallogin",
        {
          provider,
          token,
        },
        headers
      )
      .then((response) => {
        if (response.data) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }
        return response.data;
      });
  } catch (error) {
    console.error("Error sending the token to the back-end");
  }
};

// const sendTokenToBackend = async (
//   provider: string,
//   token: string
// ): Promise<any> => {
//   try {
//     const response = await axios.post(
//       API_URL + "authentication/sociallogin",
//       {
//         provider,
//         token,
//       },
//       headers
//     );
//     if (response.data) {
//       localStorage.setItem("user", JSON.stringify(response.data));
//     }
//     return response.data;
//   } catch (error) {
//     console.error("Error sending the token to the back-end");
//     throw error; // This ensures that the method rejects with an error when it fails
//   }
// };

const AxiosService = {
  createUser,
  login,
  logout,
  getCurrentUser,
  forgotPassword,
  checkCookies,
  sendTokenToBackend,
};
export default AxiosService;
