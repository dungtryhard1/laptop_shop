import React, { useState, useEffect } from "react";
import { userApi } from "../../../../service/user.service";
import { FaSearch, FaSort } from "react-icons/fa";
import { toast } from "react-toastify";

const User = () => {
  const [userData, setUserData] = useState([]);
  const [user, setUser] = useState([]);
  const [searchUsername, setSearchUsername] = useState("");
  const [sortDirection, setSortDirection] = useState("");
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);

  useEffect(() => {
    fetchUserData();
  }, [searchUsername, sortDirection, page, perPage]);

  const fetchUserData = async () => {
    try {
      const response = await userApi.getUser({
        username: searchUsername,
        sortName: sortDirection,
        page: page,
        perPage: perPage,
      });
      setUserData(response.data.users);
      setUser(response.data.totalCount);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const handleStatusChange = async (userId, newStatus) => {
    try {
      await userApi.updateUser(userId, { status: newStatus });
      fetchUserData();
      toast.success("Change Status Successfully!!");
    } catch (error) {
      console.error("Error updating user status:", error);
    }
  };

  const handleSortByUsername = () => {
    // Thay đổi hướng sắp xếp khi ấn vào trường Username
    if (sortDirection === "asc") {
      setSortDirection("desc");
    } else {
      setSortDirection("asc");
    }
  };

  const handleChangePage = (pageNumber) => {
    setPage(pageNumber);
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center mt-5">
        <div className="relative rounded-2xl border w-full md:w-[600px] h-[50px] text-base text-primeColor flex items-center gap-2 justify-between px-6 mb-4 md:mb-0">
          <input
            className="flex-1 h-full outline-none placeholder:text-[#C4C4C4] placeholder:text-[14px]"
            type="text"
            placeholder="Search username here"
            value={searchUsername}
            onChange={(e) => setSearchUsername(e.target.value)}
          />
          <FaSearch className="w-5 h-5 hover:cursor-pointer" />
        </div>
      </div>

      <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"></hr>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-center text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                <div
                  className="flex items-center"
                  onClick={handleSortByUsername}
                >
                  Username
                  <FaSort className="ml-1 cursor-pointer" />
                </div>
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                Phone number
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {userData.map((user) => (
              <tr
                key={user._id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {user.username}
                </td>
                <td className="px-6 py-4">{user.email}</td>
                <td className="px-6 py-4">{user.phoneNumber}</td>
                <td
                  className={`px-4 py-2 mt-2 ${
                    user.status === "active"
                      ? "inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20"
                      : "inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10"
                  }`}
                >
                  {user.status}
                </td>

                <td className="px-6 py-4">
                  <button
                    onClick={() =>
                      handleStatusChange(user._id, "newStatusHere")
                    }
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    Change Status
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"></hr>

      <div className="flex justify-center mt-8">
        <nav aria-label="Page navigation example">
          <ul className="flex items-center -space-x-px h-10 text-base">
            <li>
              <a
                href="#"
                className={`flex items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${
                  page === 1 ? "opacity-50 pointer-events-none" : ""
                }`}
                onClick={() => handleChangePage(page - 1)}
              >
                <span className="sr-only">Previous</span>
                <svg
                  className="w-3 h-3 rtl:rotate-180"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 6 10"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 1 1 5l4 4"
                  />
                </svg>
              </a>
            </li>

            {Array.from(Array(Math.ceil(user / perPage)).keys()).map(
              (pageNumber) => (
                <li key={pageNumber}>
                  <button
                    className={`flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border ${
                      page === pageNumber + 1
                        ? "border-primeColor bg-slate-900 text-white hover:bg-slate-950 hover:text-white dark:bg-slate-950 dark:text-black"
                        : pageNumber === 0
                        ? "border-gray-300 bg-white text-black"
                        : "border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                    }`}
                    onClick={() => handleChangePage(pageNumber + 1)}
                  >
                    {pageNumber + 1}
                  </button>
                </li>
              )
            )}

            <li>
              <a
                className={`flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${
                  page === Math.ceil(user / perPage)
                    ? "opacity-50 pointer-events-none"
                    : ""
                }`}
                onClick={() => handleChangePage(page + 1)}
              >
                <span className="sr-only">Next</span>
                <svg
                  className="w-3 h-3 rtl:rotate-180"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 6 10"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 9 4-4-4-4"
                  />
                </svg>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};

export default User;
