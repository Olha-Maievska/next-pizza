import { useEffect, useState } from 'react'
import { PizzaSize, PizzaType } from '../consts/pizza'
import { useSet } from 'react-use'
import { getAvailablePizzaSize } from '../lib'
import { ProductItem } from '@prisma/client'
import { Variant } from '../components/shared/group-variant'

interface ReturnProps {
  size: PizzaSize
  type: PizzaType
  selectedIngredients: Set<number>
  availableSizes: Variant[]
  setSize: (size: PizzaSize) => void
  setType: (type: PizzaType) => void
  addIngredients: (id: number) => void
}

export const usePizzaOptions = (items: ProductItem[]): ReturnProps => {
  const [size, setSize] = useState<PizzaSize>(20)
  const [type, setType] = useState<PizzaType>(1)

  const [selectedIngredients, { toggle: addIngredients }] = useSet(
    new Set<number>([])
  )

  const availableSizes = getAvailablePizzaSize(type, items)

  useEffect(() => {
    const isAvailableSize = availableSizes.find(
      (item) => Number(item.value) === size && !item.disabled
    )
    const availableSize = availableSizes.find((item) => !item.disabled)

    if (!isAvailableSize && availableSize) {
      setSize(Number(availableSize.value) as PizzaSize)
    }
  }, [type])

  return {
    size,
    type,
    selectedIngredients,
    availableSizes,
    setSize,
    setType,
    addIngredients,
  }
}
