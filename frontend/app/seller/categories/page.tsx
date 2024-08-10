"use client"

import { FC, useEffect, useState } from 'react'
import toast from 'react-hot-toast';

import CategoryClient from './components/client'
import { apiRequest } from '@/utils/api'
import { Category } from '@/utils/types';

interface CategoriesPageProps {
}

const CategoriesPage: FC<CategoriesPageProps> = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
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

    fetchCategories();
  }, []);

  return (
    <div className='flex-col'>
      <div className='flex-1 space-y-4 p-8 pt-6'>
        <CategoryClient data={categories} />
      </div>
    </div>
  )
}

export default CategoriesPage
