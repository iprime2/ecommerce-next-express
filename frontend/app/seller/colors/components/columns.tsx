'use client'

import { ColumnDef } from '@tanstack/react-table'
import CellAction from './CellAction'
import { Color } from '@/utils/types'
import { format } from 'date-fns'

export const columns: ColumnDef<Color>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'value',
    header: 'Value',
    cell: ({ row }) => (
      <div className='flex items-center gap-x-2'>
        {row.original.value}
        <div
          className='h-6 w-6 rounded-full border'
          style={{ backgroundColor: row.original.value }}
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
