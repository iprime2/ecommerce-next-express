
"use client"
import { FC, useEffect, useState } from 'react'
import ColorForm from './component/ColorForm'
import { useParams } from 'next/navigation';
import { apiRequest } from '@/utils/api';
import { Color } from '@/utils/types';
import toast from 'react-hot-toast';

interface ColorPageProps {
}

const ColorPage: FC<ColorPageProps> = () => {
  const [color, setColor] = useState<Color | null>(null);
  const params = useParams()

  useEffect(() => {
    const fetchColor = async () => {
      try {
        const color = await apiRequest<Color>({
          url: `/api/colors/${params.colorId}`,
          method: 'GET',
        });
        setColor(color);
      } catch (error) {
        toast.error("Something Went Wrong!");
        if((error as any).response.data.error){
          toast.error((error as any).response.data.error)
        }
        console.error('Error fetching color:', error);
      }
    };

    if(params.colorId !== "new"){
      fetchColor();
    }
  }, []);

  return (
    <div className='flex-col'>
      <div className='flex-1 space-y-4 p-8 pt-6'>
        <ColorForm initialData={color} />
      </div>
    </div>
  )
}

export default ColorPage
