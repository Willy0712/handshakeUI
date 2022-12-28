import { Fragment, useRef } from "react";
import React from "react";
import { useForm, Controller } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import classes from "../../Styles/SignUp.module.scss";
import "react-datepicker/dist/react-datepicker.css";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs, { Dayjs } from "dayjs";
import AxiosService from "../../Axios/AxiosService";
import moment from "moment";
import { SelectChangeEvent, Stack, TextField } from "@mui/material";
import axios from "axios";
import { DatePicker } from "@mui/x-date-pickers";

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
    // password: yup
    //   .string()
    //   .required("Enter your password")
    //   .matches(
    //     /^(?=.*[A-Z])(?=.*[\W])(?=.*[0-9])(?=.*[a-z]).{8,128}$/,
    //     "Passwords must have at least 8 characters, 1 lowercase, 1 upper case, 1 number, and 1 special character."
    //   ),
    // confirmPassword: yup
    //   .string()
    //   .required("Please confirm your password")
    //   .oneOf([yup.ref("password"), null], "Passwords must match"),
    dateOfBirth: yup.string().required("Required"),
  });

  const {
    register,
    handleSubmit,
    control,
    setError,
    formState: { errors },
  } = useForm<SignUpValues>({
    resolver: yupResolver(schema),
  });

  const onSubmitHandler = (data: SignUpValues) => {
    AxiosService.createUser(data).catch((error) => {
      for (const [key, value] of Object.entries(error.response.data.errors)) {
        if (value instanceof Array) {
          if (key === "FirstName") {
            setError("firstName", {
              type: "server",
              message: value.toString(),
            });
          }
          if (key === "LastName") {
            setError("lastName", {
              type: "server",
              message: value.toString(),
            });
          }
          if (key === "DuplicateEmail") {
            setError("email", {
              type: "server",
              message: value.toString(),
            });
          }
          if (key === "DuplicateUserName") {
            setError("userName", {
              type: "server",
              message: value.toString(),
            });
          }
          if (key === "PhoneNumber") {
            setError("phoneNumber", {
              type: "server",
              message: value.toString(),
            });
          }
          if (key === "ConfirmPassword") {
            setError("password", {
              type: "server",
              message: value.toString(),
            });
          }
          if (key === "$.dateOfBirth") {
            setError("dateOfBirth", {
              type: "server",
              message: "Insert a valid data format: yyyy-mm-dd",
            });
          }
        }
      }
    });
  };

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
        {/* {errors.userName?.type && <p>{errors.userName.type}</p>} */}
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
          placeholder="Confirm password"
          className={classes.form__input}
        />
        {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}
        <Controller
          control={control}
          name="dateOfBirth"
          render={({
            field: { onChange, ref, onBlur, name, ...field },
            fieldState,
          }) => (
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Stack>
                <DatePicker
                  disableMaskedInput
                  {...register("dateOfBirth")}
                  {...field}
                  inputRef={ref}
                  // value={value?.format("YYYY-MM-DD")}
                  disableFuture
                  onChange={(event) => {
                    onChange(dayjs(event).format("YYYY-MM-DD"));
                  }}
                  // onChange={onChange}
                  label="Date of birth"
                  openTo="year"
                  views={["year", "month", "day"]}
                  renderInput={(params) => <TextField {...params} />}
                  // mask="____-__-__"
                  inputFormat="YYYY-MM-DD"
                />
              </Stack>
            </LocalizationProvider>
          )}
        />
        {errors.dateOfBirth && <p>{errors.dateOfBirth.message}</p>}
        <input type="submit" value="Sign up" className={classes.btn} />
      </form>
    </Fragment>
  );
};

export default SignUp;
