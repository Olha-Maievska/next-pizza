'use client'

import React, { useEffect } from 'react'
import { Title } from './title'
import { cn } from '@/shared/lib/utils'
import { ProductCard } from './product-card'
import { useIntersection } from 'react-use'
import { useCategoryStore } from '@/shared/store/category'
import { ProductWithRelations } from '@/@types/prizma'

interface Props {
  className?: string
  title: string
  listClassName?: string
  categoryId: number
  products: ProductWithRelations[]
}

export const ProductGroupList: React.FC<Props> = ({
  className,
  title,
  listClassName,
  categoryId,
  products,
}) => {
  const setActiveCategoryId = useCategoryStore((state) => state.setActiveId)

  const intersectionRef = React.useRef(null)
  const intersection = useIntersection(intersectionRef, {
    threshold: 0.4,
  })

  useEffect(() => {
    if (intersection?.isIntersecting) {
      setActiveCategoryId(categoryId)
    }
  }, [intersection?.isIntersecting, categoryId, setActiveCategoryId])

  return (
    <div className={className} id={title} ref={intersectionRef}>
      <Title text={title} size="md" className="font-extrabold mb-5" />

      <div className={cn('grid grid-cols-3 gap-[50px]', listClassName)}>
        {products.map((product) => (
          <ProductCard
            key={product.id}
            id={String(product.id)}
            name={product.name}
            imageUrl={product.imageUrl}
            price={product.items[0].price}
            description={product.description}
          />
        ))}
      </div>
    </div>
  )
}
