import { useContext } from "react";
import { CartContext, WishlistContext } from "../../../Features/ContextProvider";

const WishlistCard = ({ product }) => {
  const { wishlistDispatch } = useContext(WishlistContext);
  const { cartDispatch } = useContext(CartContext);

  const handleRemoveFromWishlist = id => {
    wishlistDispatch({
      type: 'REMOVE_FROM_WISHLIST',
      id: id,
    });
  };

  const addToCart = product => {
    cartDispatch({
      type: 'Add',
      product: { ...product, id: product._id },
    });

    handleRemoveFromWishlist(product.id);
  };

  return (
    <div>
      <div className="flex justify-center">
        <div className="md:flex w-full justify-center">
          <div className="flex w-full items-center justify-center">
            <div className="flex w-full items-center justify-around gap-4">
              <button
                className="text-gray-500 hover:text-gray-700"
                onClick={() => handleRemoveFromWishlist(product.id)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
              <div className="flex w-full items-center justify-around gap-4">
                <img
                  src={product.image}
                  alt="Product Photo"
                  className="w-16 h-16 object-cover"
                />
                <p className="w-full text-[#ff6621]">{product.name}</p>
              </div>
            </div>
            <div className="flex w-full items-center justify-around gap-4">
              <p className="">৳ {product.discountPrice}</p>
              <p>{product.status}</p>
            </div>
          </div>
          <div className="flex items-center justify-end w-full">
            <button
              className="w-fit bg-[#ff6221] text-white font-semibold py-2 px-4 rounded"
              onClick={() => addToCart(product)}
            >
              Add To Cart
            </button>
          </div>
        </div>
      </div>
      <hr className="my-3" />
    </div>
  );
}

export default WishlistCard
