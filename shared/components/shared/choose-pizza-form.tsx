'use client'

import { cn } from '@/shared/lib/utils'
import React from 'react'
import { ProductImage } from './product-image'
import { Title } from './title'
import { Button } from '../ui'
import { Plus } from 'lucide-react'
import { GroupVariant } from './group-variant'
import { PizzaSize, PizzaType, pizzaTypes } from '@/shared/consts/pizza'
import { Ingredient, ProductItem } from '@prisma/client'
import { IngredientItem } from './ingredient-item'
import { getPizzaDetails } from '@/shared/lib'
import { usePizzaOptions } from '@/shared/hooks'

interface Props {
  className?: string
  imageUrl: string
  name: string
  loading?: boolean
  description: string
  ingredients: Ingredient[]
  items: ProductItem[]
  onSubmit: (itemID: number, ingredients: number[]) => void
}

export const ChoosePizzaForm: React.FC<Props> = ({
  className,
  name,
  items,
  imageUrl,
  ingredients,
  description,
  onSubmit,
  loading,
}) => {
  const {
    size,
    type,

    selectedIngredients,
    availableSizes: availablePizzaSize,
    setSize,
    setType,
    addIngredients,
    currentItemID,
  } = usePizzaOptions(items)

  const { totalPrice, textDetail } = getPizzaDetails(
    type,
    size,
    items,
    ingredients,
    selectedIngredients
  )

  const handleClickAdd = () => {
    if (currentItemID) {
      onSubmit(currentItemID, Array.from(selectedIngredients))
    }
  }

  return (
    <div className={cn(className, 'flex flex-1')}>
      <ProductImage size={size} imageUrl={imageUrl} />

      <div className="w-[490px] bg-[#f7f6f5] p-7">
        <Title text={name} size="md" className="font-extrabold mb-1" />

        <p className="text-gray-600">{textDetail}</p>

        <p className="text-sm text-gray-400">{description}</p>

        <div className="flex flex-col gap-4 mt-5">
          <GroupVariant
            items={availablePizzaSize}
            selectedValue={String(size)}
            onClick={(value) => setSize(Number(value) as PizzaSize)}
          />

          <GroupVariant
            items={pizzaTypes}
            selectedValue={String(type)}
            onClick={(value) => setType(Number(value) as PizzaType)}
          />
        </div>

        <div className="bg-gray-50 p-3 my-5 rounded-md h-[360px] overflow-auto scrollbar">
          <div className="grid grid-cols-3 gap-3">
            {ingredients.map((ingredient) => (
              <IngredientItem
                key={ingredient.id}
                imageUrl={ingredient.imageUrl}
                name={ingredient.name}
                price={ingredient.price}
                onClick={() => addIngredients(ingredient.id)}
                active={selectedIngredients.has(ingredient.id)}
              />
            ))}
          </div>
        </div>

        <Button
          className="text-base h-[55px] px-10 rounded-[18px] w-full mt-10"
          onClick={handleClickAdd}
          loading={loading}
        >
          <Plus className="mr-1" size={16} />
          Add to cart for ${totalPrice}
        </Button>
      </div>
    </div>
  )
}
