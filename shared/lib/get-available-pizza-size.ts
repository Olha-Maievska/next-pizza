import { ProductItem } from '@prisma/client'
import { PizzaType, pizzaSizes } from '../consts/pizza'
import { Variant } from '../components/shared/group-variant'

export const getAvailablePizzaSize = (
  type: PizzaType,
  items: ProductItem[]
): Variant[] => {
  const availablePizzas = items.filter((item) => item.pizzaType === type)

  return pizzaSizes.map((item) => ({
    name: item.name,
    value: item.value,
    disabled: !availablePizzas.some(
      (pizza) => Number(pizza.size) === Number(item.value)
    ),
  }))
}
