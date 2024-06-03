import Slider from "react-slick";
import Heading from "../Products/Heading";
import Product from "../Products/Product";
import SampleNextArrow from "./SampleNextArrow";
import SamplePrevArrow from "./SamplePrevArrow";
import { useEffect, useState } from "react";
import { publicProductApi } from "../../../service/publicProduct.Service";

const NewArrivals = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await publicProductApi.getTopNewProduct();
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setProducts([]); // Đặt products thành một mảng rỗng trong trường hợp xảy ra lỗi
      }
    };
    fetchData();
  }, []);

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 3,
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
  return (
    <div className="w-full pb-16">
      <Heading heading="New Arrivals" />
      <Slider {...settings}>
        {products?.map((product, index) => (
          <div key={index} className="px-2">
            <Product
              key={product._id}
              _id={product?._id}
              img={product?.images?.find((image) => image.isMain)?.url}
              stockQuantity={product?.stockQuantity}
              allImg={product?.images || []}
              productName={product?.name || ""}
              price={product?.price || 0}
              badge={true}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default NewArrivals;
