import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../../redux/orebiSlice";
import Slider from "react-slick";
import SampleNextArrow from "../../home/NewArrivals/SampleNextArrow";
import SamplePrevArrow from "../../home/NewArrivals/SamplePrevArrow";
import { publicProductApi } from "../../../service/publicProduct.Service";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ProductInfo = ({ productInfo }) => {
  const dispatch = useDispatch();
  const [product, setProduct] = useState({});
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn); // Giả sử isLoggedIn là phần tử trong state auth
  const [rating, setRating] = useState(0);
  const navigate = useNavigate();
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
  useEffect(() => {
    if (product) {
      let total = 0;
      let count = 0;
      product?.orderItem?.forEach((item) => {
        if (item && item.reviewId) {
          total += item.reviewId.rating;
          count++;
        }
      });
      if (count > 0) {
        const rating = total / count;
        setRating(rating);
        console.log(rating);
      }
    }
  }, [product]); // Không quên thêm product vào mảng dependencies của useEffect

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 4,
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

  const handleAddToCart = () => {
    if (!isLoggedIn) {
      navigate("/signin");
      return;
    }
    dispatch(
      addToCart({
        _id: product._id,
        name: product.name,
        quantity: 1,
        image: product?.images?.find((image) => image.isMain)?.url,
        stockQuantity: product.stockQuantity,
        badge: productInfo.badge,
        price: product?.price,
        colors: productInfo?.color,
      })
    );
    if (product.stockQuantity === 0) {
      toast.error("Not have quantity in stock");
    } else {
      toast.success("Add to cart successfully!");
    }
  };
  return (
    <div className="flex flex-col gap-5">
      {rating !== 0 && (
        <div className="flex">
          <h2 className="text-4xl font-semibold ">Rate : {rating}/5 </h2>
          <svg
            className="w-8 h-8 text-gray-500 fill-current text-yellow-500"
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
        </div>
      )}
      <h2 className="text-4xl font-semibold ">{product?.name}</h2>
      <p className="text-xl font-semibold">PRICE: {product?.price} $</p>

      {product?.attribute?.map((attribute, index) => (
        <p key={index} className="font-normal text-sm">
          <span className="text-base font-medium mr-2">
            {attribute?.key?.name} :
          </span>
          {attribute?.value}
        </p>
      ))}

      <p className="text-base text-gray-600">
        <strong>Description information :</strong> {product?.description}
      </p>
      <button
        onClick={handleAddToCart}
        className="w-full py-4 bg-primeColor hover:bg-black duration-300 text-white text-lg font-titleFont"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductInfo;
