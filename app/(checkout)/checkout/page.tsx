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
import { useForm, FormProvider } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { createOrder } from '@/app/actions'
import toast from 'react-hot-toast'
import { useState } from 'react'

export const delivery_price = 11

export default function CheckoutPage() {
  const {
    cartState: { cartItems, totalAmount, removeCartItem, loading },
    onClickCountBtn,
  } = useCart()
  const deliveryAmount = totalAmount > 50 ? 'Free' : delivery_price
  const [submitting, setSubmitting] = useState(false)

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

  const onSubmit = async (data: CheckoutFormType) => {
    try {
      setSubmitting(true)
      const url = await createOrder(data)

      toast.success('Order created successfully! Switching to payment...', {
        icon: '✅',
      })

      if (url) {
        location.href = url
      }
    } catch (error) {
      console.log(error)
      console.error('[CHECKOUT_FORM] Error:', error)
      toast.error('Something went wrong', {
        icon: '❌',
      })
      setSubmitting(false)
    } finally {
      setSubmitting(false)
    }
  }

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
                loading={loading}
              />

              <CheckoutPersonalData
                className={loading ? 'pointer-events-none opacity-40' : ''}
              />

              <CheckoutAddress
                loading={loading}
                className={loading ? 'pointer-events-none opacity-40' : ''}
              />
            </div>

            <CheckoutSidebar
              totalAmount={totalAmount}
              deliveryPrice={deliveryAmount}
              loading={loading || submitting}
            />
          </div>
        </form>
      </FormProvider>
    </Container>
  )
}
