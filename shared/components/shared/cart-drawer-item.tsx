'use client'

import React from 'react'
import { cn } from '@/shared/lib/utils'
import * as CartItem from './cart-item-details'
import { CartItemProps } from './cart-item-details/cart-item-details.types'
import { CountButton } from './count-button'
import { Trash2Icon } from 'lucide-react'

interface Props extends CartItemProps {
  className?: string
  onClickCountBtn?: (type: 'plus' | 'minus') => void
  onClickRemoveItem?: () => void
}

export const CartDrawerItem: React.FC<Props> = ({
  className,
  imageUrl,
  details,
  name,
  price,
  quantity,
  disabled,
  onClickCountBtn,
  onClickRemoveItem,
}) => {
  return (
    <div
      className={cn(
        'flex gap-6 bg-white p-5',
        {
          'opacity-50 pointer-events-none': disabled,
        },
        className
      )}
    >
      <CartItem.Image src={imageUrl} />

      <div className="flex-1">
        <CartItem.Info name={name} details={details} />

        <hr className="my-3" />

        <div className="flex justify-between items-center">
          <CountButton onClick={onClickCountBtn} value={quantity} />
          <div className="flex items-center justify-center gap-3">
            <CartItem.Price value={price} />
            <Trash2Icon
              className="text-gray-400 cursor-pointer hover:text-gray-600"
              size={16}
              onClick={onClickRemoveItem}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
