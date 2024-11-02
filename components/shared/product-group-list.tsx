import React from 'react'
import { Title } from './title'
import { cn } from '@/lib/utils'
import { ProductCard } from './product-card'

interface Props {
  className?: string
  title: string
  listClassName?: string
  catedoryId: number
  products: any[]
}

export const ProductGroupList: React.FC<Props> = ({
  className,
  title,
  listClassName,
  catedoryId,
  products,
}) => {
  return (
    <div className={className}>
      <Title text={title} size="md" className="font-extrabold mb-5" />

      <div className={cn('grid grid-cols-3 gap-[50px]', listClassName)}>
        {products.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            name={product.name}
            imageUrl={product.imageUrl}
            price={product.items[0].price}
          />
        ))}
      </div>
    </div>
  )
}
