import { useState, useEffect } from "react";
import { authApi } from "../../service/auth.servive";
import { useNavigate, Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { FaArrowLeft } from "react-icons/fa";

const VerifyCode = () => {
  const [otp, setOtp] = useState("");
  const nav = useNavigate();
  const location = useLocation();
  const email = new URLSearchParams(location.search).get("email");

  const accesstoken = localStorage.getItem("access_token");

  useEffect(() => {
    if (accesstoken) {
      nav("/");
    }
  }, [accesstoken, nav]);

  const handleChange = (e) => {
    setOtp(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const result = await authApi.verifyOtp({ email, otp });

      console.log("Verification result:", result);
      toast.success(`Register successfully !`);
      nav("/signin");
    } catch (error) {
      toast.error(error?.response?.data?.error);
    }
  };

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="w-full max-w-3xl mx-auto p-8 bg-white border rounded shadow-md">
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <div className="mb-4">
              <Link to="/signin">
                <FaArrowLeft className="text-gray-600 text-2xl mb-4 cursor-pointer" />
              </Link>
            </div>
            <h2 className="text-center text-3xl font-semibold mb-6">
              Enter Verification Code
            </h2>
            <label
              htmlFor="otp"
              className="block text-gray-700 text-lg font-bold mb-2"
            >
              Verification Code
            </label>
            <input
              type="text"
              id="otp"
              name="otp"
              value={otp}
              onChange={handleChange}
              className="w-full p-4 border rounded focus:outline-none focus:border-blue-500 text-lg"
              placeholder="Enter your verification code"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-primeColor text-gray-200 rounded-md text-base font-titleFont font-semibold 
            tracking-wide hover:bg-black hover:text-white duration-300 py-2"
          >
            Verify
          </button>
        </form>
      </div>
    </div>
  );
};

export default VerifyCode;
