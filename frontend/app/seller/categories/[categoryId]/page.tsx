"use client"

import { FC, useEffect, useState } from 'react'
import CategoryForm from './component/CategoryForm'
import { apiRequest } from '@/utils/api';
import { Category } from '@/utils/types';
import toast from 'react-hot-toast';
import { useParams } from 'next/navigation';

interface CategoryPageProps {
}

const CategoryPage: FC<CategoryPageProps> = () => {
  const [categories, setCategories] = useState<Category | null>(null);
  const params = useParams()

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categories = await apiRequest<Category>({
          url: `/api/categories/${params.categoryId}`,
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

    if(params.categoryId !== "new"){
      fetchCategories();
    }
  }, []);

  return (
    <div className='flex-col'>
      <div className='flex-1 space-y-4 p-8 pt-6'>
        <CategoryForm initialData={categories} />
      </div>
    </div>
  )
}

export default CategoryPage
