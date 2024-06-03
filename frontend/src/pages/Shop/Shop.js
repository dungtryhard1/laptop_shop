import { useEffect, useState } from "react";
import NavTitle from "../../components/pageProps/shopPage/shopBy/NavTitle";
import { publicProductApi } from "../../service/publicProduct.Service";
import Product from "../../components/home/Products/Product";

const Shop = () => {
  const [filterProduct, setFilterProduct] = useState([]);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [attributes, setAttributes] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedPriceRange, setSelectedPriceRange] = useState(null);
  const [selectedAttributes, setSelectedAttributes] = useState([]);
  const [selectedSuppliers, setSelectedSuppliers] = useState([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isPriceFilterOpen, setIsPriceFilterOpen] = useState(false);
  const [isSupplierFilterOpen, setIsSupplierFilterOpen] = useState(false);
  const [isAttributeFilterOpen, setIsAttributeFilterOpen] = useState(false);
  const [isAttributeKeyFilterOpen, setIsAttributeKeyFilterOpen] =
    useState(false);
  const [sortName, setSortName] = useState("");
  const [sortPrice, setSortPrice] = useState("");
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(12);
  const [noProductFound, setNoProductFound] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleGetByCategory = (categoryId) => {
    const isSelected = selectedCategories.includes(categoryId);
    if (!isSelected) {
      setSelectedCategories([...selectedCategories, categoryId]);
    } else {
      const updatedCategories = selectedCategories.filter(
        (id) => id !== categoryId
      );
      setSelectedCategories(updatedCategories);
    }
    setPage(1);
  };

  const handleGetByPrice = (from, to) => {
    setSelectedPriceRange({ from, to });
    setPage(1);
  };

  const handleGetAllProduct = () => {
    setSelectedCategories([]);
    setSelectedPriceRange(null);
    setSelectedAttributes([]);
    setSelectedSuppliers([]);
  };

  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  const togglePriceFilter = () => {
    setIsPriceFilterOpen(!isPriceFilterOpen);
  };

  const toggleSupplierFilter = () => {
    setIsSupplierFilterOpen(!isSupplierFilterOpen);
  };

  const toggleAttributeFilter = () => {
    setIsAttributeFilterOpen(!isAttributeFilterOpen);
  };

  const toggleAttributeKeyFilter = () => {
    setIsAttributeKeyFilterOpen(!isAttributeKeyFilterOpen);
  };

  const handleChangePage = (newPage) => {
    setPage(newPage);
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      const [
        productResponse,
        categoryResponse,
        supplierResponse,
        attributeResponse,
      ] = await Promise.all([
        publicProductApi.getAllProduct({
          category: selectedCategories,
          priceMin: selectedPriceRange?.from,
          priceMax: selectedPriceRange?.to,
          attribute: selectedAttributes,
          supplier: selectedSuppliers,
          sortName: sortName,
          sortPrice: sortPrice,
          page: page,
          perPage: perPage,
        }),
        publicProductApi.getcategory(),
        publicProductApi.getSupplier(),
        publicProductApi.getAttribute(),
      ]);

      setProducts(productResponse.data.totalCount);
      setFilterProduct(productResponse.data.products);
      setCategories(categoryResponse.data);
      setSuppliers(supplierResponse.data);
      setAttributes(attributeResponse.data);

      if (productResponse.data.products.length === 0) {
        setNoProductFound(true);
      } else {
        setNoProductFound(false);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [sortName, sortPrice, page, perPage]);

  const handleSupplierChange = (supplierId) => {
    const isSelected = selectedSuppliers.includes(supplierId);
    if (!isSelected) {
      setSelectedSuppliers([...selectedSuppliers, supplierId]);
    } else {
      const updatedSuppliers = selectedSuppliers.filter(
        (id) => id !== supplierId
      );
      setSelectedSuppliers(updatedSuppliers);
    }
    setPage(1);
  };

  const handleAttributeChange = (attributeId) => {
    const isSelected = selectedAttributes.includes(attributeId);
    console.log(attributeId);
    if (!isSelected) {
      setSelectedAttributes([...selectedAttributes, attributeId]);
    } else {
      const updatedAttributes = selectedAttributes.filter(
        (id) => id !== attributeId
      );
      setSelectedAttributes(updatedAttributes);
    }
    setPage(1);
  };

  const handleSearch = async () => {
    setPage(1);
    fetchData();
  };

  const handleSortChange = (value) => {
    if (value === "name_asc") {
      setSortName("asc");
      setSortPrice("");
    } else if (value === "name_desc") {
      setSortName("desc");
      setSortPrice("");
    } else if (value === "price_asc") {
      setSortPrice("asc");
      setSortName("");
    } else if (value === "price_desc") {
      setSortPrice("desc");
      setSortName("");
    } else {
      setSortName("");
      setSortPrice("");
    }
    setPage(1);
  };

  return (
    <div className="max-w-container mx-auto px-4">
      <div className="w-full h-full flex pb-20 gap-10">
        <div className="w-[20%] lgl:w-[25%] hidden mdl:inline-flex h-full">
          <div className="w-full flex flex-col gap-6">
            {loading && (
              <div className="absolute bg-white bg-opacity-60 z-10 h-full w-full flex items-center justify-center">
                <div className="flex items-center">
                  <span className="text-3xl mr-4">Loading</span>
                  <svg
                    className="animate-spin h-8 w-8 text-gray-800"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                </div>
              </div>
            )}
            <div className="w-full">
              <div className="flex items-center justify-between mt-5">
                <NavTitle title="Shop by Category" icons={false} />
                <button
                  onClick={toggleFilter}
                  className="focus:outline-none mb-3"
                >
                  {isFilterOpen ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 "
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 15l7-7 7 7"
                      />
                    </svg>
                  )}
                </button>
              </div>
              <div className={`${isFilterOpen ? "block" : "hidden"}`}>
                <ul className="mb-3 flex flex-col gap-4 text-sm lg:text-base text-[#767676]">
                  {categories?.map((category) => (
                    <li
                      key={category._id}
                      onClick={() => handleGetByCategory(category._id)}
                      className={`border-b-[1px] border-b-[#F0F0F0] pb-2 flex cursor-pointer hover:text-slate-950 ${
                        selectedCategories.includes(category._id)
                          ? "text-slate-950"
                          : ""
                      }`}
                    >
                      <div className="flex items-center me-4">
                        <label className="relative flex items-center p-3 rounded-full cursor-pointer">
                          <input
                            type="checkbox"
                            className="peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-blue-gray-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-gray-900 checked:bg-gray-900 checked:before:bg-gray-900 hover:before:opacity-10"
                            id={category._id}
                            checked={selectedCategories.includes(category._id)}
                            onChange={() => handleGetByCategory(category._id)}
                          />
                          <span className="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-3.5 w-3.5"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                              stroke="currentColor"
                              strokeWidth="1"
                            >
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              ></path>
                            </svg>
                          </span>
                        </label>
                        <label
                          htmlFor={category._id}
                          className="ms-2 text-sm font-medium text-gray-900"
                        >
                          {category.name}
                        </label>
                      </div>
                    </li>
                  ))}

                  <li
                    onClick={handleGetAllProduct}
                    className={`border-b-[1px] border-b-[#F0F0F0] pb-2 flex cursor-pointer hover:text-slate-950 ${
                      selectedCategories === null ? "text-slate-950" : ""
                    }`}
                  >
                    <div className="flex items-center me-4">
                      <label className="relative flex items-center p-3 rounded-full cursor-pointer">
                        <input
                          type="checkbox"
                          className="peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-blue-gray-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-gray-900 checked:bg-gray-900 checked:before:bg-gray-900 hover:before:opacity-10"
                          id="allCheckbox"
                          checked={
                            selectedCategories === null ||
                            selectedCategories.length === 0
                          }
                          onChange={handleGetAllProduct}
                        />
                        <span className="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-3.5 w-3.5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            stroke="currentColor"
                            strokeWidth="1"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            ></path>
                          </svg>
                        </span>
                      </label>
                      <label
                        htmlFor="allCheckbox"
                        className="ms-2 text-sm font-medium text-gray-900"
                      >
                        All
                      </label>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="flex items-center justify-between">
                <NavTitle title="Shop by Price" icons={false} />
                <button
                  onClick={togglePriceFilter}
                  className="focus:outline-none mb-3"
                >
                  {isPriceFilterOpen ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 15l7-7 7 7"
                      />
                    </svg>
                  )}
                </button>
              </div>

              <div className={`${isPriceFilterOpen ? "block" : "hidden"}`}>
                <ul className="mb-3 flex flex-col gap-4 text-sm lg:text-base text-[#767676]">
                  <li
                    onClick={() => handleGetByPrice(0, 100)}
                    className={`border-b-[1px] border-b-[#F0F0F0] pb-2 flex cursor-pointer hover:text-slate-950 ${
                      selectedPriceRange?.from === 0 &&
                      selectedPriceRange?.to === 100
                        ? "text-slate-950"
                        : ""
                    }`}
                  >
                    <div className="flex items-center me-4">
                      <label className="relative flex items-center p-3 rounded-full cursor-pointer">
                        <input
                          type="checkbox"
                          className="peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-blue-gray-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-gray-900 checked:bg-gray-900 checked:before:bg-gray-900 hover:before:opacity-10"
                          checked={
                            selectedPriceRange?.from === 0 &&
                            selectedPriceRange?.to === 100
                          }
                          onChange={() => handleGetByPrice(0, 100)}
                        />
                        <span className="absolute text-white transition-opacity opacity-0 pointer-events-none top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 peer-checked:opacity-100">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            stroke="currentColor"
                            strokeWidth="1"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            ></path>
                          </svg>
                        </span>
                      </label>
                      <p className="ml-1">0 - 100$</p>
                    </div>
                  </li>
                  <li
                    onClick={() => handleGetByPrice(100, 500)}
                    className={`border-b-[1px] border-b-[#F0F0F0] pb-2 flex cursor-pointer hover:text-slate-950 ${
                      selectedPriceRange?.from === 100 &&
                      selectedPriceRange?.to === 500
                        ? "text-slate-950"
                        : ""
                    }`}
                  >
                    <div className="flex items-center me-4">
                      <label className="relative flex items-center p-3 rounded-full cursor-pointer">
                        <input
                          type="checkbox"
                          className="peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-blue-gray-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-gray-900 checked:bg-gray-900 checked:before:bg-gray-900 hover:before:opacity-10"
                          checked={
                            selectedPriceRange?.from === 100 &&
                            selectedPriceRange?.to === 500
                          }
                          onChange={() => handleGetByPrice(100, 500)}
                        />
                        <span className="absolute text-white transition-opacity opacity-0 pointer-events-none top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 peer-checked:opacity-100">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            stroke="currentColor"
                            strokeWidth="1"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            ></path>
                          </svg>
                        </span>
                      </label>
                      <p className="ml-1">100$ - 500$</p>
                    </div>
                  </li>
                  <li
                    onClick={() => handleGetByPrice(500, Infinity)}
                    className={`border-b-[1px] border-b-[#F0F0F0] pb-2 flex cursor-pointer hover:text-slate-950 ${
                      selectedPriceRange?.from === 500 &&
                      selectedPriceRange?.to === Infinity
                        ? "text-slate-950"
                        : ""
                    }`}
                  >
                    <div className="flex items-center me-4">
                      <label className="relative flex items-center p-3 rounded-full cursor-pointer">
                        <input
                          type="checkbox"
                          className="peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-blue-gray-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-gray-900 checked:bg-gray-900 checked:before:bg-gray-900 hover:before:opacity-10"
                          checked={
                            selectedPriceRange?.from === 500 &&
                            selectedPriceRange?.to === Infinity
                          }
                          onChange={() => handleGetByPrice(500, Infinity)}
                        />
                        <span className="absolute text-white transition-opacity opacity-0 pointer-events-none top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 peer-checked:opacity-100">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4"
                            viewBox="0 0 
              20 20"
                            fill="currentColor"
                            stroke="currentColor"
                            strokeWidth="1"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            ></path>
                          </svg>
                        </span>
                      </label>
                      <p className="ml-1">More than 500$</p>
                    </div>
                  </li>
                  <li
                    onClick={handleGetAllProduct}
                    className={`border-b-[1px] border-b-[#F0F0F0] pb-2 flex cursor-pointer hover:text-slate-950 ${
                      selectedPriceRange === null ? "text-slate-950" : ""
                    }`}
                  >
                    <div className="flex items-center me-4">
                      <label className="relative flex items-center p-3 rounded-full cursor-pointer">
                        <input
                          type="checkbox"
                          className="peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-blue-gray-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-gray-900 checked:bg-gray-900 checked:before:bg-gray-900 hover:before:opacity-10"
                          checked={!selectedPriceRange}
                          onChange={handleGetAllProduct}
                        />
                        <span className="absolute text-white transition-opacity opacity-0 pointer-events-none top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 peer-checked:opacity-100">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            stroke="currentColor"
                            strokeWidth="1"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            ></path>
                          </svg>
                        </span>
                      </label>
                      <p className="ml-1">All</p>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="flex items-center justify-between">
                <NavTitle title="Shop by Supplier" icons={false} />
                <button
                  onClick={toggleSupplierFilter}
                  className="focus:outline-none mb-3"
                >
                  {isSupplierFilterOpen ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 15l7-7 7 7"
                      />
                    </svg>
                  )}
                </button>
              </div>

              <div className={`${isSupplierFilterOpen ? "block" : "hidden"}`}>
                <ul className="mb-3 flex flex-col gap-4 text-sm lg:text-base text-[#767676]">
                  {suppliers?.map((supplier) => (
                    <li
                      key={supplier._id}
                      onClick={() => handleSupplierChange(supplier._id)}
                      className={`border-b-[1px] border-b-[#F0F0F0] pb-2 flex cursor-pointer hover:text-slate-950 ${
                        selectedSuppliers.includes(supplier._id)
                          ? "text-slate-950"
                          : ""
                      }`}
                    >
                      <div className="flex items-center me-4">
                        <label className="relative flex items-center p-3 rounded-full cursor-pointer">
                          <input
                            type="checkbox"
                            className="peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-blue-gray-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-gray-900 checked:bg-gray-900 checked:before:bg-gray-900 hover:before:opacity-10"
                            id={supplier._id}
                            checked={selectedSuppliers.includes(supplier._id)}
                            onChange={() => handleSupplierChange(supplier._id)}
                          />
                          <span className="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-3.5 w-3.5"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                              stroke="currentColor"
                              strokeWidth="1"
                            >
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              ></path>
                            </svg>
                          </span>
                        </label>
                        <label
                          htmlFor={supplier._id}
                          className="ms-2 text-sm font-medium text-gray-900"
                        >
                          {supplier.name}
                        </label>
                      </div>
                    </li>
                  ))}

                  <li
                    onClick={handleGetAllProduct}
                    className={`border-b-[1px] border-b-[#F0F0F0] pb-2 flex cursor-pointer hover:text-slate-950 ${
                      selectedSuppliers === null ? "text-slate-950" : ""
                    }`}
                  >
                    <div className="flex items-center me-4">
                      <label className="relative flex items-center p-3 rounded-full cursor-pointer">
                        <input
                          type="checkbox"
                          className="peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-blue-gray-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-gray-900 checked:bg-gray-900 checked:before:bg-gray-900 hover:before:opacity-10"
                          id="allCheckbox"
                          checked={
                            selectedSuppliers === null ||
                            selectedSuppliers.length === 0
                          }
                          onChange={handleGetAllProduct}
                        />
                        <span className="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-3.5 w-3.5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            stroke="currentColor"
                            strokeWidth="1"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            ></path>
                          </svg>
                        </span>
                      </label>
                      <label
                        htmlFor="allCheckbox"
                        className="ms-2 text-sm font-medium text-gray-900"
                      >
                        All
                      </label>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="flex items-center justify-between">
                <NavTitle title="Shop by Attribute" icons={false} />
                <button
                  onClick={toggleAttributeFilter}
                  className="focus:outline-none mb-4"
                >
                  {isAttributeFilterOpen ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 15l7-7 7 7"
                      />
                    </svg>
                  )}
                </button>
              </div>

              <div className={`${isAttributeFilterOpen ? "block" : "hidden"}`}>
                <ul className="flex flex-col gap-4 text-sm lg:text-base text-[#33333]">
                  {attributes?.map((attribute) => (
                    <div key={attribute._id} className="mb-4">
                      <div className="flex items-center justify-between">
                        <h1 className="text-primeColor font-bold text-lg ml-2">
                          {attribute.name}
                        </h1>

                        <button
                          onClick={() =>
                            toggleAttributeKeyFilter(attribute._id)
                          }
                          className="focus:outline-none"
                        >
                          {isAttributeKeyFilterOpen ? (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-6 w-6"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 9l-7 7-7-7"
                              />
                            </svg>
                          ) : (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-6 w-6"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 15l7-7 7 7"
                              />
                            </svg>
                          )}
                        </button>
                      </div>
                      <ul
                        className={`flex flex-col gap-4 text-sm lg:text-base text-[#767676] ${
                          isAttributeKeyFilterOpen ? "block" : "hidden"
                        }`}
                      >
                        {attribute.attribute.map((subItem) => (
                          <li
                            key={subItem._id}
                            onClick={() => handleAttributeChange(subItem._id)}
                            className={`border-b-[1px] border-b-[#F0F0F0] pb-2 flex cursor-pointer hover:text-slate-950 ${
                              selectedAttributes.includes(subItem._id)
                                ? "text-slate-950"
                                : ""
                            }`}
                          >
                            <div className="flex items-center me-4">
                              <label className="relative flex items-center p-3 rounded-full cursor-pointer">
                                <input
                                  type="checkbox"
                                  className="peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-blue-gray-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-gray-900 checked:bg-gray-900 checked:before:bg-gray-900 hover:before:opacity-10"
                                  id={subItem._id}
                                  checked={selectedAttributes.includes(
                                    subItem._id
                                  )}
                                  onChange={() =>
                                    handleAttributeChange(subItem._id)
                                  }
                                />
                                <span className="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-3.5 w-3.5"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                    stroke="currentColor"
                                    strokeWidth="1"
                                  >
                                    <path
                                      fillRule="evenodd"
                                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                      clipRule="evenodd"
                                    ></path>
                                  </svg>
                                </span>
                              </label>
                              <label
                                htmlFor={subItem._id}
                                className="ms-2 text-sm font-medium text-gray-900"
                              >
                                {subItem.value}
                              </label>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </ul>
              </div>

              <div className="flex justify-center mb-4 mt-5">
                <button
                  onClick={handleSearch}
                  className="bg-primeColor hover:bg-slate-950 text-white font-bold py-2 px-4 rounded"
                >
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full mdl:w-[80%] lgl:w-[75%] h-full flex flex-col gap-10 mt-5">
          <div className="w-full flex justify-end">
            <h1 className="w-full flex justify-start font-bold text-2xl">
              Products
            </h1>
            <select
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none"
              onChange={(e) => handleSortChange(e.target.value)}
            >
              <option value="">Sorted by</option>
              <option value="name_asc">Name A-Z</option>
              <option value="name_desc">Name Z-A</option>
              <option value="price_asc">Prices Increase</option>
              <option value="price_desc">Prices Decrease</option>
            </select>
          </div>

          <div className="w-full grid grid-cols-9 md:grid-cols-2 lgl:grid-cols-3 xl:grid-cols-4 gap-10">
            {noProductFound ? (
              <p className="text-center text-red-500 col-span-9">
                Product is not currently available in the store!!!
              </p>
            ) : (
              filterProduct?.map((product) => (
                <Product
                  key={product?._id}
                  _id={product?._id}
                  img={product?.images?.find((image) => image.isMain)?.url}
                  allImg={product?.images || []}
                  stockQuantity={product?.stockQuantity}
                  productName={product?.name || ""}
                  price={product?.price || 0}
                  badge={true}
                />
              ))
            )}
          </div>

          <div className="flex justify-center mt-8">
            <nav aria-label="Page navigation example">
              <ul className="flex items-center -space-x-px h-10 text-base">
                <li>
                  <a
                    href="#"
                    className={`flex items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${
                      page === 1 ? "opacity-50 pointer-events-none" : ""
                    }`}
                    onClick={() => handleChangePage(page - 1)}
                  >
                    <span className="sr-only">Previous</span>
                    <svg
                      className="w-3 h-3 rtl:rotate-180"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 6 10"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 1 1 5l4 4"
                      />
                    </svg>
                  </a>
                </li>

                {Array.from(
                  Array(Math.ceil(filterProduct.length / perPage)).keys()
                ).map((pageNumber) => (
                  <li key={pageNumber}>
                    <button
                      className={`flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border ${
                        page === pageNumber + 1
                          ? "border-primeColor bg-slate-900 text-white hover:bg-slate-950 hover:text-white dark:bg-gray-700 dark:text-black"
                          : pageNumber === 0
                          ? "border-primeColor bg-slate-900 text-white hover:bg-slate-950 hover:text-white dark:bg-slate-950 dark:text-black"
                          : "border-primeColor bg-slate-900 text-white hover:bg-slate-950 hover:text-white dark:bg-slate-950 dark:text-black"
                      }`}
                      onClick={() => handleChangePage(pageNumber + 1)}
                    >
                      {page}
                    </button>
                  </li>
                ))}

                <li>
                  <a
                    className={`flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${
                      page === Math.ceil(products / perPage)
                        ? "opacity-50 pointer-events-none"
                        : ""
                    }`}
                    onClick={() => handleChangePage(page + 1)}
                  >
                    <span className="sr-only">Next</span>
                    <svg
                      className="w-3 h-3 rtl:rotate-180"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 6 10"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m1 9 4-4-4-4"
                      />
                    </svg>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
