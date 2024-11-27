'use client'

import React from 'react'
import { Title } from './title'
import { FilterCheckbox } from './filter-checkbox'
import { Input } from '../ui'
import { RangeSlider } from './range-slider'
import { CheckboxFiltersGroup } from './checkbox-filters-group'
import { useFilterIngredients } from '@/hooks/useFilterIngredients'

interface Props {
  className?: string
}

interface PriceProps {
  priceFrom: number
  priceTo: number
}

export const Filters: React.FC<Props> = ({ className }) => {
  const { ingredients, loading, onAddId, selectedIds } = useFilterIngredients()
  const [{ priceFrom, priceTo }, setPrice] = React.useState<PriceProps>({
    priceFrom: 0,
    priceTo: 1000,
  })

  const items = ingredients.map((item) => ({
    text: item.name,
    value: item.id.toString(),
  }))

  const updatePrice = (name: keyof PriceProps, value: number) => {
    setPrice((prev) => ({ ...prev, [name]: value }))
  }

  return (
    <div className={className}>
      <Title text="Filtration" size="sm" className="font-bold mb-5" />

      <div className="flex flex-col gap-4">
        <FilterCheckbox name="assembling" text="You can assembling" value="1" />
        <FilterCheckbox name="new" text="New items" value="2" />
      </div>

      <div className="mt-5 border-y border-y-neutral-100 py-6 pb-7">
        <h5 className="font-bold mb-3">Price from and to:</h5>
        <div className="flex gap-3 mb-5">
          <Input
            type="number"
            placeholder="0"
            min={0}
            max={1000}
            value={String(priceFrom)}
            onChange={(e) => updatePrice('priceFrom', Number(e.target.value))}
          />

          <Input
            type="number"
            placeholder="1000"
            min={100}
            max={1000}
            value={String(priceTo)}
            onChange={(e) => updatePrice('priceTo', Number(e.target.value))}
          />
        </div>

        <RangeSlider
          min={0}
          max={1000}
          step={10}
          value={[priceFrom, priceTo]}
          onValueChange={([priceFrom, priceTo]) =>
            setPrice({ priceFrom, priceTo })
          }
        />
      </div>

      <CheckboxFiltersGroup
        className="mt-5"
        title="Ingredients"
        name="ingredients"
        limit={6}
        items={items}
        defaultItems={items.slice(0, 6)}
        searchInputPlaceholder="Search..."
        loading={loading}
        onClickCheckbox={onAddId}
        selectedIds={selectedIds}
      />
    </div>
  )
}
