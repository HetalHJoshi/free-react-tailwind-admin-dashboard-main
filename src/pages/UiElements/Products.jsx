import React, { useEffect, useState } from 'react';
import Breadcrumb from '../../components/Breadcrumb';
import { useCart } from '../../CartContext'; // Make sure to import useCart
import toast from 'react-hot-toast';

const Products = () => {
  const [products, setProducts] = useState([]);
  const { addToCart } = useCart(); // Destructure addToCart from useCart

  const getData = async () => {
    try {
      const res = await fetch('https://dummyjson.com/products');
      const data = await res.json();
      console.log(data.products);
      setProducts(data.products);
      toast.success("Products fetched successfully");
    } catch (err) {
      toast.error("Failed to fetch products");
    }
  };

  useEffect(() => {
    getData();
  }, []); // Only run on mount

  const handleCart = (product) => {
    addToCart(product); // Use the addToCart function from the CartContext
  };

  return (
    <>
      <Breadcrumb pageName="Products" />
      <div className="bg-gradient-to-b from-blue-50 to-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <h2 className="text-4xl font-extrabold tracking-tight text-gray-900 mb-12 text-center">
            Product List
          </h2>

          <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 xl:gap-x-8">
            {products.length === 0 && <h1>No Product Found</h1>}
            {products.map((product) => (
              <div
                key={product.id}
                className="group relative bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-xl transition-transform duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-indigo-400"
              >
                {/* Glowing overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black opacity-30 group-hover:opacity-0 transition-opacity duration-500"></div>
                <img
                  alt={product.title}
                  src={product.images[0]}
                  className="w-full h-72 object-cover group-hover:opacity-90 transition-opacity duration-700 transform group-hover:scale-105 p-4"
                />
                <div className="p-6 bg-white rounded-b-2xl">
                  <h3 className="text-xl font-semibold text-gray-900 hover:text-indigo-600 transition-colors duration-300">
                    <a href={product.href}>
                      {product.title.length > 40 ? product.title.slice(0, 40) + '...' : product.title}
                    </a>
                  </h3>
                  <p className="mt-2 text-sm text-gray-500">{product.brand}</p>
                  <div className="mt-3 flex items-center space-x-2">
                    <span className="text-2xl font-bold text-gray-900">${product.price}</span>
                    {product.discountPercentage && (
                      <span className="text-sm font-semibold text-white bg-red-500 py-1 px-2 rounded-full">
                        {product.discountPercentage}% OFF
                      </span>
                    )}
                  </div>
                  <div className="mt-4 flex justify-between items-center">
                    <div className="flex items-center space-x-1">
                      {/* Full Star Rating */}
                      <span className="text-sm text-yellow-400">
                        {'★'.repeat(Math.floor(product.rating))} {/* No decimal ratings */}
                      </span>
                      <span className="text-sm text-gray-500">{Math.floor(product.rating)}</span> {/* Display full rating number */}
                    </div>
                    <button
                      className="px-6 py-3 text-sm font-medium text-black bg-gray-900 rounded-lg hover:bg-indigo-700 transition-all duration-300 transform hover:scale-105 shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
                      onClick={() => handleCart(product)}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Products;
