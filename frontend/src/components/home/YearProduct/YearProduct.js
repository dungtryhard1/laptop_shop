import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { publicProductApi } from "../../../service/publicProduct.Service";
import ShopNow from "../../designLayouts/buttons/ShopNow";
import Image from "../../designLayouts/Image";

const YearProduct = () => {
  const [lastProduct, setLastProduct] = useState(null);
  const [productImage, setProductImage] = useState(null);
  const [productInfo, setProductInfo] = useState(null);

  const fetchTopSellingProduct = async () => {
    try {
      const response = await publicProductApi.getTopSellingProduct();
      const products = response.data;
      if (products && products.length > 0) {
        const lastProduct = products[products.length - 1];
        setLastProduct(lastProduct.name);
        if (lastProduct.images && lastProduct.images.length > 0) {
          setProductImage(lastProduct.images[0]);
        }
      }
    } catch (error) {
      console.error("Error fetching top selling product:", error);
    }
  };

  useEffect(() => {
    fetchTopSellingProduct();
  }, []);

  return (
    <Link to="/shop">
      <div className="border border-transparent shadow-lg rounded-lg flex w-full h-80 mb-20 bg-[#f3f3f3] md:bg-transparent relative font-titleFont justify-between">
        {productImage && (
          <div className="w-1/3">
            <Image
              className="w-1/2 h-auto md:inline-block m-4"
              imgSrc={productImage.url}
            />
          </div>
        )}
        <div className="w-1/2 px-4 md:px-0 flex flex-col justify-center">
          <h1 className="text-3xl font-semibold text-primeColor mb-2 mt-2">
            Product of The year
          </h1>
          <p className="text-xl font-normal text-primeColor max-w-[600px] mb-5 mt-2">
            {lastProduct}
          </p>
          <ShopNow />
        </div>
      </div>
    </Link>
  );
};

export default YearProduct;
