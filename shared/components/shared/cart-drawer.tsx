import React from 'react'
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '../ui/sheet'
import Link from 'next/link'
import { Button } from '../ui'
import { ArrowRight } from 'lucide-react'
import { CartDrawerItem } from './cart-drawer-item'
import { getCartItemDetails } from '@/shared/lib'

interface Props {
  className?: string
}

export const CartDrawer: React.FC<React.PropsWithChildren<Props>> = ({
  className,
  children,
}) => {
  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className="flex flex-col justify-between pb-0 bg-[#F4F1EE]">
        <SheetHeader>
          <SheetTitle>
            Cart has <span className="font-bold">3</span> items
          </SheetTitle>
        </SheetHeader>

        <div className="-mx-6 mt-5 overflow-auto flex-1">
          <div className="mb-2">
            <CartDrawerItem
              id={1}
              imageUrl=""
              name="Piiza"
              details={getCartItemDetails(1, 20, [])}
              price={20}
              quantity={1}
              disabled={false}
              className=""
            />
          </div>
        </div>

        <SheetFooter className="-mx-6 bg-white p-8">
          <div className="w-full">
            <div className="flex mb-4">
              <span className="flex flex-1 text-lg text-neutral-500">
                Subtotal:
                <div className="flex-1 border-b border-b-neutral-200 border-dashed relative -top-1 mx-2"></div>
              </span>
              <span className="font-bold text-lg">20 $</span>
            </div>

            <Link href={'/cart'}>
              <Button type="submit" className="w-full h-12 text-base">
                Place an order
                <ArrowRight className="w-5 ml-2" />
              </Button>
            </Link>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
