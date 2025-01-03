'use server'

import { prisma } from '@/prisma/prisma-client'
import { CheckoutFormType } from '@/shared/components/shared'
import { PayOrderTemplate } from '@/shared/components/shared/email-template'
import { createPayment, sendEmail } from '@/shared/lib'
import { OrderStatus } from '@prisma/client'
import { cookies } from 'next/headers'

export async function createOrder(data: CheckoutFormType) {
  try {
    const cookiesStore = await cookies()
    const token = cookiesStore.get('token')?.value

    if (!token) {
      throw new Error('Cart token not found')
    }

    const userCart = await prisma.cart.findFirst({
      include: {
        user: true,
        cartItems: {
          include: {
            ingredients: true,
            productItem: {
              include: {
                product: true,
              },
            },
          },
        },
      },
      where: {
        token,
      },
    })

    if (!userCart || userCart.cartItems.length === 0) {
      throw new Error('Cart is empty or not found')
    }

    if (userCart.totalAmount <= 0) {
      throw new Error('Invalid total price')
    }

    const order = await prisma.order.create({
      data: {
        fullname: `${data.firstName} ${data.lastName}`,
        email: data.email,
        address: data.address,
        phone: data.phone,
        comment: data.comment || '',
        totalAmount: userCart.totalAmount,
        token,
        status: OrderStatus.PENDING,
        items: JSON.stringify(userCart.cartItems),
      },
    })

    await prisma.cart.update({
      where: {
        id: userCart.id,
      },
      data: {
        totalAmount: 0,
      },
    })

    await prisma.cartItem.deleteMany({
      where: {
        cartId: userCart.id,
      },
    })

    const paymentDetails = {
      amount: order.totalAmount,
      description: `Next Pizza order #${order.id}`,
      orderID: order.id,
    }

    const paymentData = await createPayment(paymentDetails)

    if (!paymentData) {
      throw new Error('Payment data not found')
    }

    await prisma.order.update({
      where: {
        id: order.id,
      },
      data: {
        paymentId: paymentData.id,
      },
    })

    const paymentUrl = paymentData.url as string

    await sendEmail(
      data.email,
      'Next pizza | Your order has been created',
      PayOrderTemplate({
        firstName: data.firstName,
        orderID: order.id,
        totalAmount: order.totalAmount,
        paymantLink: paymentUrl,
      })
    )
    return paymentUrl
  } catch (error) {
    console.log('[ORDER_CREATE] Server error', error)
  }
}
