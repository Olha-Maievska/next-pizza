import { CartItemDTO } from '@/shared/services/dto/cart-dto'
import * as React from 'react'

export interface Props {
  orderID: number
  totalAmount: number
  items: CartItemDTO[]
}

export const OrderSuccessTemplate: React.FC<Props> = ({
  orderID,
  totalAmount,
  items,
}) => (
  <div>
    <h4>Thank you for your purchase!</h4>
    <p>
      Your order <b>#{orderID}</b> in the amount of ${totalAmount} was paid.
      Items list:
    </p>

    <ul>
      {items.map((item) => (
        <li key={item.id}>
          {item.productItem.product.name} (${item.productItem.price}) x
          {item.quantity} {item.quantity > 1 ? 'pieces' : 'piece'}
        </li>
      ))}
    </ul>
    <span className="font-bold">Next Pizza team!</span>
  </div>
)
