import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Breadcrumbs from "../../components/pageProps/Breadcrumbs";

const About = () => {
  const location = useLocation();
  const [prevLocation, setPrevLocation] = useState("");
  useEffect(() => {
    setPrevLocation(location.state.data);
  }, [location]);
  return (
    <div className="max-w-container mx-auto px-4">
      <Breadcrumbs title="About" prevLocation={prevLocation} />
      <div className="pb-10">
        <h1 className="max-w-[600px] text-base text-lightText mb-2">
          <span className="text-primeColor font-semibold text-lg">Nebula</span>{" "}
          <br />
          Welcome to Nebula - the leading online laptop shopping destination. At
          Nebula, we offer a range of laptop products from leading global brands
          such as HP, Dell, Lenovo, and Apple. We understand that each user has
          their own needs and requirements, so we offer a range of products to
          meet those needs - from laptops for students, laptops for business, to
          powerful gaming laptops. Not only providing quality products, Nebula
          also focuses on providing the best shopping experience for its
          customers. We offer fast delivery, 24/7 customer support service, and
          clear warranty policy. Explore Nebula today and find the perfect
          laptop for you!.
        </h1>
        <Link to="/shop">
          <button className="w-52 h-10 bg-primeColor text-white hover:bg-black duration-300">
            Continue Shopping
          </button>
        </Link>
      </div>
    </div>
  );
};

export default About;
