import { Dialog, DialogContent, DialogTitle, Modal } from "@mui/material";
import { useForm } from "react-hook-form";
import module from "../../Styles/SignIn.module.scss";

interface LoginValues {
  emailOrUsername: string;
  password: string;
  isShowLogin: string;
}

interface SignInProps {
  title: string;
  children: React.ReactNode;
  isOpen: boolean;
  handleClose: () => void;
}

const SignIn: React.FunctionComponent = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginValues>();

  return (
    <form onSubmit={handleSubmit((data) => console.log(data))}>
      <label>Email or username</label>
      <input {...register("emailOrUsername")} />
      {errors.emailOrUsername && <p>Last name is required.</p>}

      <label>Password</label>
      <input {...register("password", { required: true })} />
      {errors.password && <p>Please enter a valid password.</p>}

      <input type="submit" />
    </form>
  );
};

export default SignIn;
