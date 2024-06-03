import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { warrantyApi } from "../../../service/warranty.service";
import { supplierApi } from "../../../service/supplier.service";
import { categoryApi } from "../../../service/category.service";
import { productApi } from "../../../service/product.service";
import { toast } from "react-toastify";
import { attributeApi } from "../../../service/attribute.service";

function AddProduct() {
  const [files, setFiles] = useState([]);
  const [warranties, setWarranties] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [categories, setCategories] = useState([]);
  const [attributes, setAttributes] = useState([]);
  const [attributesDetail, setAttributesDetail] = useState([]);
  const nav = useNavigate();
  const initialState = {
    name: "",
    description: "",
    price: 0.0,
    stockQuantity: 0.0,
    supplierId: "",
    warrantyId: "",
    categoryId: "",
    attributes: [],
    images: [],
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          warrantyResponse,
          supplierResponse,
          categoryResponse,
          attributeResponse,
          attributeDetail,
        ] = await Promise.all([
          warrantyApi.getWarranty(),
          supplierApi.getSupplier(),
          categoryApi.getCategory(),
          attributeApi.getAttribute(),
          attributeApi.getDetailAttribute(),
        ]);

        setWarranties(warrantyResponse.data);
        setSuppliers(supplierResponse.data);
        setCategories(categoryResponse.data);
        setAttributes(attributeResponse.data);
        setAttributesDetail(attributeDetail.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const [laptop, setLaptop] = useState(initialState);
  const [customAttributes, setCustomAttributes] = useState({});

  useEffect(() => {
    if (warranties.length > 0) {
      setLaptop((prevState) => ({
        ...prevState,
        warrantyId: warranties[0]?._id,
        supplierId: suppliers[0]?._id,
        categoryId: categories[0]?._id,
      }));
    }
  }, [warranties, suppliers, categories]);



  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "images") {
      const imageFiles = Array.from(files);
      setLaptop({ ...laptop, [name]: imageFiles });
      const selectedFiles = Array.from(e.target.files);
      setFiles([...selectedFiles]);
    } else {
      if (
        name === "name" ||
        name === "price" ||
        name === "stockQuantity" ||
        name === "description" ||
        name === "supplierId" ||
        name === "warrantyId" ||
        name === "categoryId"
      ) {
        setLaptop({ ...laptop, [name]: value });
      } else {

        const attributeId = name;
        const newValue = { name: attributeId, value };
        setLaptop((prevState) => ({
          ...prevState,
          attributes: [
            ...prevState.attributes.filter((attr) => attr.name !== attributeId),
            newValue,
          ],
        }));
        // Kiểm tra nếu giá trị là "Custom" thì cập nhật trạng thái custom
        if (value === "Custom") {
          setCustomAttributes((prevCustom) => ({
            ...prevCustom,
            [attributeId]: true,
          }));
          
          handleCustomInputChange(e, attributeId);
        } else {
          setCustomAttributes((prevCustom) => ({
            ...prevCustom,
            [attributeId]: false,
          }));
        }
      }
    }
  };
  const handleCustomInputChange = (e, attributeId) => {
    const { name, value } = e.target;
    setCustomAttributes((prevCustom) => ({
      ...prevCustom,
      [attributeId]: value !== "", // Cập nhật trạng thái custom dựa trên giá trị nhập vào
    }));
    // Cập nhật giá trị của thuộc tính trong laptop.attributes
    const attributeIds = name;
    const newValue = { name: attributeIds, value };
    setLaptop((prevState) => ({
      ...prevState,
      attributes: [
        ...prevState.attributes.filter((attr) => attr.name !== attributeIds),
        newValue,
      ],
    }));
    // console.log(laptop);
  };
  const handleSubmit = async (e) => {
    handleCustomInputChange
    e.preventDefault();
    try {
      const formData = new FormData();

      laptop.images.forEach((imageFile, index) => {
        formData.append("images", imageFile, `images.${index}`);
      });

      for (const key in laptop) {
        if (key !== "images" && key !== "attributes") {
          formData.append(key, laptop[key]);
        }
      }

      laptop.attributes.forEach((attribute, index) => {
        if (attributesDetail.some((detail) => detail._id === attribute.value)) {
          formData.append(`attribute[${index}][_id]`, attribute.value);
          formData.append(`attribute[${index}][key]`, attribute.name);
          formData.append(`attribute[${index}][value]`, attribute.value);
        } else {
          formData.append(`attribute[${index}][key]`, attribute.name);
          formData.append(`attribute[${index}][value]`, attribute.value);
        }
      });
      console.log(formData);
      // console.log(laptop);
      toast.info("Creating a new product will take a few seconds !!!");

      const response = await productApi.createProduct(formData);
      toast.success("Add New Product Successfully!!!");
      nav("/admin/products");

      // console.log("API Response:", response.data);
    } catch (error) {
      toast.error(error?.response?.data?.error);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4 text-center mt-10">
        Add New Product
      </h1>
      <form
        onSubmit={handleSubmit}
        className="space-y-4 md:w-2/3 lg:w-1/2 mx-auto"
      >
        <input
          name="name"
          placeholder="Product Name"
          onChange={handleChange}
          className="block w-full p-2 border border-gray-300 rounded"
        />
        <textarea
          name="description"
          onChange={handleChange}
          placeholder="Description"
          className="block w-full p-2 border border-gray-300 rounded"
        ></textarea>
        <input
          name="price"
          type="number"
          step="0.01"
          placeholder="Price"
          onChange={handleChange}
          className="block w-full p-2 border border-gray-300 rounded"
        />
        <input
          name="stockQuantity"
          type="number"
          step="0.01"
          placeholder="Stock Quantity"
          onChange={handleChange}
          className="block w-full p-2 border border-gray-300 rounded"
        />
        {attributes.map((attribute) => (
          <div
            key={attribute._id}
            className="block w-full p-2 border border-gray-300 rounded"
          >
            <label
              htmlFor={attribute._id}
              className="block text-sm font-medium text-gray-700"
            >
              {attribute.name}
            </label>
            <select
              name={attribute._id}
              id={attribute._id}
              onChange={handleChange}
              className="w-full mt-1 p-2 border border-gray-300 rounded"
            >
              <option value="">Select {attribute.name}</option>
              <option value="Custom">Custom</option>
              {attributesDetail
                .filter((detail) => detail.key === attribute._id)
                .map((filteredDetail) => (
                  <option
                    key={filteredDetail._id}
                    value={filteredDetail._id}
                  >
                    {filteredDetail.value}
                  </option>
                ))}
            </select>
            {/* // Hiển thị ô input tương ứng nếu thuộc tính được chọn là "Custom" */}
            {customAttributes[attribute._id] && (
              <input
                type="text"
                name={attribute._id}
                placeholder={`Custom ${attribute.name}`}
                onChange={handleCustomInputChange}
                className="block w-full mt-1 p-2 border border-gray-300 rounded"
              />
            )}
          </div>
        ))}
        <div className="flex">
          <div className="block w-full p-2 border border-gray-300 rounded">
            <label
              htmlFor="WarrantyProduct"
              className="block text-sm font-medium text-gray-700"
            >
              Warranty
            </label>
            <select
              name="warrantyId"
              id="warrantyId"
              onChange={handleChange}
              value={laptop.status}
              className="w-full mt-1 p-2 border border-gray-300 rounded"
            >
              {warranties.map((warranty) => (
                <option key={warranty._id} value={warranty._id}>
                  {new Date(warranty.validUntil).toLocaleDateString("en-US")}
                </option>
              ))}
            </select>
          </div>
          <div className="block w-full p-2 border border-gray-300 rounded">
            <label
              htmlFor="Supplier"
              className="block text-sm font-medium text-gray-700"
            >
              Supplier
            </label>
            <select
              name="supplierId"
              id="supplierId"
              onChange={handleChange}
              value={laptop.status}
              className="w-full mt-1 p-2 border border-gray-300 rounded"
            >
              {suppliers.map((supplier) => (
                <option key={supplier._id} value={supplier._id}>
                  {supplier.name}
                </option>
              ))}
            </select>
          </div>
          <div className="block w-full p-2 border border-gray-300 rounded">
            <label
              htmlFor="Categories"
              className="block text-sm font-medium text-gray-700"
            >
              Category
            </label>
            <select
              name="categoryId"
              id="categoryId"
              onChange={handleChange}
              value={laptop.status}
              className="w-full mt-1 p-2 border border-gray-300 rounded"
            >
              {categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <input
          name="images"
          type="file"
          onChange={handleChange}
          className="block w-full p-2 border border-gray-300 rounded"
          multiple
        />
        <div className=" flex gap-3 h-16 w-full">
          {files.map((file, index) => (
            <img
              className=""
              key={index}
              src={URL.createObjectURL(file)}
              alt={`Preview ${index}`}
            />
          ))}
        </div>
        <div className="flex flex-col items-center md:flex-row md:justify-end space-y-2 md:space-y-0 mt-4">
          <Link to="/admin/products">
            <button
              onClick={handleSubmit}
              className="w-full md:w-24 p-2 bg-blue-500 text-white rounded mr-3"
            >
              Add
            </button>
          </Link>
          <button
            type="reset"
            className="w-full md:w-24 p-2 bg-yellow-500 text-white rounded mr-3"
          >
            Reset
          </button>
          <Link to="/admin/products">
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
  );
}

export default AddProduct;
