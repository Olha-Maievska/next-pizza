import { useEffect } from 'react'
import { CartState, useCartStore } from '../store'

interface ReturnType {
  cartState: CartState
  _delivery_price: number
  _free_delivery_count: number
  onClickCountBtn: (
    id: number,
    quantity: number,
    type: 'plus' | 'minus'
  ) => void
}

export const useCart = (): ReturnType => {
  const cartState = useCartStore((state) => state)
  const _delivery_price = 7
  const _free_delivery_count = 25

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
    //eslint-disable-next-line
  }, [])

  useEffect(() => {
    if (cartState.totalAmount >= _free_delivery_count) {
      cartState.setTotalWithDeliveryFee(cartState.totalAmount)
    } else {
      cartState.setTotalWithDeliveryFee(cartState.totalAmount + _delivery_price)
    }
    //eslint-disable-next-line
  }, [cartState.totalAmount])

  return { cartState, onClickCountBtn, _delivery_price, _free_delivery_count }
}
