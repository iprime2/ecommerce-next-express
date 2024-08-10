"use client";

import React, { useState, useEffect } from 'react';
import { apiRequest } from '@/utils/api';
import Navbar from '@/components/Navbar';
import ProductGrid from '@/components/ui/ProductGrid';
import toast from 'react-hot-toast';
import { Product } from '@/utils/types';

const Home: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState<string | null>(null);

  const fetchProducts = async (query?: string) => {
    try {
      const response = await apiRequest<Product[]>({
        url: query ? `/api/products/search` : '/api/products',
        method: 'GET',
        params: query ? { query } : undefined,
      });
      setProducts(response);
    } catch (error) {
      toast.error("Something Went Wrong!");
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    fetchProducts(query);
  };

  return (
    <div>
      <Navbar onSearch={handleSearch} type='BUYER' />
      <main className="pt-16">
        <div className="py-10">
          <div className="max-w-10xl mx-auto sm:px-6 lg:px-2">
            <ProductGrid products={products} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
