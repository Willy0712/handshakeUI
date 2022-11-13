import { Fragment } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import classes from "../../Styles/SignIn.module.scss";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import GoogleIcon from "@mui/icons-material/Google";
import React from "react";

interface LoginValues {
  emailOrUsername: string;
  password: string;
  isShowLogin: string;
}

const SignIn: React.FunctionComponent = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginValues>();

  return (
    <div>
      <form
        className={classes.signInform}
        onSubmit={handleSubmit((data) => console.log(data))}
      >
        <input
          {...register("emailOrUsername")}
          className={classes.form__control}
          placeholder="Email or username"
        />
        {errors.emailOrUsername && <p>Last name is required.</p>}

        <input
          {...register("password", { required: true })}
          className={classes.form__control}
          placeholder="Password"
        />
        {errors.password && <p>Please enter a valid password.</p>}

        <input type="submit" value="Sign in" className={classes.btn} />
        <div className={classes.remember__forgotpass}>
          <div className={classes.rememberMe}>
            <input type="checkbox" />
            <label className={classes.checkbox__wrap}>Remember Me</label>
          </div>
          <div className={classes.forgotpass}>
            <Link to="#">Forgot Password?</Link>
          </div>
        </div>
      </form>
      <div className={classes.signInWith}>
        <div className={classes.sigInWithTitle}>or sign in with </div>
        <div className={classes.socialLinks}>
          <Link to="#" className={classes.socialLink}>
            <GoogleIcon className={classes.icons} />
          </Link>
          <Link to="#" className={classes.socialLink}>
            <FacebookOutlinedIcon className={classes.icons} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
