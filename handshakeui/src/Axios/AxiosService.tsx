import axios from "axios";

const API_URL = "https://localhost:7298/api/v1";

interface SignUpValues {
  firstName: string;
  lastName: string;
  email: string;
  userName: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
  dateOfBirth: string;
  gender: string;
}

const createUser = (data: SignUpValues) => {
  return axios.post(API_URL + "/account", data);
  // .then((response) => {
  //   alert("User created successfully!");
  // })
  // .catch((e) => {
  //   const error = e.response.data;
  //   console.log(error);
  // });
};

const AxiosService = {
  createUser,
};
export default AxiosService;
