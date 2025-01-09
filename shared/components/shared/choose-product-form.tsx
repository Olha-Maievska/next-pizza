import { cn } from '@/shared/lib/utils'
import React from 'react'
import { Title } from './title'
import { Button } from '../ui'
import { Plus } from 'lucide-react'

interface Props {
  className?: string
  imageUrl: string
  name: string
  description: string
  weight: string | null
  price: number
  loading?: boolean
  onSubmit?: VoidFunction
}

export const ChooseProductForm: React.FC<Props> = ({
  className,
  name,
  price,
  imageUrl,
  description,
  weight,
  loading,
  onSubmit,
}) => {
  return (
    <div className={cn(className, 'flex flex-1')}>
      <div className="flex items-center justify-center flex-1 relative w-full">
        <img
          className="w-[350px] h-[350px] object-contain relative left-2 top-2 transition-all z-10 duration-300"
          src={imageUrl}
          alt={name}
        />
      </div>

      <div className="w-[490px] bg-[#f7f6f5] p-7 pb-10 flex flex-col justify-between">
        <div>
          <Title text={name} size="md" className="font-extrabold mb-1" />

          <p className="text-gray-600 mb-5">{weight}</p>

          <p className="text-gray-400">{description}</p>
        </div>

        <Button
          className="text-base h-[55px] px-10 rounded-[18px] w-full mt-10"
          onClick={() => onSubmit?.()}
          loading={loading}
        >
          <Plus className="mr-1" size={16} />
          Add to cart for ${price}
        </Button>
      </div>
    </div>
  )
}
