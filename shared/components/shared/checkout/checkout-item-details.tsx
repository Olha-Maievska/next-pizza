import { cn } from '@/shared/lib/utils'
import React from 'react'

interface Props {
  className?: string
  title: string
  value: React.ReactNode
  icon: React.ReactNode
}

export const CheckoutItemDetails: React.FC<Props> = ({
  className,
  title,
  value,
  icon,
}) => {
  return (
    <div className={cn('flex my-2', className)}>
      <span className="flex flex-1 text-lg text-neutral-500">
        <div className="flex items-center">
          {icon}
          {title}
        </div>
        <div className="flex-1 border-b border-dashed border-b-neutral-200 relative -top-1 mx-2"></div>
      </span>
      <span className="text-lg font-bold">{value}</span>
    </div>
  )
}
