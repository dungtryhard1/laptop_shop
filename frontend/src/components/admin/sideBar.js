import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  FaAddressBook,
  FaUser,
  FaGavel,
  FaComment,
  FaWrench,
  FaTruck,
  FaEnvelope,
  FaSignOutAlt,
  FaListAlt,
  FaTag,
  FaCheckCircle,
} from "react-icons/fa";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { HiOutlineMenuAlt4 } from "react-icons/hi";
import { toast } from "react-toastify";
import Image from "../designLayouts/Image";
import { logoLap } from "../../assets/images";
import jwt_decode from "jwt-decode";

const SideBar = () => {
  const nav = useNavigate();

  const [showUser, setShowUser] = useState(false);
  const authLink = async () => {
    let token = localStorage.getItem("access_token");
    if (token) {
      const decode = jwt_decode(token);
      // const expirationTime = (decode.exp * 1000) - 60000

      // console.log(Date.now() + "  " + decode.exp * 1000);
      if (Date.now() >= decode.exp * 1000) {
        localStorage.clear();
        toast.error("token has expried");
        nav("/signin");
      }
    }
  };
  useEffect(() => {
    authLink();
  }, []);
  const handleLogout = async () => {
    try {
      // const res = await logout();
      toast.success(`Logout successfully !`);
      localStorage.clear();
      nav("/signin");
    } catch (err) {
      toast.error("Something wrong !");

      // toast.error(err?.response?.data?.error);
    }
  };
  return (
    <div className="grid grid-cols-10 gap-1 ">
      <div className="xl:col-span-2  hidden xl:flex ">
        <div className=" fixed bg-dark-purple h-screen p-5 pt-8 overflow-auto">
          <div className="flex gap-x-4 items-center ">
            <Link to="/">
              <div>
                <Image
                  className="cursor-pointer w-20 h-20 duration-500"
                  imgSrc={logoLap}
                />
              </div>
            </Link>

            <h1
              className={`text-white origin-left font-medium text-xl duration-200 `}
            >
              ADMIN
            </h1>
          </div>
          <ul className="pt-6">
            <Link to="/admin/dashboard" className="flex items-center">
              <li className="flex  mb-5  rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 ">
                <FaAddressBook className="w-5 h-5 text-white" />
                <h2
                  className={`text-white origin-left font-medium text-xl duration-200 `}
                >
                  Dashboard
                </h2>
              </li>
            </Link>
            <Link to="/admin/users" className="flex items-center">
              <li className="flex  mb-5 rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 ">
                <FaUser className="w-5 h-5 text-white" />
                <h2
                  className={`text-white origin-left font-medium text-xl duration-200 `}
                >
                  Users
                </h2>
              </li>
            </Link>
            <Link to="/admin/categories" className="flex items-center">
              <li className="flex  mb-5 rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 ">
                <FaUser className="w-5 h-5 text-white" />
                <h2
                  className={`text-white origin-left font-medium text-xl duration-200 `}
                >
                  Categories
                </h2>
              </li>
            </Link>
            <Link to="/admin/attributes" className="flex items-center">
              <li className="flex  mb-5 rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 ">
                <FaListAlt className="w-5 h-5 text-white" />
                <h2
                  className={`text-white origin-left font-medium text-xl duration-200 `}
                >
                  Attribute Key
                </h2>
              </li>
            </Link>
            <Link to="/admin/products" className="flex items-center">
              <li className="flex  mb-5 rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 ">
                <FaGavel className="w-5 h-5 text-white" />
                <h2
                  className={`text-white origin-left font-medium text-xl duration-200 `}
                >
                  Products
                </h2>
              </li>
            </Link>
            <Link to="/admin/warranty" className="flex items-center">
              <li className="flex  mb-5 rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 ">
                <FaWrench className="w-5 h-5 text-white" />
                <h2
                  className={`text-white origin-left font-medium text-xl duration-200 `}
                >
                  Warranty Product
                </h2>
              </li>
            </Link>
            <Link to="/admin/supplier" className="flex items-center">
              <li className="flex  mb-5 rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 ">
                <FaTruck className="w-5 h-5 text-white" />
                <h2
                  className={`text-white origin-left font-medium text-xl duration-200 `}
                >
                  Supplier
                </h2>
              </li>
            </Link>
            <Link to="/admin/categoryJournal" className="flex items-center">
              <li className="flex  mb-5 rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 ">
                <FaEnvelope className="w-5 h-5 text-white" />
                <h2
                  className={`text-white origin-left font-medium text-xl duration-200 `}
                >
                  Category Journal
                </h2>
              </li>
            </Link>
            <Link to="/admin/journals" className="flex items-center">
              <li className="flex  mb-5 rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 ">
                <FaEnvelope className="w-5 h-5 text-white" />
                <h2
                  className={`text-white origin-left font-medium text-xl duration-200 `}
                >
                  Journal
                </h2>
              </li>
            </Link>
            <Link to="/admin/coupons" className="flex items-center">
              <li className="flex  mb-5 rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 ">
                <FaTag className="w-5 h-5 text-white" />
                <h2
                  className={`text-white origin-left font-medium text-xl duration-200 `}
                >
                  Coupon
                </h2>
              </li>
            </Link>
            <Link to="/admin/orders" className="flex items-center">
              <li className="flex  mb-5 rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 ">
                <FaCheckCircle className="w-5 h-5 text-white" />
                <h2
                  className={`text-white origin-left font-medium text-xl duration-200 `}
                >
                  Order Status
                </h2>
              </li>
            </Link>
            {/* <Link to="/admin/messages" className="flex items-center">
              <li className="flex  mb-5 rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 ">
                <FaComment className="w-5 h-5 text-white" />
                <h2
                  className={`text-white origin-left font-medium text-xl duration-200 `}
                >
                  Message
                </h2>
              </li>
            </Link> */}
            <li
              onClick={() => handleLogout()}
              className="flex  mb-5 rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 "
            >
              <FaSignOutAlt className="w-5 h-5 text-white" />
              <h2
                className={`text-white origin-left font-medium text-xl duration-200 `}
              >
                logout
              </h2>
            </li>
          </ul>
        </div>
      </div>
      <div className="xl:hidden">
        <div className="flex gap-4 mt-2 lg:mt-0 items-center pr-6 cursor-pointer relative">
          <div
            className="bg-slate-400  flex rounded-sm"
            onClick={() => setShowUser(!showUser)}
          >
            <HiOutlineMenuAlt4 className="w-8 h-8" />
          </div>
          {showUser && (
            <motion.ul
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="absolute top-6 left-0 z-50 bg-primeColor w-auto text-[#767676] h-auto p-4 pb-6"
            >
              <Link to="/admin/dashboard" className="flex items-center">
              <li className="flex  mb-5  rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 ">
                <FaAddressBook className="w-5 h-5 text-white" />
                <h2
                  className={`text-white origin-left font-medium text-xl duration-200 `}
                >
                  Dashboard
                </h2>
              </li>
            </Link>
            <Link to="/admin/users" className="flex items-center">
              <li className="flex  mb-5 rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 ">
                <FaUser className="w-5 h-5 text-white" />
                <h2
                  className={`text-white origin-left font-medium text-xl duration-200 `}
                >
                  Users
                </h2>
              </li>
            </Link>
            <Link to="/admin/categories" className="flex items-center">
              <li className="flex  mb-5 rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 ">
                <FaUser className="w-5 h-5 text-white" />
                <h2
                  className={`text-white origin-left font-medium text-xl duration-200 `}
                >
                  Categories
                </h2>
              </li>
            </Link>
            <Link to="/admin/attributes" className="flex items-center">
              <li className="flex  mb-5 rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 ">
                <FaListAlt className="w-5 h-5 text-white" />
                <h2
                  className={`text-white origin-left font-medium text-xl duration-200 `}
                >
                  Attribute Key
                </h2>
              </li>
            </Link>
            <Link to="/admin/products" className="flex items-center">
              <li className="flex  mb-5 rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 ">
                <FaGavel className="w-5 h-5 text-white" />
                <h2
                  className={`text-white origin-left font-medium text-xl duration-200 `}
                >
                  Products
                </h2>
              </li>
            </Link>
            <Link to="/admin/warranty" className="flex items-center">
              <li className="flex  mb-5 rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 ">
                <FaWrench className="w-5 h-5 text-white" />
                <h2
                  className={`text-white origin-left font-medium text-xl duration-200 `}
                >
                  Warranty Product
                </h2>
              </li>
            </Link>
            <Link to="/admin/supplier" className="flex items-center">
              <li className="flex  mb-5 rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 ">
                <FaTruck className="w-5 h-5 text-white" />
                <h2
                  className={`text-white origin-left font-medium text-xl duration-200 `}
                >
                  Supplier
                </h2>
              </li>
            </Link>
            <Link to="/admin/categoryJournal" className="flex items-center">
              <li className="flex  mb-5 rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 ">
                <FaEnvelope className="w-5 h-5 text-white" />
                <h2
                  className={`text-white origin-left font-medium text-xl duration-200 `}
                >
                  Category Journal
                </h2>
              </li>
            </Link>
            <Link to="/admin/journals" className="flex items-center">
              <li className="flex  mb-5 rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 ">
                <FaEnvelope className="w-5 h-5 text-white" />
                <h2
                  className={`text-white origin-left font-medium text-xl duration-200 `}
                >
                  Journal
                </h2>
              </li>
            </Link>
            <Link to="/admin/coupons" className="flex items-center">
              <li className="flex  mb-5 rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 ">
                <FaTag className="w-5 h-5 text-white" />
                <h2
                  className={`text-white origin-left font-medium text-xl duration-200 `}
                >
                  Coupon
                </h2>
              </li>
            </Link>
            <Link to="/admin/orders" className="flex items-center">
              <li className="flex  mb-5 rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 ">
                <FaCheckCircle className="w-5 h-5 text-white" />
                <h2
                  className={`text-white origin-left font-medium text-xl duration-200 `}
                >
                  Order Status
                </h2>
              </li>
            </Link>
            {/* <Link to="/admin/messages" className="flex items-center">
              <li className="flex  mb-5 rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 ">
                <FaComment className="w-5 h-5 text-white" />
                <h2
                  className={`text-white origin-left font-medium text-xl duration-200 `}
                >
                  Message
                </h2>
              </li>
            </Link> */}
            <li
              onClick={() => handleLogout()}
              className="flex  mb-5 rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 "
            >
              <FaSignOutAlt className="w-5 h-5 text-white" />
              <h2
                className={`text-white origin-left font-medium text-xl duration-200 `}
              >
                logout
              </h2>
            </li>
            </motion.ul>
          )}
        </div>
      </div>
      <div className=" col-span-12 xl:col-span-8">
        {/* <ScrollRestoration /> */}
        <Outlet />
      </div>
    </div>
  );
};

export default SideBar;
