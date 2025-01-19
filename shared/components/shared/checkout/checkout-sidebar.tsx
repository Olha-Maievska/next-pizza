'use client'

import React from 'react'
import { CheckoutContentBlock } from './checkout-content-block'
import { cn } from '@/shared/lib/utils'
import { CheckoutItemDetails } from './checkout-item-details'
import { Button, Skeleton } from '../../ui'
import { ArrowRight, Package, Truck } from 'lucide-react'
import { useCart } from '@/shared/hooks'

interface Props {
  className?: string
  loading?: boolean
}

export const CheckoutSidebar: React.FC<Props> = ({ className, loading }) => {
  const {
    _delivery_price,
    _free_delivery_count,
    cartState: { totalWithDeliveryFee, totalAmount },
  } = useCart()
  const deliveryText =
    totalAmount >= _free_delivery_count ? 'Free' : `$${_delivery_price}`

  return (
    <div className={cn('w-[450px]', className)}>
      <CheckoutContentBlock className="p-6 sticky top-4">
        <div className="flex flex-col gap-1">
          <span className="text-xl">Total amount:</span>
          {loading ? (
            <Skeleton className="w-full h-11" />
          ) : (
            <span className="h-11 font-extrabold text-[34px]">
              ${totalWithDeliveryFee}
            </span>
          )}
        </div>

        <div>
          <CheckoutItemDetails
            title="Cost of goods"
            value={
              loading ? <Skeleton className="w-24 h-6" /> : `$${totalAmount}`
            }
            icon={<Package size={18} className="mr-2 text-gray-400" />}
          />
          <CheckoutItemDetails
            title="Delivery"
            value={loading ? <Skeleton className="w-24 h-6" /> : deliveryText}
            icon={<Truck size={18} className="mr-2 text-gray-400" />}
          />
          <div className="text-sm text-gray-500 text-right">
            free shipping over ${_free_delivery_count}
          </div>
        </div>
        <Button
          loading={loading}
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
