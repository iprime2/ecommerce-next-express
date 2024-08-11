"use client";

import { FC } from "react";
import { useCartStore } from "@/store/cartStore";
import { Trash2, PlusCircle, MinusCircle } from "lucide-react";

const CartPage: FC = () => {
  const { products, addProduct, removeProduct, getTotalCount } = useCartStore();

  const handleIncreaseQuantity = (productId: string) => {
    const product = products.find((p) => p.id === productId);
    if (product) {
      addProduct({ ...product, quantity: 1 }); // Add 1 more to the existing quantity
    }
  };

  const handleDecreaseQuantity = (productId: string) => {
    const product = products.find((p) => p.id === productId);
    if (product && product.quantity > 1) {
      addProduct({ ...product, quantity: -1 }); // Decrease quantity by 1
    } else if (product) {
      removeProduct(productId); // Remove product if quantity is 1
    }
  };

  const getTotalPrice = () => {
    return products.reduce((total, product) => total + product.price * product.quantity, 0);
  };

  return (
    <div className="max-w-7xl mx-auto py-10 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          {products.length > 0 ? (
            products.map((product) => (
              <div key={product.id} className="flex items-center justify-between border-b py-4">
                <div className="flex items-center space-x-4">
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-24 h-24 object-cover rounded"
                  />
                  <div>
                    <h2 className="text-lg font-semibold">{product.name}</h2>
                    <p className="text-sm text-gray-500">In stock</p>
                    <div className="mt-2 flex items-center space-x-2">
                      <MinusCircle
                        className="w-5 h-5 text-gray-500 cursor-pointer"
                        onClick={() => handleDecreaseQuantity(product.id)}
                      />
                      <span className="text-lg">{product.quantity}</span>
                      <PlusCircle
                        className="w-5 h-5 text-gray-500 cursor-pointer"
                        onClick={() => handleIncreaseQuantity(product.id)}
                      />
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-semibold text-gray-900 dark:text-white">₹{product.price * product.quantity}</p>
                  <p className="text-sm text-gray-500 line-through">
                    M.R.P: ₹{(product.price / (1 - (product?.discount || 0) / 100)).toFixed(0)}
                  </p>
                  <p className="text-sm text-red-600">-{(product?.discount || 0)}%</p>
                  <button
                    className="text-sm text-red-500 hover:underline mt-2 flex items-center"
                    onClick={() => removeProduct(product.id)}
                  >
                    <Trash2 className="w-4 h-4 mr-1" /> Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>Your cart is empty.</p>
          )}
        </div>
        <div className="p-4 border rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Subtotal ({getTotalCount()} items):</h2>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">₹{getTotalPrice().toFixed(2)}</p>
          <button className="bg-yellow-500 text-white w-full py-2 mt-4 rounded-lg hover:bg-yellow-600">
            Proceed to Buy
          </button>
          <div className="mt-4">
            <label className="flex items-center space-x-2">
              <input type="checkbox" />
              <span>This order contains a gift</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
