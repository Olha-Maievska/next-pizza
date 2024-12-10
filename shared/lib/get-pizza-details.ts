import { Ingredient, ProductItem } from '@prisma/client'
import { mapPizzaType, PizzaSize, PizzaType } from '../consts/pizza'
import { calcTotalPizzaPrice } from './calc-total-pizza-price'

export const getPizzaDetails = (
  type: PizzaType,
  size: PizzaSize,
  items: ProductItem[],
  ingredients: Ingredient[],
  selectedIngredients: Set<number>
) => {
  const textDetail = `${size} sm, ${mapPizzaType[type]} dough`

  const totalPrice = calcTotalPizzaPrice(
    type,
    size,
    items,
    ingredients,
    selectedIngredients
  )

  return { totalPrice, textDetail }
}
