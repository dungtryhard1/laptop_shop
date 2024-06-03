import { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import { orderStatusApi } from "../../../../service/orderStatus.service";

const OrderStatus = () => {
  const [orders, setOrders] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");

  const filteredOrders = orders.filter((order) => {
    return order.shippingDate
      .toLowerCase()
      .includes(searchKeyword.toLowerCase());
  });

  console.log(filteredOrders);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await orderStatusApi.getOrderStatus();
        setOrders(response.data);
      } catch (error) {
        console.error("Error fetching warranties:", error);
      }
    };

    fetchData();
  }, []);

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
            placeholder="Search your category here"
            value={searchKeyword}
            onChange={handleSearch}
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
                UserName
              </th>
              <th scope="col" className="px-6 py-3">
                OrderItem
              </th>
              <th scope="col" className="px-6 py-3">
                Shipping Date
              </th>
              <th scope="col" className="px-6 py-3">
                EstimatedArrival Date
              </th>
              <th scope="col" className="px-6 py-3">
                Status
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
            {filteredOrders.map((order) => (
              <tr
                key={order._id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <th className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {order.userId.username}
                </th>
                <th className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {order.orderItem.length}
                </th>
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {new Date(order.shippingDate).toLocaleDateString("en-US")}
                </th>
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {new Date(order.estimatedArrivalDate).toLocaleDateString(
                    "en-US"
                  )}
                </th>
                <th className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {order.orderStatus.length > 0 && (
                    <span
                      className={
                        order.orderStatus[order.orderStatus.length - 1]
                          .status === "processing"
                          ? "inline-flex items-center rounded-md bg-orange-50 px-2 py-1 text-xs font-medium text-orange-700 ring-1 ring-inset ring-orange-600/20"
                          : "" ||
                            order.orderStatus[order.orderStatus.length - 1]
                              .status === "packaging"
                          ? "inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-600/20"
                          : "" ||
                            order.orderStatus[order.orderStatus.length - 1]
                              .status === "transfer"
                          ? "inline-flex items-center rounded-md bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-800 ring-1 ring-inset ring-yellow-600/20"
                          : "" ||
                            order.orderStatus[order.orderStatus.length - 1]
                              .status === "success"
                          ? "inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20"
                          : "" ||
                            order.orderStatus[order.orderStatus.length - 1]
                              .status === "failure"
                          ? "inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10"
                          : "" ||
                            order.orderStatus[order.orderStatus.length - 1]
                              .status === "cancel"
                          ? "inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10"
                          : ""
                      }
                    >
                      {order.orderStatus[order.orderStatus.length - 1].status}
                    </span>
                  )}
                </th>

                <td className="px-2 py-2">
                  <Link to={`/admin/edit-order/${order._id}`}>
                    <button className="font-medium text-blue-600 dark:text-blue-500 ml-5">
                      Detail
                    </button>
                  </Link>
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

export default OrderStatus;
