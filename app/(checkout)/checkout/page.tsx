'use client'

import {
  CheckoutAddress,
  CheckoutCart,
  CheckoutPersonalData,
  CheckoutSidebar,
  Container,
  Title,
} from '@/shared/components/shared'
import { useCart } from '@/shared/hooks'
import { useForm, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { checkoutFormSchema } from '@/shared/components/shared/checkout/schema/checkout-form-schema'

const del_price = 9

export default function CheckoutPage() {
  const {
    cartState: { cartItems, totalAmount, removeCartItem },
    onClickCountBtn,
  } = useCart()

  const form = useForm({
    resolver: zodResolver(checkoutFormSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      address: '',
    },
  })

  return (
    <Container className="mt-10">
      <Title text="Checkout" className="font-extrabold mb-8 text-[36px]" />

      <div className="flex gap-10">
        <div className="flex flex-col gap-10 flex-1 mb-20">
          <CheckoutCart
            items={cartItems}
            removeCartItem={removeCartItem}
            onClickCountBtn={onClickCountBtn}
          />

          <CheckoutPersonalData />

          <CheckoutAddress />
        </div>

        <CheckoutSidebar totalAmount={totalAmount} deliveryPrice={del_price} />
      </div>
    </Container>
  )
}
