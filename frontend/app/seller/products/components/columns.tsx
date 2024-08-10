'use client'

import { ColumnDef } from '@tanstack/react-table'
import CellAction from './CellAction'
import { Product } from '@/utils/types'
import { format } from 'date-fns'

export const columns: ColumnDef<Product>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'isArchived',
    header: 'Archived',
  },
  {
    accessorKey: 'isFeatured',
    header: 'Featured',
  },
  {
    accessorKey: 'price',
    header: 'Price',
  },
  {
    accessorKey: 'discount',
    header: 'Discount',
  },
  {
    accessorKey: 'category',
    header: 'Category',
    cell: ({ row }) => (
      <div>
        {row.original?.category?.name}
      </div>
    ),
  },
  {
    accessorKey: 'size',
    header: 'Size',
    cell: ({ row }) => (
      <div>
        {row.original?.size?.name}
      </div>
    ),
  },
  {
    accessorKey: 'color',
    header: 'Color',
    cell: ({ row }) => (
      <div className='flex items-center  gap-x-2'>
        {row.original?.color?.name}
        <div
          className='h-6 w-6 rounded-full border'
          style={{ backgroundColor: row.original?.color?.value || "white" }}
        ></div>
      </div>
    ),
  },
  {
    accessorKey: 'createdAt',
    header: 'Date',
    cell: ({ row }) => (
      <div>
        {format(row.original.createdAt, 'MMMM do, yyyy')}
      </div>
    ),
  },
  {
    header: 'Actions',
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} />,
  },
]
