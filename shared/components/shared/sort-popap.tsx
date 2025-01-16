'use client'

import { cn } from '@/shared/lib/utils'
import { ArrowUpDown } from 'lucide-react'
import React from 'react'
import { Select } from '../ui'
import {
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select'
import { useFilters } from '@/shared/hooks/use-filters'
import { useQueryFilters } from '@/shared/hooks'

interface Props {
  className?: string
}

export const SortPopap: React.FC<Props> = ({ className }) => {
  const filters = useFilters()

  useQueryFilters(filters)

  return (
    <div
      className={cn(
        'inline-flex items-center gap-1 bg-gray-50 px-5 h-[52px] rounded-2xl cursor-pointer',
        className
      )}
    >
      <ArrowUpDown size={16} />
      <Select onValueChange={filters.setSortBy}>
        <SelectTrigger>
          <SelectValue placeholder="Sorting" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="asc">Price: Low to High</SelectItem>
          <SelectItem value="desc">Price: High to Low</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}
