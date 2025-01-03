import { useEffect } from 'react'
import { CartState, useCartStore } from '../store'
import { CreateCartItemValues } from '../services/dto/cart-dto'
import { CartStateItem } from '../lib/get-cart-details'

interface ReturnType {
  cartState: CartState
  onClickCountBtn: (
    id: number,
    quantity: number,
    type: 'plus' | 'minus'
  ) => void
}

export const useCart = (): ReturnType => {
  const cartState = useCartStore((state) => state)

  const onClickCountBtn = (
    id: number,
    quantity: number,
    type: 'plus' | 'minus'
  ) => {
    const newQty = type === 'plus' ? quantity + 1 : quantity - 1
    cartState.updateItemQty(id, newQty)
  }

  useEffect(() => {
    cartState.fetchCartItems()
  }, [])

  return { cartState, onClickCountBtn }
}
