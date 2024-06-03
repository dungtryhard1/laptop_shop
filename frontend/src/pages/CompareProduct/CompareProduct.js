import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { publicProductApi } from "../../service/publicProduct.Service";
import { attributeApi } from "../../service/attribute.service";
import { publicAttributeKeyApi } from "../../service/publicAttributeKey.service";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redux/orebiSlice";
import { toast } from "react-toastify";

const CompareProduct = () => {
  const { productId } = useParams();
  const [product_1, setProduct_1] = useState({});
  const [product_2, setProduct_2] = useState({});
  const [product_3, setProduct_3] = useState({});
  const [allProduct, setAllProduct] = useState([]);
  const [atrributeKey, setAttributeKey] = useState([]);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn); // Giả sử isLoggedIn là phần tử trong state auth

  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productRespone, attributeKeyRespone, allProductRespone] =
          await Promise.all([
            publicProductApi.getProductByID(productId),
            publicAttributeKeyApi.getAttribute(),
            publicProductApi.getAllProduct(),
          ]);

        setProduct_1(productRespone.data);
        setAttributeKey(attributeKeyRespone.data);
        setAllProduct(allProductRespone.data.products);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);
  const handleProduct1Change = (event) => {
    const selectedProductId = event.target.value;
    const selectedProduct = allProduct.find(
      (product) => product._id === selectedProductId
    );
    setProduct_1(selectedProduct);
  };

  const handleProduct2Change = (event) => {
    const selectedProductId = event.target.value;
    const selectedProduct = allProduct.find(
      (product) => product._id === selectedProductId
    );
    setProduct_2(selectedProduct);
  };
  const handleProduct3Change = (event) => {
    const selectedProductId = event.target.value;
    const selectedProduct = allProduct.find(
      (product) => product._id === selectedProductId
    );
    setProduct_3(selectedProduct);
  };
  const handleAddToCart = (product) => {
    if (!isLoggedIn) {
      navigate("/signin");
      return;
    }

    dispatch(
      addToCart({
        _id: product._id,
        name: product.name,
        quantity: 1,
        stockQuantity: product.stockQuantity,
        image: product?.images?.find((image) => image.isMain)?.url,
        badge: "productInfo.badge",
        price: product?.price,
        colors: "productInfo?.color",
      })
    );
    if (product.stockQuantity === 0) {
      toast.error("Not have quantity in stock");
    } else {
      toast.success("Add to cart successfully!");
    }
  };
  return (
    <div className="max-w-container mx-auto">
      <h3 className="text-center">
        <strong>Compare </strong>
      </h3>
      <div className="grid grid-cols-10 gap-1">
        <div className="col-span-1"></div>
        <div className="col-span-3">
          <select
            name="product_1"
            id="product_1"
            value={product_1?._id}
            onChange={handleProduct1Change}
            className="w-full mt-1 p-2 border border-gray-300 rounded"
          >
            {allProduct.map((product) => (
              <option key={product?._id} value={product?._id}>
                {product?.name}
              </option>
            ))}
          </select>
          <img
            className="w-44 object-center"
            alt=""
            src={product_1?.images?.find((image) => image.isMain)?.url}
          />
          {Object.keys(product_1).length > 0 && (
            <button
              className="w-52 h-10 bg-primeColor text-white hover:bg-black duration-300"
              onClick={() => handleAddToCart(product_1)}
            >
              Add to cart
            </button>
          )}
        </div>
        <div className="col-span-3">
          <select
            name="product_2"
            id="product_2"
            value={product_2?._id}
            onChange={handleProduct2Change}
            className="w-full mt-1 p-2 border border-gray-300 rounded"
          >
            <option value="">Select product</option>
            {allProduct.map((product) => (
              <option key={product?._id} value={product?._id}>
                {product?.name}
              </option>
            ))}
          </select>
          <img
            className="w-44 object-center"
            alt=""
            src={product_2?.images?.find((image) => image.isMain)?.url}
          />
          {Object.keys(product_2).length > 0 && (
            <button
              className="w-52 h-10 bg-primeColor text-white hover:bg-black duration-300"
              onClick={() => handleAddToCart(product_2)}
            >
              Add to cart
            </button>
          )}
        </div>

        <div className="col-span-3">
          <select
            name="product_3"
            id="product_3"
            value={product_3?._id}
            onChange={handleProduct3Change}
            className="w-full mt-1 p-2 border border-gray-300 rounded"
          >
            <option value="">Select product</option>
            {allProduct.map((product) => (
              <option key={product?._id} value={product?._id}>
                {product?.name}
              </option>
            ))}
          </select>
          <img
            className="w-44 object-center"
            alt=""
            src={product_3?.images?.find((image) => image.isMain)?.url}
          />
          {Object.keys(product_3).length > 0 && (
            <button
              className="w-52 h-10 bg-primeColor text-white hover:bg-black duration-300"
              onClick={() => handleAddToCart(product_3)}
            >
              Add to cart
            </button>
          )}
        </div>
      </div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-center text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr className="grid grid-cols-10 gap-1">
              <th scope="col " className="px-4 py-3 col-span-1">
                Attribute
              </th>
              <th scope="col" className="px-6 py-3 col-span-3">
                {product_1?.name}
              </th>
              <th scope="col" className="px-6 py-3 col-span-3">
                {product_2?.name}
              </th>
              <th scope="col" className="px-6 py-3 col-span-3">
                {product_3?.name}
              </th>
            </tr>
          </thead>
          <tbody>
            {atrributeKey?.map((atrrKey) => (
              <tr
                key={atrrKey?._id}
                className="bg-white border-b grid grid-cols-10 gap-1 dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <td scope="col truncate" className="px-6 py-3 col-span-1">
                  {atrrKey?.name}
                </td>
                <td scope="col" className="px-6 py-3 col-span-3">
                  {product_1?.attribute?.find(
                    (attr) => attr?.key?._id === atrrKey._id
                  ) ? (
                    product_1?.attribute?.find(
                      (attr) => attr?.key?._id === atrrKey._id
                    ).value
                  ) : (
                    <span style={{ color: "red" }}>X</span>
                  )}
                </td>
                <td scope="col" className="px-6 py-3 col-span-3">
                  {product_2?.attribute?.find(
                    (attr) => attr?.key?._id === atrrKey._id
                  ) ? (
                    product_2?.attribute?.find(
                      (attr) => attr?.key?._id === atrrKey._id
                    ).value
                  ) : (
                    <span style={{ color: "red" }}>X</span>
                  )}
                </td>
                <td scope="col" className="px-6 py-3 col-span-3">
                  {product_3?.attribute?.find(
                    (attr) => attr?.key?._id === atrrKey._id
                  ) ? (
                    product_3?.attribute?.find(
                      (attr) => attr?.key?._id === atrrKey._id
                    ).value
                  ) : (
                    <span style={{ color: "red" }}>X</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CompareProduct;
