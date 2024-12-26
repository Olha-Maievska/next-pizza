import { useEffect } from 'react'
import { useCartStore } from '../store'
import { CreateCartItemValues } from '../services/dto/cart-dto'
import { CartStateItem } from '../lib/get-cart-details'

type ReturnType = {
  totalAmount: number
  cartItems: CartStateItem[]
  loading: boolean
  updateItemQty: (id: number, quantity: number) => void
  removeCartItem: (id: number) => void
  addCartItem: (values: CreateCartItemValues) => void
}

export const useCart = (): ReturnType => {
  const cartState = useCartStore((state) => state)

  useEffect(() => {
    cartState.fetchCartItems()
  }, [])

  return cartState
}
