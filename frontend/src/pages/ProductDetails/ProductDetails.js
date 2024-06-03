import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Breadcrumbs from "../../components/pageProps/Breadcrumbs";
import ProductInfo from "../../components/pageProps/productDetails/ProductInfo";
import ProductsOnSale from "../../components/pageProps/productDetails/ProductsOnSale";
import SamplePrevArrow from "../../components/home/NewArrivals/SamplePrevArrow";
import SampleNextArrow from "../../components/home/NewArrivals/SampleNextArrow";
import Slider from "react-slick";
import { publicProductApi } from "../../service/publicProduct.Service";

const ProductDetails = () => {
  const location = useLocation();
  const [prevLocation, setPrevLocation] = useState("");
  const [productInfo, setProductInfo] = useState([]);

  const [product, setProduct] = useState({});
  useEffect(() => {
    if (productInfo._id) {
      // Kiểm tra xem id có tồn tại không trước khi gọi fetchData
      const fetchData = async () => {
        try {
          const response = await publicProductApi.getProductByID(
            productInfo._id
          );
          setProduct(response.data);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
      fetchData();
    }
  }, [productInfo._id]);
  const settings = {
    infinite: true,
    speed: 200,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1025,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 769,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
        },
      },
    ],
  };
  useEffect(() => {
    setProductInfo(location.state.item);
    setPrevLocation(location.pathname);
  }, [location, productInfo]);

  return (
    <div className="w-full mx-auto border-b-[1px] border-b-gray-300">
      <div className="max-w-container mx-auto px-4">
        <div className="xl:-mt-10 -mt-7">
          <Breadcrumbs title="" prevLocation={prevLocation} />
        </div>
        <div className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-6 gap-4 h-full -mt-5 xl:-mt-8 bg-gray-100 p-4">
          <div className="h-full w-full xl:col-span-2">
            <Slider {...settings}>
              {product?.images?.map((image, index) => (
                <img
                  key={index}
                  className="w-full h-full object-contain"
                  src={image.url}
                  alt={image.url}
                />
              ))}
            </Slider>
            {/* <img
              className="w-full h-full object-contain"
              src={productInfo.img}
              alt={productInfo.img}
            /> */}
          </div>
          <div className="h-full w-full md:col-span-2 xl:col-span-4 xl:p-14 flex flex-col gap-6 justify-center">
            <ProductInfo productInfo={productInfo} />
          </div>
        </div>
        <div className="bg-gray-100 p-6">
          <h2 className="text-lg font-bold mb-4">Comments :</h2>
          {product?.orderItem?.map(
            (item) =>
              item?.reviewId && (
                <div className="flex flex-col space-y-4 mt-2" key={item?._id}>
                  <div className="bg-white p-4 rounded-lg shadow-md">
                    <h3 className="text-lg font-bold">
                      {item?.reviewId?.userId?.username}
                    </h3>
                    <p className="text-gray-700 text-sm mb-2">
                      Posted at :{" "}
                      {new Date(item?.reviewId?.updatedAt).toLocaleDateString(
                        "en-US"
                      )}
                    </p>
                    <p className="text-gray-700 text-sm mb-2 flex">
                      <strong>
                        {"Rating : " + item?.reviewId?.rating + "/5"}
                      </strong>
                      <svg
                        className="w-4 h-4 text-gray-500 fill-current text-yellow-500"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                      </svg>
                    </p>

                    <p className="text-gray-700">
                      {"Detail : " + item?.reviewId?.comment}
                    </p>
                    <div className="flex mt-2">
                      {item?.reviewId?.images?.map((image, index) => (
                        <div key={index}>
                          <img
                            className="mr-2 mb-2"
                            width={100}
                            src={image.url}
                            alt={`Image ${index}`}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
