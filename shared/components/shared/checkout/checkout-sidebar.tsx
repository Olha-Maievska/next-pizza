import React from 'react'
import { CheckoutContentBlock } from './checkout-content-block'
import { cn } from '@/shared/lib/utils'
import { CheckoutItemDetails } from './checkout-item-details'
import { Button } from '../../ui'
import { ArrowRight, Package, Truck } from 'lucide-react'

interface Props {
  className?: string
  totalAmount: number
  deliveryPrice: number
}

export const CheckoutSidebar: React.FC<Props> = ({
  className,
  totalAmount,
  deliveryPrice,
}) => {
  return (
    <div className={cn('w-[450px]', className)}>
      <CheckoutContentBlock className="p-6 sticky top-4">
        <div className="flex flex-col gap-1">
          <span className="text-xl">Total amount:</span>
          <span className="font-extrabold text-[34px]">
            {totalAmount + deliveryPrice} $
          </span>
        </div>

        <div>
          <CheckoutItemDetails
            title="Cost of goods"
            value={`${totalAmount} $`}
            icon={<Package size={18} className="mr-2 text-gray-400" />}
          />
          <CheckoutItemDetails
            title="Delivery"
            value={`${deliveryPrice} $`}
            icon={<Truck size={18} className="mr-2 text-gray-400" />}
          />
        </div>
        <Button
          type="submit"
          className="w-full h-14 mt-6 rounded-2xl text-base font-bold"
        >
          Proceed to payment
          <ArrowRight className="ml-2 w-5" />
        </Button>
      </CheckoutContentBlock>
    </div>
  )
}
