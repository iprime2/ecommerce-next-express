"use client";

import React, { useState, useEffect } from 'react';
import { apiRequest } from '@/utils/api';
import Navbar from '@/components/Navbar';
import ProductGrid from '@/components/ui/ProductGrid';
import toast from 'react-hot-toast';
import { Product } from '@/utils/types';

const Home: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchProducts = async (query: string = '', category: string = 'All Categories') => {
    setLoading(true);
    try {
      const response = await apiRequest<Product[]>({
        url: `/api/products/search`,
        method: 'GET',
        params: { query, category },
      });
      setProducts(response);
    } catch (error) {
      toast.error("Something Went Wrong!");
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(); // Initially load all products
  }, []);

  const handleSearch = (query: string, category: string) => {
    fetchProducts(query, category);
  };

  return (
    <div>
      <Navbar onSearch={handleSearch} type='BUYER' />
      <main className="pt-16">
        <div className="py-10">
          <div className="max-w-10xl mx-auto sm:px-6 lg:px-2">
            <ProductGrid products={products} loading={loading} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
