'use client'

import React from 'react'
import { Title } from './title'
import { Input, Skeleton } from '../ui'
import { RangeSlider } from './range-slider'
import { CheckboxFiltersGroup } from './checkbox-filters-group'
import { useFilters, useIngredients, useQueryFilters } from '@/shared/hooks'

interface Props {
  className?: string
}

export const Filters: React.FC<Props> = ({ className }) => {
  const { ingredients, loading } = useIngredients()
  const filters = useFilters()

  useQueryFilters(filters)

  const items = ingredients.map((item) => ({
    text: item.name,
    value: item.id.toString(),
  }))

  const updatePrices = (number: number[]) => {
    filters.setPrices('priceFrom', number[0])
    filters.setPrices('priceTo', number[1])
  }

  return (
    <div className={className}>
      <Title text="Filtration" size="sm" className="font-bold mb-5" />

      <CheckboxFiltersGroup
        className="mb-5"
        title="Type of dough"
        name="sizes"
        selected={filters.pizzaTypes}
        loading={loading}
        limit={2}
        items={[
          {
            text: 'Thin',
            value: '1',
          },
          {
            text: 'Traditional',
            value: '2',
          },
        ]}
        onClickCheckbox={filters.setPizzaTypes}
      />

      <CheckboxFiltersGroup
        className="mb-5"
        title="Sizes"
        name="sizes"
        selected={filters.sizes}
        loading={loading}
        limit={3}
        items={[
          {
            text: '20 sm',
            value: '20',
          },
          {
            text: '30 sm',
            value: '30',
          },
          {
            text: '40 sm',
            value: '40',
          },
        ]}
        onClickCheckbox={filters.setSizes}
      />

      <div className="mt-5 border-y border-y-neutral-100 py-6 pb-7">
        <h5 className="font-bold mb-3">Price from and to:</h5>

        {loading ? (
          <Skeleton className="mb-5 h-[36px] rounded-[8px]" />
        ) : (
          <div className="flex gap-3 mb-5">
            <Input
              type="number"
              placeholder="0"
              min={0}
              max={50}
              value={String(filters.prices.priceFrom)}
              onChange={(e) =>
                filters.setPrices('priceFrom', Number(e.target.value))
              }
            />

            <Input
              type="number"
              placeholder="50"
              min={10}
              max={50}
              value={String(filters.prices.priceTo)}
              onChange={(e) =>
                filters.setPrices('priceTo', Number(e.target.value))
              }
            />
          </div>
        )}

        <RangeSlider
          min={0}
          max={50}
          step={5}
          value={[filters.prices.priceFrom || 0, filters.prices.priceTo || 50]}
          onValueChange={updatePrices}
          loading={loading}
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
        onClickCheckbox={filters.setIngredients}
        selected={filters.selectedIngredients}
      />
    </div>
  )
}
