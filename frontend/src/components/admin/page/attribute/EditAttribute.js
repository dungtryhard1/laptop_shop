import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { attributeApi } from "../../../../service/attribute.service";
import { toast } from "react-toastify";

function EditAttribute() {
  const { attributeId } = useParams();
  const [laptop, setLaptop] = useState([]);
  const nav = useNavigate();

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await attributeApi.getAttributeById(attributeId);
        setLaptop(response.data);
      } catch (error) {
        console.error("Error fetching attribute:", error);
      }
    };

    if (attributeId) {
      fetchCategory();
    }
  }, [attributeId]);

  const handleChange = (e) => {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setLaptop((prevLaptop) => ({ ...prevLaptop, [e.target.name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, description, isHidden } = laptop;
    const updatedAttribute = { name, description, isHidden };

    try {
      await attributeApi.updateAttribute(attributeId, updatedAttribute);
      nav("/admin/attributes");
      console.log("Attribute updated successfully");
      toast.success("Update Attribute Successfully!!!");
    } catch (error) {
      console.error("Error updating attribute:", error);
      toast.error(error?.response?.data?.error);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="max-w-xl w-full bg-white p-6 rounded-md shadow-md">
        <h1 className="text-2xl font-bold mb-4 text-center">Edit Category</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block mb-2 text-sm font-medium text-gray-600"
            >
              Attribute Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Attribute Name"
              value={laptop.name}
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

          <div className="flex items-center">
            <input
              id="isHidden"
              name="isHidden"
              type="checkbox"
              checked={laptop.isHidden}
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
            <Link to="/admin/attributes">
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

export default EditAttribute;
