import { cn } from '@/shared/lib/utils'
import React from 'react'
import { ProductImage } from './product-image'
import { Title } from './title'
import { Button } from '../ui'
import { Plus } from 'lucide-react'
import { GroupVariant } from './group-variant'
import {
  pizzaSizes,
  PizzaSize,
  PizzaType,
  pizzaTypes,
  mapPizzaType,
} from '@/shared/consts/pizza'
import { Ingredient } from '@prisma/client'
import { IngredientItem } from './ingredient-item'

interface Props {
  className?: string
  imageUrl: string
  name: string
  ingredients: Ingredient[]
  items?: any[]
  onClickAdd?: VoidFunction
}

export const ChoosePizzaForm: React.FC<Props> = ({
  className,
  name,
  items,
  imageUrl,
  ingredients,
  onClickAdd,
}) => {
  const [size, setSize] = React.useState<PizzaSize>(20)
  const [type, setType] = React.useState<PizzaType>(1)

  const textDetail = `${size} sm, ${mapPizzaType[type]} dough`
  const totalPrice = 300

  const handleClickAdd = () => {
    onClickAdd?.()
    console.log('Add to cart for', totalPrice, '$')
  }

  return (
    <div className={cn(className, 'flex flex-1')}>
      <ProductImage size={size} imageUrl={imageUrl} />

      <div className="w-[490px] bg-[#f7f6f5] p-7">
        <Title text={name} size="md" className="font-extrabold mb-1" />

        <p className="text-gray-400">{textDetail}</p>

        <div className="flex flex-col gap-4 mt-5">
          <GroupVariant
            items={pizzaSizes}
            selectedValue={String(size)}
            onClick={(value) => setSize(Number(value) as PizzaSize)}
          />

          <GroupVariant
            items={pizzaTypes}
            selectedValue={String(type)}
            onClick={(value) => setType(Number(value) as PizzaType)}
          />
        </div>

        <div className="bg-gray-50 p-5 my-5 rounded-md h-[360px] overflow-auto scrollbar">
          <div className="grid grid-cols-3 gap-3">
            {ingredients.map((ingredient) => (
              <IngredientItem
                key={ingredient.id}
                imageUrl={ingredient.imageUrl}
                name={ingredient.name}
                price={ingredient.price}
                onClick={() => console.log(ingredient.imageUrl)}
              />
            ))}
          </div>
        </div>

        <Button
          className="text-base h-[55px] px-10 rounded-[18px] w-full mt-10"
          onClick={onClickAdd}
        >
          <Plus className="mr-1" size={16} />
          Add to cart for {totalPrice} $
        </Button>
      </div>
    </div>
  )
}
