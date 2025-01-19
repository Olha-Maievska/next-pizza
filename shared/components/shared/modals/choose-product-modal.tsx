'use client'

import React, { useEffect, useState } from 'react'
import { Dialog } from '../../ui'
import { cn } from '@/shared/lib/utils'
import { DialogContent, DialogTitle } from '@/shared/components/ui/dialog'
import { useRouter } from 'next/navigation'
import { ProductWithRelations } from '@/@types/prizma'
import { ProductForm } from '../product-form'

interface Props {
  product: ProductWithRelations
  className?: string
}
export const ChooseProductModal: React.FC<Props> = ({ className, product }) => {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)

  const handleClose = () => {
    setIsOpen(false)
    router.back()
  }

  useEffect(() => {
    setIsOpen(Boolean(product))
  }, [product])

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) handleClose()
      }}
    >
      <DialogContent
        className={cn(
          'p-0 w-[1060px] max-w-[1060px] min-h-[500px] bg-white overflow-hidden',
          className
        )}
        aria-describedby={undefined}
      >
        <DialogTitle className="hidden">Choose a pizza</DialogTitle>

        <ProductForm product={product} onSubmit={handleClose} />
      </DialogContent>
    </Dialog>
  )
}
