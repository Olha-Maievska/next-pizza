import { cn } from '@/lib/utils'
import React from 'react'

interface Props {
  className?: string
}

const catedories = [
  'Pizzas',
  'Combo',
  'Snacks',
  'Cocktails',
  'Coffee',
  'Drinks',
  'Desserts',
]
const activeIndex = 0

export const Catedories: React.FC<Props> = ({ className }) => {
  return (
    <div
      className={cn('inline-flex bg-gray-50 gap-1 p-1 rounded-2xl', className)}
    >
      {catedories.map((catedory, index) => (
        <a
          key={catedory}
          className={cn(
            'flex items-center font-bold h-11 rounded-2xl px-5',
            activeIndex === index &&
              'bg-white shadow-md shadow-gray-200 text-primary'
          )}
          href=""
        >
          <button>{catedory}</button>
        </a>
      ))}
    </div>
  )
}
