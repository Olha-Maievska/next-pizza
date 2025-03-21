import React from 'react'
import { CheckoutContentBlock } from './checkout-content-block'
import { CartStateItem } from '@/shared/lib/get-cart-details'
import { CheckoutCartItem } from './checkout-cart-item'
import { getCartItemDetails } from '@/shared/lib'
import { PizzaSize, PizzaType } from '@/shared/consts/pizza'
import { Skeleton } from '../../ui'

interface Props {
  className?: string
  items: CartStateItem[]
  loading?: boolean
  onClickCountBtn: (
    id: number,
    quantity: number,
    type: 'plus' | 'minus'
  ) => void
  removeCartItem: (id: number) => void
}

export const CheckoutCart: React.FC<Props> = ({
  className,
  items,
  loading,
  onClickCountBtn,
  removeCartItem,
}) => {
  return (
    <CheckoutContentBlock className={className} title="1. Cart details">
      <div className="flex flex-col gap-5">
        {loading
          ? [...Array(2)].map((_, index) => (
              <Skeleton
                className="w-full h-[72.5px] border-b border-b-gray-150 pb-3 last:border-b-0"
                key={index}
              />
            ))
          : items.map((item) => (
              <CheckoutCartItem
                key={item.id}
                id={item.id}
                imageUrl={item.imageUrl}
                name={item.name}
                price={item.price}
                details={getCartItemDetails(
                  item.ingredients,
                  item.pizzaType as PizzaType,
                  item.size as PizzaSize
                )}
                quantity={item.quantity}
                disabled={item.disabled}
                onClickCountBtn={(type) =>
                  onClickCountBtn(item.id, item.quantity, type)
                }
                onClickRemove={() => removeCartItem(item.id)}
              />
            ))}
      </div>
    </CheckoutContentBlock>
  )
}
