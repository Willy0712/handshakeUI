import {
  alpha,
  OutlinedInputProps,
  styled,
  TextField,
  TextFieldProps,
} from "@mui/material";
import React from "react";
import Footer from "../Components/MainComponets/Footer";
import HeaderWithoutSearch from "../Components/MainComponets/HeaderWithoutSearch";
import classes from "../Styles/ResetPassword.module.scss";

export default function ResetPassword() {
  const handleSubmit = (event: any) => {};
  return (
    <div>
      <HeaderWithoutSearch />
      <div className={classes.box}>
        <div className={classes.box__title}>Forgot password?</div>
        <form onSubmit={handleSubmit}>
          <div className={classes.box__form}>
            <label className={classes.box__label}>
              Enter the email address associated with your account, and we’ll
              email you a link to reset your password.
            </label>
            <div className={classes.box__input}>
              <input placeholder="Email" type="text" />
            </div>
            <input className={classes.btn} type="submit" value="Submit" />
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
}
