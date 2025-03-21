'use client'

import {
  CheckoutAddress,
  CheckoutCart,
  CheckoutEmptyCart,
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
import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { Api } from '@/shared/services/api-client'

export default function CheckoutPage() {
  const {
    cartState: { cartItems, totalWithDeliveryFee, removeCartItem, loading },
    onClickCountBtn,
  } = useCart()

  const [submitting, setSubmitting] = useState(false)

  const { data: session } = useSession()

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
      const url = await createOrder(
        { ...data, phone: String(data.phone) },
        totalWithDeliveryFee
      )

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

  useEffect(() => {
    async function fetchUserInfo() {
      const data = await Api.auth.getMe()
      const [firstName, lastName] = data.fullname.split(' ')

      form.setValue('firstName', firstName || '')
      form.setValue('lastName', lastName || '')
      form.setValue('email', data.email || '')
    }

    if (session) {
      fetchUserInfo()
    }
    //eslint-disable-next-line
  }, [session])

  if (cartItems.length === 0) {
    return <CheckoutEmptyCart />
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

            <CheckoutSidebar loading={loading || submitting} />
          </div>
        </form>
      </FormProvider>
    </Container>
  )
}
