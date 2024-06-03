import { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import { couponApi } from "../../../../service/coupon.service";
import { toast } from "react-toastify";

const Coupons = () => {
  const [coupons, setCoupons] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");

  const filteredCoupons = coupons.filter((coupon) => {
    return coupon.code.toLowerCase().includes(searchKeyword.toLowerCase());
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await couponApi.getCoupon();
        setCoupons(response.data);
      } catch (error) {
        console.error("Error fetching coupons:", error);
      }
    };

    fetchData();
  }, []);

  const handleHide = async (couponId) => {
    const confirmHide = window.confirm(
      "Are you sure you want to hide this coupon?"
    );
    if (confirmHide) {
      try {
        await couponApi.removeCoupon(couponId);
        const updatedcoupons = coupons.filter(
          (coupon) => coupon._id !== couponId
        );
        setCoupons(updatedcoupons);
        toast.success("Hide coupon Successfully!!!");
      } catch (error) {
        console.error("Error hiding coupon:", error);
      }
    }
  };

  const handleSearch = (event) => {
    setSearchKeyword(event.target.value);
  };

  return (
    <>
      <div className="flex flex-col md:flex-row justify-between items-center mt-5">
        <div className="relative rounded-2xl border w-full md:w-[600px] h-[50px] text-base text-primeColor flex items-center gap-2 justify-between px-6 mb-4 md:mb-0">
          <input
            className="flex-1 h-full outline-none placeholder:text-[#C4C4C4] placeholder:text-[14px]"
            type="text"
            placeholder="Search your coupon here"
            value={searchKeyword}
            onChange={handleSearch}
          />

          <FaSearch className="w-5 h-5 hover:cursor-pointer" />
        </div>
        <div className="flex items-center">
          {" "}
          <div className="ml-auto">
            <Link to={"/admin/add-coupon"}>
              <button
                type="button"
                className="w-50 p-2 bg-green-500 text-white rounded mr-20"
              >
                Add New Coupon
              </button>
            </Link>
          </div>
        </div>
      </div>
      <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"></hr>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-center text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Coupon code
              </th>
              <th scope="col" className="px-6 py-3">
                Description
              </th>
              <th scope="col" className="px-6 py-3">
                ValidFrom
              </th>
              <th scope="col" className="px-6 py-3">
                ValidUntil
              </th>
              <th scope="col" className="px-6 py-3">
                Discount
              </th>
              {/* <th scope="col" className="px-6 py-3">
                Status
              </th> */}
              <th scope="col" className="px-6 py-3">
                <span className="">Action</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredCoupons.map((coupon) => (
              <tr
                key={coupon._id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {coupon.code}
                </th>
                <td className="px-6 py-4">{coupon.description}</td>
                <td className="px-6 py-4">
                  {new Date(coupon.validFrom).toLocaleDateString("en-US")}
                </td>
                <td className="px-6 py-4">
                  {new Date(coupon.validUntil).toLocaleDateString("en-US")}
                </td>
                <td className="px-6 py-4">{coupon.discountPercent * 100}%</td>
                <td className="px-2 py-2">
                  <Link to={`/admin/edit-coupon/${coupon._id}`}>
                    <button className="font-medium text-blue-600 dark:text-blue-500">
                      Edit
                    </button>
                  </Link>
                  <button
                    onClick={() => handleHide(coupon._id)}
                    className="font-medium text-red-600 dark:text-blue-500 ml-3"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"></hr>
      <nav
        aria-label="Page navigation example "
        className="flex items-center justify-center mt-4"
      >
        <ul className="flex space-x-2 md:space-x-4 text-base h-10">
          <li>
            <a
              href="#"
              className="flex items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              Previous
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              1
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              2
            </a>
          </li>
          <li>
            <a
              href="#"
              aria-current="page"
              className="flex items-center justify-center px-4 h-10 text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
            >
              3
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              4
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              5
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              Next
            </a>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Coupons;
