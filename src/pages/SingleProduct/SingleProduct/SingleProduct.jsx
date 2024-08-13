import { Helmet } from "react-helmet-async"
import Product from "../Product/Product"
import RelatedProducts from "../RelatedProducts/RelatedProducts";

const SingleProduct = () => {
  return (
    <div>
      <Helmet>
        <title>BD Shop | Product</title>
      </Helmet>
      <Product></Product>
    </div>
  );
}

export default SingleProduct
