'use client'

import { useCartStore } from '@/shared/store'
import React from 'react'
import toast from 'react-hot-toast'
import { ChoosePizzaForm } from './choose-pizza-form'
import { ChooseProductForm } from './choose-product-form'
import { ProductWithRelations } from '@/@types/prizma'

interface Props {
  product: ProductWithRelations
  onSubmit?: VoidFunction
}

export const ProductForm: React.FC<Props> = ({
  onSubmit: _onSubmit,
  product,
}) => {
  const addCartItem = useCartStore((state) => state.addCartItem)
  const loading = useCartStore((state) => state.loading)
  const firstItem = product.items[0]
  const isPizzaForm = Boolean(product.items[0].pizzaType)

  const onSubmit = async (productItemId?: number, ingredients?: number[]) => {
    try {
      const itemID = productItemId ?? firstItem.id

      await addCartItem({ productItemId: itemID, ingredients })

      toast.success(`${product.name} added to cart`)
      _onSubmit?.()
    } catch (error) {
      toast.error(`Failed to add ${product.name} to cart`)
      console.error(error)
    }
  }

  if (isPizzaForm) {
    return (
      <ChoosePizzaForm
        imageUrl={product.imageUrl}
        name={product.name}
        items={product.items}
        description={product.description}
        ingredients={product.ingredients}
        onSubmit={onSubmit}
        loading={loading}
      />
    )
  } else {
    return (
      <ChooseProductForm
        imageUrl={product.imageUrl}
        name={product.name}
        description={product.description}
        weight={product.weight}
        price={firstItem.price}
        onSubmit={onSubmit}
        loading={loading}
      />
    )
  }
}
