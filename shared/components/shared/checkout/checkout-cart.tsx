import React from 'react'
import { CheckoutContentBlock } from './checkout-content-block'
import { CartStateItem } from '@/shared/lib/get-cart-details'
import { CheckoutCartItem } from './checkout-cart-item'
import { getCartItemDetails } from '@/shared/lib'
import { PizzaSize, PizzaType } from '@/shared/consts/pizza'
import { removeCartItem } from '@/shared/services/cart'

interface Props {
  className?: string
  items: CartStateItem[]
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
  onClickCountBtn,
  removeCartItem,
}) => {
  return (
    <CheckoutContentBlock className={className} title="1. Cart details">
      <div className="flex flex-col gap-5">
        {items.map((item) => (
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
