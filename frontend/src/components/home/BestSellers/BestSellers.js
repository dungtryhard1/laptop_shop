import Heading from "../Products/Heading";
import Product from "../Products/Product";
import { useEffect, useState } from "react";
import { publicProductApi } from "../../../service/publicProduct.Service";

const BestSellers = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await publicProductApi.getTopSellingProduct();
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setProducts([]); // Đặt products thành một mảng rỗng trong trường hợp xảy ra lỗi
      }
    };
    fetchData();
  }, []);
  return (
    <div className="w-full pb-20">
      <Heading heading="Our Bestsellers" />
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lgl:grid-cols-3 xl:grid-cols-4 gap-10">
        {products.slice(0, 4).map((product) => (
          <div className="px-2" key={product?._id}>
            <Product
              _id={product?._id}
              img={product?.images?.find((image) => image.isMain)?.url} // Sử dụng optional chaining để tránh lỗi nếu 'images' không tồn tại hoặc không phải là một mảng
              allImg={product?.images || []} // Trả về một mảng rỗng nếu 'images' không tồn tại
              stockQuantity={product?.stockQuantity}
              productName={product?.name || ""} // Trả về một chuỗi trống nếu 'name' không tồn tại
              price={product?.price || 0} // Trả về 0 nếu 'price' không tồn tại
              badge={true}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default BestSellers;
