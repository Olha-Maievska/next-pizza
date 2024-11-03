'use client'

import { cn } from '@/lib/utils'
import { useCategoryStore } from '@/store/category'
import React from 'react'

interface Props {
  className?: string
}

const catedories = [
  { id: 1, name: 'Pizzas' },
  { id: 2, name: 'Combo' },
  { id: 3, name: 'Snacks' },
  { id: 4, name: 'Cocktails' },
  { id: 5, name: 'Coffee' },
  { id: 6, name: 'Drinks' },
  { id: 7, name: 'Desserts' },
]

export const Catedories: React.FC<Props> = ({ className }) => {
  const activeCategoryId = useCategoryStore((state) => state.activeId)

  return (
    <div
      className={cn('inline-flex bg-gray-50 gap-1 p-1 rounded-2xl', className)}
    >
      {catedories.map((catedory) => (
        <a
          key={catedory.id}
          className={cn(
            'flex items-center font-bold h-11 rounded-2xl px-5',
            activeCategoryId === catedory.id &&
              'bg-white shadow-md shadow-gray-200 text-primary'
          )}
          href={`/#${catedory.name}`}
        >
          <button>{catedory.name}</button>
        </a>
      ))}
    </div>
  )
}
