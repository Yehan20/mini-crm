import { Button, HelperText, Label, TextInput } from "flowbite-react";
import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { AxiosError } from "axios";
import type { ErrorBag, LoginUser } from "../types/types";
import { validate } from "../utils/helpers";
import BaseAlert from "../components/ui/BaseAlert";
import { useNavigate } from "react-router";


const Login = () => {


  const { login } = useAuth();
  const navigate = useNavigate();

  const [loginInfo, setLoginInfo] = useState<LoginUser>({
    email: "",
    password: "",
    remember:false
  });

  const [showAlert, setShowAlert] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<ErrorBag | null>(null);


  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;

    setLoginInfo({ ...loginInfo, [name]: value });
  };




  // Login
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setShowAlert(false);
    setErrors(null);

    const { errorBag, errorBagFilled } = validate(loginInfo, {
      emailFormat: true,
      emptyFeilds: true,
    })


    if (errorBagFilled) {
      setErrors({ ...errorBag });
      return;
    }

    setErrors(null);
    setLoading(true);

    try {
      await login(loginInfo);
      navigate('/');
    } catch (e) {
      setLoading(false);
      if (e instanceof AxiosError) {

        setShowAlert(true);
        setError(e.response?.data.message);
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen  p-4">
      <div className="w-full md:w-3xl  rounded-lg bg-gray-50 p-6 shadow hover:shadow-md transition">
        <h1 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-6">
          Login to Admin CRM
        </h1>

        <form className="flex flex-col gap-4 w-full md:max-w-3xl"
          onSubmit={handleLogin}
        >
          <div>
            <div className="mb-2 block">
              <Label htmlFor="email">Your email</Label>
            </div>
            <TextInput
              id="email"
              type="email"
              name="email"
              value={loginInfo.email}
              color={errors?.email?.length ? "failure" : "gray"}
              placeholder="johndoe@test.com"
              onChange={handleInput}
            />
            <div className="mt-2">
              {errors?.email?.map((err) => (
                <HelperText className="text-red-500 my-0" key={err}>
                  {err}
                </HelperText>
              ))}
            </div>
          </div>

          <div>
            <div className="mb-2 block">
              <Label htmlFor="password">Your password</Label>
            </div>
            <TextInput
              id="password"
              type="password"
              name="password"
              value={loginInfo.password}
              color={errors?.password?.length ? "failure" : "gray"}
              onChange={handleInput}
            />
            <div className="mt-2">
              {errors?.password?.map((err) => (
                <HelperText className="text-red-500 my-0" key={err}>
                  {err}
                </HelperText>
              ))}
            </div>
          </div>

          <Button
            disabled={loading}
            type="submit"

            className="mt-2 cursor-pointer"
          >
            {loading ? "Please wait" : "Login"}
          </Button>
        </form>


        {/* Alert if users login wrong */}
        {showAlert && (
          <BaseAlert color="failure" message={error}/>
        )}


      </div>
    </div>
  );
};

export default Login;
