'use client'

import { Plus } from 'lucide-react'
import { FC } from 'react'
import { useParams, useRouter } from 'next/navigation'

import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { columns } from './columns'
import { DataTable } from '@/components/ui/DataTable'
import Heading from '@/components/Heading'
import { Category } from '@/utils/types'

interface CategoryClientProps {
  data: Category[]
}

const CategoryClient: FC<CategoryClientProps> = ({ data }) => {
  const router = useRouter()
  const params = useParams()

  return (
    <>
      <div className='flex items-center justify-between'>
        <Heading
          title={`Categories (${data.length})`}
          description='Manage categories for your store'
        />
        <Button
          onClick={() => router.push(`/seller/categories/new`)}
        >
          <Plus className='mr-2 h-4 w-4' />
          Add New
        </Button>
      </div>
      <Separator />
      <DataTable columns={columns} data={data} searchKey='name ' />
    </>
  )
}

export default CategoryClient
