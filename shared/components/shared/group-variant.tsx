'use client'

import { cn } from '@/shared/lib/utils'
import React from 'react'

export type Variant = {
  name: string
  value: string
  disabled?: boolean
}

interface Props {
  className?: string
  items: readonly Variant[]
  defaultValue?: string
  onClick?: (value: Variant['value']) => void
  selectedValue?: Variant['value']
}

export const GroupVariant: React.FC<Props> = ({
  className,
  items,
  onClick,
  selectedValue,
}) => {
  return (
    <div
      className={cn(
        'flex juctify-between bg-[#F3F3F7] rounded-3xl p-1 select-none',
        className
      )}
    >
      {items.map((item) => (
        <button
          key={item.name}
          onClick={() => onClick?.(item.value)}
          className={cn(
            'flex flex-1 items-center justify-center h-[30px] px-5 rounded-3xl transition-all duration-400 text-sm cursor-pointer',
            {
              'text-gray-500 opacity-50 pointer-events-none': item.disabled,
              'bg-white shadow': item.value === selectedValue,
            }
          )}
        >
          {item.name}
        </button>
      ))}
    </div>
  )
}
