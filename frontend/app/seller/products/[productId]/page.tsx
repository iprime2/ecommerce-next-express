"use client"

import { FC, useEffect, useState } from 'react'
import ProductForm from './component/ProductForm'
import { Category, Color, Product, Size } from '@/utils/types';
import { apiRequest } from '@/utils/api';
import toast from 'react-hot-toast';
import { useParams } from 'next/navigation';

interface ProductPageProps {

}

const ProductPage: FC<ProductPageProps> = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [colors, setColors] = useState<Color[]>([]);
  const [sizes, setSizes] = useState<Size[]>([]);
  const [product, setProduct] = useState<Product | null>(null);
  const params = useParams()


  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const product = await apiRequest<Product>({
          url: `/api/products/${params.productId}`,
          method: 'GET',
        });
        setProduct(product);
      } catch (error) {
        if((error as any).response.data.error){
          toast.error((error as any).response.data.error)
        }else{
          toast.error("Something Went Wrong!");
        }
        console.error('Error fetching categories:', error);
      }
    };

    const fetchCategories = async () => {
      try {
        const categories = await apiRequest<Category[]>({
          url: '/api/categories',
          method: 'GET',
        });
        setCategories(categories);
      } catch (error) {
        if((error as any).response.data.error){
          toast.error((error as any).response.data.error)
        }else{
          toast.error("Something Went Wrong!");
        }
        console.error('Error fetching categories:', error);
      }
    };

    const fetchColors = async () => {
      try {
        const colors = await apiRequest<Color[]>({
          url: '/api/colors',
          method: 'GET',
        });
        setColors(colors);
      } catch (error) {
         if((error as any).response.data.error){
          toast.error((error as any).response.data.error)
        }else{
          toast.error("Something Went Wrong!");
        }
        console.error('Error fetching colors:', error);
      }
    };

    const fetchSizes = async () => {
      try {
        const sizes = await apiRequest<Size[]>({
          url: '/api/sizes',
          method: 'GET',
        });
        setSizes(sizes);
      } catch (error) {
         if((error as any).response.data.error){
          toast.error((error as any).response.data.error)
        }else{
          toast.error("Something Went Wrong!");
        }
        console.error('Error fetching sizes:', error);
      }
    };

    fetchCategories();
    fetchColors();
    fetchSizes();
    
    if(params.productId !== "new"){
      fetchProduct();
    }
  }, [params.productId]);


  return (
    <div className='flex-col'>
      <div className='flex-1 space-y-4 p-8 pt-6'>
        <ProductForm
          initialData={product}
          categories={categories}
          sizes={sizes}
          colors={colors}
        />
      </div>
    </div>
  )
}

export default ProductPage
