'use client'

import {
  CheckoutAddress,
  CheckoutCart,
  checkoutFormSchema,
  CheckoutFormType,
  CheckoutPersonalData,
  CheckoutSidebar,
  Container,
  Title,
} from '@/shared/components/shared'
import { useCart } from '@/shared/hooks'
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

const del_price = 9

export default function CheckoutPage() {
  const {
    cartState: { cartItems, totalAmount, removeCartItem },
    onClickCountBtn,
  } = useCart()

  const form = useForm<CheckoutFormType>({
    resolver: zodResolver(checkoutFormSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      address: '',
      comment: '',
    },
  })

  const onSubmit = (data: CheckoutFormType) => console.log(data)

  return (
    <Container className="mt-10">
      <Title text="Checkout" className="font-extrabold mb-8 text-[36px]" />

      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
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

            <CheckoutSidebar
              totalAmount={totalAmount}
              deliveryPrice={del_price}
            />
          </div>
        </form>
      </FormProvider>
    </Container>
  )
}
