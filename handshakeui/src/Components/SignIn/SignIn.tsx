import React from "react";
import { useForm } from "react-hook-form";
import module from "../../Styles/SignIn.module.scss";

type LoginValues = {
  emailOrUsername: string;
  password: string;
  isShowLogin: string;
};

const SignIn = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginValues>();
  return (
    <form onSubmit={handleSubmit((data) => console.log(data))}>
      <input {...register("emailOrUsername")} />
      {errors.emailOrUsername && <p>Last name is required.</p>}
      <input {...register("password", { required: true })} />
      {errors.password && <p>Please enter number for age.</p>}
      <input type="submit" />
    </form>
  );
};

export default SignIn;
