import React from 'react';
import { Product } from '@/utils/types';
import Link from 'next/link';
import ProductSkeleton from '../ProductSkeleton';
import Image from 'next/image';

interface ProductGridProps {
  products: Product[];
  loading: boolean;
}

const ProductGrid: React.FC<ProductGridProps> = ({ products, loading }) => {
  const skeletonArray = new Array(8).fill(null); // Change 8 to however many skeletons you want to display

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100">Products</h2>
      <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
        {loading
          ? skeletonArray.map((_, index) => <ProductSkeleton key={index} />)
          : products.map((product) => (
              <Link key={product?.id} href={`/product/${product?.id}`}>
                <div
                  className="group relative border rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-200 bg-white dark:bg-gray-800 transform hover:scale-105 transition-transform"
                  style={{ height: '100%' }}
                >
                  <div className="flex flex-col h-full">
                    <div className="w-full h-3/5 bg-gray-200 aspect-w-1 aspect-h-1 overflow-hidden lg:aspect-none">
                      <Image
                        src={product?.images[0]?.url || '/placeholder.jpg'}
                        alt={product?.name}
                        className="w-full h-full object-center object-cover lg:w-full lg:h-full"
                      />
                    </div>
                    {product?.isFeatured && (
                      <span className="absolute top-2 left-2 bg-black text-white text-xs font-semibold px-2 py-1 rounded">
                        Featured
                      </span>
                    )}
                    <div className="p-4 flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="text-md font-semibold text-gray-900 dark:text-gray-100">
                          {product?.name}
                        </h3>
                        <div className="mt-1">
                          <p className="text-xl font-bold text-gray-900 dark:text-gray-100">
                            ₹{product?.price}
                          </p>
                          {product?.discount && product?.discount > 0 && (
                            <p className="text-sm text-gray-500 dark:text-gray-300">
                              M.R.P: <span className="line-through">₹{(product?.price / (1 - product?.discount / 100)).toFixed(0)}</span>
                              <span className="ml-2 text-red-500">({product?.discount}% off)</span>
                            </p>
                          )}
                        </div>
                        <p className="text-sm text-gray-500 dark:text-gray-300 mb-2">
                          {product?.description?.split(' ').slice(0, 10).join(' ')}...
                        </p>
                        <div className="flex items-center space-x-2 mb-2">
                          {product?.color && (
                            <>
                              <span className="text-xs text-gray-500 dark:text-gray-300">Colors:</span>
                              <div className="flex space-x-1">
                                <span
                                  style={{ backgroundColor: product?.color?.value }}
                                  className="w-5 h-5 rounded-full border border-gray-300"
                                ></span>
                              </div>
                            </>
                          )}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-300">
                          <span>Size: </span>
                          <span className="font-medium">{product?.size?.name}</span>
                        </div>
                      </div>
                      <div className="mt-4">
                        <button className="w-full bg-yellow-400 hover:bg-yellow-500 text-white font-semibold py-2 px-4 rounded">
                          Add to cart
                        </button>
                        <span className="block text-xs text-gray-500 dark:text-gray-300 text-center mt-2">Free shipping</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
      </div>
    </div>
  );
};

export default ProductGrid;
