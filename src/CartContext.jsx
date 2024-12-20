import React, { useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const Cart = React.createContext();

const CartContext = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);

  const cartLength = cartItems.length; // The length of items in the cart

  const addToCart = (product) => {
    const itemIndex = cartItems.findIndex((item) => item.id === product.id);

    if (itemIndex === -1) {
      // If product doesn't exist, add it with qty: 1
      setCartItems([...cartItems, { ...product, qty: 1 }]);
      toast.success(`${product.title} added to cart`);
    } else {
      // If product already exists, update the qty
      const updatedCartItems = [...cartItems];
      updatedCartItems[itemIndex].qty += 1;
      setCartItems(updatedCartItems);
      toast.info(`${product.title} quantity updated in cart`);
    }
  };

  const increment = (item) => {
    const updatedCartItems = cartItems.map((cartItem) => {
      if (cartItem.id === item.id) {
        // Check if the current qty is less than the available stock
        if (cartItem.qty < cartItem.stock) {
          // Allow qty to increase
          return { ...cartItem, qty: cartItem.qty + 1 };
        } else {
          // Show toast message for out of stock
          toast.error("Stock is not available. Only " + cartItem.stock + " items available.");
          return cartItem;
        }
      }
      return cartItem;
    });
    setCartItems(updatedCartItems);
  };
  

  const decrement = (item) => {
    const updatedCartItems = cartItems.map((cartItem) =>
      cartItem.id === item.id && cartItem.qty > 1 ? { ...cartItem, qty: cartItem.qty - 1 } : cartItem
    );
    setCartItems(updatedCartItems);
  };

  const remove_from_cart = (itemId) => {
    const updatedCartItems = cartItems.filter(item => item.id !== itemId);
    setCartItems(updatedCartItems);
    toast.success("Item removed from cart");
  };

  const emptycart = () => {
    setCartItems([]);
    toast.success("Cart has been emptied");
  };

  const calculate_total = () => {
    const newTotal = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);
    setTotal(newTotal);
  };

  // Recalculate total whenever cartItems changes
  useEffect(() => {
    calculate_total();
  }, [cartItems]);

  return (
    <Cart.Provider value={{ cartItems, setCartItems, total, setTotal, addToCart, cartLength, increment, decrement, remove_from_cart, emptycart, calculate_total }}>
      {children}
    </Cart.Provider>
  );
};

export default CartContext;
export const useCart = () => useContext(Cart);
