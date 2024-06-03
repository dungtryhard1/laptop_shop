import { useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { authApi } from "../../service/auth.servive";
import { toast } from "react-toastify";
import { FaArrowLeft } from "react-icons/fa";

function ChangePassword() {
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const email = queryParams.get("email");
  const nav = useNavigate();
  const userId = useSelector((state) => state.auth?.user?._id);

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "password") {
      setPassword(value);
    } else if (name === "newPassword") {
      setNewPassword(value);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const passwordRegex =
        /^(?=.*[!@#$%^&*(),.?":{}|<>])(?=.*[A-Z])(?=.*\d).{8,}$/;
      if (!passwordRegex.test(password)) {
        toast.error(
          "Password must contain at least one special character, one uppercase letter, and one digit."
        );
        return;
      }

      if (password === newPassword) {
        toast.error(
          "New password must be different from the current password."
        );
        return;
      }

      if (!passwordRegex.test(newPassword)) {
        toast.error(
          "New password must contain at least one special character, one uppercase letter, and one digit."
        );
        return;
      }

      const response = await authApi.changePassword({
        email,
        password,
        newPassword,
      });
      console.log("Password changed successfully:", response.data);
      toast.success("Password Changed Successfully!!!");
      nav(`/profile/:id`);
    } catch (error) {
      console.error("Error changing password:", error);
      toast.error(error?.response?.data?.error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-full max-w-md">
        <form
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          onSubmit={handleSubmit}
        >
          <div className="mb-4">
            <Link to="/profile/:id">
              <FaArrowLeft className="text-gray-600 text-lg cursor-pointer" />
            </Link>
          </div>

          <h1 className="text-center font-bold text-xl mb-4">
            Change Password
          </h1>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Current Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              name="password"
              type="password"
              value={password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="newPassword"
            >
              New Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="newPassword"
              name="newPassword"
              type="password"
              required
              autoComplete="new-password"
              value={newPassword}
              onChange={handleChange}
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-primeColor hover:bg-slate-950 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Change Password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ChangePassword;
