import { Fragment, useState } from "react";
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
import { Stack, TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import BackdropComponent from "../../Helpers/BackdropComponent";
import ResponseMessage from "../../Helpers/ResponseMessage";

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
  const [loading, setLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");
  const [responseStatus, setResponseStatus] = useState<number | null>(null);

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

  //Validate from server

  const onSubmitHandler = (data: SignUpValues) => {
    setLoading(true);

    AxiosService.createUser(data)
      .then((response) => {
        console.log(response.status);
        if (response.status === 201) {
          setResponseMessage(response.data);
          setResponseStatus(201);
        }
      })
      .catch((error) => {
        handleServerErrors(error.response?.data?.errors);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  type FieldName =
    | "firstName"
    | "lastName"
    | "email"
    | "userName"
    | "phoneNumber"
    | "dateOfBirth"
    | "password"
    | "confirmPassword";
  const handleServerErrors = (errors: any) => {
    if (!errors) return;

    Object.entries(errors).forEach(([key, value]) => {
      const stringValue = value as string;
      const field: FieldName = mapServerKeyToField(key);
      setError(field, {
        type: "server",
        message: stringValue,
      });
    });
  };

  const mapServerKeyToField = (key: string): FieldName => {
    switch (key) {
      case "FirstName":
        return "firstName";
      case "LastName":
        return "lastName";
      case "DuplicateEmail":
        return "email";
      case "DuplicateUserName":
        return "userName";
      case "PhoneNumber":
        return "phoneNumber";
      case "ConfirmPassword":
        return "password";
      case "$.dateOfBirth":
        return "dateOfBirth";
      default:
        return "confirmPassword";
    }
  };

  return (
    <Fragment>
      {responseStatus ? ( // Check if confirmation email is sent
        <ResponseMessage status={responseStatus} message={responseMessage} />
      ) : (
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
          {<BackdropComponent loading={loading} />}
        </form>
      )}
    </Fragment>
  );
};

export default SignUp;
