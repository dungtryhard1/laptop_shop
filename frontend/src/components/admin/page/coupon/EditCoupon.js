import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { couponApi } from "../../../../service/coupon.service";
import { toast } from "react-toastify";
import { FaCalendarAlt } from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function EditCoupon() {
  const { couponId } = useParams();
  const [laptop, setLaptop] = useState([]);
  const nav = useNavigate();

  useEffect(() => {
    const fetchCoupon = async () => {
      try {
        const response = await couponApi.getCouponById(couponId);
        setLaptop(response.data);
      } catch (error) {
        console.error("Error fetching coupon:", error);
      }
    };

    if (couponId) {
      fetchCoupon();
    }
  }, [couponId]);

  const handleChange = (e) => {
    const value = e.target.type === "file" ? e.target.files[0] : e.target.value;
    setLaptop((prevLaptop) => ({ ...prevLaptop, [e.target.name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { descripdtion, validFrom, validUntil, discountPercent } = laptop;
    const updatedCoupon = {
      descripdtion,
      validFrom,
      validUntil,
      discountPercent,
    };

    try {
      await couponApi.updateCoupon(couponId, updatedCoupon);
      nav("/admin/coupons");
      console.log("Coupon Updated successfully");
      toast.success("Update Coupon Successfully!!!");
    } catch (error) {
      console.error("Error updating coupon:", error);
      toast.error(error?.response?.data?.error);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="max-w-xl w-full bg-white p-6 rounded-md shadow-md">
        <h1 className="text-2xl font-bold mb-4 text-center">Edit Coupon</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="code"
              className="block mb-2 text-sm font-medium text-gray-600"
            >
              Coupon Code
            </label>
            <input
              id="code"
              name="code"
              type="text"
              placeholder="Coupon Code"
              value={laptop.code}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>

          <div>
            <label
              htmlFor="description"
              className="block mb-2 text-sm font-medium text-gray-600"
            >
              Description
            </label>
            <input
              id="description"
              name="description"
              type="text"
              placeholder="Description"
              value={laptop.description}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>

          <div>
            <label
              htmlFor="validFrom"
              className="block mb-2 text-sm font-medium text-gray-600 flex items-center"
            >
              <span className="mr-2">
                <FaCalendarAlt />
              </span>
              Valid From
            </label>
            <DatePicker
              selected={laptop.validFrom ? new Date(laptop.validFrom) : null}
              onChange={(date) => setLaptop({ ...laptop, validFrom: date })}
              dateFormat="MM/dd/yyyy"
              className="w-full p-2 border border-gray-300 rounded"
              popperPlacement="bottom-start"
            />
          </div>

          <div>
            <label
              htmlFor="validUntil"
              className="block mb-2 text-sm font-medium text-gray-600 flex items-center"
            >
              <span className="mr-2">
                <FaCalendarAlt />
              </span>
              Valid Until
            </label>
            <DatePicker
              selected={laptop.validUntil ? new Date(laptop.validUntil) : null}
              onChange={(date) => setLaptop({ ...laptop, validUntil: date })}
              dateFormat="MM/dd/yyyy"
              className="w-full p-2 border border-gray-300 rounded"
              popperPlacement="bottom-start"
            />
          </div>

          <div>
            <label
              htmlFor="discountPercent"
              className="block mb-2 text-sm font-medium text-gray-600"
            >
              DiscountPercent
            </label>
            <input
              id="discountPercent"
              name="discountPercent"
              type="text"
              value={laptop.discountPercent}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          {/* <div className="block w-full p-2 border border-gray-300 rounded">
            <label
              htmlFor="status"
              className="block text-sm font-medium text-gray-700"
            >
              Status
            </label>
            <select
              name="status"
              id="status"
              onChange={handleChange}
              value={"presently"}
              className="w-full mt-1 p-2 border border-gray-300 rounded"
            >
              <option value="">Select Status</option>
              <option value="presently">Presently</option>
              <option value="hidden">Hidden</option>
            </select>
          </div> */}

          <div className="flex flex-col items-center md:flex-row md:justify-end space-y-2 md:space-y-0 mt-4">
            <button
              type="submit"
              className="w-full md:w-24 p-2 bg-blue-500 text-white rounded mr-3"
            >
              Update
            </button>
            <Link to="/admin/coupons">
              <button
                type="button"
                className="w-full md:w-24 p-2 bg-red-500 text-white rounded"
              >
                Cancel
              </button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditCoupon;
