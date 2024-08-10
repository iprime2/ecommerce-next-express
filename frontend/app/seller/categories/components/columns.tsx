'use client'

import { ColumnDef } from '@tanstack/react-table'
import CellAction from './CellAction'
import { Category } from '@/utils/types'
import { format } from 'date-fns'

export const columns: ColumnDef<Category>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
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
