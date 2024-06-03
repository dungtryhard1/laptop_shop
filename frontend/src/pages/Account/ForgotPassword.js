import { useState, useEffect } from "react";
import { authApi } from "../../service/auth.servive";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { FaArrowLeft } from "react-icons/fa";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const nav = useNavigate();

  const accessToken = localStorage.getItem("access_token");

  useEffect(() => {
    if (accessToken) {
      nav("/");
    }
  }, [accessToken, nav]);

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const result = await authApi.forgot({ email });

      console.log("Verification result:", result);
      toast.success(`Password recovery successful!`);
      nav("/signin");
    } catch (error) {
      toast.error(error?.response?.data?.error.user);
    }
  };

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="w-full max-w-3xl mx-auto p-8 bg-white rounded">
        <form
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          onSubmit={handleSubmit}
        >
          <div className="mb-4">
            <Link to="/signin">
              <FaArrowLeft className="text-gray-600 text-2xl mb-4 cursor-pointer" />
            </Link>
          </div>

          <h2 className="text-center text-3xl font-semibold mb-6">
            Forgot Password
          </h2>
          <div className="mb-6">
            <label
              htmlFor="email"
              className="block text-gray-700 text-lg font-bold mb-2"
            >
              Enter your Email
            </label>
            <input
              type="text"
              id="email"
              name="email"
              value={email}
              onChange={handleChange}
              className="w-full p-4 border rounded focus:outline-none focus:border-blue-500 text-lg"
              placeholder="Enter your email"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-primeColor text-gray-200 rounded-md text-base font-titleFont font-semibold 
            tracking-wide hover:bg-black hover:text-white duration-300 py-2"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
