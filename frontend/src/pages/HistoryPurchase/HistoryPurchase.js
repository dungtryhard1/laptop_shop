import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import classNames from "classnames";
import { userOrderApi } from "../../service/userOrder.service";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { emptyCart } from "../../assets/images";

const purchaseTabs = [
  { status: 0, name: "All" },
  { status: "processing", name: "Waiting for confirmation" },
  { status: "packaging", name: "Waiting for delivery" },
  { status: "transfer", name: "Delivering" },
  { status: "success", name: "Done" },
  { status: "cancel", name: "Cancelled" },
];
export default function HistoryPurchase() {
  const [status, setStatus] = useState(0);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [rating, setRating] = useState(0);
  const [selectedStars, setSelectedStars] = useState(0);
  const userId = useSelector((state) => state.auth?.user?._id);
  const [orders, setOrders] = useState([]);
  const [orderItemId, setorderItemId] = useState("");
  const [filterOrder, setFilterOrder] = useState([]);
  const [review, setReview] = useState({});
  const [product, setproduct] = useState({});

  const token = useSelector((state) => state?.auth?.user?.token);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/signin");
    }
  }, [token, navigate]);

  const fetchData = async () => {
    try {
      const response = await userOrderApi.getOrder(userId);
      setOrders(response?.data);
    } catch (error) {
      console.log("Failed to get user's order: " + error);
    }
  };

  useEffect(() => {
    if (status === 0) {
      setFilterOrder(orders);
    } else
      setFilterOrder(
        orders.filter(
          (order) =>
            order.orderStatus[order.orderStatus.length - 1]?.status == status
        )
      );
  }, [status, orders]);
  useEffect(() => {
    // const fetchData = async () => {
    //   try {
    //     const response = await userOrderApi.getOrder(userId)
    //     setOrders(response?.data)
    //   } catch (error) {
    //     console.log("get order's user fail" + error)
    //   }
    // };

    fetchData();
  }, []);
  const toggleReviewModal = (id, product) => {
    setShowReviewModal(!showReviewModal);
    setproduct(product);

    setorderItemId(id);
  };

  const handleRatingChange = (value) => {
    setRating(value);
    setSelectedStars(value);
    setReview({ ...review, rating: value });
  };

  const handleChange = (e) => {
    if (e.target.type === "file") {
      const files = Array.from(e.target.files);
      setReview({ ...review, images: files });
    } else {
      const value = e.target.value;
      setReview({ ...review, [e.target.name]: value });
    }
  };
  const handleReview = async (e) => {
    // console.log(review);
    try {
      const formData = new FormData();
      review.images.forEach((imageFile, index) => {
        formData.append("images", imageFile, `images.${index}`);
      });
      formData.append("rating", review.rating);
      formData.append("comment", review.comment);
      toast.info("Review will take a few seconds");
      const response = await userOrderApi.reViewlOrder(orderItemId, formData);
      toast.success("Review order Successfully!!!");
      setShowReviewModal(!showReviewModal);
      navigate(
        `/product/${product.name
          .replace(/\//g, " ")
          .toLowerCase()
          .split(" ")
          .join("")}`,
        {
          state: {
            item: product,
          },
        }
      );
    } catch (error) {
      console.error("Error Post review order:", error);
      toast.error(error?.response?.data?.error);
      toast.error("Please fill all fields");
    }

    fetchData();
  };
  const purchaseTabsLink = purchaseTabs.map((tab) => (
    <Link
      key={tab.status}
      to={{
        pathname: "/history-purchase",
        search: `?status=${tab.status}`,
      }}
      className={classNames(
        "flex flex-1 items-center justify-center border-b-2 bg-white py-4 text-center mx-2",
        {
          "border-b-orange text-orange font-semibold": status === tab.status,
          "border-b-black/10 text-gray-900": status !== tab.status,
          "hover:bg-gray-100": status !== tab.status,
          "transition-colors duration-300": true,
        }
      )}
      onClick={() => setStatus(tab.status)}
    >
      {tab.name}
    </Link>
  ));

  const handleCancelOrder = async (orderId) => {
    const confirmCancel = window.confirm(
      "Are you sure you want to cancel this order ?"
    );
    if (confirmCancel) {
      try {
        await userOrderApi.cancelOrder(orderId);
        toast.success("Cancel order Successfully!!!");
      } catch (error) {
        console.error("Error cancel order:", error);
        toast.error(error?.response?.data?.error);
      }
      fetchData();
    }
  };

  return (
    <div className="max-w-container mx-auto">
      <div className="min-w-[700px]">
        <div className="sticky top-0 flex rounded-t-sm shadow-sm bg-white">
          {purchaseTabsLink}
        </div>
        <div className="p-2">
          {filterOrder.length > 0 ? (
            filterOrder
              .slice()
              .reverse()
              .map((order) => (
                <div
                  key={order._id}
                  className=" mt-5 rounded-sm border border-black/10 bg-white p-6 text-gray-800 shadow-sm"
                >
                  <h1 className="mb-2">
                    <strong className="mr-2">Status :</strong>
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
                  </h1>
                  <h1>
                    <strong>Total Price: {order?.amount} $</strong>
                  </h1>
                  <h1>
                    Shipping Date:{" "}
                    {new Date(order.shippingDate).toLocaleDateString("en-US")}
                  </h1>
                  <h1>
                    Estimated Arrival Date:{" "}
                    {new Date(order.estimatedArrivalDate).toLocaleDateString(
                      "en-US"
                    )}
                  </h1>
                  <div className="flex items-start mt-4">
                    <div className="grid grid-cols-2 gap-4 w-full">
                      {order?.orderItem?.map((item) => (
                        <div
                          className="rounded-sm border border-black/10 bg-white p-6 text-gray-800 shadow-sm"
                          key={item?._id}
                        >
                          <div
                            className="flex cursor-pointer"
                            onClick={() =>
                              navigate(
                                `/product/${item?.productId?.name
                                  .replace(/\//g, " ")
                                  .toLowerCase()
                                  .split(" ")
                                  .join("")}`,
                                {
                                  state: {
                                    item: item?.productId,
                                  },
                                }
                              )
                            }
                          >
                            <div className="flex-shrink-0">
                              <img
                                className="h-20 w-20 object-cover"
                                src={
                                  item?.productId?.images?.find(
                                    (image) => image.isMain
                                  )?.url
                                }
                                alt=""
                              />
                            </div>
                            <div className="ml-3 flex-grow overflow-hidden">
                              <div className="truncate">
                                Name: {item?.productId?.name}
                              </div>
                              <div className="mt-3">
                                Price : {item?.productId?.price} $
                              </div>
                              <div className="mt-3">
                                quantity : {item.quantity}{" "}
                              </div>
                            </div>
                          </div>
                          <div className="mt-3">
                            {order?.orderStatus[order.orderStatus.length - 1]
                              ?.status == "success" &&
                              (item.reviewId ? (
                                <button
                                  className="px-4 py-2 bg-primeColor text-white rounded-md hover:bg-gray-600 transition-colors duration-300"
                                  onClick={() =>
                                    toggleReviewModal(item._id, item.productId)
                                  }
                                >
                                  Evaluate Again
                                </button>
                              ) : (
                                <button
                                  className="px-4 py-2 bg-primeColor text-white rounded-md hover:bg-gray-600 transition-colors duration-300"
                                  onClick={() =>
                                    toggleReviewModal(item._id, item.productId)
                                  }
                                >
                                  Evaluate
                                </button>
                              ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-end mt-4">
                    <div className="ml-auto">
                      {order.orderStatus[order.orderStatus.length - 1]
                        ?.status == "processing" && (
                        <button
                          onClick={() => handleCancelOrder(order._id)}
                          className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors duration-300 ml-5"
                        >
                          Cancel Order
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))
          ) : (
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col mdl:flex-row justify-center items-center gap-4 pb-20 mt-5"
            >
              <div>
                <img
                  className="w-80 rounded-lg p-4 mx-auto"
                  src={emptyCart}
                  alt="emptyCart"
                />
              </div>
              <div className="max-w-[500px] p-4 py-8 bg-white flex gap-4 flex-col items-center rounded-md shadow-lg">
                <h1 className="font-titleFont text-xl font-bold uppercase">
                  Don't Have order.
                </h1>
                <p className="text-sm text-center px-10 -mt-2">
                  Enjoy shopping for our other products
                </p>
                <Link to="/shop">
                  <button className="bg-primeColor rounded-md cursor-pointer hover:bg-black active:bg-gray-900 px-8 py-2 font-titleFont font-semibold text-lg text-gray-200 hover:text-white duration-300">
                    Continue Shopping
                  </button>
                </Link>
              </div>
            </motion.div>
          )}
        </div>
      </div>
      {/* Review Modal */}
      {showReviewModal && (
        <div className="fixed z-50 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

            <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <div className="mt-2">
                      {/* Rating Stars */}
                      <div className="flex items-center justify-center">
                        {[...Array(5)].map((star, index) => {
                          const ratingValue = index + 1;
                          return (
                            <label
                              key={index}
                              className="cursor-pointer"
                              style={{
                                width: "48px",
                                height: "48px",
                                display: "block",
                                cursor: "pointer",
                              }}
                            >
                              <input
                                type="radio"
                                name="rating"
                                value={ratingValue}
                                onClick={() => handleRatingChange(ratingValue)}
                                style={{ display: "none" }}
                              />
                              <svg
                                className={`w-8 h-8 text-gray-500 fill-current ${
                                  ratingValue <= selectedStars
                                    ? "text-yellow-500"
                                    : ""
                                }`}
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                              </svg>
                              {ratingValue === selectedStars && (
                                <span className="text-yellow-500 ml-1">
                                  {selectedStars}
                                </span>
                              )}
                            </label>
                          );
                        })}
                      </div>
                      <div className="mb-4">
                        <label
                          htmlFor="comment"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Comment:
                        </label>
                        <textarea
                          id="comment"
                          name="comment"
                          onChange={handleChange}
                          className="mt-1 block w-full shadow-sm sm:text-sm focus:ring-primary-500 focus:border-primary-500 border-gray-300 rounded-md"
                        ></textarea>
                      </div>
                      <div className="mb-4">
                        <label
                          htmlFor="image"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Image:
                        </label>
                        <input
                          type="file"
                          id="image"
                          name="image"
                          accept="image/*"
                          className="mt-1 block w-full"
                          onChange={handleChange}
                          multiple
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primeColor text-base font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={handleReview}
                >
                  Post
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={toggleReviewModal}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
