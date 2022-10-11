import { useForm } from "react-hook-form";
import module from "../../Styles/SignIn.module.scss";

type SignUpValues = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  dateOfBirth: string;
  gender: string;
};

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpValues>();

  return (
    <form
      className={module.form}
      onSubmit={handleSubmit((data) => console.log(data))}
    >
      <label>First Name</label>
      <input {...register("firstName")} />
      {errors.firstName && <p>First name is required.</p>}

      <label>Last Name</label>
      <input {...register("lastName")} />
      {errors.lastName && <p>Last name is required.</p>}

      <label>Password</label>
      <input {...register("confirmPassword", { required: true })} />
      {errors.password && <p>Please enter a valid password.</p>}

      <label>Confirm Password</label>
      <input {...register("confirmPassword", { required: true })} />
      {errors.password && <p>Please enter a valid password.</p>}

      <input type="submit" />
    </form>
  );
};

export default SignUp;
