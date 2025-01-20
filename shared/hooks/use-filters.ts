import { useSearchParams } from 'next/navigation'
import { useSet } from 'react-use'
import { useMemo, useState } from 'react'

interface PriceProps {
  priceFrom?: number
  priceTo?: number
}

interface QueryFilters extends PriceProps {
  sizes?: string
  pizzaTypes?: string
  ingredients?: string
}

export interface Filters {
  sizes: Set<string>
  pizzaTypes: Set<string>
  selectedIngredients: Set<string>
  prices: PriceProps
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
    new Set<string>(searchParams.get('ingredients')?.split(',')) || []
  )

  const [prices, setPrices] = useState<PriceProps>({
    priceFrom: Number(searchParams.get('priceFrom')) || undefined,
    priceTo: Number(searchParams.get('priceTo')) || undefined,
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

  return useMemo(
    () => ({
      sizes,
      pizzaTypes,
      selectedIngredients,
      prices,
      setPrices: updatePrices,
      setPizzaTypes,
      setSizes,
      setIngredients,
    }),
    //eslint-disable-next-line
    [sizes, pizzaTypes, selectedIngredients, prices]
  )
}
