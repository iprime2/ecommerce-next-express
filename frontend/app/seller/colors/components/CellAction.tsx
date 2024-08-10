'use client'

import { FC, useState } from 'react'
import { Copy } from 'lucide-react'
import { Trash } from 'lucide-react'
import { Edit, MoreHorizontal } from 'lucide-react'
import axios from 'axios'

import { toast } from 'react-hot-toast'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { useParams, useRouter } from 'next/navigation'
import AlertModal from '@/components/modals/AlertModal'
import { Color } from '@/utils/types'
import { apiRequest } from '@/utils/api'

interface CellActionProps {
  data: Color
}

const CellAction: FC<CellActionProps> = ({ data }) => {
  const router = useRouter()
  const params = useParams()

  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)

  const onDelete = async () => {
    try {
      setLoading(true)
      await apiRequest<Color>({
        url: `/api/colors/${data.id}`,
        method: 'DELETE',
      });
      router.refresh()
      toast.success('Color deleted!')
    } catch (error: any) {
      toast.error(
        'Something Went Wrong!'
      )
      if((error as any).response.data.error){
        toast.error((error as any).response.data.error)
      }
    } finally {
      setLoading(false)
      setOpen(false)
    }
  }

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant='ghost' className='h-8 w-8 p-0'>
            <span className='sr-only'>Open menu</span>
            <MoreHorizontal className='h-4 w-4' />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end'>
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem
            onClick={() => router.push(`/seller/colors/${data.id}`)}
          >
            <Edit className='mr-2 h-4 w-4' />
            Update
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpen(true)}>
            <Trash className='mr-2 h-4 w-4' />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}

export default CellAction
