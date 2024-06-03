import { useEffect, useState } from "react";
import { MapPin, Phone } from "react-feather";
import Breadcrumbs from "../../components/pageProps/Breadcrumbs";
import { FaShoppingBag } from "react-icons/fa";
import { FaAngleRight } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { resetCart } from "../../redux/orebiSlice";

import {
  apiGetPublicDistrict,
  apiGetPublicProvinces,
  apiGetPublicWard,
} from "../../service/provices.service";
import { profileApi } from "../../service/profile.service";
import { userAddressApi } from "../../service/userAddress.service";
import { toast } from "react-toastify";
import { userOrderApi } from "../../service/userOrder.service";
import { couponApi } from "../../service/coupon.service";

const OrderItem = ({ imageSrc, productName, quantity, price }) => {
  return (
    <div className="flex items-center border-b border-gray-300 pb-4 mb-4">
      <img
        src={imageSrc}
        alt={productName}
        className="w-24 h-24 object-cover rounded-lg mr-4"
      />
      <div>
        {/* <p className="font-semibold">{productDescription}</p> */}
        <p className="font-semibold">{productName}</p>
        <p className="text-sm text-gray-500">Quantity: {quantity}</p>
      </div>
      <p className="ml-auto text-right font-semibold">{price} $</p>
    </div>
  );
};
const Order = () => {
  const [prevLocation] = useState("");
  const nav = useNavigate();
  const dispatch = useDispatch();
  const products = useSelector((state) => state.orebiReducer.products);
  const [totalAmt, setTotalAmt] = useState("");
  const [subtotal, setSubtotal] = useState("");
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [province, setProvince] = useState("");
  const [district, setDistrict] = useState("");
  const [ward, setWard] = useState("");
  const [reset, setReset] = useState(false);
  const [addressDetail, setAddressDetail] = useState("");
  const [numberPhone, setNumberPhone] = useState("");
  const [address, setAddress] = useState([]);
  const [addressUser, setAddressUser] = useState([]);
  const [addressChangeFlag, setAddressChangeFlag] = useState(false);

  const [couponCode, setCouponCode] = useState({ code: "" });
  const [coupon, setCoupon] = useState([]);
  const userId = useSelector((state) => state.auth?.user?._id);

  const formatDate = (date) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    };
    return new Date(date).toLocaleDateString("en-US", options);
  };

  const handleCouponCodeChange = (event) => {
    setCouponCode((prevCode) => ({
      ...prevCode,
      code: event.target.value,
    }));
  };
  const handleCheckCoupon = async (e) => {
    e.preventDefault;
    try {
      const response = await couponApi.getCouponByCode(couponCode.code);
      setCoupon(response?.data);
      setOrder((prevOrder) => ({
        ...prevOrder,
        couponId: response?.data?._id,
      }));
    } catch (error) {}
  };
  // Hàm để định dạng ngày tháng dạng 'YYYY-MM-DD'
  const getFormattedDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  // Hàm để tính và định dạng ngày tháng dạng 'YYYY-MM-DD' cho ngày dự kiến đến
  const getFormattedEstimatedDate = (date) => {
    const numberOfDaysToAdd = 3; // Đặt số ngày sau ngày hiện tại
    const estimatedArrivalDate = new Date(date);
    estimatedArrivalDate.setDate(date.getDate() + numberOfDaysToAdd);
    return getFormattedDate(estimatedArrivalDate);
  };

  const [order, setOrder] = useState({
    userId: userId,
    addressId: "",
    orderItem: products?.map((product) => ({
      productId: product._id,
      quantity: product.quantity,
    })),
    shippingDate: getFormattedDate(new Date()), // Lấy ngày hiện tại và định dạng
    estimatedArrivalDate: getFormattedEstimatedDate(new Date()), // Tính ngày dự kiến đến và định dạng
    amount: 1,
  });

  const handleOrderChange = (addressId) => {
    // Cập nhật addressId nếu cần
    setOrder((prevOrder) => ({
      ...prevOrder,
      addressId: addressId,
    }));
  };
  useEffect(() => {
    console.log(order);
  }, [order]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userRespone] = await Promise.all([
          profileApi.getUserById(userId),
        ]);

        setAddress(userRespone?.data?.address);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [userId, addressChangeFlag]);
  const handleChange = (event) => {
    const { name, value } = event.target;
    setOrder((prevOrder) => ({
      ...prevOrder,
      [name]: value,
    }));
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const newAddresses = [];

        for (const addressId of address) {
          const response = await userAddressApi.getAddressById(addressId);
          newAddresses.push(response.data);
        }
        setAddressUser(newAddresses);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [address]);

  useEffect(() => {
    const fetchPublicProvince = async () => {
      const response = await apiGetPublicProvinces();
      if (response.status === 200) {
        setProvinces(response?.data.results);
      }
    };
    fetchPublicProvince();
  }, []);
  useEffect(() => {
    setDistrict(null);
    const fetchPublicDistrict = async () => {
      const response = await apiGetPublicDistrict(province);
      if (response.status === 200) {
        setDistricts(response.data?.results);
      }
    };
    province && fetchPublicDistrict();
    !province ? setReset(true) : setReset(false);
    !province && setDistricts([]);
  }, [province]);
  useEffect(() => {
    const fetchPublicWards = async () => {
      const response = await apiGetPublicWard(district); // You need to implement this function
      if (response.status === 200) {
        setWards(response.data?.results);
      }
    };
    fetchPublicWards();
  }, [district]);
  useEffect(() => {
    let price = 0;
    let discountPrice = 0;
    products.map((item) => {
      price += item.price * item.quantity;
      discountPrice += item.price * item.quantity;
      return price;
    });
    if (coupon?.discountPercent) {
      price = price * (1 - coupon.discountPercent);
    }
    setTotalAmt(price);
    setSubtotal(discountPrice);
  }, [products, coupon]);
  // useEffect(() => {
  //   if (totalAmt <= 200) {
  //     setShippingCharge(30);
  //   } else if (totalAmt <= 400) {
  //     setShippingCharge(25);
  //   } else if (totalAmt > 401) {
  //     setShippingCharge(20);
  //   }
  // }, [totalAmt]);

  const handleAddAddress = async (e) => {
    e.preventDefault();

    try {
      const newAddress = {
        numberPhone: numberPhone,
        addressDetail: addressDetail,
        city: provinces?.find((item) => item.province_id === province)
          ?.province_name,
        district: districts?.find((item) => item.district_id === district)
          ?.district_name,
        country: wards?.find((item) => item.ward_id === ward)?.ward_name,
      };
      const response = await userAddressApi.createAddress(newAddress);
      setAddressChangeFlag((prevFlag) => !prevFlag);
      toast.success("Add New address Successfully!!!");
      console.log("API Response:", response.data);
    } catch (error) {
      console.error("Error creating attribute:", error);
      toast.error(error?.response?.data?.error);
    }
  };
  // console.log(products);
  const handleOrder = () => {
    nav("/tracking");
  };
  const handleProvinceChange = (event) => {
    setProvince(event.target.value);
  };
  const handleDistrictChange = (event) => {
    setDistrict(event.target.value);
  };

  const handleAddressDetailChange = (event) => {
    setAddressDetail(event.target.value);
  };
  const handleNumberPhoneChange = (event) => {
    setNumberPhone(event.target.value);
  };
  const handleSubmit = async () => {
    try {
      const response = await userOrderApi.createOrder(order);
      toast.success("Order succesfully !");
      dispatch(resetCart());
      nav("/history-purchase");
    } catch (error) {
      if (Array.isArray(error?.response?.data?.error)) {
        error?.response?.data?.error.forEach((element) => {
          toast.error(element);
          return;
        });
      }
      toast.error(error?.response?.data?.error);
    }
  };
  return (
    <div className="max-w-container mx-auto">
      <Breadcrumbs title="Order" prevLocation={prevLocation} />
      <div className="pb-10">
        {/* <div className="bg-gray-100 p-4 rounded-md">
          <h1 className="text-2xl font-bold flex items-center mb-8">
            <svg
              className="w-8 h-8 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M7 4c0-1.667 1.333-3 3-3s3 1.333 3 3c0 1.581-1.189 2.878-2.727 2.99L10 14.997l-2.273-8.007C8.189 6.878 7 5.581 7 4zM19 8h-1.138a3.001 3.001 0 0 1-5.724 0H10c-1.667 0-3 1.333-3 3v4h14V8zm-1 5H6v3h12v-3z"
              ></path>
            </svg>
            Shipping information
          </h1>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center mb-4">
              <p className="font-semibold mr-2">Type of ship:</p>
              <p className="text-green-600">fast</p>
            </div>
            <div className="flex items-center mb-4">
              <p className="font-semibold mr-2">Ship company:</p>
              <p>ABC Shipping</p>
            </div>
            <div className="flex items-center mb-4">
              <p className="font-semibold mr-2">Status:</p>
              <p className="text-green-600">pending</p>
            </div>
            <div className="flex items-center mb-4">
              <p className="font-semibold mr-2">Time:</p>
              <p>{formatDate(new Date())}</p>
            </div>
          </div>
        </div> */}
        <div className="mb-4"></div>
        <div className="bg-gray-100 p-4 rounded-md">
          <h2 className="text-lg font-bold flex items-center mb-2">
            <MapPin className="mr-2" /> Customer information
          </h2>
          <div className="flex flex-col items-start mb-2 mt-4">
            {addressUser?.map((address) => (
              <div className="flex items-center mb-4" key={address?._id}>
                <input
                  id={address?._id}
                  onClick={() => handleOrderChange(address?._id)}
                  type="radio"
                  value={address?._id}
                  name="addressId"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  htmlFor={address?._id}
                  className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  <strong>Phone number:</strong> {address?.numberPhone},
                  <strong> Address:</strong> {address?.addressDetail},{" "}
                  {address?.country}, {address?.district}, {address?.city}
                </label>
              </div>
            ))}
          </div>

          <hr className="h-1"></hr>
          <h2 className="text-center">
            <strong>OR ADD NEW ADDRESS</strong>
          </h2>
          <div className="flex items-center mb-4">
            <select
              className="w-1/3 mt-1 p-2 border border-gray-300 rounded mr-4"
              onChange={handleProvinceChange}
              value={province}
            >
              <option value="">Choose City</option>
              {provinces?.map((province) => (
                <option
                  key={province?.province_id}
                  value={province?.province_id}
                >
                  {province?.province_name}
                </option>
              ))}
            </select>
            <select
              className="w-1/3 mt-1 p-2 border border-gray-300 rounded mr-4"
              value={district}
              onChange={handleDistrictChange}
            >
              <option value="">Choose District</option>
              {districts.map((district) => (
                <option
                  key={district?.district_id}
                  value={district?.district_id}
                >
                  {district?.district_name}
                </option>
              ))}
            </select>
            <select
              className="w-1/3 mt-1 p-2 border border-gray-300 rounded mr-4"
              value={ward}
              onChange={(e) => setWard(e.target.value)}
            >
              <option value="">Choose Ward</option>
              {wards.map((ward) => (
                <option key={ward?.ward_id} value={ward?.ward_id}>
                  {ward?.ward_name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-start mb-2">
            <label className="mr-2 font-bold mt-5">Address Detail:</label>
            <input
              className=" w-1/2 border border-gray-300 rounded-md p-2 mt-3"
              type="text"
              value={addressDetail}
              onChange={handleAddressDetailChange}
              placeholder="Enter your address detail"
            />
          </div>
          <div className="flex items-start mb-2">
            <label className="mr-2 font-bold mt-5">Phone Number:</label>
            <input
              className=" w-1/2 border border-gray-300 rounded-md p-2 mt-3"
              type="number"
              value={numberPhone}
              onChange={handleNumberPhoneChange}
              placeholder="Enter your phone number"
            />
          </div>
          <button
            className="w-52 h-10 bg-primeColor text-white hover:bg-black duration-300 mt-2"
            onClick={handleAddAddress}
          >
            Add new address
          </button>
        </div>
        <div className="mb-4"></div>{" "}
        {/* Thêm khoảng cách giữa thông tin địa chỉ và thông tin đơn hàng */}
        {/* Thông tin đơn hàng */}
        <div className="bg-gray-100 p-4 rounded-md">
          <h2 className="text-lg font-bold mb-2">Order information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {products?.map((p) => (
              <OrderItem
                imageSrc={p?.image}
                productName={p?.name}
                quantity={p?.quantity}
                price={p?.price}
              />
            ))}
            <hr className="md:hidden my-4 border-gray-300" />{" "}
          </div>
          <div className="flex items-start mb-2">
            <label className="mr-2 font-bold mt-5">Note:</label>
            <input
              className=" w-1/2 border border-gray-300 rounded-md p-2 mt-3"
              type="text"
              name="note"
              id="note"
              onChange={handleChange}
              placeholder="You can note here for your order"
            />
          </div>
          <div className="flex flex-col mdl:flex-row justify-between border py-4 px-4 items-center gap-2 mdl:gap-0">
            <div className="flex items-center gap-4">
              <input
                className="w-44 mdl:w-52 h-8 px-4 border text-primeColor text-sm outline-none border-gray-400"
                type="text"
                placeholder="Coupon Number"
                onChange={handleCouponCodeChange}
              />
              <button
                className="w-52 h-10 bg-primeColor text-white hover:bg-black duration-300"
                onClick={handleCheckCoupon}
              >
                Apply Coupon
              </button>
              {coupon?.discountPercent && (
                <strong>Discount: {coupon?.discountPercent * 100}%</strong>
              )}
            </div>
          </div>
          <div className="max-w-7xl gap-4 flex justify-end mt-4">
            <div className="w-96 flex flex-col gap-4">
              <h1 className="text-2xl font-semibold text-right">Total Price</h1>
              <div>
                <p className="flex items-center justify-between border-[1px] border-gray-400 border-b-0 py-1.5 text-lg px-4 font-medium">
                  Subtotal
                  <span className="font-semibold tracking-wide font-titleFont">
                    ${subtotal}
                  </span>
                </p>
                {coupon?.discountPercent && (
                  <p className="flex items-center justify-between border-[1px] border-gray-400 border-b-0 py-1.5 text-lg px-4 font-medium">
                    Discount Percent
                    <span className="font-semibold tracking-wide font-titleFont">
                      {coupon?.discountPercent * 100} %
                    </span>
                  </p>
                )}

                {/* <p className="flex items-center justify-between border-[1px] border-gray-400 border-b-0 py-1.5 text-lg px-4 font-medium">
                  Shipping Charge
                  <span className="font-semibold tracking-wide font-titleFont">
                    ${shippingCharge}
                  </span>
                </p> */}
                <p className="flex items-center justify-between border-[1px] border-gray-400 py-1.5 text-lg px-4 font-medium">
                  Total
                  <span className="font-bold tracking-wide text-lg font-titleFont">
                    ${totalAmt}
                  </span>
                </p>
              </div>
              <div className="flex justify-end">
                <button
                  className="w-52 h-10 bg-primeColor text-white hover:bg-black duration-300"
                  onClick={handleSubmit}
                >
                  Confirm order
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;
