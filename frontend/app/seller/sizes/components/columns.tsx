'use client'

import { ColumnDef } from '@tanstack/react-table'
import CellAction from './CellAction'
import { Size } from '@/utils/types'
import { format } from 'date-fns'

export const columns: ColumnDef<Size>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'value',
    header: 'Value',
  },
  {
    accessorKey: 'createdAt',
    header: 'Date',
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
