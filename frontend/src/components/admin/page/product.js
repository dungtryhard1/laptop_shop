import { useEffect, useState } from "react";
import { FaSearch, FaSort } from "react-icons/fa";
import { Link } from "react-router-dom";
import { productApi } from "../../../service/product.service";
import { attributeApi } from "../../../service/attribute.service";
import { toast } from "react-toastify";

const Product = () => {
  const [products, setProducts] = useState([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [attributeKeys, setAttributeKeys] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [sortName, setSortName] = useState("");
  const [sortPrice, setSortPrice] = useState("");
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(4);

  useEffect(() => {
    fetchData();
  }, [searchName, sortName, sortPrice, page, perPage]);

  const fetchData = async () => {
    try {
      const [productResponse, attributeResponse] = await Promise.all([
        productApi.getProduct({
          name: searchName,
          sortName: sortName,
          sortPrice: sortPrice,
          page: page,
          perPage: perPage,
        }),
        attributeApi.getAttribute(),
      ]);
      setTotalProducts(productResponse.data.totalCount);
      setProducts(productResponse.data.products);
      setAttributeKeys(attributeResponse.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleDelete = async (id) => {
    const confirmHide = window.confirm(
      "Are you sure you want to delete this product?"
    );
    if (confirmHide) {
      try {
        await productApi.deleteProduct(id);
        const updatedProducts = products.filter(
          (product) => product._id !== id
        );
        setProducts(updatedProducts);
        toast.success("Delete Product Successfully!!!");
      } catch (error) {
        console.error("Error deleting product:", error);
      }
    }
  };

  const handleSortByName = () => {
    setSortName(sortName === "asc" ? "desc" : "asc");
  };

  const handleSortByPrice = () => {
    setSortPrice(sortPrice === "asc" ? "desc" : "asc");
  };

  const handleChangePage = (pageNumber) => {
    setPage(pageNumber);
  };

  return (
    <>
      <div className="flex flex-col md:flex-row justify-between items-center mt-5">
        <div className="relative rounded-2xl border w-full md:w-[600px] h-[50px] text-base text-primeColor flex items-center gap-2 justify-between px-6 mb-4 md:mb-0">
          <input
            className="flex-1 h-full outline-none placeholder:text-[#C4C4C4] placeholder:text-[14px]"
            type="text"
            placeholder="Search your products here"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
          />
          <FaSearch className="w-5 h-5 hover:cursor-pointer" />
        </div>
        <div className="flex items-center">
          {" "}
          {/* Sử dụng flex để căn chỉnh nút và các phần tử khác */}
          <div className="ml-auto">
            <Link to={"/admin/add-product"}>
              <button
                type="button"
                className="w-50 p-2 bg-green-500 text-white rounded mr-20"
              >
                Add New Product
              </button>
            </Link>
          </div>
        </div>
      </div>
      <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"></hr>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-center text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-4 py-3">
                Image
              </th>
              <th scope="col" className="px-6 py-3">
                <div className="flex items-center" onClick={handleSortByName}>
                  Name
                  <FaSort className="ml-1 cursor-pointer" />
                </div>
              </th>
              {attributeKeys.slice(0, 4).map((atrrKey, index) => (
                <th key={index} scope="col" className="px-6 py-3">
                  {atrrKey?.name}
                </th>
              ))}
              <th scope="col" className="px-6 py-3">
                <div className="flex items-center" onClick={handleSortByPrice}>
                  Price
                  <FaSort className="ml-1 cursor-pointer" />
                </div>
              </th>

              <th scope="col" className="px-6 py-3">
                Stock Quantity
              </th>
              <th scope="col" className="px-4 py-3">
                Hidden
              </th>
              <th scope="col" className="px-6 py-3">
                <span className="">Action</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {products
              ?.slice()
              .reverse()
              .map((product) => (
                <tr
                  key={product?._id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <th className="px-4 py-4">
                    <img
                      className="w-28"
                      alt="huhu"
                      src={product?.images?.find((image) => image.isMain)?.url}
                    ></img>
                  </th>
                  <td scope="row" className="px-6 py-4 ">
                    {product?.name}
                  </td>
                  {attributeKeys.slice(0, 4).map((attribute) => (
                    <td key={attribute._id} className="px-6 py-4">
                      {product.attribute.find(
                        (attr) => attr.key._id === attribute._id
                      ) ? (
                        product.attribute.find(
                          (attr) => attr.key._id === attribute._id
                        ).value
                      ) : (
                        <span style={{ color: "red" }}>X</span>
                      )}
                    </td>
                  ))}
                  <td className="px-6 py-4">{product?.price}</td>
                  <td className="px-6 py-4">{product?.stockQuantity}</td>
                  <td className="px-6 py-4">
                    <input type="checkbox" checked={product?.isHidden} />
                  </td>

                  <td className="px-6 py-4 flex mt-6">
                    <Link to={`/admin/edit-product/${product?._id}`}>
                      <button className="font-medium text-blue-600 dark:text-blue-500">
                        Edit
                      </button>
                    </Link>
                    <button
                      onClick={() => handleDelete(product?._id)}
                      className="font-medium text-red-600 dark:text-blue-500 ml-3"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"></hr>
      <div className="flex justify-center mt-8">
        <nav aria-label="Page navigation example">
          <ul className="flex items-center -space-x-px h-10 text-base">
            <li>
              <button
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
              </button>
            </li>

            {Array.from(Array(Math.ceil(totalProducts / perPage)).keys()).map(
              (pageNumber) => (
                <li key={pageNumber}>
                  <button
                    className={`flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border ${
                      page === pageNumber + 1
                        ? "border-primeColor bg-slate-900 text-white hover:bg-slate-950 hover:text-white dark:bg-slate-950 dark:text-black"
                        : pageNumber === 0
                        ? "border-gray-300 bg-white text-black"
                        : "border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                    }`}
                    onClick={() => handleChangePage(pageNumber + 1)}
                  >
                    {pageNumber + 1}
                  </button>
                </li>
              )
            )}

            <li>
              <button
                className={`flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${
                  page === Math.ceil(totalProducts / perPage)
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
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Product;
