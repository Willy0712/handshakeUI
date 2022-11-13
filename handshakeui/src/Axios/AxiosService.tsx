import axios from "axios";

const API_URL = "https://localhost:7298/api/v1";

const createUser = (
  firstName: string,
  lastName: string,
  email: string,
  userName: string,
  password: string,
  dateOfBirth: string,
  gender: string
) => {
  return axios.post(API_URL + "/account", {
    firstName,
    lastName,
    email,
    userName,
    password,
    dateOfBirth,
    gender,
  });
};

const AxiosService = {
  createUser,
};
export default AxiosService;
