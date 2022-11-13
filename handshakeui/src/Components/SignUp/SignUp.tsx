import { Fragment, useCallback, useRef, useState } from "react";
import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import classes from "../../Styles/SignUp.module.scss";
import "react-datepicker/dist/react-datepicker.css";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs, { Dayjs } from "dayjs";
import moment from "moment";
import {
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
} from "@mui/material";
import axios from "axios";

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

const SignUp = () => {
  //data validation schema

  const schema = yup.object().shape({
    firstName: yup.string().required("First name is required"),
    lastName: yup.string().required("Last name is required"),
    email: yup.string().email().required("Email is required"),
    userName: yup
      .string()
      .matches(
        /^[a-zA-Z0-9]+$/,
        "Username can only contain letters and numbers"
      )
      .required("Username is required"),
    phoneNumber: yup
      .string()
      .matches(
        /^\+((?:9[679]|8[035789]|6[789]|5[90]|42|3[578]|2[1-689])|9[0-58]|8[1246]|6[0-6]|5[1-8]|4[013-9]|3[0-469]|2[70]|7|1)(?:\W*\d){0,13}\d$/,
        "Invalid phone number, the phone number must have a country code"
      )
      .required("Phone number is required"),
    password: yup
      .string()
      .required("Enter your password")
      .matches(
        /^(?=.*[A-Z])(?=.*[\W])(?=.*[0-9])(?=.*[a-z]).{8,128}$/,
        "Passwords must have at least 8 characters, 1 lowercase, 1 upper case, 1 number, and 1 special character."
      ),
    confirmPassword: yup
      .string()
      .required("Please confirm your password")
      .oneOf([yup.ref("password"), null], "Passwords must match"),
    dateOfBirth: yup.string().required(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpValues>({
    resolver: yupResolver(schema),
  });

  const [gender, setGender] = React.useState("");

  const [value, setValue] = React.useState<Dayjs | any>(dayjs(new Date()));

  const onSubmitHandler = (data: SignUpValues) => {
    console.log(data);

    axios
      .post<SignUpValues>("https://localhost:7298/api/v1/account", data)
      .then(function (response) {
        console.log(response.status);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleChange = (event: SelectChangeEvent) => {
    setGender(event.target.value);
  };

  const form = useRef(null);
  return (
    <Fragment>
      <form
        className={classes.signUpform}
        onSubmit={handleSubmit(onSubmitHandler)}
      >
        <input
          {...register("firstName")}
          placeholder="First Name"
          className={classes.form__input}
        />
        {errors.firstName && <p>{errors.firstName.message}</p>}

        <input
          {...register("lastName")}
          placeholder="Last Name"
          className={classes.form__input}
        />
        {errors.lastName && <p>{errors.lastName.message}</p>}

        <input
          {...register("email")}
          placeholder="youremail@domain.com"
          className={classes.form__input}
        />
        {errors.email && <p>{errors.email.message}</p>}

        <input
          {...register("userName")}
          placeholder="Create a username"
          className={classes.form__input}
        />
        {errors.userName && <p>{errors.userName.message}</p>}

        <input
          {...register("phoneNumber")}
          placeholder="Your phone number"
          className={classes.form__input}
        />
        {errors.phoneNumber && <p>{errors.phoneNumber.message}</p>}

        <input
          {...register("password", { required: true })}
          placeholder="Password"
          className={classes.form__input}
        />
        {errors.password && <p>{errors.password.message}</p>}

        <input
          {...register("confirmPassword", { required: true })}
          placeholder="Confrim password"
          className={classes.form__input}
        />
        {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Stack>
            <DatePicker
              {...register("dateOfBirth")}
              disableFuture
              label="Date of birth"
              openTo="year"
              views={["year", "month", "day"]}
              value={value}
              onChange={(newValue) => {
                setValue(newValue);
              }}
              renderInput={(params) => <TextField {...params} />}
              mask="____-__-__"
              inputFormat="YYYY-MM-DD"
            />
          </Stack>
        </LocalizationProvider>

        <InputLabel id="gender__input">Gender</InputLabel>
        <Select
          {...register("gender")}
          labelId="gender__input"
          id="demo-simple-select-helper"
          value={gender}
          label="Gender"
          onChange={handleChange}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={"Female"}>Female</MenuItem>
          <MenuItem value={"Male"}>Male</MenuItem>
          <MenuItem value={"PreferNotToSay"}>Prefer not to say</MenuItem>
        </Select>
        {errors.gender && <p>Gender is required.</p>}

        <input type="submit" value="Sign up" className={classes.btn} />
      </form>
    </Fragment>
  );
};

export default SignUp;
