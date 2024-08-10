'use client'

import { Plus } from 'lucide-react'
import { FC } from 'react'
import { useParams, useRouter } from 'next/navigation'

import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { columns } from './columns'
import Heading from '@/components/Heading'
import { DataTable } from '@/components/ui/DataTable'
import { Product } from '@/utils/types'

interface ProductClientProps {
  data: Product[]
}

const ProductClient: FC<ProductClientProps> = ({ data }) => {
  const router = useRouter()

  return (
    <>
      <div className='flex items-center justify-between'>
        <Heading
          title={`Products (${data.length})`}
          description='Manage products for your store'
        />
        <Button onClick={() => router.push(`/seller/products/new`)}>
          <Plus className='mr-2 h-4 w-4' />
          Add New
        </Button>
      </div>
      <Separator />
      <DataTable columns={columns} data={data} searchKey='name' />
    </>
  )
}

export default ProductClient
