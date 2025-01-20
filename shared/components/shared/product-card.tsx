'use client'

import Link from 'next/link'
import React from 'react'
import { Title } from './title'
import { Button } from '../ui'
import { Plus } from 'lucide-react'
import { Skeleton } from '../ui'
import { useIngredients } from '@/shared/hooks'

interface Props {
  className?: string
  id: string
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
  const { loading } = useIngredients()

  return (
    <div className={className}>
      {loading ? (
        <>
          <Skeleton className="w-[283px] h-[260px]" />
          <Skeleton className="w-full h-[33px] mt-3 mb-1" />
          <Skeleton className="w-full h-[40px]" />
          <div className="flex justify-between items-center mt-14">
            <Skeleton className="w-[83px] h-[30px]" />
            <Skeleton className="w-[83px] h-[40px]" />
          </div>
        </>
      ) : (
        <Link href={`/product/${id}`}>
          <div className="flex justify-center p-6 rounded-lg h-[260px]">
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
      )}
    </div>
  )
}
