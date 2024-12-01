'use client'

import React from 'react'
import { cn } from '@/lib/utils'
import { useCategoryStore } from '@/store/category'
import { Category } from '@prisma/client'

interface Props {
  className?: string
  items: Category[]
}

export const Categories: React.FC<Props> = ({ className, items }) => {
  const activeCategoryId = useCategoryStore((state) => state.activeId)

  return (
    <div
      className={cn('inline-flex bg-gray-50 gap-1 p-1 rounded-2xl', className)}
    >
      {items.map((item) => (
        <a
          key={item.id}
          className={cn(
            'flex items-center font-bold h-11 rounded-2xl px-5',
            activeCategoryId === item.id &&
              'bg-white shadow-md shadow-gray-200 text-primary'
          )}
          href={`/#${item.name}`}
        >
          <button>{item.name}</button>
        </a>
      ))}
    </div>
  )
}
