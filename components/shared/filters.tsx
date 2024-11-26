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

export const Filters: React.FC<Props> = ({ className }) => {
  const { ingredients, loading } = useFilterIngredients()

  const items = ingredients.map((item) => ({
    text: item.name,
    value: item.id.toString(),
  }))

  return (
    <div className={className}>
      <Title text="Filtration" size="sm" className="font-bold mb-5" />

      <div className="flex flex-col gap-4">
        <FilterCheckbox text="You can assembling" value="1" />
        <FilterCheckbox text="New items" value="2" />
      </div>

      <div className="mt-5 border-y border-y-neutral-100 py-6 pb-7">
        <h5 className="font-bold mb-3">Price from and to:</h5>
        <div className="flex gap-3 mb-5">
          <Input
            type="number"
            placeholder="0"
            min={0}
            max={1000}
            defaultValue={0}
          />

          <Input type="number" placeholder="1000" min={100} max={1000} />
        </div>

        <RangeSlider min={0} max={1000} step={10} value={[0, 1000]} />
      </div>

      <CheckboxFiltersGroup
        title="Ingredients:"
        className="mt-5"
        limit={6}
        items={items}
        defaultItems={items.slice(0, 6)}
        searchInputPlaceholder="Search..."
        loading={loading}
      />
    </div>
  )
}
