import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supplierApi } from "../../../../service/supplier.service";
import { toast } from "react-toastify";

function AddSupplier() {
  const initialState = {
    name: "",
    type: "",
    contactInfo: "",
  };

  const [supplier, setSupplier] = useState(initialState);
  const nav = useNavigate();

  const handleChange = (e) => {
    const value = e.target.type === "file" ? e.target.files[0] : e.target.value;
    setSupplier({ ...supplier, [e.target.name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await supplierApi.createSupplier(supplier);
      nav("/admin/supplier");
      toast.success("Add New Supplier Successfully!!!");
      console.log("API Response:", response.data);
    } catch (error) {
      console.error("Error creating supplier:", error);
      toast.error(error?.response?.data?.error);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="max-w-xl w-full bg-white p-6 rounded-md shadow-md">
        <h1 className="text-2xl font-bold mb-4 text-center">
          Add New Supplier
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block mb-2 text-sm font-medium text-gray-600"
            >
              Supplier Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Supplier Name"
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div>
            <label
              htmlFor="type"
              className="block mb-2 text-sm font-medium text-gray-600"
            >
              Type
            </label>
            <input
              id="type"
              name="type"
              type="text"
              placeholder="Type"
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div>
            <label
              htmlFor="contactInfo"
              className="block mb-2 text-sm font-medium text-gray-600"
            >
              ContactInfo
            </label>
            <input
              id="contactInfo"
              name="contactInfo"
              type="text"
              placeholder="ContactInfo"
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
              Add
            </button>
            {/* Reset button */}
            <button
              type="reset"
              className="w-full md:w-24 p-2 bg-yellow-500 text-white rounded mr-3"
            >
              Reset
            </button>
            {/* Cancel button */}
            <Link to="/admin/supplier">
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

export default AddSupplier;
