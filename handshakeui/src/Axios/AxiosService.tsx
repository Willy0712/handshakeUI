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
}

const createUser = (data: SignUpValues) => {
  return axios.post(API_URL + "/account", data);
};

const AxiosService = {
  createUser,
};
export default AxiosService;
