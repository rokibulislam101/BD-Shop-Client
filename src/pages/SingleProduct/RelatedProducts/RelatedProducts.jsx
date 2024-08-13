import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';

const RelatedProducts = ({ category, currentProductId }) => {
  const [relatedProducts, setRelatedProducts] = useState([]);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    const fetchRelatedProducts = async () => {
      try {
        const response = await axiosSecure.get(
          `/allProducts?category=${category}&excludeId=${currentProductId}`
        );
        setRelatedProducts(response.data);
      } catch (error) {
        console.error('Error fetching related products:', error);
      }
    };

    fetchRelatedProducts();
  }, [category, currentProductId, axiosSecure]);

  return (
    <div className="p-10">
      <h2 className="text-2xl md:text-3xl mb-4 font-semibold">
        Related Products
      </h2>
      <hr />
      <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-6 gap-4 mt-4">
        {relatedProducts.slice(0, 6).map(product => {
          const discountPercentage = (
            ((product.price - product.discountPrice) / product.price) *
            100
          ).toFixed(0);
          return (
            <div
              key={product._id}
              className="h-[90%] hover:h-[100%] bg-white shadow hover:shadow-lg hover:border p-4 transition-all hover:text-[#fc6221]"
            >
              <div className="relative">
                <p className="absolute bg-[#fc6221] text-white font-semibold rounded-sm p-1 px-2 right-0">
                  -{discountPercentage}%
                </p>
                <div className="flex justify-center items-center h-48 lg:h-60">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-all hover:w-[95%] hover:h-[95%]"
                  />
                </div>
              </div>
              <p className="font-medium">{product.name}</p>
              <div className="flex gap-3 font-semibold my-1">
                <p className="text-[#fc6221] text-lg font-bold">
                  <span className="font-extrabold">৳</span>{' '}
                  {product.discountPrice}
                </p>
                <p className="text-[#848484] font-bold">
                  <s>
                    <span className="font-extrabold">৳</span> {product.price}
                  </s>
                </p>
              </div>
              <button className="button text-center w-full h-10 rounded bg-[#fc6221] text-white font-semibold mt-2">
                Buy Now
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RelatedProducts;
