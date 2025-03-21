'use client'

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
import { ArrowRight, Loader } from 'lucide-react'
import { CartDrawerItem } from './cart-drawer-item'
import { getCartItemDetails } from '@/shared/lib'
import { PizzaSize, PizzaType } from '@/shared/consts/pizza'
import Image from 'next/image'
import { cn } from '@/shared/lib/utils'
import { useCart } from '@/shared/hooks'
import { useCartStore } from '@/shared/store'

export const CartDrawer: React.FC<React.PropsWithChildren> = ({ children }) => {
  const {
    cartState: { cartItems, totalAmount, removeCartItem },
    onClickCountBtn,
  } = useCart()
  const loading = useCartStore((state) => state.loading)
  const [redirecting, setRedirecting] = React.useState(false)

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className="flex flex-col justify-between pb-0 bg-[#F4F1EE]">
        <div
          className={cn(
            'flex flex-col h-full',
            !totalAmount && 'justify-center'
          )}
        >
          {totalAmount > 0 && (
            <>
              <SheetHeader>
                <SheetTitle>
                  Cart has <span className="font-bold">{cartItems.length}</span>{' '}
                  items
                </SheetTitle>
              </SheetHeader>

              <div className="-mx-6 mt-5 overflow-auto flex-1 relative">
                {cartItems.map((item) => (
                  <div className="mb-2" key={item.id}>
                    <CartDrawerItem
                      id={item.id}
                      imageUrl={item.imageUrl}
                      name={item.name}
                      details={getCartItemDetails(
                        item.ingredients,
                        item.pizzaType as PizzaType,
                        item.size as PizzaSize
                      )}
                      price={item.price}
                      quantity={item.quantity}
                      disabled={item.disabled}
                      onClickCountBtn={(type) =>
                        onClickCountBtn(item.id, item.quantity, type)
                      }
                      onClickRemoveItem={() => removeCartItem(item.id)}
                    />
                  </div>
                ))}

                {loading && (
                  <div className="absolute left-0 top-0 right-0 bottom-0 bg-white/50 z-10">
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
                      <Loader
                        className="w-6 h-6 animate-spin"
                        color="#ff7700"
                      />
                    </div>
                  </div>
                )}
              </div>

              <SheetFooter className="-mx-6 bg-white p-8">
                <div className="w-full">
                  <div className="flex mb-4">
                    <span className="flex flex-1 text-lg text-neutral-500">
                      Subtotal:
                      <div className="flex-1 border-b border-b-neutral-200 border-dashed relative -top-1 mx-2"></div>
                    </span>
                    <span className="font-bold text-lg">${totalAmount}</span>
                  </div>

                  <Link href={'/checkout'}>
                    <Button
                      className="w-full h-12 text-base"
                      type="submit"
                      onClick={() => setRedirecting(true)}
                      loading={redirecting || loading}
                    >
                      Place an order
                      <ArrowRight className="w-5 ml-2" />
                    </Button>
                  </Link>
                </div>
              </SheetFooter>
            </>
          )}

          {!totalAmount && (
            <div className="w-72 mx-auto text-center">
              <Image
                src="/images/empty-cart.svg"
                alt="empty cart"
                width={250}
                height={250}
              />
              <SheetTitle className="mt-4 text-lg">
                Your cart is empty
              </SheetTitle>
              <p className="text-center text-gray-400 mb-5">
                Add at least one pizza to the cart
              </p>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}
