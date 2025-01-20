import React from 'react'
import { CartItemProps } from '../cart-item-details/cart-item-details.types'
import * as CartItemDetails from '../cart-item-details'
import { cn } from '@/shared/lib/utils'
import { X } from 'lucide-react'

interface Props extends CartItemProps {
  className?: string
  onClickRemove?: () => void
  onClickCountBtn?: (type: 'plus' | 'minus') => void
}

export const CheckoutCartItem: React.FC<Props> = ({
  name,
  quantity,
  price,
  imageUrl,
  details,
  disabled,
  onClickCountBtn,
  onClickRemove,
  className,
}) => {
  return (
    <div
      className={cn(
        'flex items-center justify-between border-b border-b-gray-150 pb-3 last:border-b-0',
        {
          'opacity-50 pointer-events-none': disabled,
        },
        className
      )}
    >
      <div className="flex items-center gap-5 flex-1">
        <CartItemDetails.Image src={imageUrl} />
        <CartItemDetails.Info name={name} details={details} />
      </div>

      <CartItemDetails.Price value={price} />

      <div className="flex items-center gap-5 ml-20">
        <CartItemDetails.CountButton
          onClick={onClickCountBtn}
          value={quantity}
        />
        <button type="button" onClick={onClickRemove}>
          <X
            size={20}
            className="text-gray-400 cursor-pointer hover:text-gray-600"
          />
        </button>
      </div>
    </div>
  )
}
