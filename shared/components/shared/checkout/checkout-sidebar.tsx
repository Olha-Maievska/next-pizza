import React from 'react'
import { CheckoutContentBlock } from './checkout-content-block'
import { cn } from '@/shared/lib/utils'
import { CheckoutItemDetails } from './checkout-item-details'
import { Button, Skeleton } from '../../ui'
import { ArrowRight, Package, Truck } from 'lucide-react'

interface Props {
  className?: string
  totalAmount: number
  deliveryPrice: number | string
  loading?: boolean
}

export const CheckoutSidebar: React.FC<Props> = ({
  className,
  totalAmount,
  deliveryPrice,
  loading,
}) => {
  const delPrice = typeof deliveryPrice === 'string' ? 0 : deliveryPrice
  const delText =
    typeof deliveryPrice === 'string' ? 'Free' : `${deliveryPrice} $`

  return (
    <div className={cn('w-[450px]', className)}>
      <CheckoutContentBlock className="p-6 sticky top-4">
        <div className="flex flex-col gap-1">
          <span className="text-xl">Total amount:</span>
          {loading ? (
            <Skeleton className="w-full h-11" />
          ) : (
            <span className="h-11 font-extrabold text-[34px]">
              {totalAmount + delPrice} $
            </span>
          )}
        </div>

        <div>
          <CheckoutItemDetails
            title="Cost of goods"
            value={
              loading ? <Skeleton className="w-24 h-6" /> : `${totalAmount} $`
            }
            icon={<Package size={18} className="mr-2 text-gray-400" />}
          />
          <CheckoutItemDetails
            title="Delivery"
            value={loading ? <Skeleton className="w-24 h-6" /> : delText}
            icon={<Truck size={18} className="mr-2 text-gray-400" />}
          />
        </div>
        <Button
          type="submit"
          className={cn('w-full h-14 mt-6 rounded-2xl text-base font-bold', {
            'pointer-events-none opacity-50': loading,
          })}
        >
          Proceed to payment
          <ArrowRight className="ml-2 w-5" />
        </Button>
      </CheckoutContentBlock>
    </div>
  )
}
