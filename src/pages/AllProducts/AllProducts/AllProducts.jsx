import { Helmet } from "react-helmet-async"
import AllProductsBanner from "../AllProductsBanner/AllProductsBanner"
import AllProductsCard from "../AllProductsCard/AllProductsCard";


const AllProducts = () => {
  return (
    <div>
      <Helmet>
        <title>BD Shop | All Products</title>
      </Helmet>
      <AllProductsBanner></AllProductsBanner>
      <AllProductsCard></AllProductsCard>
    </div>
  );
}

export default AllProducts
