"use client";

import { FC, useEffect, useState } from "react";
import { Product } from "@/utils/types";
import { apiRequest } from "@/utils/api";
import toast from "react-hot-toast";
import { useParams } from "next/navigation";
import {
  Gift,
  CreditCard,
  ShoppingBag,
  RefreshCw,
  Truck,
  Award,
  CheckCircle,
} from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { useAuthStore } from "@/store/authStore";
import Image from "next/image";

const ProductPage: FC = () => {
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const { addProduct } = useCartStore();
  const { token } = useAuthStore();
  const params = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const product = await apiRequest<Product>({
          url: `/api/products/${params.productId}`,
          method: "GET",
        });
        setProduct(product);
      } catch (error) {
        if ((error as any).response.data.error) {
          toast.error((error as any).response.data.error);
        } else {
          toast.error("Something Went Wrong!");
        }
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [params.productId]);

  if (!product) {
    return <div>Loading...</div>;
  }

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    if (value > 0) {
      setQuantity(value);
    }
  };

  const handleAddToCart = () => {
    if(token){
      if (product) {
        addProduct({
        id: product.id,
        name: product.name,
        price: product.price,
        discount: product.discount || 0,
        quantity: quantity,
        imageUrl: product.images[0]?.url || "",
      });
      toast.success("Product added to cart!");
    }else {
      toast.error("You need to login first!");
    }
  }
  };

  return (
    <div className="py-10">
      <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row space-y-8 lg:space-y-0 lg:space-x-8">
          {/* Left side: Image */}
          <div className="flex-1">
            <Image
              src={product?.images[0]?.url}
              alt={product?.name}
              className="object-cover w-full h-full rounded-lg shadow-md"
            />
          </div>

          {/* Right side: Product details */}
          <div className="flex-1">
            <h1 className="text-3xl font-bold mb-2">{product?.name}</h1>

            <div className="flex items-center space-x-4 mb-4">
              <span className="text-red-600 text-2xl font-bold">
                -{product?.discount}% ₹{product?.price}
              </span>
              <span className="text-gray-500 line-through">
                M.R.P: ₹{(
                  product?.price /
                  (1 - (product?.discount || 0) / 100)
                ).toFixed(0)}
              </span>
            </div>

            <div className="flex items-center mb-4">
              <div className="flex items-center space-x-2">
                <span className="text-yellow-400">★★★★☆</span>
                <span className="text-gray-600">4.4</span>
                <span className="text-gray-500">|</span>
                <span className="text-blue-600 cursor-pointer hover:underline">
                  158 ratings
                </span>
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Quantity
              </label>
              <input
                type="number"
                value={quantity}
                onChange={handleQuantityChange}
                min="1"
                className="border border-gray-300 rounded-md py-2 px-4 w-20 text-center"
              />
            </div>

            <button
              className="bg-red-500 text-white px-4 py-2 rounded font-bold hover:bg-red-600 mb-4"
              onClick={handleAddToCart}
            >
              Add to Cart
            </button>

            <p className="text-gray-700 mb-4">{product?.description}</p>

            <p className="text-sm text-gray-500 mb-4">
              Category: {product?.category.name}
            </p>
            <p className="text-sm text-gray-500 mb-4">
              Size: {product?.size.name} ({product?.size.value})
            </p>
            <p className="text-sm text-gray-500 mb-4 flex items-center">
              Color: {product?.color.name}
              <span
                style={{ backgroundColor: product?.color.value }}
                className="inline-block ml-2 w-4 h-4 rounded-full border"
              ></span>
            </p>

            {/* Additional product details */}
            {product?.isFeatured && (
              <p className="text-sm text-green-600 mb-4">Featured Product</p>
            )}
            {product?.isArchived && (
              <p className="text-sm text-red-600 mb-4">
                This product is archived
              </p>
            )}

            {/* Offers Section */}
            <div className="mt-6">
              <h2 className="text-lg font-semibold mb-2">Offers</h2>
              <div className="space-y-2">
                <div className="flex items-center p-2 border rounded-md">
                  <Gift className="w-5 h-5 text-gray-500 mr-2" />
                  Cashback: Upto ₹79.95 cashback as Amazon Pay Balance when...
                </div>
                <div className="flex items-center p-2 border rounded-md">
                  <CreditCard className="w-5 h-5 text-gray-500 mr-2" />
                  Bank Offer: Upto ₹500.00 discount on SBI Credit Cards...
                </div>
                <div className="flex items-center p-2 border rounded-md">
                  <ShoppingBag className="w-5 h-5 text-gray-500 mr-2" />
                  No Cost EMI: Upto ₹722.00 interest savings...
                </div>
              </div>
            </div>

            <div className="mt-6 space-y-2">
              <div className="flex items-center space-x-2">
                <RefreshCw className="w-5 h-5 text-gray-500" />
                <span className="text-sm text-gray-600">
                  10 days Return & Exchange
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Truck className="w-5 h-5 text-gray-500" />
                <span className="text-sm text-gray-600">Pay on Delivery</span>
              </div>
              <div className="flex items-center space-x-2">
                <Truck className="w-5 h-5 text-gray-500" />
                <span className="text-sm text-gray-600">Free Delivery</span>
              </div>
              <div className="flex items-center space-x-2">
                <Award className="w-5 h-5 text-gray-500" />
                <span className="text-sm text-gray-600">Top Brand</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-gray-500" />
                <span className="text-sm text-gray-600">Amazon Delivered</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
