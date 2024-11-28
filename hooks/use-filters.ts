import { useSearchParams } from 'next/navigation'
import { useSet } from 'react-use'
import { useState } from 'react'

interface PriceProps {
  priceFrom?: number
  priceTo?: number
}

interface QueryFilters extends PriceProps {
  sizes: string[]
  pizzaTypes: string
  ingredients: string[]
}

export interface Filters {
  sizes: Set<string>
  pizzaTypes: Set<string>
  selectedIngredients: Set<string>
  priceFrom: number | undefined
  priceTo: number | undefined
}

interface ReturnProps extends Filters {
  setPrices: (name: keyof PriceProps, value: number) => void
  setIngredients: (id: string) => void
  setSizes: (id: string) => void
  setPizzaTypes: (id: string) => void
}

export const useFilters = (): ReturnProps => {
  const searchParams = useSearchParams() as unknown as Map<
    keyof QueryFilters,
    string
  >

  const [selectedIngredients, { toggle: setIngredients }] = useSet(
    new Set<string>(searchParams.get('ingredients')?.split(','))
  )

  const [{ priceFrom, priceTo }, setPrices] = useState<PriceProps>({
    priceFrom: Number(searchParams.get('priceFrom')) || 0,
    priceTo: Number(searchParams.get('priceTo')) || 0,
  })

  const [sizes, { toggle: setSizes }] = useSet(
    new Set<string>(
      searchParams.has('sizes') ? searchParams.get('sizes')?.split(',') : []
    )
  )
  const [pizzaTypes, { toggle: setPizzaTypes }] = useSet(
    new Set<string>(
      searchParams.has('pizzaTypes')
        ? searchParams.get('pizzaTypes')?.split(',')
        : []
    )
  )

  const updatePrices = (name: keyof PriceProps, value: number) => {
    setPrices((prev) => ({ ...prev, [name]: value }))
  }

  return {
    sizes,
    pizzaTypes,
    selectedIngredients,
    priceFrom,
    priceTo,
    setPrices: updatePrices,
    setIngredients,
    setSizes,
    setPizzaTypes,
  }
}
