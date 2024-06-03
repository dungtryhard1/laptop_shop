import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { warrantyApi } from "../../../../service/warranty.service";
import { toast } from "react-toastify";
import { FaCalendarAlt } from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function EditWarranty() {
  const { warrantyId } = useParams();
  const [warranty, setWarranty] = useState({
    validUntil: "",
    description: "",
    isHidden: false,
  });
  const nav = useNavigate();

  useEffect(() => {
    const fetchWarranty = async () => {
      try {
        const response = await warrantyApi.getWarrantyById(warrantyId);
        setWarranty(response.data);
      } catch (error) {
        console.error("Error fetching warranty:", error);
      }
    };
    fetchWarranty();
  }, [warrantyId]);

  const handleChange = (e) => {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setWarranty((prevLaptop) => ({ ...prevLaptop, [e.target.name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { validUntil, description, isHidden } = warranty;
    const updatedWarranty = { validUntil, description, isHidden };

    try {
      const response = await warrantyApi.updateWarranty(
        warrantyId,
        updatedWarranty
      );
      nav("/admin/warranty");
      toast.success("Update Warranty Successfully!!!");
      console.log("API Response:", response.data);
    } catch (error) {
      console.error("Error updating warranty:", error);
      toast.error(error?.response?.data?.error);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="max-w-xl w-full bg-white p-6 rounded-md shadow-md">
        <h1 className="text-2xl font-bold mb-4 text-center">Edit Warranty</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
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
              selected={
                warranty.validUntil ? new Date(warranty.validUntil) : null
              }
              onChange={(date) =>
                setWarranty({ ...warranty, validUntil: date })
              }
              dateFormat="MM/dd/yyyy"
              className="w-full p-2 border border-gray-300 rounded"
              popperPlacement="bottom-start"
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
              value={warranty.description}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="flex items-center">
            <input
              id="isHidden"
              name="isHidden"
              type="checkbox"
              checked={warranty.isHidden}
              onChange={handleChange}
              className="mr-2 h-6 w-6 text-blue-600 rounded border-gray-300 focus:ring-indigo-500"
            />
            <label
              htmlFor="isHidden"
              className="text-sm font-medium text-gray-600"
            >
              Hide Category
            </label>
          </div>
          {/* 
          <div className="block w-full p-2 border border-gray-300 rounded">
            <label
              htmlFor="status"
              className="block text-sm font-medium text-gray-700"
            >
              Status
            </label>
            <select
              name="status"
              id="status"
              value="available"
              className="w-full mt-1 p-2 border border-gray-300 rounded"
            >
              <option value="">Select Status</option>
              <option value="available">Presently</option>
              <option value="out_of_stock">Hidden</option>
            </select>
          </div> */}

          <div className="flex flex-col items-center md:flex-row md:justify-end space-y-2 md:space-y-0 mt-4">
            <button
              type="submit"
              className="w-full md:w-24 p-2 bg-blue-500 text-white rounded mr-3"
            >
              Update
            </button>
            <Link to="/admin/warranty">
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

export default EditWarranty;
