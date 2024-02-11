import { Fragment } from "react";
import Footer from "../Components/MainComponets/Footer";
import HeaderWithoutSearch from "../Components/MainComponets/HeaderWithoutSearch";
import classes from "../Styles/ResetPassword.module.scss";
import AxiosService from "../Axios/AxiosService";
import { ForgotPasswordValues } from "../Constants/Interfaces";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

export default function ResetPassword() {
  const schema = yup.object().shape({
    email: yup.string().email().required("Email is required"),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordValues>({
    resolver: yupResolver(schema),
  });

  const sendLinkToResetPassword = (data: ForgotPasswordValues) => {
    AxiosService.forgotPassword(data).then((res: any) => {
      console.log(res.data);
    });
  };
  return (
    <Fragment>
      <HeaderWithoutSearch />
      <div className={classes.wrap}>
        <div className={classes.box}>
          <div className={classes.box__title}>Forgot password?</div>
          <label className={classes.box__label}>
            Enter the email address associated with your account, and we’ll
            email you a link to reset your password.
          </label>
          <form onSubmit={handleSubmit(sendLinkToResetPassword)}>
            <div className={classes.box__form}>
              <div className={classes.box__input}>
                <input
                  {...register("email")}
                  placeholder="youremail@domain.com"
                />
                {errors.email && <p>{errors.email.message}</p>}{" "}
              </div>
              <input
                className={`${classes.btn}  ${classes.resetButton}`}
                type="submit"
                value="Submit"
              />
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </Fragment>
  );
}
