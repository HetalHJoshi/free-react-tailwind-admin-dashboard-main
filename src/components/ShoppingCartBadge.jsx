import React from 'react';
import { useCart } from '../CartContext';
import { FaShoppingCart } from 'react-icons/fa';

const ShoppingCartBadge = () => {
  const { cartLength } = useCart(); // Get the number of products in the cart

  return (
    <div className="relative">
      <button
        type="button"
        className="relative flex items-center justify-center rounded-full bg-gray-200 p-2 text-gray-800 hover:bg-gray-300"
      >
        <FaShoppingCart className="text-current" size={24} />
        
        {/* Display Badge if cartLength > 0 */}
        {cartLength > 0 && (
          <span className="absolute -top-2 -right-2 flex items-center justify-center bg-red-700 text-white text-xs font-bold w-5 h-5 p-1 rounded-full z-1000">
            {cartLength} {/* Display the number of products in the cart */}
          </span>
        )}
      </button>
    </div>
  );
};

export default ShoppingCartBadge;
