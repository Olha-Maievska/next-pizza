'use client'

import React from 'react'
import { Dialog } from '../../ui'
import { cn } from '@/shared/lib/utils'
import { DialogContent, DialogTitle } from '@/shared/components/ui/dialog'
import { useRouter } from 'next/navigation'
import { ProductWithRelations } from '@/shared/@types/prizma'
import { ProductForm } from '../product-form'

interface Props {
  product: ProductWithRelations
  className?: string
}
export const ChooseProductModal: React.FC<Props> = ({ className, product }) => {
  const router = useRouter()

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

        <ProductForm product={product} onSubmit={() => router.back()} />
      </DialogContent>
    </Dialog>
  )
}
