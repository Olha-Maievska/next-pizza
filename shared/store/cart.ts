import { create } from 'zustand'
import { Api } from '../services/api-client'
import { getCartDetails } from '../lib'
import { CartStateItem } from '../lib/get-cart-details'
import { CreateCartItemValues } from '../services/dto/cart-dto'

export interface CartState {
  loading: boolean
  error: boolean
  disabled?: boolean
  totalAmount: number
  cartItems: CartStateItem[]
  totalWithDeliveryFee: number
  setTotalWithDeliveryFee: (fee: number) => void
  fetchCartItems: () => Promise<void>
  updateItemQty: (id: number, quantity: number) => Promise<void>
  addCartItem: (value: CreateCartItemValues) => Promise<void>
  removeCartItem: (id: number) => Promise<void>
}

export const useCartStore = create<CartState>((set) => ({
  cartItems: [],
  loading: true,
  error: false,
  totalAmount: 0,
  totalWithDeliveryFee: 0,

  fetchCartItems: async () => {
    try {
      set({ loading: true, error: false })
      const data = await Api.cart.getCart()
      set(getCartDetails(data))
    } catch (error) {
      console.error(error)
      set({ error: true })
    } finally {
      set({ loading: false })
    }
  },
  updateItemQty: async (id: number, quantity: number) => {
    try {
      set({ loading: true, error: false })
      const data = await Api.cart.updateItemQty(id, quantity)
      set(getCartDetails(data))
    } catch (error) {
      console.error(error)
      set({ error: true })
    } finally {
      set({ loading: false })
    }
  },
  removeCartItem: async (id: number) => {
    try {
      set((state) => ({
        loading: true,
        error: false,
        cartItems: state.cartItems.map((item) =>
          item.id === id ? { ...item, disabled: true } : item
        ),
      }))
      const data = await Api.cart.removeCartItem(id)
      set(getCartDetails(data))
    } catch (error) {
      console.error(error)
      set({ error: true })
    } finally {
      set((state) => ({
        loading: false,
        cartItems: state.cartItems.map((item) => ({
          ...item,
          disabled: false,
        })),
      }))
    }
  },
  addCartItem: async (value: CreateCartItemValues) => {
    try {
      set({ loading: true, error: false })
      const data = await Api.cart.addCartItem(value)
      set(getCartDetails(data))
    } catch (error) {
      console.error(error)
      set({ error: true })
    } finally {
      set({ loading: false })
    }
  },
  setTotalWithDeliveryFee: (fee: number) => set({ totalWithDeliveryFee: fee }),
}))
