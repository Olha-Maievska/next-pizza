'use client'

import React from 'react'
import { Dialog } from '../../ui'
import { cn } from '@/shared/lib/utils'
import { DialogContent, DialogTitle } from '@/shared/components/ui/dialog'
import { useRouter } from 'next/navigation'
import { ChooseProductForm } from '../choose-product-form'
import { ProductWithRelations } from '@/shared/@types/prizma'
import { ChoosePizzaForm } from '../choose-pizza-form'
import { useCartStore } from '@/shared/store'
import toast from 'react-hot-toast'

interface Props {
  product: ProductWithRelations
  className?: string
}

export const ChooseProductModal: React.FC<Props> = ({ className, product }) => {
  const router = useRouter()
  const firstItem = product.items[0]
  const isPizzaForm = Boolean(product.items[0].pizzaType)
  const [addCartItem, loading] = useCartStore(({ addCartItem, loading }) => [
    addCartItem,
    loading,
  ])

  const onAddProduct = () => {
    addCartItem({
      productItemId: firstItem.id,
    })
  }

  const onAddPizza = async (productItemId: number, ingredients: number[]) => {
    try {
      await addCartItem({ productItemId, ingredients })
      toast.success('Pizza added to cart')
    } catch (error) {
      toast.error('Failed to add pizza to cart')
      console.log(error)
    }
  }

  return (
    <Dialog open={Boolean(product)} onOpenChange={() => router.back()}>
      <DialogContent
        className={cn(
          'p-0 w-[1060px] max-w-[1060px] min-h-[500px] bg-white overflow-hidden',
          className
        )}
        aria-describedby={undefined}
      >
        <DialogTitle className="hidden">Choose a pizza</DialogTitle>

        {isPizzaForm ? (
          <ChoosePizzaForm
            imageUrl={product.imageUrl}
            name={product.name}
            items={product.items}
            ingredients={product.ingredients}
            onSubmit={onAddPizza}
            loading={loading}
          />
        ) : (
          <ChooseProductForm
            imageUrl={product.imageUrl}
            name={product.name}
            price={firstItem.price}
            onSubmit={onAddProduct}
            loading={loading}
          />
        )}
      </DialogContent>
    </Dialog>
  )
}
