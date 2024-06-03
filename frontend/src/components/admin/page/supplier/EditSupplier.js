import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { supplierApi } from "../../../../service/supplier.service";
import { toast } from "react-toastify";

function EditSupplier() {
  const { supplierId } = useParams();
  const [supplier, setSupplier] = useState([]);
  const nav = useNavigate();

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await supplierApi.getSupplierById(supplierId);
        setSupplier(response.data);
      } catch (error) {
        console.error("Error fetching supplier:", error);
      }
    };

    if (supplierId) {
      fetchCategory();
    }
  }, [supplierId]);

  const handleChange = (e) => {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setSupplier((prevSupplier) => ({
      ...prevSupplier,
      [e.target.name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, type, contactInfo, isHidden } = supplier;
    const updatedSupplier = { name, type, contactInfo, isHidden };

    try {
      await supplierApi.updateSupplier(supplierId, updatedSupplier);
      nav("/admin/supplier");
      console.log("Supplier updated successfully");
      toast.success("Update Supplier Successfully!!!");
    } catch (error) {
      console.error("Error updating supplier:", error);
      toast.error(error?.response?.data?.error);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="max-w-xl w-full bg-white p-6 rounded-md shadow-md">
        <h1 className="text-2xl font-bold mb-4 text-center">Edit Supplier</h1>
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
              value={supplier.name}
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
              value={supplier.type}
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
              value={supplier.contactInfo}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>

          <div className="flex items-center">
            <input
              id="isHidden"
              name="isHidden"
              type="checkbox"
              checked={supplier.isHidden}
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

export default EditSupplier;
