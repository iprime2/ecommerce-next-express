"use client"
import { FC, useEffect, useState } from 'react'
import ProductClient from './components/client'
import { apiRequest } from '@/utils/api'
import toast from 'react-hot-toast';
import { Product } from '@/utils/types';

interface ProductsPageProps {
  params: { storeId: string }
}

const ProductsPage: FC<ProductsPageProps> = ({ params }) => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const products = await apiRequest<Product[]>({
          url: '/api/products',
          method: 'GET',
        });
        setProducts(products);
      } catch (error) {
        if((error as any).response.data.error){
          toast.error((error as any).response.data.error)
        }else{
          toast.error("Something Went Wrong!");
        }
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className='flex-col'>
      <div className='flex-1 space-y-4 p-8 pt-6'>
        <ProductClient data={products} />
      </div>
    </div>
  )
}

export default ProductsPage
