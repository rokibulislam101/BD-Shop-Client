// import { useContext } from "react";
// import { CartContext } from "../../../Features/ContextProvider";

// const CartCard = ({ product }) => {
//   const { cart, cartDispatch } = useContext(CartContext);

//   const Increase = id => {
//     const Index = cart.findIndex(p => p.id === id);
//     if (cart[Index].quantity < 10) {
//       cartDispatch({ type: 'Increase', id });
//     }
//   };

//   const Decrease = id => {
//     const Index = cart.findIndex(p => p.id === id);
//     if (cart[Index].quantity > 1) {
//       cartDispatch({ type: 'Decrease', id });
//     }
//   };

//   return (
//     <div className="flex w-full justify-between items-center">
//       <div className="flex w-full gap-5 items-center">
//         <img
//           src={product.image}
//           alt="Product Photo"
//           className="w-16 h-16 object-cover"
//         />
//         <p className="text-sm font-medium">{product.name}</p>
//       </div>
//       <div className="flex w-full justify-between items-center">
//         <p className="text-sm font-medium">৳ {product.price}</p>
//         <div className="flex items-center mt-4">
//           <button
//             className="bg-slate-100 w-[35px] h-[35px] font-bold text-xl rounded-full"
//             onClick={() => Decrease(product.id)}
//           >
//             -
//           </button>
//           <input
//             type="text"
//             value={product.quantity}
//             className="w-6 text-center font-semibold border-gray-300 rounded-md"
//           />
//           <button
//             className="bg-slate-100 w-[35px] h-[35px] font-bold text-xl rounded-full"
//             onClick={() => Increase(product.id)}
//           >
//             +
//           </button>
//         </div>
//         <p className="text-sm font-medium">৳ {product.discountPrice}</p>
//         <button
//           className="text-gray-500 hover:text-gray-700"
//           onClick={() => cartDispatch({ type: 'Remove', id: product.id })}
//         >
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             fill="none"
//             viewBox="0 0 24 24"
//             stroke-width="1.5"
//             stroke="currentColor"
//             className="w-6 h-6"
//           >
//             <path
//               stroke-linecap="round"
//               stroke-linejoin="round"
//               d="M6 18L18 6M6 6l12 12"
//             />
//           </svg>
//         </button>
//       </div>
//     </div>
//   );
// }

// export default CartCard


import { useContext } from 'react';
import { CartContext } from '../../../Features/ContextProvider';
import './CartCard.css';

const CartCard = ({ product }) => {
  const { cartDispatch } = useContext(CartContext);

  const Increase = (id) => {
    cartDispatch({ type: 'Increase', id });
  };

  const Decrease = (id) => {
    cartDispatch({ type: 'Decrease', id });
  };

  const Remove = (id) => {
    cartDispatch({ type: 'Remove', id });
  };

  return (
    <div>
      <div className="flex w-full justify-between items-center">
        <div className="flex w-full gap-5 items-center">
          <img
            src={product.image}
            alt="Product Photo"
            className="w-16 h-16 object-cover"
          />
          <p className="text-sm font-medium text-[#ff6221]">{product.name}</p>
        </div>
        <div className="flex w-full justify-between items-center">
          <p className="text-sm font-medium">৳ {product.discountPrice}</p>
          <div className="flex items-center">
            <button
              className="bg-slate-100 w-[30px] h-[30px] md:w-[35px] md:h-[35px] font-bold text-xl rounded-full"
              onClick={() => Decrease(product.id)}
            >
              -
            </button>
            <span className="px-2">{product.quantity}</span>
            <button
              className="bg-slate-100 w-[30px] h-[30px] md:w-[35px] md:h-[35px] font-bold text-xl rounded-full"
              onClick={() => Increase(product.id)}
            >
              +
            </button>
          </div>
          <p className="text-sm font-medium">
            ৳ {product.quantity * product.discountPrice}
          </p>
          <button
            className="text-gray-500 hover:text-gray-700"
            onClick={() => Remove(product.id)}
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
        </div>
      </div>
      <hr className="my-3" />
    </div>
  );
};

export default CartCard;
