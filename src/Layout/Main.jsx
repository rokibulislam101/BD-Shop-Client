import { Outlet, useLocation } from "react-router-dom"
import Footer from "../pages/Shared/Footer/Footer"
import Navbar from "../pages/Shared/Header/Navbar";
import ShopInfo from "../pages/Shared/ShopInfo/ShopInfo";

const main = () => {
  const location = useLocation();
  // console.log(location);
  const noHeaderFooter = location.pathname.includes('Login') || location.pathname.includes('Register')
  return (
    <div>
      {noHeaderFooter || <Navbar />}
      <Outlet></Outlet>
      <ShopInfo></ShopInfo>
      {noHeaderFooter || <Footer />}
    </div>
  );
}

export default main
