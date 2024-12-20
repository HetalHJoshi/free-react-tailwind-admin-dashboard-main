import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../CartContext'; // Import useCart
import ShoppingCartBadge from './ShoppingCartBadge'; // Import ShoppingCartBadge component

const DropdownShoppingCart = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const trigger = useRef(null);
  const dropdown = useRef(null);
  const { cartItems, total } = useCart(); // Get cartItems and total from context

  // Handle dropdown open/close
  useEffect(() => {
    const clickHandler = (event) => {
      const { target } = event;
      if (!dropdown.current) return;
      if (
        !dropdownOpen ||
        dropdown.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setDropdownOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  });

  useEffect(() => {
    const keyHandler = (event) => {
      if (!dropdownOpen || event.keyCode !== 27) return;
      setDropdownOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  });

  return (
    <li className="relative">
      {/* Cart Button with Badge */}
      <Link
        ref={trigger}
        onClick={() => setDropdownOpen(!dropdownOpen)}
        to="#"
        className="relative flex h-8.5 w-8.5 items-center justify-center rounded-full border-[0.5px] border-stroke bg-gray hover:text-primary dark:border-strokedark dark:bg-meta-4 dark:text-white"
      >
        <ShoppingCartBadge /> {/* Render the ShoppingCartBadge here */}
      </Link>

      {/* Dropdown for Cart Items */}
      <div
        ref={dropdown}
        onFocus={() => setDropdownOpen(true)}
        onBlur={() => setDropdownOpen(false)}
        className={`absolute -right-27 mt-2.5 flex h-90 w-75 flex-col rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark sm:right-0 sm:w-80 ${dropdownOpen ? 'block' : 'hidden'}`}
      >
        <div className="px-4.5 py-3">
          <h5 className="text-sm font-medium text-bodydark2">Shopping Cart</h5>
        </div>

        {/* Render Cart Items dynamically */}
        <ul className="flex h-auto flex-col overflow-y-auto">
          {cartItems.length === 0 ? (
            <li className="px-4 py-3 text-sm text-center text-gray-600 dark:text-gray-400">
              Your cart is empty
            </li>
          ) : (
            <>
              {/* Add column headings for Product Name and Quantity */}
              <li className="flex border-b border-stroke px-4 py-3 text-sm font-medium text-bodydark2 dark:border-strokedark dark:text-gray-400">
                <div className="w-3/5">Product Name</div>
                <div className="w-2/5 text-center">Quantity</div>
              </li>

              {cartItems.map((item, index) => (
                <li key={index} className="flex border-t border-stroke px-4 py-3 hover:bg-gray-2 dark:border-strokedark dark:hover:bg-meta-4">
                  <div className="w-3/5">
                    <p className="text-sm">
                      <span className="text-black dark:text-white">{item.title}</span>
                    </p>
                  </div>
                  <div className="w-2/5 text-center">
                    <p className="text-sm">{item.qty}</p>
                  </div>
                </li>
              ))}
            </>
          )}
        </ul>

        {/* Total Price and Checkout */}
        <div className="px-4.5 py-3 border-t border-stroke dark:border-strokedark">
          <p className="text-sm font-medium text-bodydark2">
            Total: ${total.toFixed(2)}
          </p>
          {/* <Link
            to="/checkout"
            className="mt-2.5 inline-block w-full text-center text-sm text-primary hover:underline"
          >
            Checkout
          </Link> */}
          <Link to="/ui/cart">
                                      <button
              type="button"
              className="w-full mt-15 text-white bg-gradient-to-r from-red-500 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 font-medium rounded-lg text-lg px-5 py-1.5 text-center"
          >
             Go To Cart
          </button>
          
                                  </Link>
        </div>
      </div>
    </li>
  );
};

export default DropdownShoppingCart;
