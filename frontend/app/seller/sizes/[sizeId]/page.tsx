"use client"

import { FC, useEffect, useState } from 'react'
import SizeForm from './component/SizeForm'
import { apiRequest } from '@/utils/api';
import { Size } from '@/utils/types';
import toast from 'react-hot-toast';
import { useParams } from 'next/navigation';

interface SizePageProps {
}

const SizePage: FC<SizePageProps> = () => {
  const [sizes, setSize] = useState<Size | null>(null);
  const params = useParams();
  const [mounted, setMounted] = useState<boolean>(false);


  useEffect(() => {
    const fetchSizes = async () => {
      try {
        const sizes = await apiRequest<Size>({
          url: `/api/sizes/${params.sizeId}`,
          method: 'GET',
        });
        setSize(sizes);
      } catch (error) {
        if((error as any).response.data.error){
          toast.error((error as any).response.data.error)
        }else{
          toast.error("Something Went Wrong!");
        }
        console.error('Error fetching sizes:', error);
      }
    };

    if(params.sizeId !== "new"){
      fetchSizes();
    }
  }, [params.sizeId]);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className='flex-col'>
      <div className='flex-1 space-y-4 p-8 pt-6'>
        <SizeForm initialData={sizes} />
      </div>
    </div>
  )
}

export default SizePage
