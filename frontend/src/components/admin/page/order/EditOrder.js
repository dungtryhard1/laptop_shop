import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { orderStatusApi } from "../../../../service/orderStatus.service";
import { toast } from "react-toastify";
import { FaCalendarAlt } from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function EditOrder() {
  const { orderId } = useParams();
  const [order, setOrder] = useState({
    // status: "",
    // shippingDate: "",
    // estimatedArrivalDate: "",
    // username: "",
    // addressDetail: "",
    // orderItem: [],
    // note: "",
  });
  const [orderStatus, setOrderStatus] = useState("");
  const nav = useNavigate();
  const [userName, setUserName] = useState("");
  const steps = ["processing", "packaging", "transfer", "success"];
  const [currentStep, setCurrentStep] = useState(0);

  const handleNextStep = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };

  useEffect(() => {
    const fetchWarranty = async () => {
      try {
        const response = await orderStatusApi.getOrderStatusById(orderId);
        setOrder(response.data);
        setOrderStatus(
          response.data.orderStatus[response.data.orderStatus.length - 1].status
        );
        setCurrentStep(
          parseInt(
            response.data.orderStatus[response.data.orderStatus.length - 1].step
          )
        );
      } catch (error) {
        console.error("Error fetching warranty:", error);
      }
    };
    fetchWarranty();
  }, [orderId]);
  useEffect(() => {
    console.log(order);
    console.log(orderStatus);
  }, [order, orderStatus]);
  const handleChange = (e) => {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setOrder((prevLaptop) => ({ ...prevLaptop, [e.target.name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { shippingDate, estimatedArrivalDate } = order;
    const updatedOrder = {
      shippingDate,
      estimatedArrivalDate,
      status: steps[currentStep],
    }; // Thêm status vào trong object updatedOrder

    try {
      const response = await orderStatusApi.updateOrderStatus(
        orderId,
        updatedOrder
      );
      nav("/admin/orders");
      toast.success("Update Order Status Successfully!!!");
      console.log("API Response:", response.data);
    } catch (error) {
      console.error("Error updating warranty:", error);
      toast.error(error?.response?.data?.error);
    }
  };

  return (
    <div className="flex items-center justify-center ">
      <div className="max-w-xl w-full bg-white p-6 rounded-md shadow-md">
        <h1 className="text-2xl font-bold mb-4 text-center">
          Edit Order Status
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="Username"
              className="block mb-2 text-sm font-medium text-gray-600"
            >
              Username
            </label>
            <input
              id="username"
              name="username"
              type="text"
              placeholder="username"
              value={order?.userId?.username}
              className="w-full p-2 border border-gray-300 rounded"
              disabled
            />
          </div>

          <div>
            <label
              htmlFor="orderItem"
              className="block mb-2 text-sm font-medium text-gray-600"
            >
              OrderItem
            </label>
            <input
              id="orderItem"
              name="orderItem"
              type="text"
              placeholder="OrderItem"
              value={order?.orderItem?.length}
              className="w-full p-2 border border-gray-300 rounded"
              disabled
            />
          </div>

          <div>
            <label
              htmlFor="Address Detail"
              className="block mb-2 text-sm font-medium text-gray-600"
            >
              Address Detail
            </label>
            <input
              id="addressDetail"
              name="addressDetail"
              type="text"
              placeholder="Address Detail"
              value={order?.addressId?.addressDetail}
              className="w-full p-2 border border-gray-300 rounded"
              disabled
            />
          </div>

          <div>
            <label
              htmlFor="PhoneNumber"
              className="block mb-2 text-sm font-medium text-gray-600"
            >
              PhoneNumber
            </label>
            <input
              id="numberPhone"
              name="numberPhone"
              type="text"
              placeholder="PhoneNumber"
              value={order?.addressId?.numberPhone}
              className="w-full p-2 border border-gray-300 rounded"
              disabled
            />
          </div>

          <div>
            <label
              htmlFor="Note"
              className="block mb-2 text-sm font-medium text-gray-600"
            >
              Note
            </label>
            <input
              id="note"
              name="note"
              type="text"
              placeholder="note"
              value={order.note}
              className="w-full p-2 border border-gray-300 rounded"
              disabled
            />
          </div>

          <div>
            <label
              htmlFor="shippingDate"
              className="block mb-2 text-sm font-medium text-gray-600 flex items-center"
            >
              <span className="mr-2">
                <FaCalendarAlt />
              </span>
              Shipping Date
            </label>
            <DatePicker
              selected={
                order.shippingDate ? new Date(order.shippingDate) : null
              }
              onChange={(date) => setOrder({ ...order, shippingDate: date })}
              dateFormat="MM/dd/yyyy"
              className="w-full p-2 border border-gray-300 rounded"
              popperPlacement="bottom-start"
            />
          </div>
          <div>
            <label
              htmlFor="estimatedArrivalDate"
              className="block mb-2 text-sm font-medium text-gray-600 flex items-center"
            >
              <span className="mr-2">
                <FaCalendarAlt />
              </span>
              EstimatedArrival Date
            </label>
            <DatePicker
              selected={
                order.estimatedArrivalDate
                  ? new Date(order.estimatedArrivalDate)
                  : null
              }
              onChange={(date) =>
                setOrder({ ...order, estimatedArrivalDate: date })
              }
              dateFormat="MM/dd/yyyy"
              className="w-full p-2 border border-gray-300 rounded"
              popperPlacement="bottom-start"
            />
          </div>
          {orderStatus !== "cancel" ? (
            <>
              <div className="flex justify-between items-center">
                <span className="text-gray-700 font-medium">
                  {currentStep === 0 && (
                    <span className="inline-flex items-center rounded-md bg-orange-50 px-2 py-1 text-base font-medium text-orange-700 ring-1 ring-inset ring-orange-600/20">
                      Processing
                    </span>
                  )}
                  {currentStep === 1 && (
                    <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-base font-medium text-blue-700 ring-1 ring-inset ring-blue-600/20">
                      Packaging
                    </span>
                  )}
                  {currentStep === 2 && (
                    <span className="inline-flex items-center rounded-md bg-yellow-50 px-2 py-1 text-base font-medium text-yellow-800 ring-1 ring-inset ring-yellow-600/20">
                      Transfer
                    </span>
                  )}
                  {currentStep === 3 && (
                    <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-base font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                      Success
                    </span>
                  )}
                </span>
                {currentStep < steps.length - 1 && (
                  <button
                    type="button"
                    onClick={handleNextStep}
                    className={`px-4 py-2 rounded ${
                      currentStep === 0
                        ? "bg-orange-50 text-orange-700"
                        : currentStep === 1
                        ? "bg-blue-50 text-blue-700"
                        : currentStep === 2
                        ? "bg-yellow-50 text-yellow-800"
                        : currentStep === 3
                        ? "bg-green-50 text-green-700"
                        : ""
                    }`}
                  >
                    Next
                  </button>
                )}
              </div>

              <div className="flex flex-col items-center md:flex-row md:justify-end space-y-2 md:space-y-0 mt-4">
                <button
                  type="submit"
                  className="w-full md:w-24 p-2 bg-blue-500 text-white rounded mr-3"
                >
                  Update
                </button>
                <Link to="/admin/orders">
                  <button
                    type="button"
                    className="w-full md:w-24 p-2 bg-red-500 text-white rounded"
                  >
                    Cancel
                  </button>
                </Link>
              </div>
            </>
          ) : (
            <div>
              <span className="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10">
                ORDER HAS BEEN CANCELS
              </span>
              <div className="flex flex-col items-center md:flex-row md:justify-end space-y-2 md:space-y-0 mt-4">
                <Link to="/admin/orders">
                  <button
                    type="button"
                    className="w-full md:w-24 p-2 bg-red-500 text-white rounded"
                  >
                    Back
                  </button>
                </Link>
              </div>
            </div>
          )}
        </form>
        <hr className="mt-2 mb-2"></hr>
        <strong className="text-center:">
          You can view all order items here
        </strong>
        <div className="grid xl:grid-cols-3 gap-2  bg-white p-6 rounded-md shadow-md">
          {order?.orderItem?.map((item) => (
            <div
              className="flex flex-col max-w-xl space-y-4 mt-2 cursor-pointer"
              key={item?._id}
              onClick={() =>
                nav(
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
              <div className="bg-white p-4 rounded-lg shadow-md">
                <h3 className="text-lg font-bold truncate">
                  {item.productId?.name}
                </h3>

                <div className="flex mt-2">
                  <div>
                    <img
                      className="mr-2 mb-2"
                      width={100}
                      src={
                        item.productId?.images?.find((image) => image.isMain)
                          ?.url
                      }
                      alt={`Image}`}
                    />
                    <div className="mt-3">
                      Price : {item?.productId?.price} $
                    </div>
                    <div className="mt-3">quantity : {item.quantity} </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default EditOrder;
