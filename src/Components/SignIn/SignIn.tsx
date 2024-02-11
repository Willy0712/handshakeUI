import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link} from "react-router-dom";
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
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";


declare global {
  interface Window {
    google: any;
  }
}


const SignIn: React.FunctionComponent = () => {
  const [loading, setLoading] = useState(false);
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
  function handleResponseFromFacebook(response: any) {
    console.log("Facebook login response:", response);
    if (response.accessToken) {
      console.log("Facebook login success:", response.accessToken);

      const accessToken = response.accessToken;

      dispatch(facebookSocialLogin(accessToken))
        .unwrap()
        .then(() => {
          window.location.reload();
        })
        .catch(() => {
          setLoading(false);
        });
    } else {
      console.log("Facebook login error: User did not authorize the app");
    }
  }

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
          {/* <Link
            to="#"
            className={classes.socialLink}
            onClick={handleResponseFromFacebook}
          > */}

          {/* <FacebookOutlinedIcon className={classes.icons} /> */}
          {/* </Link> */}
          <FacebookLogin
            appId="1307562993522333"
            autoLoad={false}
            fields="name,email"
            callback={handleResponseFromFacebook}
            render={(renderProps) => (
              <button
                className={classes.socialLink}
                onClick={renderProps.onClick}
              >
                <FacebookOutlinedIcon className={classes.icons} />
              </button>
            )}
          />
        </div>
      </div>
    </div>
  );
};

export default SignIn;
