import { useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
  Navigate,
  useLocation,
  useParams,
} from "react-router-dom";
import Footer from "./components/home/Footer/Footer";
import FooterBottom from "./components/home/Footer/FooterBottom";
import Header from "./components/home/Header/Header";
import HeaderBottom from "./components/home/Header/HeaderBottom";
import SpecialCase from "./components/SpecialCase/SpecialCase";
import About from "./pages/About/About";
import SignIn from "./pages/Account/SignIn";
import SignUp from "./pages/Account/SignUp";
import Cart from "./pages/Cart/Cart";
import Contact from "./pages/Contact/Contact";
import Home from "./pages/Home/Home";
import Journal from "./pages/Journal/Journal";
import Offer from "./pages/Offer/Offer";
import Payment from "./pages/payment/Payment";
import ProductDetails from "./pages/ProductDetails/ProductDetails";
import Shop from "./pages/Shop/Shop";
import SideBar from "./components/admin/sideBar";
import Dashboard from "./components/admin/page/dashboard";
import Product from "./components/admin/page/product";
import AddProduct from "./components/admin/page/AddProduct";
import EditProduct from "./components/admin/page/EditProduct";
import AddCategory from "./components/admin/page/category/AddCategory";
import Categories from "./components/admin/page/category/Categories";
import EditCategory from "./components/admin/page/category/EditCategory";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import VerifyCode from "./pages/Account/Verify";
import ForgotPassword from "./pages/Account/ForgotPassword";
import Journals from "./components/admin/page/journal/Journals";
import CategoryJournals from "./components/admin/page/cotegoryJournal/CategoriesJournal";
import AddCategoryJournal from "./components/admin/page/cotegoryJournal/AddCategoryJournal";
import EditCategoryJournals from "./components/admin/page/cotegoryJournal/EditCategoryJounal";
import WarrantyProduct from "./components/admin/page/warranty/WarrantyProduct";
import AddWarranty from "./components/admin/page/warranty/AddWarranty";
import EditWarranty from "./components/admin/page/warranty/EditWarranty";
import Supplier from "./components/admin/page/supplier/Supplier";
import AddSupplier from "./components/admin/page/supplier/AddSupplier";
import EditSupplier from "./components/admin/page/supplier/EditSupplier";
import Page404 from "./pages/PageNotFound/PageNotFound";
import Attributes from "./components/admin/page/attribute/Attribute";
import AddAttribute from "./components/admin/page/attribute/AddAttribute";
import EditAttribute from "./components/admin/page/attribute/EditAttribute";
import Profile from "./pages/Profile/Profile";
import ChangePassword from "./pages/Profile/ChangePassword";
import Coupons from "./components/admin/page/coupon/Coupons";
import AddCoupon from "./components/admin/page/coupon/AddCoupon";
import EditCoupon from "./components/admin/page/coupon/EditCoupon";
import AddJournal from "./components/admin/page/journal/AddJournal";
import EditJournal from "./components/admin/page/journal/EditJournal";
import User from "./components/admin/page/user/user";
import Order from "./pages/Order/Order";
import HistoryPurchase from "./pages/HistoryPurchase/HistoryPurchase";
import JournalDetail from "./pages/Journal/JournalDetail";
import CompareProduct from "./pages/CompareProduct/CompareProduct";
import OrderStatus from "./components/admin/page/order/OrderStatus";
import EditOrder from "./components/admin/page/order/EditOrder";
import Message from "./components/admin/page/message";

const Layout = ({ hideFooter }) => {
  return (
    <div>
      <Header />
      <HeaderBottom />
      <SpecialCase />
      <Outlet />
      {!hideFooter && (
        <>
          <Footer />
          <FooterBottom />
        </>
      )}
    </div>
  );
};

