import { Fragment, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, Navigate, useNavigate } from "react-router-dom";
import classes from "../../Styles/SignIn.module.scss";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import GoogleIcon from "@mui/icons-material/Google";
import React from "react";
import AxiosService from "../../Axios/AxiosService";
import { useDispatch, useSelector } from "react-redux";
import { clearMessage } from "../../slices/message";
import { login } from "../../slices/auth";
import { LoginValues } from "../../Constants/InterfacesSignUpLogin";

const SignIn: React.FunctionComponent = () => {
  let navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { isLoggedIn } = useSelector((state: any) => state.auth);
  const { message } = useSelector((state: any) => state.message);

  const dispatch = useDispatch<any>();

  useEffect(() => {
    dispatch(clearMessage());
  }, [dispatch]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginValues>();

  const onSubmitHandler = (data: LoginValues) => {
    // console.log(data);
    // AxiosService.login(data).then((res) => {
    //   console.log(res);
    // });

    setLoading(true);

    dispatch(login(data))
      .unwrap()
      .then(() => {
        navigate("/profile");
        window.location.reload();
      })
      .catch(() => {
        setLoading(false);
      });
  };

  return (
    <div>
      <form
        className={classes.signInform}
        onSubmit={handleSubmit(onSubmitHandler)}
      >
        <input
          {...register("userName")}
          className={classes.form__control}
          placeholder="Email or username"
        />
        {errors.userName && <p>Last name is required.</p>}

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
