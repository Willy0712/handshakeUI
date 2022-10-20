import { Fragment } from "react";
import React from "react";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import classes from "../../Styles/SignUp.module.scss";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs, { Dayjs } from "dayjs";
import {
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import { stringify } from "querystring";

type SignUpValues = {
  firstName: string;
  lastName: string;
  email: string;
  userName: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
  dateOfBirth: string;
  gender: string;
};

const SignUp = () => {
  //data validation schema

  var Joi = require("joi");

  const schema = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .required()
      .error(new Error("Please enter a valid email address")),
    userName: Joi.string().alphanum().min(3).max(30).required(),
    phoneNumber: Joi.string().required(),
    password: Joi.string()
      .regex(/^(?=.*[A-Z])(?=.*[\W])(?=.*[0-9])(?=.*[a-z]).{8,128}$/)
      .error(
        new Error(
          "Passwords must have at least 8 characters, 1 lowercase, 1 upper case, 1 number, and 1 special character."
        )
      )
      .required(),
    confirmPassword: Joi.ref("password"),
    dateOfBirth: Joi.string().required(),
  }).with("password", "confirmPassword");

  schema.validate({});

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpValues>({ resolver: joiResolver(schema) });

  const [value, setValue] = React.useState<Dayjs | null>(dayjs("2022-04-07"));
  const [gender, setGender] = React.useState("");

  const onSubmit = (data: SignUpValues) => {
    console.log(data);
  };

  const handleChange = (event: SelectChangeEvent) => {
    setGender(event.target.value);
  };

  return (
    <Fragment>
      <h1>Sign Up</h1>
      <form className={classes.signUpform} onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register("firstName")}
          placeholder="First Name"
          className={classes.form__input}
        />
        {errors.firstName && <p>errors.firstName.message</p>}

        <input
          {...register("lastName")}
          placeholder="Last Name"
          className={classes.form__input}
        />
        {errors.lastName && <p>errors.lastName.message</p>}

        <input
          {...register("email")}
          placeholder="youremail@domain.com"
          className={classes.form__input}
        />
        {errors.email && <p>errors.email.message</p>}

        <input
          {...register("userName")}
          placeholder="Create a username"
          className={classes.form__input}
        />
        {errors.userName && <p>errors.userName.message</p>}

        <input
          {...register("phoneNumber")}
          placeholder="Your phone number"
          className={classes.form__input}
        />
        {errors.phoneNumber && <p>errors.phoneNumber.message</p>}

        <input
          {...register("password", { required: true })}
          placeholder="Password"
          className={classes.form__input}
        />
        {errors.password && <p>errors.password.message</p>}

        <input
          {...register("confirmPassword", { required: true })}
          placeholder="Confrim password"
          className={classes.form__input}
        />
        {errors.password && <p>errors.confirmPassword.message</p>}

        {/* <input
          {...register("dateOfBirth")}
          type="date"
          className={classes.form__input}
        />
        {errors.dateOfBirth && <p>Date of birth is required.</p>} */}

        <LocalizationProvider
          dateAdapter={AdapterDayjs}
          {...register("dateOfBirth")}
        >
          <DatePicker
            disableFuture
            label="Date of birth"
            openTo="year"
            views={["year", "month", "day"]}
            value={value}
            onChange={(newValue) => {
              setValue(newValue);
            }}
            renderInput={(params) => <TextField {...params} />}
          />
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
          <MenuItem value={10}>Female</MenuItem>
          <MenuItem value={20}>Male</MenuItem>
          <MenuItem value={30}>Prefer not to say</MenuItem>
        </Select>
        {errors.gender && <p>Gender is required.</p>}

        <input type="submit" value="Sign up" className={classes.btn} />
      </form>
    </Fragment>
  );
};

export default SignUp;
