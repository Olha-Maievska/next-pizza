import { CartDTO } from '../services/dto/cart-dto'
import { calcTotalItemPrice } from './calc-total-item-price'

export interface CartStateItem {
  id: number
  quantity: number
  name: string
  imageUrl: string
  price: number
  disabled?: boolean
  size?: number | null
  pizzaType?: number | null
  ingredients: Array<{ name: string; price: number }>
}

interface ReturnProps {
  cartItems: CartStateItem[]
  totalAmount: number
}

export const getCartDetails = (data: CartDTO): ReturnProps => {
  const cartItems = data.cartItems.map((item) => ({
    id: item.id,
    quantity: item.quantity,
    name: item.productItem.product.name,
    imageUrl: item.productItem.product.imageUrl,
    price: calcTotalItemPrice(item),
    size: item.productItem.size,
    disabled: false,
    pizzaType: item.productItem.pizzaType,
    ingredients: item.ingredients.map((ingredient) => ({
      name: ingredient.name,
      price: ingredient.price,
    })),
  })) as CartStateItem[]

  return {
    cartItems,
    totalAmount: data.totalAmount,
  }
}
