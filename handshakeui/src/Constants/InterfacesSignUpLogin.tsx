export interface SignUpValues {
  firstName: string;
  lastName: string;
  email: string;
  userName: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
  dateOfBirth: string;
}

export interface LoginValues {
  userName: string;
  password: string;
  // isShowLogin: string;
}
