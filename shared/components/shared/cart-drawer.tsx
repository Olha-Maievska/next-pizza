'use client'

import React, { useEffect } from 'react'
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
import { useCartStore } from '@/shared/store'
import { PizzaSize, PizzaType } from '@/shared/consts/pizza'

export const CartDrawer: React.FC<React.PropsWithChildren> = ({ children }) => {
  const fetchCartItems = useCartStore((state) => state.fetchCartItems)
  const totalAmount = useCartStore((state) => state.totalAmount)
  const cartItems = useCartStore((state) => state.cartItems)
  const updateQty = useCartStore((state) => state.updateItemQty)
  const removeCartItem = useCartStore((state) => state.removeCartItem)

  useEffect(() => {
    fetchCartItems()
  }, [fetchCartItems])

  const onClickCountBtn = (
    id: number,
    quantity: number,
    type: 'plus' | 'minus'
  ) => {
    const newQty = type === 'plus' ? quantity + 1 : quantity - 1
    updateQty(id, newQty)
  }

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className="flex flex-col justify-between pb-0 bg-[#F4F1EE]">
        <SheetHeader>
          <SheetTitle>
            Cart has <span className="font-bold">{cartItems.length}</span> items
          </SheetTitle>
        </SheetHeader>

        <div className="-mx-6 mt-5 overflow-auto flex-1">
          {cartItems?.map((item) => (
            <div className="mb-2" key={item.id}>
              <CartDrawerItem
                id={item.id}
                imageUrl={item.imageUrl}
                name={item.name}
                details={
                  item.pizzaType && item.size
                    ? getCartItemDetails(
                        item.pizzaType as PizzaType,
                        item.size as PizzaSize,
                        item.ingredients
                      )
                    : ''
                }
                price={item.price}
                quantity={item.quantity}
                disabled={false}
                onClickCountBtn={(type) =>
                  onClickCountBtn(item.id, item.quantity, type)
                }
                onClickRemoveItem={() => removeCartItem(item.id)}
              />
            </div>
          ))}
        </div>

        <SheetFooter className="-mx-6 bg-white p-8">
          <div className="w-full">
            <div className="flex mb-4">
              <span className="flex flex-1 text-lg text-neutral-500">
                Subtotal:
                <div className="flex-1 border-b border-b-neutral-200 border-dashed relative -top-1 mx-2"></div>
              </span>
              <span className="font-bold text-lg">{totalAmount} $</span>
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
