import { create } from 'zustand'
import { Api } from '../services/api-client'
import { getCartDetails } from '../lib'
import { CartStateItem } from '../lib/get-cart-details'

export interface CartState {
  loading: boolean
  error: boolean
  totalAmount: number
  cartItems: CartStateItem[]
  fetchCartItems: () => Promise<void>
  updateCartQty: (id: number, quantity: number) => Promise<void>
  addCartItem: (value: any) => Promise<void>
  removeCartItem: (id: number) => Promise<void>
}

export const useCartStore = create<CartState>((set, get) => ({
  cartItems: [],
  loading: true,
  error: false,
  totalAmount: 0,

  fetchCartItems: async () => {
    try {
      set({ loading: true, error: false })
      const data = await Api.cart.fetchCart()
      set(getCartDetails(data))
    } catch (error) {
      console.error(error)
      set({ error: true })
    } finally {
      set({ loading: false })
    }
  },
  removeCartItem: async (id: number) => {},
  updateCartQty: async (id: number, quantity: number) => {},
  addCartItem: async () => {},
}))
