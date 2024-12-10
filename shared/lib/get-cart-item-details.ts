import { mapPizzaType, PizzaSize, PizzaType } from '../consts/pizza'
import { Ingredient } from '@prisma/client'

export const getCartItemDetails = (
  pizzaType: PizzaType,
  pizzaSize: PizzaSize,
  ingredients: Ingredient[]
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
