import { Fragment, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, Navigate, useNavigate } from "react-router-dom";
import classes from "../../Styles/SignIn.module.scss";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import GoogleIcon from "@mui/icons-material/Google";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearMessage } from "../../slices/message";
import {
  facebookSocialLogin,
  googleSocialLogin,
  login,
} from "../../slices/auth";
import { LoginValues } from "../../Constants/Interfaces";
import BackdropComponent from "../../Helpers/BackdropComponent";
import AxiosService from "../../Axios/AxiosService";
import FacebookLogin from "react-facebook-login";

interface GoogleAuthResponse {
  getAuthResponse(): {
    id_token: string;
  };
}

declare global {
  interface Window {
    google: any;
  }
}

interface FacebookAuthResponse {
  authResponse: {
    accessToken: string;
  };
}

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
    setLoading(true);

    dispatch(login(data))
      .unwrap()
      .then(() => {
        // navigate("/profile");
        window.location.reload();
      })
      .catch(() => {
        setLoading(false);
      });
  };

  // Google Sign in

  const googleSignInHandler = async () => {
    window.google.accounts.id.initialize({
      client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
      callback: handleCredentialResponse,
    });

    // Render the sign-in button
    window.google.accounts.id.renderButton(
      document.getElementById("button_google"), // Element to render button in
      {} // Customization options
    );
  };

  // Handle sign-in and send ID token to server
  const handleCredentialResponse = async (response: any) => {
    const token = response.credential;
    // Send the access token to your back-end
    setLoading(true);

    dispatch(googleSocialLogin(token))
      .unwrap()
      .then(() => {
        window.location.reload();
      })
      .catch(() => {
        setLoading(false);
      });
  };

  // Facebook Sign in

  const handleResponseFromFacebook = (response: any) => {
    console.log(response);
    console.log("Facebook token: ");
    const token = response.accessToken; // this is the Facebook access token

    dispatch(facebookSocialLogin(token)) // assuming you've defined a `facebookSocialLogin` action
      .unwrap()
      .then(() => {
        window.location.reload();
      })
      .catch(() => {
        setLoading(false);
      });
  };

  <FacebookLogin
    appId={process.env.REACT_APP_FACEBOOK_APP_ID || "1307562993522333"} // replace "defaultAppId" with your actual default value
    autoLoad={false}
    fields="name,email,picture"
    callback={handleResponseFromFacebook}
  />;

  // if (isLoggedIn) {
  //   return <Navigate to="/profile" />;
  // }

  //TODO: Server side validation
  return (
    <div>
      {message && <p>{message}</p>}
      <form
        className={classes.signInform}
        onSubmit={handleSubmit(onSubmitHandler)}
      >
        <input
          {...register("userName")}
          className={classes.form__control}
          placeholder="Email or username"
        />
        {errors.userName && <p>Username or email is required.</p>}

        <input
          {...register("password", { required: true })}
          className={classes.form__control}
          placeholder="Password"
        />
        {errors.password && <p>Please enter a valid password.</p>}

        <input type="submit" value="Sign in" className={classes.btn} />

        {<BackdropComponent loading={loading} />}
        {}

        <div className={classes.remember__forgotpass}>
          <div className={classes.forgotpass}>
            <Link to="/reset">Forgot Password?</Link>
          </div>
        </div>
      </form>
      <div className={classes.signInWith}>
        <div className={classes.sigInWithTitle}>or sign in with </div>
        <div className={classes.socialLinks}>
          <Link
            to="#"
            id="button_google"
            className={classes.socialLink}
            onClick={googleSignInHandler}
          >
            <GoogleIcon className={classes.icons} />
          </Link>
          <Link
            to="#"
            className={classes.socialLink}
            onClick={handleResponseFromFacebook}
          >
            <FacebookOutlinedIcon className={classes.icons} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
