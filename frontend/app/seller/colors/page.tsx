"use client"

import { FC, useEffect, useState } from 'react'
import toast from 'react-hot-toast';

import ColorClient from './components/client'
import { Color } from '@/utils/types'
import { apiRequest } from '@/utils/api'


interface ColorPageProps {
  params: { storeId: string }
}

const ColorPage: FC<ColorPageProps> = ({ params }) => {
  const [colors, setColors] = useState<Color[]>([]);

  useEffect(() => {
    const fetchColors = async () => {
      try {
        const color = await apiRequest<Color[]>({
          url: '/api/colors',
          method: 'GET',
        });
        setColors(color);
      } catch (error) {
        toast.error("Something Went Wrong!");
        if((error as any).response.data.error){
          toast.error((error as any).response.data.error)
        }
        console.error('Error fetching color:', error);
      }
    };

    fetchColors();
  }, []);

  return (
    <div className='flex-col'>
      <div className='flex-1 space-y-4 p-8 pt-6'>
        <ColorClient data={colors} />
      </div>
    </div>
  )
}

export default ColorPage
