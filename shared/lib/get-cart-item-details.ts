import { mapPizzaType, PizzaSize, PizzaType } from '../consts/pizza'
import { CartStateItem } from './get-cart-details'

export const getCartItemDetails = (
  pizzaType: PizzaType,
  pizzaSize: PizzaSize,
  ingredients: CartStateItem['ingredients']
): string => {
  const details = []

  if (pizzaSize && pizzaType) {
    const typeName = mapPizzaType[pizzaType]
    details.push(`${pizzaSize} cm, ${typeName} crust`)
  }

  if (ingredients) {
    details.push(...ingredients.map((item) => item.name))
  }

  return details.join(', ')
}