function App() {
  const role = useSelector((state) => state.auth?.user?.role);
  console.log(role);

  const ChangePasswordRoute = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const email = searchParams.get("email");

    if (!email) {
      return <Navigate to="/404" />;
    }
    return <ChangePassword email={email} />;
  };

  const UserProfileRoute = () => {
    const { id } = useParams();

    if (!id) {
      return <Navigate to="/404" />;
    }
    return <Profile userId={id} />;
  };

  return (
    <div className="font-bodyFont">
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="shop" element={<Shop />} />
            <Route path="about" element={<About />} />
            <Route path="journal" element={<Journal />} />
            <Route path="journal-detail/:id" element={<JournalDetail />} />
            <Route path="offer" element={<Offer />} />
            <Route path="product/:_id" element={<ProductDetails />} />
            <Route
              path="compareProduct/:productId"
              element={<CompareProduct />}
            />
            <Route path="cart" element={<Cart />} />
            <Route path="history-purchase" element={<HistoryPurchase />} />
            {role === "user" && (
              <>
                <Route path="order" element={<Order />} />
                <Route path="history-purchase" element={<HistoryPurchase />} />
                <Route path="paymentgateway" element={<Payment />} />
                <Route path="profile/:id" element={<UserProfileRoute />} />
                <Route
                  path="change-password"
                  element={<ChangePasswordRoute />}
                />
              </>
            )}
            {role === "admin" && (
              <>
                <Route path="order" element={<Order />} />
                <Route path="history-purchase" element={<HistoryPurchase />} />
                <Route path="paymentgateway" element={<Payment />} />
                <Route path="profile/:id" element={<UserProfileRoute />} />
                <Route
                  path="change-password"
                  element={<ChangePasswordRoute />}
                />
              </>
            )}
          </Route>
          {/* <Route path="contact" element={<Layout hideFooter={true} />}>
            <Route index element={<Contact />} />
          </Route> */}
          <Route path="signup" element={<SignUp />} />
          <Route path="signin" element={<SignIn />} />
          <Route path="verify" element={<VerifyCode />} />
          <Route path="forgot" element={<ForgotPassword />} />

          {role === "admin" && (
            <Route path="/admin" element={<SideBar />}>
              <Route path="dashboard" index element={<Dashboard />} />
              <Route path="users" element={<User />} />
              <Route path="products" element={<Product />} />
              <Route path="categories" element={<Categories />} />
              <Route path="add-product" element={<AddProduct />} />
              <Route path="edit-product/:productId" element={<EditProduct />} />

              <Route path="add-category" element={<AddCategory />} />
              <Route
                path="edit-category/:categoryId"
                element={<EditCategory />}
              />

              <Route path="attributes" element={<Attributes />} />
              <Route path="add-attribute" element={<AddAttribute />} />
              <Route
                path="edit-attribute/:attributeId"
                element={<EditAttribute />}
              />

              <Route path="warranty" element={<WarrantyProduct />} />
              <Route path="add-warranty" element={<AddWarranty />} />
              <Route
                path="edit-warranty/:warrantyId"
                element={<EditWarranty />}
              />
              <Route path="supplier" element={<Supplier />} />
              <Route path="add-supplier" element={<AddSupplier />} />
              <Route
                path="edit-supplier/:supplierId"
                element={<EditSupplier />}
              />

              <Route path="categoryJournal" element={<CategoryJournals />} />
              <Route
                path="add-categoryJournal"
                element={<AddCategoryJournal />}
              />
              <Route
                path="edit-categoryJournal/:categoryId"
                element={<EditCategoryJournals />}
              />

              <Route path="messages" element={<Message />} />

              <Route path="journals" element={<Journals />} />
              <Route path="add-journal" element={<AddJournal />} />
              <Route path="edit-journal/:journalId" element={<EditJournal />} />

              <Route path="coupons" element={<Coupons />} />
              <Route path="add-coupon" element={<AddCoupon />} />
              <Route path="edit-coupon/:couponId" element={<EditCoupon />} />

              <Route path="orders" element={<OrderStatus />} />
              <Route path="edit-order/:orderId" element={<EditOrder />} />
            </Route>
          )}

          <Route path="*" element={<Page404 />} />
        </Routes>
      </Router>

      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}

export default App;
