import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { warrantyApi } from "../../../service/warranty.service";
import { supplierApi } from "../../../service/supplier.service";
import { categoryApi } from "../../../service/category.service";
import { productApi } from "../../../service/product.service";
import { toast } from "react-toastify";
import { attributeApi } from "../../../service/attribute.service";

function EditProduct() {
  const [files, setFiles] = useState([]);
  const [warranties, setWarranties] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [categories, setCategories] = useState([]);
  const [attributes, setAttributes] = useState([]);
  const [attributesDetail, setAttributesDetail] = useState([]);
  const { productId } = useParams();
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
    newImage: [],
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          productRespone,
          warrantyResponse,
          supplierResponse,
          categoryResponse,
          attributeResponse,
          attributeDetail,
        ] = await Promise.all([
          productApi.getProductById(productId),
          warrantyApi.getWarranty(),
          supplierApi.getSupplier(),
          categoryApi.getCategory(),
          attributeApi.getAttribute(),
          attributeApi.getDetailAttribute(),
        ]);
        setLaptop(productRespone.data);
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

  const [laptop, setLaptop] = useState([]);
  // console.log(laptop);
  const [customAttributes, setCustomAttributes] = useState({});

  // useEffect(() => {
  //   if (warranties.length > 0) {
  //     setLaptop((prevState) => ({
  //       ...prevState,
  //       warrantyId: warranties[0]?._id,
  //       supplierId: suppliers[0]?._id,
  //       categoryId: categories[0]?._id,
  //     }));
  //   }
  // }, [warranties, suppliers, categories]);

  const handleDeleteImage = (imageId) => {
    // Lọc ra danh sách hình ảnh mới mà không bao gồm hình ảnh có id trùng với imageId được truyền vào
    const updatedImages = laptop.images.filter(
      (image) => image._id !== imageId
    );
    // Cập nhật state laptop với danh sách hình ảnh mới
    setLaptop((prevState) => ({
      ...prevState,
      images: updatedImages,
    }));
  };

  const handleChangeHidden = (e) => {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setLaptop((prevLaptop) => ({ ...prevLaptop, [e.target.name]: value }));
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "newImage") {
      const imageFiles = Array.from(files);
      setLaptop({ ...laptop, [name]: imageFiles });
      const selectedFiles = Array.from(e.target.files);
      setFiles([...selectedFiles]);
    } else {
      if (
        name === "name" ||
        name === "price" ||
        name === "stockQuantity" ||
        name === "description"
      ) {
        setLaptop({ ...laptop, [name]: value });
      } else if (
        name === "supplierId" ||
        name === "warrantyId" ||
        name === "categoryId"
      ) {
        setLaptop({ ...laptop, [name]: { _id: value, name: value } });
      } else {
        const attributeId = name;
        const newValue = { _id: value, key: attributeId, value };
        setLaptop((prevState) => ({
          ...prevState,
          attribute: [
            ...prevState.attribute.filter((attr) => attr.key !== attributeId),
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
    const newValue = { key: attributeIds, value };
    setLaptop((prevState) => ({
      ...prevState,
      attribute: [
        ...prevState.attribute.filter((attr) => attr.key !== attributeIds),
        newValue,
      ],
    }));
    // console.log(laptop);
  };
  const handleSubmit = async (e) => {
    handleCustomInputChange;
    e.preventDefault();
    console.log("clm");
    try {
      const formData = new FormData();
      if (laptop.newImage) {
        laptop?.newImage.forEach((imageFile, index) => {
          formData.append(`images`, imageFile, `images.${index}`);
        });
      }
      // for (const key in laptop) {
      //   if (key !== "newImage" && key !== "attribute" && key !== "_id") {
      //     formData.append(key, laptop[key]);
      //   }
      // }
      formData.append("product[name]", laptop.name);
      formData.append("product[description]", laptop.description);
      formData.append("product[price]", laptop.price);
      formData.append("product[stockQuantity]", laptop.stockQuantity);
      formData.append("product[warrantyId]", laptop.warrantyId._id);
      formData.append("product[supplierId]", laptop.supplierId._id);
      formData.append("product[categoryId]", laptop.categoryId._id);
      formData.append("product[isHidden]", laptop.isHidden);
      laptop?.images.forEach((img, index) => {
        formData.append(`product[images][${index}][url]`, img.url);
        formData.append(`product[images][${index}][publicId]`, img.publicId);
        formData.append(`product[images][${index}][isMain]`, img.isMain);
        formData.append(`product[images][${index}][_id]`, img._id);
        formData.append(`product[images][${index}][createdAt]`, img.createdAt);
        formData.append(`product[images][${index}][updatedAt]`, img.updatedAt);
      });
      // console.log("clm2");
      // console.log(laptop);
      laptop.attribute.forEach((attribute, index) => {
        if (attributesDetail.some((detail) => detail._id === attribute._id)) {
          formData.append(`product[attribute][${index}][_id]`, attribute._id);
          formData.append(`product[attribute][${index}][key]`, attribute.key);
          formData.append(
            `product[attribute][${index}][value]`,
            attribute.value
          );
          console.log("aloalo");
        } else {
          formData.append(`product[attribute][${index}][key]`, attribute.key);
          formData.append(
            `product[attribute][${index}][value]`,
            attribute.value
          );
        }
      });
      // console.log(formData);
      console.log(laptop);
      toast.info("Update product will take a few seconds !!!");

      const response = await productApi.updateProduct(formData, productId);
      toast.success("Edit Product Successfully!!!");
      nav("/admin/products");

      console.log("API Response:", response.data);
    } catch (error) {
      toast.error(error?.response?.data?.error);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4 text-center mt-10">
        Edit Product
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
          value={laptop?.name}
        />
        <textarea
          name="description"
          onChange={handleChange}
          placeholder="Description"
          className="block w-full p-2 border border-gray-300 rounded"
          value={laptop?.description}
        ></textarea>
        <input
          name="price"
          type="number"
          step="0.01"
          placeholder="Price"
          onChange={handleChange}
          className="block w-full p-2 border border-gray-300 rounded"
          value={laptop?.price}
        />
        <input
          name="stockQuantity"
          type="number"
          step="0.01"
          placeholder="Stock Quantity"
          onChange={handleChange}
          className="block w-full p-2 border border-gray-300 rounded"
          value={laptop?.stockQuantity}
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
                    // selected={laptop.attribute.find(attr => attr.key === filteredDetail._id) }
                    selected={
                      laptop.attribute.find(
                        (attr) => attr._id === filteredDetail._id
                      )
                        ? true
                        : false
                    }
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
              value={laptop?.warrantyId?._id}
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
              value={laptop?.supplierId?._id}
              className="w-full mt-1 p-2 border border-gray-300 rounded"
            >
              {suppliers.map((supplier) => (
                <option
                  key={supplier._id}
                  value={supplier._id}
                  selected={supplier._id === laptop.supplierId}
                >
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
              value={laptop?.categoryId?._id}
              className="w-full mt-1 p-2 border border-gray-300 rounded"
            >
              {categories.map((category) => (
                <option
                  key={category._id}
                  value={category._id}
                  selected={category._id === laptop.categoryId}
                >
                  {category.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex items-center">
          <input
            id="isHidden"
            name="isHidden"
            type="checkbox"
            checked={laptop?.isHidden}
            onChange={handleChangeHidden}
            className="mr-2 h-6 w-6 text-blue-600 rounded border-gray-300 focus:ring-indigo-500"
          />
          <label
            htmlFor="isHidden"
            className="text-sm font-medium text-gray-600"
          >
            Hide Product
          </label>
        </div>
        <div className="flex">
          {laptop?.images?.map((image) => (
            <div key={image._id}>
              <img
                className="mr-2 mb-2"
                width={100}
                src={image.url}
                alt={`Preview ${image._id}`}
              />
              <button
                key={`button_${image._id}`}
                type="button"
                className="w-full md:w-24 p-2 bg-red-500 text-white rounded"
                onClick={() => handleDeleteImage(image._id)}
              >
                delete
              </button>
            </div>
          ))}
        </div>
        <div className="flex">
          <label>ADD NEW IMAGES</label>
          <input
            name="newImage"
            type="file"
            onChange={handleChange}
            className="block w-full p-2 border border-gray-300 rounded"
            multiple
          />
        </div>
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
              type="button"
              onClick={handleSubmit}
              className="w-full md:w-24 p-2 bg-blue-500 text-white rounded mr-3"
            >
              Update
            </button>
          </Link>
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

export default EditProduct;
