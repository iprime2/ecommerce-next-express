"use client"

import { FC, useEffect, useState } from 'react'
import { apiRequest } from '@/utils/api'
import toast from 'react-hot-toast';
import { Size } from '@/utils/types';
import SizeClient from './components/client';


interface SizePageProps {
  params: { storeId: string }
}

const SizePage: FC<SizePageProps> = ({ params }) => {
  const [mounted, setMounted] = useState<boolean>(false);
  const [size, setSize] = useState<Size[]>([]);

  useEffect(() => {
    const fetchSize = async () => {
      try {
        const size = await apiRequest<Size[]>({
          url: '/api/sizes',
          method: 'GET',
        });
        setSize(size);
      } catch (error) {
        toast.error("Something Went Wrong!");
        console.error('Error fetching size:', error);
      }
    };

    fetchSize();
  }, []);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className='flex-col'>
      <div className='flex-1 space-y-4 p-8 pt-6'>
        <SizeClient data={size} />
      </div>
    </div>
  )
}

export default SizePage
