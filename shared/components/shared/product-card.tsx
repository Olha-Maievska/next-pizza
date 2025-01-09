import Link from 'next/link'
import React from 'react'
import { Title } from './title'
import { Button } from '../ui'
import { Plus } from 'lucide-react'

interface Props {
  className?: string
  id: number
  name: string
  imageUrl: string
  price: number
  description: string
}

export const ProductCard: React.FC<Props> = ({
  className,
  imageUrl,
  id,
  name,
  price,
  description,
}) => {
  return (
    <div className={className}>
      <Link href={`/product/${id}`}>
        <div className="flex justify-center p-6 bg-secondary rounded-lg h-[260px]">
          <img className="w-[215px] h-[215px]" src={imageUrl} alt={name} />
        </div>

        <Title text={name} size="sm" className="mt-3 mb-1 font-bold" />

        <p className="text-sm text-gray-400 h-[80px]">{description}</p>

        <div className="flex justify-between items-center mt-4">
          <span className="text-[20px]">
            from $<b>{price}</b>
          </span>

          <Button variant={'secondary'} className="text-base font-bold">
            <Plus className="mr-1" size={16} />
            Add
          </Button>
        </div>
      </Link>
    </div>
  )
}
