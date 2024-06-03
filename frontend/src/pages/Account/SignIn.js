import { useState, useEffect } from "react";
import { BsCheckCircleFill } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { logoLap } from "../../assets/images";
import { authApi } from "../../service/auth.servive";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../redux/authSlice";
import { toast } from "react-toastify";
// import { useContext, useState } from "react";

const SignIn = () => {
  const dispatch = useDispatch();
  const nav = useNavigate();

  // ============= Initial State Start here =============
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // ============= Initial State End here ===============
  // ============= Error Msg Start here =================
  const [errEmail, setErrEmail] = useState("");
  const [errPassword, setErrPassword] = useState("");

  // ============= Error Msg End here ===================
  const [successMsg, setSuccessMsg] = useState("");
  const accesstoken = localStorage.getItem("access_token");

  useEffect(() => {
    if (accesstoken) {
      nav("/");
    }
  }, [accesstoken, nav]);

  // ============= Event Handler Start here =============
  const handleEmail = (e) => {
    setEmail(e.target.value);
    setErrEmail("");
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
    setErrPassword("");
  };

  // ============= Event Handler End here ===============
  const handleSignIn = async (e) => {
    e.preventDefault();

    if (!email) {
      setErrEmail("Enter your email");
    }

    if (!password) {
      setErrPassword("Enter a password");
    }
    // ============== Getting the value ==============
    if (email && password) {
      const passwordRegex =
        /^(?=.*[!@#$%^&*(),.?":{}|<>])(?=.*[A-Z])(?=.*\d).{8,}$/;
      if (!passwordRegex.test(password)) {
        toast.error(
          "Password must contain at least one special character, one uppercase letter, and one digit."
        );
        return;
      }
    }
    try {
      const res = await authApi.login({ email, password });
      toast.success(`Welcome ${res.data.username}!`);
      dispatch(loginSuccess({ user: res.data }));
      localStorage.setItem("access_token", res.data.token);
      console.log(res.data.role);

      if (res.data.role === "admin") {
        nav("/admin/dashboard");
        console.log("Redirecting to admin dashboard");
      } else {
        console.log("Redirecting to home page");
        nav("/");
      }
    } catch (err) {
      toast.error(err?.response?.data?.error.user);
      console.log(err);
    }
  };

  useEffect(() => {
    const storedAccessToken = localStorage.getItem("access_token");
    if (storedAccessToken) {
      // Khôi phục dữ liệu từ cơ sở dữ liệu cục bộ vào Redux store
      dispatch(loginSuccess({ accessToken: storedAccessToken }));
    }
  }, [dispatch]);

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="w-1/2 hidden lgl:inline-flex h-full text-white">
        <div className="w-[450px] h-full bg-primeColor px-10 flex flex-col gap-6 justify-center">
          <Link to="/">
            <img
              src={logoLap}
              alt="logoImg"
              className="w-28"
              style={{ backgroundColor: "transparent" }}
            />
          </Link>
          <div className="flex flex-col gap-1 -mt-1">
            <h1 className="font-titleFont text-xl font-medium">
              Stay sign in for more
            </h1>
            <p className="text-base">When you sign in, you are with us!</p>
          </div>
          <div className="w-[300px] flex items-start gap-3">
            <span className="text-green-500 mt-1">
              <BsCheckCircleFill />
            </span>
            <p className="text-base text-gray-300">
              <span className="text-white font-semibold font-titleFont">
                Get started fast with Nebula
              </span>
              <br />
              Nebula is where you can find laptop products from leading brands
              such as HP, Dell, Lenovo, and Apple. We offer both new and used
              laptops at prices suitable for everyone.
            </p>
          </div>
          <div className="w-[300px] flex items-start gap-3">
            <span className="text-green-500 mt-1">
              <BsCheckCircleFill />
            </span>
            <p className="text-base text-gray-300">
              <span className="text-white font-semibold font-titleFont">
                Access all Nebula services
              </span>
              <br />
              At Nebula, we do not just sell laptops, we also provide support
              services such as warranty, repair, and product consultation.
            </p>
          </div>
          <div className="w-[300px] flex items-start gap-3">
            <span className="text-green-500 mt-1">
              <BsCheckCircleFill />
            </span>
            <p className="text-base text-gray-300">
              <span className="text-white font-semibold font-titleFont">
                Trusted by online Shoppers
              </span>
              <br />
              Nebula is proud to be a reliable address for millions of online
              shoppers. We are committed to bringing customers quality products
              with the best after-sales service.
            </p>
          </div>
        </div>
      </div>
      <div className="w-full lgl:w-1/2 h-full">
        {successMsg ? (
          <div className="w-full lgl:w-[500px] h-full flex flex-col justify-center">
            <p className="w-full px-4 py-10 text-green-500 font-medium font-titleFont">
              {successMsg}
            </p>
            <Link to="/signup">
              <button
                className="w-full h-10 bg-primeColor text-gray-200 rounded-md text-base font-titleFont font-semibold 
            tracking-wide hover:bg-black hover:text-white duration-300"
              >
                Sign Up
              </button>
            </Link>
          </div>
        ) : (
          <form className="w-full lgl:w-[450px] h-screen flex items-center justify-center">
            <div className="px-6 py-4 w-full h-[90%] flex flex-col justify-center overflow-y-scroll scrollbar-thin scrollbar-thumb-primeColor">
              <h1 className="font-titleFont underline underline-offset-4 decoration-[1px] font-semibold text-3xl mdl:text-4xl mb-4">
                Sign in
              </h1>
              <div className="flex flex-col gap-3">
                {/* Email */}
                <div className="flex flex-col gap-.5">
                  <p className="font-titleFont text-base font-semibold text-gray-600">
                    Email
                  </p>
                  <input
                    onChange={handleEmail}
                    value={email}
                    className="w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
                    type="email"
                    placeholder="user@gmail.com"
                  />
                  {errEmail && (
                    <p className="text-sm text-red-500 font-titleFont font-semibold px-4">
                      <span className="font-bold italic mr-1">!</span>
                      {errEmail}
                    </p>
                  )}
                </div>

                {/* Password */}
                <div className="flex flex-col gap-.5">
                  <p className="font-titleFont text-base font-semibold text-gray-600">
                    Password
                  </p>
                  <input
                    onChange={handlePassword}
                    value={password}
                    className="w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
                    type="password"
                    placeholder="enter password"
                  />
                  {errPassword && (
                    <p className="text-sm text-red-500 font-titleFont font-semibold px-4">
                      <span className="font-bold italic mr-1">!</span>
                      {errPassword}
                    </p>
                  )}
                </div>

                <button
                  onClick={handleSignIn}
                  className="bg-primeColor hover:bg-black text-gray-200 hover:text-white cursor-pointer w-full text-base font-medium h-10 rounded-md  duration-300"
                >
                  Sign In
                </button>
                <p className="text-sm text-center font-titleFont font-medium">
                  Do not have an Account?{" "}
                  <Link to="/signup">
                    <span className="hover:text-blue-600 duration-300">
                      Sign up
                    </span>
                  </Link>
                </p>

                <p className="text-sm text-center font-titleFont font-medium">
                  <Link to="/forgot">
                    <span className="hover:text-blue-600 duration-300">
                      Forgot Password
                    </span>
                  </Link>
                </p>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default SignIn;
